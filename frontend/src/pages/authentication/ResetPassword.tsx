import AuthLayout from "@/components/utils/authentication/AuthLayout";
import { RegisterForm } from "@/components/utils/authentication/RegisterForm";
import { ResetPasswordForm } from "@/components/utils/authentication/ResetPasswordForm";

export default function ResetPassword() {
  return <AuthLayout FormComponent={ResetPasswordForm} />;
}
