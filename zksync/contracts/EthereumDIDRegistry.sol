// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol";

contract EthereumDIDRegistry {
    using SignatureChecker for address;

    struct DID {
        address documentID;
        address carrier;
        address shipper;
        address consignee;
        uint256 amountForCarrier;
        uint256 amountForGoods;
        bool shipperSigned;
        bool consigneeSigned;
    }

    struct VC {
        address issuer;
        bytes32 jwtHash;
        address holder;
        bytes holderSignature;
        bool valid;
        uint256 issuedAt;
    }

    mapping(address => DID[]) public carrierDIDs;
    mapping(address => DID) public dids;
    mapping(bytes32 => VC) public vcs;
    mapping(address => bytes32[]) public holderVcs;

    function issueVC(address documentID, bytes32 jwtHash) public {
        bytes32 vcId = keccak256(abi.encodePacked(jwtHash, documentID));

        VC storage vc = vcs[vcId];
        require(
            !vc.valid,
            "VC already issued with this jwtHash and documentID combination"
        );

        vc.issuer = msg.sender;
        vc.jwtHash = jwtHash;
        vc.valid = true;
        vc.issuedAt = block.timestamp;
    }

    function claimVC(bytes32 vcId, bytes memory holderSignature) public {
        VC storage vc = vcs[vcId];
        require(vc.valid, "VC does not exist or is invalid.");

        bool isSignatureCorrect = verifyHolderSignature(
            vc.jwtHash,
            holderSignature,
            msg.sender
        );

        require(
            isSignatureCorrect,
            "User must provide a valid holder signature"
        );

        vc.holder = msg.sender;
        vc.holderSignature = holderSignature;
        
        // Store the vcId in the holderVcs mapping
        holderVcs[msg.sender].push(vcId);
    }

    function verifyHolderSignature(
        bytes32 jwtHash,
        bytes memory holderSignature,
        address holderAddress
    ) public view returns (bool) {
        return
            holderAddress.isValidSignatureNow(
                keccak256(
                    abi.encodePacked(
                        "\x19Ethereum Signed Message:\n32",
                        jwtHash
                    )
                ),
                holderSignature
            );
    }

    function hasHolderClaimedVC(
        bytes32 vcId,
        address holder,
        bytes memory signature
    ) public view returns (bool) {
        VC memory vc = vcs[vcId];
        return
            verifyHolderSignature(vc.jwtHash, signature, holder) &&
            vc.holder == holder;
    }

    function getVC(
        bytes32 vcId
    )
        public
        view
        returns (
            address issuer,
            bytes32 jwtHash,
            address holder,
            bytes memory holderSignature,
            bool valid,
            uint256 issuedAt
        )
    {
        VC memory vc = vcs[vcId];
        return (
            vc.issuer,
            vc.jwtHash,
            vc.holder,
            vc.holderSignature,
            vc.valid,
            vc.issuedAt
        );
    }

    function getVcId(
        address documentID,
        bytes32 jwtHash
    ) public view returns (bytes32) {
        bytes32 vcId = keccak256(abi.encodePacked(jwtHash, documentID));
        require(
            vcs[vcId].valid,
            "VC does not exist with this jwtHash and documentID combination"
        );
        return vcId;
    }

    function getVCsForHolder(address holder) public view returns (VC[] memory) {
        bytes32[] memory vcIds = holderVcs[holder];
        VC[] memory holderVCs = new VC[](vcIds.length);

        for (uint i = 0; i < vcIds.length; i++) {
            holderVCs[i] = vcs[vcIds[i]];
        }

        return holderVCs;
    }

    function createDID(
        address documentID,
        address shipper,
        address consignee,
        uint256 amountForCarrier,
        uint256 amountForGoods
    ) public {
        DID memory newDID = DID({
            documentID: documentID,
            carrier: msg.sender,
            shipper: shipper,
            consignee: consignee,
            amountForCarrier: amountForCarrier,
            amountForGoods: amountForGoods,
            shipperSigned: false,
            consigneeSigned: false
        });

        dids[documentID] = newDID;
        carrierDIDs[msg.sender].push(newDID);
    }

    function signAsShipper(address documentID) public payable {
        require(
            dids[documentID].shipper == msg.sender,
            "Only the shipper can sign."
        );
        require(
            msg.value == dids[documentID].amountForCarrier,
            "Incorrect amount sent for escrow."
        );

        dids[documentID].shipperSigned = true;
    }

function signAsConsignee(address documentID) public payable {
    require(dids[documentID].consignee == msg.sender, "Only the consignee can sign.");

    dids[documentID].consigneeSigned = true;

    (bool successShipper, ) = payable(dids[documentID].shipper).call{value: msg.value}("");
    require(successShipper, "Payment to shipper failed");

    (bool successCarrier, ) = payable(dids[documentID].carrier).call{value: dids[documentID].amountForCarrier}("");
    require(successCarrier, "Payment to carrier failed");
}
}
