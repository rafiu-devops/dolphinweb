import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TopBar } from "@/components/shared/TopBar";
import { Navbar } from "@/components/shared/Navbar";
import { StickyHeader } from "@/components/shared/StickyHeader";
import { Footer } from "@/components/shared/Footer";
import { FloatingContact } from "@/components/ui/FloatingContact";
import { getContactInfo } from "@/lib/data";
import StyledJsxRegistry from "@/lib/registry";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Dolphin Builders & Developer's",
  description: "Elite residential and commercial deployments. Authorized tactical real estate innovation and premium sector leadership.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contact = await getContactInfo();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <StyledJsxRegistry>
          <div className="flex min-h-screen flex-col">
            <StickyHeader>
              <div className="pointer-events-auto">
                <TopBar
                  phone={contact.phone}
                  email={contact.email}
                  address={contact.address}
                  social={contact.social}
                />
              </div>
              <div className="relative pointer-events-auto">
                <Navbar />
              </div>
            </StickyHeader>
            <main className="flex-grow">{children}</main>
            <Footer />
            <FloatingContact whatsapp={contact.social.whatsapp} phone={contact.phone} />
          </div>
        </StyledJsxRegistry>
      </body>
    </html>
  );
}
