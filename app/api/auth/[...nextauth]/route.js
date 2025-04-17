import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Admin } from "@lib/models"; // Adjust to your actual model import

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { email, password } = credentials;

                const admin = await Admin.findOne({ where: { email } });
                if (!admin) return null;
                console.log("Im hereeee: Admin FOUND>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", admin);

                const isValid = await admin.validPassword(password);
                if (!isValid) return null;
                console.log("Im hereeee: VALID PASSWORD Admin>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

                return {
                    id: admin.id,
                    name: admin.full_name,
                    email: admin.email,
                };
            },
        }),
    ],
    pages: {
        signIn: "/", // your custom login page (optional)
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
