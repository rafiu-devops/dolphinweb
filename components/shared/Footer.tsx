import { getContactInfo } from "@/lib/data";
import { FooterClient } from "./FooterClient";

export async function Footer() {
  const contact = await getContactInfo();
  return <FooterClient contact={contact} />;
}
