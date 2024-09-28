import { Button } from "@/components/ui/button";
import { Button as EnhancedButton } from "@/components/ui/enhanced-button";
import {
  Credenza,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Copy, Facebook, Mail, QrCode, Twitter, Upload } from "lucide-react";

const socials = [
  {
    icon: Twitter,
    title: "Twitter",
    href: "",
  },
  {
    icon: Facebook,
    title: "Facebook",
    href: "",
  },
  {
    icon: Mail,
    title: "Email",
    href: "",
  },
  {
    icon: QrCode,
    title: "QR code",
    href: "",
  },
];

export default function SharePage({
  username,
  name,
}: {
  username: string;
  name: string;
}) {
  return (
    <Credenza>
      <CredenzaTrigger asChild className="absolute bottom-[-40px] right-6 z-40">
        <Button variant={"ghost"} size={"icon"}>
          <Upload className="text-muted-foreground" />
        </Button>
      </CredenzaTrigger>

      <CredenzaContent className="">
        <CredenzaHeader className="my-3">
          <CredenzaTitle className="text-center">
            Share {name} page
          </CredenzaTitle>
        </CredenzaHeader>
        <div className="grid grid-cols-2 gap-4">
          {socials.map((item, index) => (
            <Button variant={"outline"} key={index} className="py-6">
              {<item.icon className="mr-3 h-5 w-5" />} {item.title}
            </Button>
          ))}
        </div>
        <Separator className="mt-3" />
        <div className="flex-col flex gap-4">
          <p className="text-lg font-semibold text-center">Share page link</p>
          <div className="flex gap-1 items-center">
            <Input
              readOnly
              defaultValue={`stx-support.vercel.app/${username}`}
            />
            <EnhancedButton
              variant={"expandIcon"}
              Icon={Copy}
              iconPlacement="left"
              iconClassname="mr-3 h-4 w-4"
              className="md:min-w-[130px]"
            >
              Copy
            </EnhancedButton>
          </div>
        </div>
      </CredenzaContent>
    </Credenza>
  );
}
