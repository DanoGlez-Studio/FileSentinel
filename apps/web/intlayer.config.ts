import { syncJSON } from "@intlayer/sync-json-plugin";
import { Locales, type IntlayerConfig, type Locale } from "intlayer";
import fs from "node:fs";
import path from "node:path";

const messagesDir = path.join(process.cwd(), "src/i18n/messages");

const fileLocales = fs.existsSync(messagesDir)
  ? fs
      .readdirSync(messagesDir)
      .filter((file) => file.endsWith(".json"))
      .map((file) => file.replace(/\.json$/, ""))
  : [];

const envLocales = (process.env.INTLAYER_LOCALES ?? "")
  .split(/[\s,]+/)
  .map((locale) => locale.trim())
  .filter(Boolean);

const configuredLocales = Array.from(
  new Set([Locales.SPANISH, ...fileLocales, ...envLocales])
) as Locale[];
const configuredDefaultLocale = configuredLocales.includes(Locales.SPANISH)
  ? Locales.SPANISH
  : (configuredLocales[0] ?? Locales.SPANISH);

const config: IntlayerConfig = {
  internationalization: {
    locales: configuredLocales,
    defaultLocale: configuredDefaultLocale as Locale
  },
  routing: {
    mode: "prefix-all"
  },
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale }) => `./src/i18n/messages/${locale}.json`
    })
  ],
  ai: {
    provider: "gemini",
    model: process.env.INTLAYER_AI_MODEL ?? "gemini-2.0-flash",
    apiKey: process.env.GEMINI_API_KEY,
    applicationContext: [
      "Project: FileSentinel",
      "Keep a concise, technical tone for security and developer audiences.",
      "Do not translate proper nouns like FileSentinel, Magika, Next.js, FastAPI."
    ].join("\n")
  }
};

export default config;
