'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log('Sign in:', { email, password, rememberMe });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    console.log('Google sign in');
  };

  return (
    <div className="relative min-h-screen bg-slate-100 py-10 sm:py-14">
      <div className="relative mx-auto flex w-full max-w-7xl flex-col overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white/95 shadow-2xl backdrop-blur-xl lg:flex-row">
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 p-12">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/10">
                <span className="text-white font-semibold text-lg">L</span>
              </div>
              <span className="text-2xl font-semibold text-slate-900">LOOP</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-slate-900 leading-tight">
                Understand customers.
                <br />
                <span className="text-blue-600">Drive growth.</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-xl">
                LOOP helps teams collect feedback, uncover insights, and make data-driven decisions.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-semibold text-slate-900">153</p>
                  <p className="text-xs text-slate-500 mt-1">Feedback Today</p>
                </div>
                <div className="border-l border-r border-slate-200 px-4">
                  <p className="text-2xl font-semibold text-slate-900">73%</p>
                  <p className="text-xs text-slate-500 mt-1">Positive sentiment</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-slate-900">17%</p>
                  <p className="text-xs text-slate-500 mt-1">Trend increasing</p>
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-500 text-sm uppercase tracking-[0.2em]">AI Powered</span>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">Insights</span>
              </div>
              <div className="mt-5 space-y-3 text-sm text-slate-600">
                <p>Trusted feedback and predictive recommendations.</p>
                <p>Secure enterprise workflows with clear analytics.</p>
              </div>
            </div>
          </div>

          <div className="text-sm text-slate-600">
            Secure by NextAuth.js industry-standard security.
          </div>
        </div>

        <div className="w-full lg:w-1/2 px-6 py-10 sm:px-10 sm:py-12 bg-white">
          <div className="mx-auto w-full max-w-md space-y-8">
            <div className="lg:hidden flex items-center gap-3 rounded-3xl bg-slate-50 p-4 shadow-sm">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-semibold">L</div>
              <span className="text-lg font-semibold text-slate-900">LOOP</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-slate-900">Welcome back</h2>
              <p className="text-slate-600">Sign in to your LOOP account and continue building customer-first experiences.</p>
            </div>

            <button
              onClick={handleGoogleSignIn}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <span className="inline-flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-slate-100 text-blue-600">G</span>
                Continue with Google
              </span>
            </button>

            <div className="flex items-center gap-3 text-sm text-slate-500">
              <div className="h-px flex-1 bg-slate-300" />
              <span>or</span>
              <div className="h-px flex-1 bg-slate-300" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Email address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm font-medium text-slate-700">
                  <span>Password</span>
                  <Link href="/forgot-password" className="text-blue-600 hover:text-blue-700">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 pr-10 text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-600">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="text-center text-sm text-slate-500">
              Don't have an account?{' '}
              <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-700">
                Sign up
              </Link>
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700 shadow-sm">
                <p className="font-semibold text-slate-900">Secure authentication</p>
                <p className="mt-2 text-slate-600">Protected by NextAuth.js industry-standard security.</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700 shadow-sm">
                <p className="font-semibold text-slate-900">AI-powered insights</p>
                <p className="mt-2 text-slate-600">Leverage customer signals and sentiment analytics.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
