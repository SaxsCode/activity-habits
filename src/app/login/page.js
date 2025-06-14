"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to home if already logged in
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h1>Sign in</h1>
      <button
        style={{
          padding: "0.75rem 2rem",
          fontSize: "1.1rem",
          borderRadius: "5px",
          border: "none",
          background: "#4285F4",
          color: "white",
          cursor: "pointer",
        }}
        onClick={() => signIn("GitHub")}
      >
        Sign in with Google
      </button>
    </div>
  );
}
