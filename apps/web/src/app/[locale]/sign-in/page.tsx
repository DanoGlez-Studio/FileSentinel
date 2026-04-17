import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AppLocale } from "@/i18n/routing";

type SignInPageProps = {
  params: Promise<{ locale: AppLocale }>;
};

export default async function SignInPage({ params }: SignInPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-5xl items-center p-6 md:p-10">
      <div className="absolute left-4 top-4 md:left-10 md:top-10">
        <Link
          className="rounded-full border border-brand-300/80 bg-white/80 px-4 py-2 text-xs font-semibold text-brand-800 backdrop-blur-sm transition hover:border-brand-500 hover:text-brand-900"
          href={`/${locale}`}
        >
          {t("signInPage.back")}
        </Link>
      </div>

      <section className="grid w-full gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <article className="relative overflow-hidden rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-100 via-white to-brand-50 p-7 shadow-lg md:p-10">
          <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-brand-200/70 blur-2xl" />
          <div className="absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-brand-300/50 blur-3xl" />

          <div className="relative z-10">
            <p className="inline-block rounded-full border border-brand-300 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-800">
              {t("signInPage.badge")}
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-brand-900 md:text-4xl">
              {t("signInPage.title")}
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-brand-800 md:text-base">
              {t("signInPage.subtitle")}
            </p>

            <div className="mt-7 grid gap-2 text-sm text-brand-900">
              <p className="rounded-lg border border-brand-200/90 bg-white/65 px-3 py-2">
                {t("signInPage.benefitOne")}
              </p>
              <p className="rounded-lg border border-brand-200/90 bg-white/65 px-3 py-2">
                {t("signInPage.benefitTwo")}
              </p>
              <p className="rounded-lg border border-brand-200/90 bg-white/65 px-3 py-2">
                {t("signInPage.benefitThree")}
              </p>
            </div>
          </div>
        </article>

        <article className="rounded-3xl border border-brand-200 bg-white/90 p-6 shadow-xl backdrop-blur-sm md:p-8">
          <h2 className="text-lg font-semibold text-brand-900">{t("signInPage.chooseProvider")}</h2>
          <p className="mt-1 text-sm text-brand-700">{t("signInPage.chooseProviderHint")}</p>

          <div className="mt-5 grid gap-3">
            <Link
              className="group flex items-center justify-between rounded-xl border border-brand-300 bg-white px-4 py-3 text-sm font-semibold text-brand-900 transition hover:border-brand-500 hover:bg-brand-50"
              href={`/api/auth/signin/discord?callbackUrl=/${locale}`}
            >
              <span className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-800">
                  D
                </span>
                {t("signInPage.discord")}
              </span>
              <span
                className="text-brand-500 transition group-hover:text-brand-800"
                aria-hidden="true"
              >
                &rarr;
              </span>
            </Link>
            <Link
              className="group flex items-center justify-between rounded-xl border border-brand-300 bg-white px-4 py-3 text-sm font-semibold text-brand-900 transition hover:border-brand-500 hover:bg-brand-50"
              href={`/api/auth/signin/google?callbackUrl=/${locale}`}
            >
              <span className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-800">
                  G
                </span>
                {t("signInPage.google")}
              </span>
              <span
                className="text-brand-500 transition group-hover:text-brand-800"
                aria-hidden="true"
              >
                &rarr;
              </span>
            </Link>
            <Link
              className="group flex items-center justify-between rounded-xl border border-brand-300 bg-white px-4 py-3 text-sm font-semibold text-brand-900 transition hover:border-brand-500 hover:bg-brand-50"
              href={`/api/auth/signin/microsoft-entra-id?callbackUrl=/${locale}`}
            >
              <span className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-800">
                  M
                </span>
                {t("signInPage.microsoft")}
              </span>
              <span
                className="text-brand-500 transition group-hover:text-brand-800"
                aria-hidden="true"
              >
                &rarr;
              </span>
            </Link>
          </div>

          <p className="mt-5 text-xs text-brand-700">{t("signInPage.footer")}</p>
        </article>
      </section>
    </main>
  );
}
