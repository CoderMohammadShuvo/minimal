import { getRequestConfig } from "next-intl/server";

export const locales = ["en", "bn"] as const;
export const defaultLocale = "en";

export default getRequestConfig(async ({ locale }) => {
  if (!locale) {
    // 👇 important: always return something
    return {
      locale: defaultLocale,
      messages: (await import(`./messages/${defaultLocale}.json`)).default
    };
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});