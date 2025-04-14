import AuthLayout from "@/components/utils/authentication/AuthLayout";
import { ResetPasswordForm } from "@/components/utils/authentication/ResetPasswordForm";

export default function ResetPassword() {
  return <AuthLayout FormComponent={ResetPasswordForm} />;
}
