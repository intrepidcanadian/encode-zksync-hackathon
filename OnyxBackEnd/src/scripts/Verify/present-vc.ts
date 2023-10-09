import {exit} from 'process';
import config from './present-config.json'
import axios from 'axios';
import { createAndSignPresentationJWT, EthrDIDMethod } from "@jpmorganchase/onyx-ssi-sdk"
import log from './logger';

// async function signVCWithMetamask(verifiableCredential) {
//     const web3 = new Web3(window.ethereum);
//     await window.ethereum.enable();

//     const accounts = await web3.eth.getAccounts();
//     const currentAccount = accounts[0];

//     const dataToSign = web3.utils.utf8ToHex(JSON.stringify(verifiableCredential));
//     const signature = await web3.eth.personal.sign(dataToSign, currentAccount);

//     const signedVerifiableCredential = {
//         ...verifiableCredential,
//         holderProof: {
//             type: "EcdsaSecp256k1Signature2019",
//             created: new Date().toISOString(),
//             proofPurpose: "endorsement",
//             verificationMethod: "did:ethr:" + currentAccount,
//             jws: signature
//         }
//     };

//     return signedVerifiableCredential;
// }


async function setup() {
    try {
        log.info("Creating Verifiable Presentation...");

        // const vcs = await Promise.all(config.vcs.map(vc => signVCWithMetamask(vc)));
        // const vp = await createAndSignPresentationJWT(null, vcs);

        const signingKey = config.privateKey
        const vcs = config.vcs

        //get DID (did:ethr) from configured private key
        const ethrDID = new EthrDIDMethod({
            name: config.web3.name,
            registry: config.web3.didRegistryAddress,
            rpcUrl: config.web3.web3HttpProvider
        })

        console.log("Private Key Length:", signingKey.length);
        console.log("Private Key Value:", signingKey);
        // const bufferKey = Buffer.from(signingKey, 'hex');
        // const subjectDID = await ethrDID.generateFromPrivateKey(bufferKey);

        const subjectDID = await ethrDID.generateFromPrivateKey(signingKey)
        

        // create VP
        const vp = await createAndSignPresentationJWT(subjectDID, vcs)

        
        //Hit claim endpoint of Onyx Issuance Service
        log.info(`Sending Verifiable Presentation to Verifier at ${config.verifierUrl}`)
        const verificationResponse = await axios.post(`${config.verifierUrl}/verify`, 
        {presentation: vp})
        const verified = verificationResponse.data;
        log.info(`${verificationResponse.data}`)
        //Log out relevant information
        log.info(`Verification Result: ${JSON.stringify(verified,null,2)}`)

    } catch (err) {
        log.error(`Error encountered during setup. Aborting...`, err);
        exit(1);
    }

}


setup();