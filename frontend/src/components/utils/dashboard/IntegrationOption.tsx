import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

interface IntegrationOptionProps {
  logo: string;
  title: string;
  description: string;
}

export default function IntegrationOption({
  logo,
  title,
  description,
}: IntegrationOptionProps) {
  return (
    <Card className="w-[350px]">
      <div className="flex flex-col items-start justify-center w-full h-full space-y-2.5 p-[25px]">
        <div className="flex justify-between w-full">
          <img
            src={logo}
            className="h-9 mb-1"
            alt="Google Calendar"
            draggable="false"
          />
          <div>
            <Switch />
          </div>
        </div>
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-[#77808e]">{description}</div>
      </div>
    </Card>
  );
}
