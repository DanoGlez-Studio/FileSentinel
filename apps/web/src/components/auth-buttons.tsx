import Link from "next/link";
import { auth } from "@/lib/auth";

type AuthButtonsProps = {
  labels: {
    signIn: string;
    signOut: string;
  };
};

export async function AuthButtons({ labels }: AuthButtonsProps) {
  const session = await auth();

  if (session?.user) {
    return (
      <Link className="rounded-full bg-brand-700 px-4 py-2 text-xs font-semibold text-white" href="/api/auth/signout">
        {labels.signOut}
      </Link>
    );
  }

  return (
    <Link className="rounded-full bg-brand-700 px-4 py-2 text-xs font-semibold text-white" href="/api/auth/signin">
      {labels.signIn}
    </Link>
  );
}
