import { Client } from "@microsoft/microsoft-graph-client";
import { AuthorizationCodeCredential } from "@azure/identity";
import 'isomorphic-fetch';
import promt from "prompt-sync";

export default async function init(): Promise<Client> {
    const readln = promt();

    console.debug(
        process.env.TENANT_ID,
        process.env.CLIENT_ID,
        process.env.REDIRECT_URI,
    )

    const auth_code = readln("Auth Code: ");

    const auth = new AuthorizationCodeCredential(
        process.env.TENANT_ID ?? "",
        process.env.CLIENT_ID ?? "",
        auth_code,
        process.env.REDIRECT_URI ?? "",
    );

    const scopes = [
        "openid", "profile", "offline_access", "GroupMember.Read.All",
        "Tasks.ReadWrite", "Group.ReadWrite.All"
    ];

    const client = Client.init({
        authProvider: async (done) => {
            done(null, await auth.getToken(scopes).then((token) => token?.token ?? ""));
        }
    });

    return client;
}
