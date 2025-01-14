import PageLayout from "@/components/utils/dashboard/PageLayout";
import IntegrationOption from "@/components/utils/dashboard/IntegrationOption";
import GoogleCalendar from "../../assets/google-calendar.png";
import Hubspot from "../../assets/hubspot.webp";
import Calendly from "../../assets/calendly.svg";

const Integrations = () => {
  return (
    <div className="space-y-9">
      <PageLayout
        title="Integrations"
        description="Connect Vouche into your current workflow."
      />

      <div className="mx-4">
        <div className="text-base font-medium mb-3 text-[#1a8be4]">
          Calendars
        </div>

        <div className="flex flex-wrap gap-4">
          <IntegrationOption
            logo={GoogleCalendar}
            title="Google Calendar"
            description="Track referrals directly from Google Calendar."
          />

          <IntegrationOption
            logo={Calendly}
            title="Calendly"
            description="Track referrals directly from Calendly."
          />
        </div>
      </div>

      <div className="mx-4">
        <div className="text-base font-medium mb-3 text-[#1a8be4]">
          CRM tools
        </div>

        <div className="flex flex-wrap gap-4">
          <IntegrationOption
            logo={Hubspot}
            title="Hubspot"
            description="Instantly connect your ."
          />
        </div>
      </div>
    </div>
  );
};

export default Integrations;
