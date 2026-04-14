import { getTranslations, setRequestLocale } from "next-intl/server";
import { AppLocale } from "@/i18n/routing";
import { UploadCard } from "@/components/upload-card";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { AuthButtons } from "@/components/auth-buttons";

type HomePageProps = {
  params: Promise<{ locale: AppLocale }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-8 p-6 md:p-10">
      <header className="flex items-center justify-between">
        <LocaleSwitcher currentLocale={locale} />
        <AuthButtons labels={{ signIn: t("auth.signIn"), signOut: t("auth.signOut") }} />
      </header>

      <section>
        <h1 className="text-3xl font-bold text-brand-900 md:text-5xl">{t("home.title")}</h1>
        <p className="mt-3 max-w-2xl text-sm text-brand-800 md:text-base">{t("home.subtitle")}</p>
      </section>

      <UploadCard
        labels={{
          uploadLabel: t("home.uploadLabel"),
          submit: t("home.submit"),
          analyzing: t("home.analyzing"),
          noResult: t("home.noResult"),
          resultTitle: t("home.resultTitle"),
          error: t("home.error")
        }}
      />
    </main>
  );
}
