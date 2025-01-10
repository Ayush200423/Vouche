import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import googleSvg from "../../../assets/googleSVG.png";
import { Link, useNavigate } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import { useState } from "react";
import supabase from "@/helpers/SupabaseAuth";
import { Loader2 } from "lucide-react";

const redirectGoogleOAuth = `${import.meta.env.VITE_SITE_URL}/dashboard`;

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
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
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Sign in</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Continue to Vouche
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <a
              className="cursor-pointer text-muted-foreground text-sm"
              onClick={(e) => e.preventDefault()}
            >
              <ForgotPassword defaultEmail={email} />
            </a>
          </div>
          <Input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        {message && <span className="text-[#FF4D4F] text-sm">{message}</span>}
        <Button className="w-full" onClick={handleSubmit}>
          {loading ? (
            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
          ) : (
            "Continue"
          )}
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={async (e) => {
            e.preventDefault();
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
          Login with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
}
