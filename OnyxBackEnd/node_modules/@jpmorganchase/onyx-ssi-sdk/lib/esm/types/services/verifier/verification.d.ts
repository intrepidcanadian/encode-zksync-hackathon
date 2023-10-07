import { Resolvable } from 'did-resolver';
import { VerifiableCredential, VerifiablePresentation, VerifyCredentialOptions, VerifyPresentationOptions } from "did-jwt-vc";
import { DID } from '../common';
/**
 * Provides verification of a Verifiable Credential JWT
 *
 * It uses the {@link verifyCredential} method from did-jwt-vc. This performs JWT
 * validation (digital signature, date verification) and optionally performs format validation
 * of the Verifiable Credential against the W3C standards. The options parameter can be
 * configured to customize what features of the Credential and JWT are validated by the
 * did-jwt-vc and did-jwt packages
 *
 *
 * @param vc {@link VerifiableCredential} to be verified. Either a JWT or W3C VC with proof.
 * @param didResolver a configured `Resolver` (or an implementation of `Resolvable`) that can provide the DID document
 *   of the JWT issuer
 * @param options optional tweaks to the verification process
 * @returns a `Promise` that resolves to a boolean or rejects with
 * `TypeError` if the input is not W3C compliant
 * `Error` thrown from did-jwt if any jwt verification fails
 */
export declare function verifyCredentialJWT(vc: VerifiableCredential, didResolver: Resolvable, options?: VerifyCredentialOptions): Promise<boolean>;
/**
 * Provides verification of a Verifiable Presentation JWT
 *
 * It uses the {@link verifyPresentation} method from did-jwt-vc. This performs JWT
 * validation (digital signature, date verification) and optionally performs format validation
 * of the Verifiable Presentation against the W3C standards. The options parameter can be
 * configured to customize what features of the Presentation and JWT are validated by the
 * did-jwt-vc and did-jwt packages.  * This function will not do any validation of the internal
 * VerifiableCredentials except for format validation
 *
 *
 * @param vc {@link VerifiablePresentation} to be verified. Either a JWT or W3C VP with proof.
 * @param didResolver a configured `Resolver` (or an implementation of `Resolvable`) that can provide the DID document
 *   of the JWT issuer
 * @param options optional tweaks to the verification process
 * @returns a `Promise` that resolves to a boolean or rejects with
 * `TypeError` if the input is not W3C compliant
 */
export declare function verifyPresentationJWT(vp: VerifiablePresentation, didResolver: Resolvable, options?: VerifyPresentationOptions): Promise<boolean>;
/**
 * Verify that a DID has an active status.
 *
 * Resolves the DID to its DIDDocument and checks the metadata for the deactivated flag
 *
 * true if the DID does not have metadata or deactivated flag isn't on metadata
 * false if deactivated flag set to true
 *
 * @param did the DID to be verified
 * @param didResolver a configured `Resolver` (or an implementation of `Resolvable`) that can provide the DID document
 *   of a DID
 * @returns a `Promise` that resolves to if the DID is active
 */
export declare function verifyDID(did: DID, didResolver: Resolvable): Promise<boolean>;
/**
 * Verify that all the required DIDs in a {@link VerifiableCredential} exist and have an active status
 *
 * @param vc the Verifiable Credential to verify the Issuer and Subject DIDs
 * @param didResolver a configured `Resolver` (or an implementation of `Resolvable`) that can provide the DID document
 *   of a DID
 * @returns a `Promise` that resolves to if the Credential DIDs are valid
 */
export declare function verifyDIDs(vc: VerifiableCredential, didResolver: Resolvable): Promise<boolean>;
/**
 * Verify the expiration date of a {@link VerifiableCredential}
 *
 * @param vc `VerifiableCredential` to be verified
 * @returns boolean determining if the expirationDate is valid
 */
export declare function verifyExpiry(vc: VerifiableCredential): boolean;
/**
 * Verify the issuance date of a {@link VerifiableCredential}
 *
 * @param vc `VerifiableCredential` to be verified
 * @returns boolean determining if the issuanceDate is valid
 */
export declare function verifyIssuanceDate(vc: VerifiableCredential): boolean;
/**
 * Verify the revocation status of an Onyx revocable Verifiable Credential
 *
 * True if VC not revoked, false if revoked
 *
 * @param vc VerifiableCredential` to be verified
 * @param didResolver a configured `Resolver` (or an implementation of `Resolvable`) that can provide the DID document
 *   of a DID
 * @returns a `Promise` that resolves to if the Verifiable Credential is active.
 */
export declare function verifyRevocationStatus(vc: VerifiableCredential, didResolver: Resolvable): Promise<boolean>;
/**
 * Verify that the `credentialSubject` conforms to the defined JSON Schema present
 * in the Verifiable Credential
 *
 * @param vc VerifiableCredential` to be verified
 * @param isFile boolean if the schema location is a local file
 * @returns a `Promise` that resolves to if the schema check succeeded
 */
export declare function verifySchema(vc: VerifiableCredential, isFile: boolean): Promise<boolean>;
//# sourceMappingURL=verification.d.ts.map