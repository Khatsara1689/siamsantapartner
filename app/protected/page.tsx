// app/protected/page.tsx
import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function ProtectedPage() {
  const session = await auth();
  if (!session?.user) {
    return (
      <div className="min-h-dvh grid place-items-center">
        <div className="text-center space-y-3">
          <p className="text-lg">Please sign in to continue.</p>
          <Link className="underline" href="/signin">Go to Sign in</Link>
        </div>
      </div>
    );
  }
  return (
    <main className="min-h-dvh grid place-items-center">
      <h1 className="text-2xl font-bold">Hello {session.user.name ?? "Member"} 👋</h1>
    </main>
  );
}
