"use server";
import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import config from "../config";
import ratelimit from "../ratelimit";
import { workflowClient } from "../workflow";

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = params;

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";

  //headers is used in next server actions or api routes to fetch incoming requests. the x-forwarded-fo header consists of the client's ip address, if it is not available defaults to local host

  const { success } = await ratelimit.limit(ip);

  if (!success) return redirect("/too-fast");

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    }); //the signIn you see here is imported from auth.ts in the base directory, the credentials are passed from here to there and then used to check if they match. Check /auth.ts for more info

    //

    if (result?.error) {
      return { success: false, error: result.error };
    }

    return { success: true }; //returning an obj where success is set to true
  } catch (error) {
    console.log(error, "Signin error");
    return { success: false, error: "Signin error" };
  }
}; //gets called in the signIn

export const signUp = async (params: AuthCredentials) => {
  const { fullName, email, password, universityId, universityCard } = params;

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";

  //headers is used in next server actions or api routes to fetch incoming requests. the x-forwarded-fo header consists of the client's ip address is not available defaults to local host

  const { success } = await ratelimit.limit(ip);

  if (!success) return redirect("/too-fast");

  //check if the user already exists
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) { 
    return { success: false, error: "User already exists" }; // why.length ? drizzle orm always resolves queries into arrays so we use this, also if you do not use await on the call then a promise will be returned.
  }

  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(users).values({
      fullName,
      email,
      universityId,
      universityCard,
      password: hashedPassword,
    });

    await workflowClient.trigger({
      url: `${config.env.prodApiEndpoint}/api/workflow/onboarding`,
      body: {
        email,
        fullName,
      },
    });

    await signInWithCredentials({ email, password }); // gets called to sign in the user with the credentials they provided instead of having to sign in again.

    return { success: true };
  } catch (error) {
    console.log(error, "Signup error");
    return { success: false, error: "Signup error" };
  }
}; //gets called in signUp
