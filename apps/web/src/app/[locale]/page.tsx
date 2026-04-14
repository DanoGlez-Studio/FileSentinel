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
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center justify-center gap-8 p-6 md:p-10">
      <header className="flex w-full max-w-3xl items-center justify-between gap-3">
        <LocaleSwitcher currentLocale={locale} />
        <AuthButtons locale={locale} labels={{ signIn: t("auth.signIn"), signOut: t("auth.signOut") }} />
      </header>

      <section className="w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-brand-900 md:text-5xl">{t("home.title")}</h1>
        <p className="mt-3 text-sm text-brand-800 md:text-base">{t("home.subtitle")}</p>
      </section>

      <div className="w-full max-w-3xl">
        <UploadCard
          labels={{
            uploadLabel: t("home.uploadLabel"),
            dropHint: t("home.dropHint"),
            dropActive: t("home.dropActive"),
            selectedFile: t("home.selectedFile"),
            submit: t("home.submit"),
            analyzing: t("home.analyzing"),
            noResult: t("home.noResult"),
            resultTitle: t("home.resultTitle"),
            error: t("home.error"),
            detectedType: t("home.detectedType"),
            mimeType: t("home.mimeType"),
            confidence: t("home.confidence"),
            confidenceLevel: t("home.confidenceLevel"),
            elapsedTime: t("home.elapsedTime"),
            score: t("home.score"),
            warnings: t("home.warnings"),
            technicalDetails: t("home.technicalDetails")
          }}
        />
      </div>
    </main>
  );
}
