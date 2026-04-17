import Link from "next/link";
import { defaultLocale } from "@/i18n/routing";

type AuthErrorPageProps = {
  searchParams: Promise<{ error?: string }>;
};

const errorMessages: Record<string, string> = {
  Configuration: "Hay un problema de configuracion de autenticacion.",
  AccessDenied: "No tienes permisos para completar el inicio de sesion.",
  Verification: "No se pudo verificar la solicitud de autenticacion.",
  Default: "No se pudo completar el inicio de sesion."
};

export default async function AuthErrorPage({ searchParams }: AuthErrorPageProps) {
  const params = await searchParams;
  const errorCode = params.error ?? "Default";
  const message = errorMessages[errorCode] ?? errorMessages.Default;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl items-center p-6 md:p-10">
      <section className="w-full rounded-3xl border border-brand-200 bg-white/85 p-8 shadow-xl backdrop-blur-sm md:p-10">
        <p className="inline-flex rounded-full border border-brand-300 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800">
          Error de autenticacion
        </p>
        <h1 className="mt-4 text-3xl font-bold text-brand-900 md:text-4xl">
          No pudimos iniciar sesion
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-brand-800 md:text-base">{message}</p>

        <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50/60 p-4 text-xs text-brand-800">
          Codigo: {errorCode}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-800"
            href={`/${defaultLocale}/sign-in`}
          >
            Volver a intentar
          </Link>
          <Link
            className="rounded-lg border border-brand-300 bg-white px-4 py-2 text-sm font-semibold text-brand-900 transition hover:bg-brand-50"
            href={`/${defaultLocale}`}
          >
            Ir al inicio
          </Link>
        </div>
      </section>
    </main>
  );
}
