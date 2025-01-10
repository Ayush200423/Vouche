import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import supabase from "@/helpers/SupabaseAuth";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    event.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setLoading(false);
      setMessage("Passwords do not match.");
      return;
    }

    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    if (data) {
      navigate("/dashboard");
      const name = data.user?.user_metadata?.name;
      toast({
        title: `Welcome back${name ? `, ${name}` : ""}!`,
        description: "We've updated your password.",
      });
      return null;
    }
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Reset account password</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Choose a new password
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">New password</Label>
          </div>
          <Input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="confirm-password">Confirm password</Label>
          </div>
          <Input
            id="confirm-password"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </div>
        {message && <span className="text-[#FF4D4F] text-sm">{message}</span>}
        <Button className="w-full" onClick={handleSubmit}>
          {loading ? (
            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
          ) : (
            "Reset password"
          )}
        </Button>
      </div>
    </form>
  );
}
