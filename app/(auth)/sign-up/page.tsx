"use client";
import { AuthForm } from "@/components/AuthForm";
import { signUp } from "@/lib/actions/auth";
import { signUpschema } from "@/lib/validations";

const page = () => (
  <AuthForm
    type="SIGN_UP"
    schema={signUpschema}
    defaultValues={{
      email: "",
      password: "",
      fullName: "",
      universityId: 0,
      universityCard: "",
    }}
    onSubmit={signUp}
  />
);

export default page;
