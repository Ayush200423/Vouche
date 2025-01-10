import AuthLayout from "@/components/utils/authentication/AuthLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import logo from "../../assets/smallLogo.png";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "@/helpers/SupabaseAuth";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ResetPassword = () => {
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
    <AuthLayout
      shade="#eaebfd"
      leftContent={
        <div>
          hi dasjd
          <div>dhh</div>
        </div>
      }
      rightContent={
        <div>
          <Card>
            <CardHeader>
              <img
                className="w-[20%] pb-[20px]"
                src={logo}
                alt=""
                draggable="false"
              />
              <CardTitle>Reset account password</CardTitle>
              <CardDescription>Choose a new password</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="confirm-password">Confirm password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      value={confirmPassword}
                    />
                  </div>
                  {message && <span className="text-[#FF4D4F]">{message}</span>}
                  <div>
                    <Button className="w-full" onClick={handleSubmit}>
                      {loading ? (
                        <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                      ) : (
                        "Reset password"
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </div>
      }
    />
  );
};

export default ResetPassword;
