import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";
import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./database/drizzle";
import { users } from "./database/schema";

export const { handlers, signIn, signOut, auth } = NextAuth({  //so basically signIn, signOut extra are stuff used by NextAuth we are destructuring and using it, the SignIn here is used in auth.ts inside actions 
  session: {
    strategy: "jwt", //so sessions are basically a part of cookies, we are using jwt here which basically stores all info in the cookie instead of relying on a db to save session info
  },

  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null; // if the user doesn't fill them return nothing
        }

        //credentialsProvider, authorize all come in from auth.js and the details the user enters get passed as parameters(credentials)

        //the credentials are being passed in libs/actions/auth.ts where the signIn fn from the above is called and "credentials is mentioned as request which leads the request to be sent here by next as credential provider is in this file"

        //credentials also acts as parameter taking in all the info such as email bla bla which is used here for checking

        

        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email.toString()))
          .limit(1); //eq -> equals and is comparing the one recieved and the actual info. See in jwt every request is sent with the info since the web is stateless and then the server verifies the info in the cookie with the one in credentials.

        if (user.length === 0) return null; //basically if user doesn't exist

        const isPasswordValid = await compare(
          credentials.password.toString(),
          user[0].password //using compare from bcrypt js, the password is stored as hash and the password coming in through is also hashed if their hash value matches, you're in
        );

        if (!isPasswordValid) return null;

        return {
          id: user[0].id.toString(),
          email: user[0].email,
          name: user[0].fullName,
        } as User; //this info is essential for auth to set up the necessary jwt cookies

        //  *** so what ever  user related details is being returned here is added to something called session.user, every session has a user object inside which the stuff we return is added. 
      },
    }),
  ],

  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    }, // setting up a token

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }
      return session;
    }, // setting up a session
  },

   
});
