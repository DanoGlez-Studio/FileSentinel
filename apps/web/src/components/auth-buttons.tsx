import Link from "next/link";
import { auth } from "@/lib/auth";
import { AppLocale } from "@/i18n/routing";

type AuthButtonsProps = {
  locale: AppLocale;
  labels: {
    signIn: string;
    signOut: string;
  };
};

export async function AuthButtons({ locale, labels }: AuthButtonsProps) {
  const session = await auth();

  if (session?.user) {
    return (
      <Link
        className="rounded-full bg-brand-700 px-4 py-2 text-xs font-semibold text-white"
        href={`/api/auth/signout?callbackUrl=/${locale}`}
      >
        {labels.signOut}
      </Link>
    );
  }

  return (
    <Link className="rounded-full bg-brand-700 px-4 py-2 text-xs font-semibold text-white" href={`/${locale}/sign-in`}>
      {labels.signIn}
    </Link>
  );
}
