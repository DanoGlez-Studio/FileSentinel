"use client";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl items-center p-6 md:p-10">
      <section className="w-full rounded-3xl border border-brand-200 bg-white/85 p-8 shadow-xl backdrop-blur-sm md:p-10">
        <p className="inline-flex rounded-full border border-brand-300 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800">
          Error inesperado
        </p>
        <h1 className="mt-4 text-3xl font-bold text-brand-900 md:text-4xl">Algo salio mal</h1>
        <p className="mt-3 text-sm leading-relaxed text-brand-800 md:text-base">
          Ocurrio un problema interno. Puedes reintentar la accion o recargar la pagina.
        </p>
        {error?.digest ? <p className="mt-3 text-xs text-brand-700">Ref: {error.digest}</p> : null}

        <button
          className="mt-6 rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-800"
          onClick={reset}
          type="button"
        >
          Reintentar
        </button>
      </section>
    </main>
  );
}
