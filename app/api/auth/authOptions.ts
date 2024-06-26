
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!, // the exclaimatioin mark tells typescript that this vavlues does have a value
      }),
  
      CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "Credentials",
        // `credentials` is used to generate a form on the sign in page.
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          email: { label: "Email", type: "email", placeholder: "Email" },
          password: {
            label: "Password",
            type: "password",
            placeholder: "Password",
          },
        },
        async authorize(credentials, req) {
          // Add logic here to look up the user from the credentials supplied
          if (!credentials?.email || !credentials?.password) {
            return null;
          }
  
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
  
          if (user) {
            // match passwords
            const passwordMatch = await bcrypt.compare(
              credentials.password,
              user.hashedPassword!
            );
  
            // Any object returned will be saved in `user` property of the JWT
            return passwordMatch ? user : null;
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null;
  
            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        },
      }),
    ],
    session: {
      strategy: "jwt",
    },
  };