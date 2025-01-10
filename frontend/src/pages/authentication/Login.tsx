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
import googleSvg from "../../assets/googleSVG.png";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import supabase from "@/helpers/SupabaseAuth";
import { Loader2 } from "lucide-react";
import ForgotPassword from "@/components/utils/authentication/ForgotPassword";

const redirectGoogleOAuth = `${import.meta.env.VITE_SITE_URL}/dashboard`;

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    event.preventDefault();
    setMessage("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    if (data) {
      navigate("/dashboard");
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
              <CardTitle>Log in</CardTitle>
              <CardDescription>Continue to Vouche</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </div>
                  {message && <span className="text-[#FF4D4F]">{message}</span>}
                  <div>
                    <Button className="w-full" onClick={handleSubmit}>
                      {loading ? (
                        <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                      ) : (
                        "Continue"
                      )}
                    </Button>
                  </div>
                </div>
              </form>

              <div className="relative my-6 flex items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-sm text-muted-foreground">or</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={async () => {
                    await supabase.auth.signInWithOAuth({
                      provider: "google",
                      options: {
                        redirectTo: redirectGoogleOAuth,
                      },
                    });
                  }}
                >
                  <span className="h-full">
                    <img src={googleSvg} alt="" className="h-full" />
                  </span>
                  Sign in with Google
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full flex flex-col items-center">
                <Button variant={"link"} className="text-muted-foreground">
                  <ForgotPassword defaultEmail={email} />
                </Button>

                <Link to="/register">
                  <Button variant={"link"} className="text-muted-foreground">
                    Don't have an account? Sign up
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      }
    />
  );
};

export default Login;
