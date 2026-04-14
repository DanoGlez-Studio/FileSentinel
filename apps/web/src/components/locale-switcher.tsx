import Link from "next/link";
import { AppLocale } from "@/i18n/routing";

type LocaleSwitcherProps = {
  currentLocale: AppLocale;
};

const labels: Record<AppLocale, string> = {
  es: "ES",
  en: "EN"
};

export function LocaleSwitcher({ currentLocale }: LocaleSwitcherProps) {
  const nextLocale: AppLocale = currentLocale === "es" ? "en" : "es";

  return (
    <Link
      className="rounded-full border border-brand-300 bg-white/80 px-3 py-1 text-xs font-semibold text-brand-900"
      href={`/${nextLocale}`}
    >
      {labels[nextLocale]}
    </Link>
  );
}
