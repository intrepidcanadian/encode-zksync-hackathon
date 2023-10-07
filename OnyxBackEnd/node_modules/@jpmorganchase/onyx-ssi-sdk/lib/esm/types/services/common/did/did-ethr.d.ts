import { DIDResolutionResult, DIDResolver } from "did-resolver";
import { Provider } from "@ethersproject/providers";
import { DID, DIDMethod, DIDWithKeys } from "./did";
export declare class EthrDIDMethod implements DIDMethod {
    name: string;
    providerConfigs: ProviderConfigs;
    web3Provider: Provider;
    constructor(providerConfigs: ProviderConfigs);
    /**
     *
     * Creates a new ES256K keypair and corresponding DID following did:ethr method
     *
     * @returns a `Promise` that resolves to {@link DIDWithKeys}
     */
    create(): Promise<DIDWithKeys>;
    /**
     * Creates a DID given a private key
     * Used when an ES256K keypair has already been generated and is going to be used as a DID
     *
     * @param privateKey - private key to be used in creation of a did:ethr DID
     * @returns a `Promise` that resolves to {@link DIDWithKeys}
     * Throws `DIDMethodFailureError` if private key is not in hex format
     */
    generateFromPrivateKey(privateKey: string | Uint8Array): Promise<DIDWithKeys>;
    /**
     *
     * Resolves a DID using the resolver from ethr-did-resolver to a {@link DIDResolutionResult}
     * that contains the DIDDocument and associated Metadata
     *
     * Uses ethr-did-resolver and did-resolver
     *
     * @param did - the DID to be resolved
     * @returns a `Promise` that resolves to `DIDResolutionResult` defined in did-resolver
     * Throws `DIDMethodFailureError` if resolution failed
     */
    resolve(did: DID): Promise<DIDResolutionResult>;
    /**
     * This update method is used specifically to support key rotation of did:ethr.
     * This SDK may be enhanced with other appropriate update methods for did:ethr
     *
     * Calls setAttribute function on the DIDRegistry for the given DID.
     * Other attributes of the DIDDocument can be updated by calling the setAttribute
     * method, however for this method specifically focuses on the key rotation use case.
     *
     * Calling this method requires sending a tx to the blockchain. If the configured
     * blockchain requires gas, the DID being updated must be able to pay for the gas as
     * its private key is being used to sign the blockchain tx.
     *
     * @param did - DID to be updated
     * @param newPublicKey - the new public key in hex format to be added to DIDDocument
     * @returns `Promise` that resolves to a `boolean` describing if the update failed or
     * succeeded.
     * Throws `DIDMethodFailureError` if the supplied public key is not in the expected format
     * or if sending tx fails
     */
    update(did: DIDWithKeys, newPublicKey: string | Uint8Array): Promise<boolean>;
    /**
     * Deactivates a DID on the Ethr DIDRegistry
     *
     * According to the did:ethr spec, a deactivated DID is when the owner property of
     * the identifier MUST be set to 0x0
     *
     * Calling this method requires sending a tx to the blockchain. If the configured
     * blockchain requires gas, the DID being updated must be able to pay for the gas as
     * its private key is being used to sign the blockchain tx.
     *
     * @param did - DID to be deactivated
     * @returns `Promise` that resolves to a `boolean` describing if the update failed or
     * succeeded.
     * Throws `DIDMethodFailureError` if sending tx fails.
     */
    deactivate(did: DIDWithKeys): Promise<boolean>;
    /**
     * Helper function to check if a given DID has an active status.
     * Resolves the DID to its DIDDocument and checks the metadata for the deactivated flag
     *
     * Is active if the DIDDocument does not have metadata or deactivated flag isn't on the metadata
     * Is deactivated if deactivated flag set to true
     *
     * @param did - DID to check status of
     * @returns a `Promise` that resolves to a `boolean` describing if the DID is active
     * (true if active, false if deactivated)
     */
    isActive(did: DID): Promise<boolean>;
    /**
     * Helper function to return the Identifier from a did:ethr string
     *
     * @param did - DID string
     * @returns the Identifier section of the DID
     * Throws `DIDMethodFailureError` if DID not in correct format or a valid address
     */
    getIdentifier(did: DID): string;
    /**
     * Returns an Ethereum address extracted from the identifier of the DID.
     * The returned address is compatible with the Solidity "address" type in a contract call
     * argument.
     * @param {DID} did - DID to convert into an Ethereum address
     * @returns {string} Etheruem address extracted from the identifier of `did`
     * Throws `DIDMethodFailureError` if DID not in correct format or a valid address
     */
    convertDIDToAddress(did: DID): string;
    /**
     * Getter method for did:ethr Resolver from ethr-did-resolver
     * @returns type that is input to new {@link Resolver} from did-resolver
     */
    getDIDResolver(): Record<string, DIDResolver>;
}
/**
 * Used as input to `EthrDidMethod` constructor
 * Provides configurations of Ethereum-based network required for did:ethr functionality
 */
export interface ProviderConfigs {
    /**
     * Contract address of deployed DIDRegistry
     */
    registry: string;
    /**
     * The name of the network or the HEX encoding of the chainId.
     * This is used to construct DIDs on this network: `did:ethr:<name>:0x...`.
     */
    name: string;
    description?: string;
    /**
     * A JSON-RPC endpoint that can be used to broadcast transactions or queries to this network
     */
    rpcUrl?: string;
    /**
     * ethers {@link Provider} type that can be used instead of rpcURL
     * One of the 2 must be provided for did-ethr. Provider will be
     * chosen over URL if both are given
     */
    provider?: Provider;
}
//# sourceMappingURL=did-ethr.d.ts.map