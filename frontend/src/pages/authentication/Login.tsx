import AuthLayout from "@/components/utils/authentication/AuthLayout";
import { LoginForm } from "@/components/utils/authentication/LoginForm";

export default function Login() {
  return <AuthLayout FormComponent={LoginForm} />;
}
