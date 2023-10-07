import { DIDResolutionResult, DIDResolver } from "did-resolver";
import { DID, DIDMethod, DIDWithKeys } from "./did";
export declare class KeyDIDMethod implements DIDMethod {
    name: string;
    /**
      * Creates a new EdDSA keypair and corresponding DID following did:key method
      *
      * @returns a `Promise` that resolves to {@link DIDWithKeys}
      */
    create(): Promise<DIDWithKeys>;
    /**
     * Creates a DID given a private key
     * Used when an EdDSA keypair has already been generated and is going to be used as a DID
     *
     * @param privateKey - private key to be used in creation of a did:key DID
     * @returns a `Promise` that resolves to {@link DIDWithKeys}
     * Throws `DIDMethodFailureError` if supplied private key not in correct format
     */
    generateFromPrivateKey(privateKey: string | Uint8Array): Promise<DIDWithKeys>;
    /**
     * Resolves a DID using the resolver from key-did-resolver to a {@link DIDResolutionResult}
     * that contains the DIDDocument and associated Metadata
     *
     * Uses key-did-resolver and did-resolver
     *
     * @param did - DID to be resolved to its DIDDocument
     * @returns a `Promise` that resolves to `DIDResolutionResult` defined in did-resolver
     * Throws `DIDMethodFailureError` if resolution failed
     */
    resolve(did: DID): Promise<DIDResolutionResult>;
    /**
     * did:key does not support update
     */
    update(_did: DIDWithKeys, _publicKey: string | Uint8Array): Promise<boolean>;
    /**
     * did:key does not support deactivate
     */
    deactivate(_did: DIDWithKeys): Promise<boolean>;
    /**
     * Since did:key cannot be updated or deactivated, the status will always be active
     *
     * @param did - DID to check status of
     * @returns a `Promise` that always resolves to true if DID is in correct format
     * Throws `DIDMethodFailureError` otherwise
     */
    isActive(did: DID): Promise<boolean>;
    /**
     * Helper function to return the Identifier from a did:key string
     *
     * @param did - DID string
     * @returns the Identifier section of the DID
     * Throws `DIDMethodFailureError` if format check fails
     */
    getIdentifier(did: DID): string;
    /**
     * Helper function to check format of a did:key
     *
     * Correct format is did:key:{alphanumeric identifier of 48 characters}
     *
     * @param did - DID string
     * @returns true if format check passes
     */
    checkFormat(did: DID): boolean;
    /**
     * Getter method for did:key Resolver from key-did-resolver
     *
     * @returns type that is input to new {@link Resolver} from did-resolver
     */
    getDIDResolver(): Record<string, DIDResolver>;
}
//# sourceMappingURL=did-key.d.ts.map