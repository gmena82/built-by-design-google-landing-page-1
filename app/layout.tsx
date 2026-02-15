import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { CookieConsentBanner } from "@/components/cookie-consent-banner";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Built By Design KC | Free Remodeling Consultation",
  description:
    "Award-winning custom kitchen, bath, and basement remodeling for Johnson County homeowners.",
};

const gtmId = process.env.NEXT_PUBLIC_GTM_ID ?? "";
const hasGtm = Boolean(gtmId);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="consent-mode-defaults"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = window.gtag || gtag;
              gtag('consent', 'default', {
                ad_storage: 'denied',
                analytics_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                functionality_storage: 'denied',
                personalization_storage: 'denied',
                security_storage: 'granted'
              });
            `,
          }}
        />
        {hasGtm ? (
          <Script
            id="gtm-loader"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${gtmId}');
              `,
            }}
          />
        ) : null}
      </head>
      <body className={`${montserrat.variable} ${playfair.variable} antialiased`}>
        {hasGtm ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="gtm"
            />
          </noscript>
        ) : null}
        {children}
        <CookieConsentBanner />
      </body>
    </html>
  );
}
