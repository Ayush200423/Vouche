import AuthLayout from "@/components/utils/authentication/AuthLayout";
import { RegisterForm } from "@/components/utils/authentication/RegisterForm";

export default function Register() {
  return <AuthLayout FormComponent={RegisterForm} />;
}
