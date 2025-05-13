import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { sequelize } from "@lib/models/index";
// import { Admin, File } from "@lib/models"; // Adjust to your actual model import


export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        // ✅ GitHub Provider
        GitHub,
        Google,

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const models = sequelize.models;
                // console.log("modelsssssssssssssssssss", models)
                const { email, password } = credentials;

                const { Admin, File } = models;

                const admin = await Admin.findOne({
                    where: { email },
                    attributes: [
                        "id",
                        "first_name",
                        "last_name",
                        "gender",
                        "email",
                        "password",
                    ],
                    include: [
                        {
                            attributes: ["id", "url", "type"],
                            model: File,
                            required: false,
                        },
                    ],
                });
                if (!admin) return null;
                console.log("sign in credentials>>>>>>>>>>>>>>>>>>>", admin);
                const isValid = await admin.validPassword(password);

                if (!isValid) return null;

                const image = admin?.File?.url
                    ? process.env.host + admin.File.url
                    : null;

                return {
                    id: admin.id,
                    name: admin.full_name,
                    email: admin.email,
                    image: image,
                    profile: JSON.parse(JSON.stringify(admin)),
                };
            },
        }),
    ],
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: "/", // your custom login page (optional)
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 15,
        refetchInterval: 5 * 60,
    },
    cookies: {
        sessionToken: {
            name: `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: false,
                maxAge: undefined,
            },
        },
    },
    /***
        Callbacks options
            signIn: Called when a user signs in. You can use this to authorize users or fetch additional data.
            signOut: Called when a user signs out. Useful for logging or cleanup actions.
            redirect: Allows customizing the redirect URL after sign-in or sign-out.
            session: Enables adding custom data to the session object.
            jwt: Allows modifying the JWT token contents.
            
        Triggers / Events
            signIn: Triggered when a user signs in.
            signOut: Triggered when a user signs out.
            createUser: Triggered when a new user is created (if you're using a database adapter).
            linkAccount: Triggered when an account is linked to a user.
            session: Triggered when a session is created or updated.
    ***/
    callbacks: {
        async signIn({ user, account }) {
            // console.log("\n\n\n Calbacks signIn>>>>>>>>>>>");
            // console.log("user", user);
            // console.log("account", account);
            // console.log("profile", profile); //for provider only; like google, github
            console.log("\n\n\n");
            if (account.provider != "credentials") {
                const { Admin } = await import("@lib/models/index");
                const existingAdmin = await Admin.findOne({
                    where: { email: user?.email },
                });
                if (!existingAdmin) {
                    // Handle the case where the email is not registered in your database
                    // You can return false to prevent the sign-in or redirect the user to a registration page
                    return `/auth_error?error=1&message=EmailNotRegistered`;
                    // throw new Error('EmailNotRegistered');
                }
            }
            return true;
        },
        async jwt({ token, account, trigger, user, session }) {
            //re triggers after signIn
            // console.log("Calbacks jwt>>>>>>>>>>>");
            // console.log(`jwt: token`, token);
            // console.log("jwt: account,", account);
            // console.log("jwt: trigger", trigger);
            // console.log("jwt: user", user); //from the db or provider
            // console.log("jwt: session", session); //from the client page
            // console.log("jwt: profile", profile); //from the client page
            console.log("\n\n\n ");

            if (trigger == "signIn") {
                if (account.provider != "credentials") {
                    const { Admin, File } = await import("@lib/models/index");
                    const admin = await Admin.findOne({
                        where: { email: user.email },
                        attributes: [
                            "id",
                            "first_name",
                            "last_name",
                            "gender",
                            "email",
                        ],
                        include: [
                            {
                                attributes: ["id", "url", "type"],
                                model: File,
                                required: false,
                            },
                        ],
                    });
                    token.name = admin.full_name;
                    token.profile = JSON.parse(JSON.stringify(admin));
                } else {
                    token.profile = user.profile;
                }
                token.provider = account.provider;
            }

            if (trigger === "update") {
                if (session?.name) token.name = session.name;
                if (session?.image) token.picture = session.image;
                if (session?.profile) token.profile = session.profile;
                if (session?.email) token.email = session.email;
            }

            return token;
        },

        async session({ session, token, trigger, newSession }) {
            /* will not call when triggers == signIn */
            // console.log("Callback session:");
            // console.log("sessioncb: session", session);
            // console.log("sessioncb: token", token);
            // console.log("sessioncb: trigger", trigger);
            // console.log("sessioncb: newSession", newSession);
            console.log("\n\n\n");
            if (trigger === "update") {
                if (newSession?.name) session.name = newSession.name;
                if (newSession?.image) session.image = newSession.image;
            } else {
                session.profile = token?.profile;
                session.provider = token?.provider;
            }
            return session;
        },
    },
});
