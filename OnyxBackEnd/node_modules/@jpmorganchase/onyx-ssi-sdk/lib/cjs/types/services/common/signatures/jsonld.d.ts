import { CredentialPayload, CreateCredentialOptions, PresentationPayload, CreatePresentationOptions } from "did-jwt-vc";
import { DIDWithKeys } from "../did/did";
import { SignatureService } from "./signatures";
export declare class JSONLDService implements SignatureService {
    signVC(_keys: DIDWithKeys, _token: CredentialPayload, _configs?: CreateCredentialOptions | undefined): Promise<string>;
    signVP(_keys: DIDWithKeys, _token: PresentationPayload, _configs?: CreatePresentationOptions | undefined): Promise<string>;
    name: string;
}
//# sourceMappingURL=jsonld.d.ts.map