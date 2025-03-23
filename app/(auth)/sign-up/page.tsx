"use client";
import { AuthForm } from "@/components/AuthForm";
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
    onSubmit={() => {}}
  />
);

export default page;
