import {exit} from 'process';
import config from './claim-config.json'
import axios from 'axios';
import { EthrDIDMethod } from "@jpmorganchase/onyx-ssi-sdk"
import {fromString, toString} from 'uint8arrays'
import { hashSha256 } from 'jsontokens/lib/cryptoClients/sha256';
import secp256k1 from 'secp256k1'
import log from './logger';
import dotenv from 'dotenv';

dotenv.config();

async function claim() {
    try {
        log.info("Claiming from Issuance Service...");

        //Create DID (did:ethr) for Subject of VC
        const ethrDID = new EthrDIDMethod({
            name: config.web3.name,
            registry: config.web3.didRegistryAddress,
            rpcUrl: config.web3.web3HttpProvider
        })
        const subjectDID = await ethrDID.create()

        if (subjectDID === undefined) {
            log.error('Unable to register root DID');
            exit(1);
        }

        
        const HOLDER_ES256K_PRIVATE_KEY="b0d41a04ff82b40f4a0de1ba8a02db8492c364e1b27b889ee331dba58e37113e"
        const HOLDER_ES256K_PUBLIC_KEY="02095f473a2a73e1b1816e981a1370bac08e07b9c3cfd13c8f96f519c595cfad0d"
        const HOLDER_ES256K_DID="did:ethr:zkSync Era Testnet:0xe32B3C476b95eA192D444Cfb2e2b80559332f8A2"

        // const did = process.env.HOLDER_ES256K_DID;
        // const privKey = process.env.HOLDER_ES256K_PRIVATE_KEY;
        // const pubkey = process.env.HOLDER_ES256K_PUBLIC_KEY;
        const did = HOLDER_ES256K_DID;
        const privKey = HOLDER_ES256K_PRIVATE_KEY;
        const pubkey = HOLDER_ES256K_PUBLIC_KEY;

        //Sign challenge required to claim by Issuance Service
        const timestamp = Date.now();
        const token = config.token;
        // const did = subjectDID.did;
        // const pubkey = subjectDID.keyPair.publicKey
        // const privKey = subjectDID.keyPair.privateKey as string

        const data = `${token}\n${did}\n${timestamp}`

        const sig = signChallenge(data, privKey)
    
        //Hit claiming endpoint of Onyx Issuance Service
        log.info(`Requesting Credential from ${config.issuer} using token ${token}`);
        const credentialResponse = await axios.post(`${config.issuer}/public/issue`, {
            token: token,
            did: did,
            timestamp: timestamp,
            signature: sig,
        })
        const credentialJWT = credentialResponse.data;

        //Log out relevant information
        log.info('Credential Information for Subject');
        log.info(`DID: ${did}`);
        log.info(`Private Key: ${privKey}`);
        log.info(`Public Key : ${pubkey}`);
        log.info(`CredentialJWT: ${JSON.stringify(credentialJWT,null, 2)}`);
        log.info('************************************');

    } catch (err) {
        log.error(`Error encountered during setup. Aborting...`, err);
        exit(1);
    }

}

export function signChallenge(challenge: string, privateKey: string) : string {
    const sigobj = secp256k1.ecdsaSign(hashSha256(challenge), hexToBytes(privateKey))
    return bytesToHex(sigobj.signature).concat(':').concat(sigobj.recid.toString())
}

export function bytesToHex(bytes: Uint8Array) {
    return toString(bytes, 'base16')
}

export function hexToBytes(s: string): Uint8Array {
    const input = s.startsWith('0x') ? s.substring(2) : s
    return fromString(input.toLowerCase(), 'base16')
}



claim();