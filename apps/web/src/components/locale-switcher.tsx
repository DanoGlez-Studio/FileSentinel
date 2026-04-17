import Link from "next/link";
import { AppLocale, localeLabels, locales } from "@/i18n/routing";

type LocaleSwitcherProps = {
  currentLocale: AppLocale;
};

export function LocaleSwitcher({ currentLocale }: LocaleSwitcherProps) {
  const currentIndex = locales.indexOf(currentLocale);
  const nextLocale: AppLocale = locales[(currentIndex + 1) % locales.length];

  return (
    <Link
      className="rounded-full border border-brand-300 bg-white/80 px-3 py-1 text-xs font-semibold text-brand-900"
      href={`/${nextLocale}`}
    >
      {localeLabels[nextLocale]}
    </Link>
  );
}
