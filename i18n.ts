import { getRequestConfig, setRequestLocale } from "next-intl/server";

export const locales = ["en", "bn"] as const;
export const defaultLocale = "en";

export default getRequestConfig(async ({ request } : any) => {
  // Determine locale from the request headers
  const localeHeader = request.headers.get("accept-language")?.split(",")[0];
  const locale = locales.includes(localeHeader as any) ? localeHeader : defaultLocale;

  // Set the locale for the current request (required for static rendering)
  setRequestLocale(locale);

  // Load the messages for the selected locale
  const messages = (await import(`./messages/${locale}.json`)).default;

  return {
    locale,
    messages
  };
});
