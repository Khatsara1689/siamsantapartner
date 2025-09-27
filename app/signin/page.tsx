// app/signin/page.tsx
"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="min-h-dvh flex items-center justify-center p-6">
      <div className="w-full max-w-sm border rounded-2xl p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">Sign in</h1>
        <input
          className="w-full rounded-lg border p-3"
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="w-full rounded-lg border p-3"
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          className="w-full rounded-lg p-3 font-medium bg-black text-white"
          onClick={() => signIn("credentials", { email, password, callbackUrl: "/" })}
        >
          Continue
        </button>
      </div>
    </main>
  );
}
