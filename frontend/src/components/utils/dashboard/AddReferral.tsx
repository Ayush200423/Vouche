import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import supabase from "../../../helpers/SupabaseAuth";

export function AddReferral() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [referrerEmail, setReferrerEmail] = useState("");
  const [referredEmail, setReferredEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error("No session found");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/referrals/create/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            referrer_email: referrerEmail,
            referred_email: referredEmail,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create referral");
      }

      if (result.status === "error") {
        throw new Error(result.message);
      }

      toast({
        title: "Success",
        description: "Referral created successfully",
      });
      setOpen(false);
      setReferrerEmail("");
      setReferredEmail("");
      window.location.reload();
    } catch (error) {
      console.error("Error creating referral:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to create referral",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Referral</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Referral</DialogTitle>
          <DialogDescription>
            Enter the email addresses of both the referrer and the referred
            person.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="referrer">Referrer Email</Label>
            <Input
              id="referrer"
              type="email"
              value={referrerEmail}
              onChange={(e) => setReferrerEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="referred">Referred Email</Label>
            <Input
              id="referred"
              type="email"
              value={referredEmail}
              onChange={(e) => setReferredEmail(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            disabled={loading || !referrerEmail || !referredEmail}
          >
            {loading ? "Creating..." : "Create Referral"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
