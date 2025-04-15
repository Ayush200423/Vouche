import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { Gift, MessageSquare, Star } from "lucide-react";

type RewardType = "message" | "giftCard" | "custom";

interface CampaignConfigData {
  name: string;
  description: string;
  referrerRewardType: RewardType;
  referrerRewardValue: string;
  referredRewardType: RewardType;
  referredRewardValue: string;
}

export function CampaignConfig() {
  const [config, setConfig] = useState<CampaignConfigData>({
    name: "",
    description: "",
    referrerRewardType: "message",
    referrerRewardValue: "",
    referredRewardType: "message",
    referredRewardValue: "",
  });

  const handleRewardTypeChange = (value: RewardType, isReferrer: boolean) => {
    setConfig((prev) => ({
      ...prev,
      [isReferrer ? "referrerRewardType" : "referredRewardType"]: value,
      [isReferrer ? "referrerRewardValue" : "referredRewardValue"]: "",
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save campaign configuration
    toast({
      title: "Success",
      description: "Campaign configuration saved!",
    });
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-2xl p-2 sm:p-4 md:p-6">
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-lg sm:text-xl font-medium">
              Your Referral Campaign
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Reward your clients for their loyalty and leads.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 sm:space-y-6">
              {/* Campaign Details */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-sm sm:text-base font-medium">
                  Campaign Details
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Campaign Name</Label>
                    <Input
                      id="name"
                      value={config.name}
                      onChange={(e) =>
                        setConfig((prev) => ({ ...prev, name: e.target.value }))
                      }
                      placeholder="Enter campaign name"
                      required
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={config.description}
                      onChange={(e) =>
                        setConfig((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Describe your referral campaign"
                      required
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Referrer Reward */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-sm sm:text-base font-medium">
                  Referrer Reward
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <RadioGroup
                    value={config.referrerRewardType}
                    onValueChange={(value: RewardType) =>
                      handleRewardTypeChange(value, true)
                    }
                    className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4"
                  >
                    <div>
                      <RadioGroupItem
                        value="message"
                        id="referrer-message"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="referrer-message"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                      >
                        <MessageSquare className="h-5 w-5 mb-2" />
                        <span className="text-sm">Thank You Message</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="giftCard"
                        id="referrer-giftcard"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="referrer-giftcard"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                      >
                        <Gift className="h-5 w-5 mb-2" />
                        <span className="text-sm">Gift Card</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="custom"
                        id="referrer-custom"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="referrer-custom"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                      >
                        <Star className="h-5 w-5 mb-2" />
                        <span className="text-sm">Custom Reward</span>
                      </Label>
                    </div>
                  </RadioGroup>

                  <div className="space-y-2">
                    {config.referrerRewardType === "message" && (
                      <>
                        <Label htmlFor="referrer-message">
                          Thank You Message
                        </Label>
                        <Textarea
                          id="referrer-message"
                          value={config.referrerRewardValue}
                          onChange={(e) =>
                            setConfig((prev) => ({
                              ...prev,
                              referrerRewardValue: e.target.value,
                            }))
                          }
                          placeholder="Enter your thank you message"
                          required
                        />
                      </>
                    )}
                    {config.referrerRewardType === "giftCard" && (
                      <>
                        <Label htmlFor="referrer-giftcard">
                          Gift Card Amount
                        </Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            $
                          </span>
                          <Input
                            id="referrer-giftcard"
                            type="number"
                            value={config.referrerRewardValue}
                            onChange={(e) =>
                              setConfig((prev) => ({
                                ...prev,
                                referrerRewardValue: e.target.value,
                              }))
                            }
                            placeholder="Enter amount"
                            className="pl-8"
                            required
                          />
                        </div>
                      </>
                    )}
                    {config.referrerRewardType === "custom" && (
                      <>
                        <Label htmlFor="referrer-custom">Custom Reward</Label>
                        <Input
                          id="referrer-custom"
                          value={config.referrerRewardValue}
                          onChange={(e) =>
                            setConfig((prev) => ({
                              ...prev,
                              referrerRewardValue: e.target.value,
                            }))
                          }
                          placeholder="Enter custom reward"
                          required
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Referred Reward */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-sm sm:text-base font-medium">
                  Referred Reward
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <RadioGroup
                    value={config.referredRewardType}
                    onValueChange={(value: RewardType) =>
                      handleRewardTypeChange(value, false)
                    }
                    className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4"
                  >
                    <div>
                      <RadioGroupItem
                        value="message"
                        id="referred-message"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="referred-message"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                      >
                        <MessageSquare className="h-5 w-5 mb-2" />
                        <span className="text-sm">Thank You Message</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="giftCard"
                        id="referred-giftcard"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="referred-giftcard"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                      >
                        <Gift className="h-5 w-5 mb-2" />
                        <span className="text-sm">Gift Card</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="custom"
                        id="referred-custom"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="referred-custom"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                      >
                        <Star className="h-5 w-5 mb-2" />
                        <span className="text-sm">Custom Reward</span>
                      </Label>
                    </div>
                  </RadioGroup>

                  <div className="space-y-2">
                    {config.referredRewardType === "message" && (
                      <>
                        <Label htmlFor="referred-message">
                          Thank You Message
                        </Label>
                        <Textarea
                          id="referred-message"
                          value={config.referredRewardValue}
                          onChange={(e) =>
                            setConfig((prev) => ({
                              ...prev,
                              referredRewardValue: e.target.value,
                            }))
                          }
                          placeholder="Enter your thank you message"
                          required
                        />
                      </>
                    )}
                    {config.referredRewardType === "giftCard" && (
                      <>
                        <Label htmlFor="referred-giftcard">
                          Gift Card Amount
                        </Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            $
                          </span>
                          <Input
                            id="referred-giftcard"
                            type="number"
                            value={config.referredRewardValue}
                            onChange={(e) =>
                              setConfig((prev) => ({
                                ...prev,
                                referredRewardValue: e.target.value,
                              }))
                            }
                            placeholder="Enter amount"
                            className="pl-8"
                            required
                          />
                        </div>
                      </>
                    )}
                    {config.referredRewardType === "custom" && (
                      <>
                        <Label htmlFor="referred-custom">Custom Reward</Label>
                        <Input
                          id="referred-custom"
                          value={config.referredRewardValue}
                          onChange={(e) =>
                            setConfig((prev) => ({
                              ...prev,
                              referredRewardValue: e.target.value,
                            }))
                          }
                          placeholder="Enter custom reward"
                          required
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" className="w-full sm:w-auto">
                Modify Campaign
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
