"use client";

import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { asset } from "@/lib/basePath";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      if (mode === "login") {
        const result = await signIn(email, password);
        if (result.error) {
          setError(result.error);
          return;
        }
      } else {
        if (!username.trim()) {
          setError("Username is required.");
          return;
        }
        const result = await signUp(email, password, username.trim());
        if (result.error) {
          setError(result.error);
          return;
        }
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        onSuccess?.();
      }, 800);
    } finally {
      setSubmitting(false);
    }
  }

  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 z-[100] flex items-end justify-center overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-md bg-white rounded-t-3xl p-6 pb-12 animate-slide-up max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <img src={asset("/images/nav/muselogosmall.png")} alt="MUSE" className="h-8" />
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <h2 className="text-xl font-extrabold text-gray-900">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h2>
        <p className="text-sm text-gray-500 mt-1 mb-5">
          {mode === "login"
            ? "Sign in to vote, predict, and pre-order."
            : "Join MUSE to start predicting trends."}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {mode === "signup" && (
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-4 py-3 rounded-xl border border-[#E6C7BF] bg-white outline-none text-sm placeholder:text-gray-400 focus:border-[#9A6C62] focus:ring-1 focus:ring-[#9A6C62] transition"
              autoComplete="username"
            />
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-4 py-3 rounded-xl border border-[#E6C7BF] bg-white outline-none text-sm placeholder:text-gray-400 focus:border-[#9A6C62] focus:ring-1 focus:ring-[#9A6C62] transition"
            autoComplete="email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            minLength={6}
            className="w-full px-4 py-3 rounded-xl border border-[#E6C7BF] bg-white outline-none text-sm placeholder:text-gray-400 focus:border-[#9A6C62] focus:ring-1 focus:ring-[#9A6C62] transition"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
          />

          {error && (
            <p className="text-xs text-red-500 bg-red-50 rounded-lg px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3.5 rounded-full text-sm font-bold transition-all mt-1 ${
              success
                ? "bg-green-500 text-white"
                : "bg-[#9A6C62] text-white hover:bg-[#85574E] active:scale-[0.98]"
            } disabled:opacity-60`}
          >
            {success
              ? "✓ Success!"
              : submitting
                ? "Please wait…"
                : mode === "login"
                  ? "Sign In"
                  : "Create Account"}
          </button>
        </form>

        {/* Toggle */}
        <p className="text-center text-sm text-gray-500 mt-5">
          {mode === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                onClick={() => { setMode("signup"); setError(null); }}
                className="font-semibold text-[#9A6C62] underline"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => { setMode("login"); setError(null); }}
                className="font-semibold text-[#9A6C62] underline"
              >
                Sign In
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
