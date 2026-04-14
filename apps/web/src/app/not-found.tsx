import Link from "next/link";
import { defaultLocale } from "@/i18n/routing";

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl items-center p-6 md:p-10">
      <section className="w-full rounded-3xl border border-brand-200 bg-white/85 p-8 shadow-xl backdrop-blur-sm md:p-10">
        <p className="inline-flex rounded-full border border-brand-300 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800">
          Error 404
        </p>
        <h1 className="mt-4 text-3xl font-bold text-brand-900 md:text-4xl">Pagina no encontrada</h1>
        <p className="mt-3 text-sm leading-relaxed text-brand-800 md:text-base">
          La ruta que intentaste abrir no existe o fue movida.
        </p>

        <div className="mt-6">
          <Link
            className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-800"
            href={`/${defaultLocale}`}
          >
            Volver al inicio
          </Link>
        </div>
      </section>
    </main>
  );
}
