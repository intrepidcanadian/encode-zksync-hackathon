import { DID, DIDMethod, DIDWithKeys } from "../common";
import { CreateCredentialOptions, CredentialPayload, VerifiableCredential } from 'did-jwt-vc';
/**
 * Creates a {@link CredentialPayload} from supplied Issuer DID, subject DID,
 * subjectData, and CredentialType
 *
 * The Verifiable Credential object created follows the
 * [W3C Verifiable Credential standards](https://www.w3.org/TR/vc-data-model/#basic-concepts)
 * The Verifiable Credential created has not been signed yet.
 *
 * Additional properties can be supplied to this function. These properties should be defined
 * in the W3C spec.
 *
 * @param issuerDID DID of the Issuer
 * @param subjectDID DID of the Subject of the VC
 * @param credentialSubject subject data to be included in the VC
 * @param credentialType type of the VC
 * @param additionalProperties other W3C spec compliant properties of a VC
 * @returns `CredentialPayload` representing the W3C Verifiable Credential object
 */
export declare function createCredential(issuerDID: DID, subjectDID: DID, credentialSubject: CredentialSubject, credentialType: string[], additionalProperties?: Partial<CredentialPayload>): CredentialPayload;
/**
 * Creates a {@link CredentialPayload} from supplied Issuer DID, subject DID,
 * subjectData, and CredentialType, and a VC JSON schema.
 * This method automatically adds the `credentialSchema` property of the VC using the supplied
 * schema location. The type of the credentialSchema is defined by `SCHEMA_VALIDATOR` which
 * should be configurable.
 *
 * The Verifiable Credential object created follows the
 * [W3C Verifiable Credential standards](https://www.w3.org/TR/vc-data-model/#basic-concepts)
 * The Verifiable Credential created has not been signed yet.
 *
 * Additional properties can be supplied to this function. These properties should be defined
 * in the W3C spec.
 *
 * @param schema location of the JSON schema for this credential
 * @param issuerDID DID of the Issuer
 * @param subjectDID DID of the Subject of the VC
 * @param credentialSubject subject data to be included in the VC
 * @param credentialType type of the VC
 * @param additionalProperties other W3C spec compliant properties of a VC
 * @returns `CredentialPayload` representing the W3C Verifiable Credential object with
 * the `credentialSchema` populated
 */
export declare function createCredentialFromSchema(schema: string, issuerDID: DID, subjectDID: DID, credentialSubject: CredentialSubject, credentialType: string, additionalProperties?: Partial<CredentialPayload>): Promise<CredentialPayload>;
/**
 * Creates a Verifiable Credential JWT from {@link DIDWithKeys} and
 * required properties of the Verifiable Credential
 *
 * This method first creates the Credential object from the DID of the Issuer, the DID of the subject,
 * the credentialType and the credentialSubject. This object becomes the payload that is transformed into the
 * [JWT encoding](https://www.w3.org/TR/vc-data-model/#jwt-encoding)
 * described in the [W3C VC spec](https://www.w3.org/TR/vc-data-model)
 *
 * The `DIDWithKeys` is used to sign the JWT that encodes the Verifiable Credential.
 *
 * @param issuer
 * @param subjectDID
 * @param credentialSubject
 * @param credentialType
 * @param additionalProperties
 * @param options
 * @returns
 */
export declare function createAndSignCredentialJWT(issuer: DIDWithKeys, subjectDID: DID, credentialSubject: CredentialSubject, credentialType: string[], additionalProperties?: Partial<CredentialPayload>, options?: CreateCredentialOptions): Promise<string>;
/**
 * This method deactivates an Onyx Verifiable Credential
 *
 * Onyx revocable credentials require the VC to have a DID registered on the DIDRegistry.
 * Revocation involves the Issuer deactivating this DID to revoke the Credential
 *
 * @param vcDID the DID of the Verifiable Credential to be revoked
 * @param didMethod the DID method of the vcDID
 * @returns a `Promise` resolving to if the deactivation succeeded
 * A `DIDMethodFailureError` thrown if the DID method does not support deactivation
 */
export declare function revokeCredential(vcDID: DIDWithKeys, didMethod: DIDMethod): Promise<boolean>;
/**
 * Helper function to retrieve the Issuer DID from a Verifiable Credential
 *
 * @param vc the Verifiable Credential
 * @returns Issuer DID if it exists
 */
export declare function getIssuerFromVC(vc: VerifiableCredential): DID | undefined;
/**
 * Helper function to retrieve Subject DID from a Verifiable Credential
 *
 * @param vc the Verifiable Credential
 * @returns Subject DID if it exists
 */
export declare function getSubjectFromVP(vc: VerifiableCredential): DID | undefined;
/**
 * Data model for the [`credentialSubject`](https://www.w3.org/TR/vc-data-model/#credential-subject)
 * property of the Verifiable Credential
 */
export interface CredentialSubject {
    [property: string]: any;
}
//# sourceMappingURL=credential.d.ts.map