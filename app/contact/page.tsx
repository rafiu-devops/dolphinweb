import { getContactInfo } from "@/lib/data";
import ContactClient from "@/components/sections/ContactClient";

export default async function Contact() {
  const contact = await getContactInfo();

  return <ContactClient contact={contact} />;
}
