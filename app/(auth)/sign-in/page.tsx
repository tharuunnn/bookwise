"use client";
import { AuthForm } from "@/components/AuthForm";
import { signInWithCredentials } from "@/lib/actions/auth";
import { signInschema } from "@/lib/validations";

const page = () => (
  <AuthForm
    type="SIGN_IN"
    schema={signInschema}
    defaultValues={{
      email: "",
      password: "",
    }}
    onSubmit={signInWithCredentials}
  />
);

export default page;
