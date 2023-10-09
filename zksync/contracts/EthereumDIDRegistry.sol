// SPDX-License-Identifier: MIT

pragma solidity ^0.8.5;

contract EthereumDIDRegistry {

    struct DID {
        address documentID;     
        address carrier;
        address shipper;
        address consignee;
        uint256 amountForCarrier;
        uint256 amountForGoods;
        bool shipperSigned;
        bool consigneeSigned;
        string jwt;
    }

    mapping(address => DID[]) public carrierDIDs; // Maps a carrier to their associated DIDs
    mapping(address => DID) public dids;           // Maps a documentID to its DID for quick retrieval

    function createDID(
        address documentID,   
        address shipper, 
        address consignee, 
        uint256 amountForCarrier, 
        uint256 amountForGoods, 
        string memory jwt
    ) public {
        DID memory newDID = DID({
            documentID: documentID, 
            carrier: msg.sender,
            shipper: shipper,
            consignee: consignee,
            amountForCarrier: amountForCarrier,
            amountForGoods: amountForGoods,
            shipperSigned: false,
            consigneeSigned: false,
            jwt: jwt
        });
        
        dids[documentID] = newDID;                  
        carrierDIDs[msg.sender].push(newDID);       
    }

    function getDIDsForCarrier(address carrier) public view returns (DID[] memory) {
        return carrierDIDs[carrier];
    }

    function signAsShipper(address documentID) public payable {
        require(dids[documentID].shipper == msg.sender, "Only the shipper can sign.");
        require(msg.value == dids[documentID].amountForCarrier, "Incorrect amount sent for escrow.");

        dids[documentID].shipperSigned = true;
    }

    function signAsConsignee(address documentID) public payable {
        require(dids[documentID].consignee == msg.sender, "Only the consignee can sign.");
        require(msg.value == dids[documentID].amountForGoods, "Incorrect amount for goods.");
        require(dids[documentID].shipperSigned, "Shipper must sign first.");

        // Transfer payment for goods to shipper
        payable(dids[documentID].shipper).transfer(msg.value);

        // No need for escrow in this version, so we directly pay the carrier
        payable(dids[documentID].carrier).transfer(dids[documentID].amountForCarrier);

        dids[documentID].consigneeSigned = true;
    }
}
