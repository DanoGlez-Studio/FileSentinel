import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const messagesDir = path.join(projectRoot, "src", "i18n", "messages");
const outputFile = path.join(projectRoot, "src", "i18n", "generated-locales.ts");

const fallbackLocales = ["es", "en"];
const fileLocales = fs.existsSync(messagesDir)
  ? fs
      .readdirSync(messagesDir)
      .filter((file) => file.endsWith(".json"))
      .map((file) => file.replace(/\.json$/, ""))
  : [];

const locales = Array.from(new Set([...fallbackLocales, ...fileLocales]));
const defaultLocale = locales.includes("es") ? "es" : locales[0] ?? "en";

const labels = Object.fromEntries(
  locales.map((locale) => [locale, locale.toUpperCase()])
);

const fileContent = `export const locales = ${JSON.stringify(locales)} as const;\nexport type AppLocale = (typeof locales)[number];\n\nexport const defaultLocale: AppLocale = ${JSON.stringify(defaultLocale)};\n\nexport const localeLabels: Record<AppLocale, string> = ${JSON.stringify(labels, null, 2)};\n`;

fs.writeFileSync(outputFile, fileContent);
console.log(`Generated locales file: ${path.relative(projectRoot, outputFile)}`);
