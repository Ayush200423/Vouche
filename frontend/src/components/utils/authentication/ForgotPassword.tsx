import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import supabase from "@/helpers/SupabaseAuth";

interface ForgotPasswordProps {
  defaultEmail?: string;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ defaultEmail }) => {
  const [email, setEmail] = useState<string>(defaultEmail ? defaultEmail : "");
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    setEmail(defaultEmail ? defaultEmail : "");
  }, [defaultEmail]);

  // check if user exists
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    event.preventDefault();
    setMessage("");

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${import.meta.env.VITE_SITE_URL}/reset-password`,
    });

    setLoading(false);
    if (error) {
      setSuccess(false);
      setMessage(error.message);
      return;
    }

    if (data) {
      setSuccess(true);
      setMessage("A link to reset your password has been emailed to you.");
      return;
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger>Forgot password?</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Forgot your password?</DialogTitle>
          <DialogDescription>
            We'll email you instructions to reset your password.
            <div className="grid w-full items-center gap-4 py-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              {message && (
                <span className={success ? "text-[#277f5f]" : "text-[#FF4D4F]"}>
                  {message}
                </span>
              )}
              <div>
                <Button className="w-full" onClick={handleSubmit}>
                  {loading ? (
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  ) : (
                    "Email password reset"
                  )}
                </Button>
              </div>
            </div>
            <div>
              <a
                className="text-[#0000EE]"
                onClick={(e) => {
                  e.preventDefault();
                  setEmail(defaultEmail ? defaultEmail : "");
                  setDialogOpen(false);
                }}
                href="#"
              >
                Return to login
              </a>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPassword;
