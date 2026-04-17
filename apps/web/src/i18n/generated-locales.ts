export const locales = ["es","en","ar","de","fr","hi","pl","zh"] as const;
export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = "es";

export const localeLabels: Record<AppLocale, string> = {
  "es": "ES",
  "en": "EN",
  "ar": "AR",
  "de": "DE",
  "fr": "FR",
  "hi": "HI",
  "pl": "PL",
  "zh": "ZH"
};
