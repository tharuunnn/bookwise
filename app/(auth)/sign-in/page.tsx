"use client";
import { AuthForm } from "@/components/AuthForm";
import { signInschema } from "@/lib/validations";

const page = () => (
  <AuthForm
    type="SIGN_IN"
    schema={signInschema}
    defaultValues={{
      email: "",
      password: "",
    }}
    onSubmit={() => {}}
  />
);

export default page;
