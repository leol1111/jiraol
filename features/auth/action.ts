
import { Account, Client } from "node-appwrite";
import { cookies } from "next/headers"; 
import { AUTH_COOKIE } from "./constrants";

export const getCurrent = async () => {
    try {
        const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

        const cookieStore = await cookies();
        const session = cookieStore.get(AUTH_COOKIE);

        if(!session) return null;

        client.setSession(session.value);
        const account = new Account(client);
        const user = await account.get();
        return user;
    } catch (error) {
        return null;
    }

    

}

