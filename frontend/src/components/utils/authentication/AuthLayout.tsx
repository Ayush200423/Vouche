import VoucheLogo from "../../../assets/smallLogo.png";
import Sample from "../../../assets/new-design-3.png";

type AuthLayoutProps = {
  FormComponent: React.ComponentType;
};

export default function AuthLayout({ FormComponent }: AuthLayoutProps) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <div className="flex items-center gap-2 font-medium">
            <a className="h-5" href="/">
              <img
                src={VoucheLogo}
                alt=""
                className="h-full"
                draggable="false"
              />
            </a>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <FormComponent />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src={Sample}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale opacity-90"
        />
      </div>
    </div>
  );
}
