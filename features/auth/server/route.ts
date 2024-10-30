import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginScheme, registerScheme } from "../schemas";
import { createAdminClient } from "@/lib/appwrite";
import { ID } from "node-appwrite";
import { deleteCookie, setCookie } from "hono/cookie";
import { AUTH_COOKIE } from "../constrants";
import { sessionMiddleware } from "@/lib/session-middleware";

const app = new Hono()
    .get("/current", sessionMiddleware, (c) => {
        const user = c.get("user");
        return c.json({data: user})
    })
    .post("/login",
        zValidator("json", loginScheme),
        async (c) => {
        try {
            const { email, password } = c.req.valid("json");

            

            const { account } = await createAdminClient();
            const session = await account.createEmailPasswordSession(
                email, password
            );

            setCookie(c, AUTH_COOKIE, session.secret, {
                path: "/",
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 30,
            });

            return c.json({ email, password });
           
        } catch (error) {
            console.error("Error during login:", error);
            return c.json({ error: "Login failed" }, 500);
        }
    })
    .post("/register", 
        zValidator("json", registerScheme),
        async (c) => {
            console.log("register ne")
            try {
                const { name, email, password } = c.req.valid("json");
                console.log("user", name, email, password);

                const { account } = await createAdminClient();
                const user = await account.create(
                    ID.unique(),
                    email,
                    password,
                    name
                );
                console.log("user", user);

                const session = await account.createEmailPasswordSession(
                    email,
                    password
                );

                setCookie(c, AUTH_COOKIE, session.secret, {
                    path: "/",
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict",
                    maxAge: 60 * 60 * 24 * 30,
                });

                return c.json({ data: user });
            } catch (error) {
                console.error("Error in /register:", error);
                return c.json({ error: "Internal Server Error" }, 500);
            }
        }
    )
    .post("/logout", sessionMiddleware, async (c) => {
        const account = c.get("account");

        deleteCookie(c, AUTH_COOKIE);
        await account.deleteSession("current");

        return c.json({success: true});
    })

export default app;