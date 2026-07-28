'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Shield } from 'lucide-react';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log('Sign up:', { fullName, email, password });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    console.log('Google sign up');
  };

  const passwordStrength = password.length >= 8;

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
                Start unlocking <br />
                customer insights <br />
                <span className="text-blue-600">today.</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-xl">
                Create your account and start turning feedback into actionable insights with LOOP.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-500 text-sm uppercase tracking-[0.2em]">Themes overview</span>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">24 total</span>
              </div>
              <p className="mt-5 text-sm text-slate-600">Create and monitor the quality of feedback across your product.</p>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-4">AI Insights</h3>
              <p className="text-sm text-slate-600">Amazing advanced super fast delivery!</p>
              <p className="mt-2 text-xs text-green-600">Active</p>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-4">Recent Feedback</h3>
              <p className="text-sm text-slate-600">My order was delayed and I didn't get updates.</p>
              <p className="mt-2 text-xs text-red-600">Negative</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Shield className="w-4 h-4" />
            Enterprise Grade Security
          </div>
        </div>

        <div className="w-full lg:w-1/2 px-6 py-10 sm:px-10 sm:py-12 bg-white">
          <div className="mx-auto w-full max-w-md space-y-8">
            <div className="lg:hidden flex items-center gap-3 rounded-3xl bg-slate-50 p-4 shadow-sm">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-semibold">L</div>
              <span className="text-lg font-semibold text-slate-900">LOOP</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-slate-900">Create your account</h2>
              <p className="text-slate-600">Join LOOP and transform feedback into growth.</p>
            </div>

            <button
              onClick={handleGoogleSignUp}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <span className="inline-flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-slate-100 text-blue-600">G</span>
                Sign up with Google
              </span>
            </button>

            <div className="flex items-center gap-3 text-sm text-slate-500">
              <div className="h-px flex-1 bg-slate-300" />
              <span>or</span>
              <div className="h-px flex-1 bg-slate-300" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Full name</label>
                <input
                  type="text"
                  placeholder="Laurence Dike"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Work email</label>
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
                <label className="block text-sm font-medium text-slate-700">Password</label>
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
                <p className="text-xs text-slate-500">Password must be at least 8 characters</p>
              </div>

              <button
                type="submit"
                disabled={isLoading || !passwordStrength}
                className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            <p className="text-center text-sm text-slate-500">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-blue-600 hover:text-blue-700">
                Sign in
              </Link>
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700 shadow-sm">
                <p className="font-semibold text-slate-900">Enterprise Grade Security</p>
                <p className="mt-2 text-slate-600">Protected by NextAuth.js industry-standard security.</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700 shadow-sm">
                <p className="font-semibold text-slate-900">AI-Powered Insights</p>
                <p className="mt-2 text-slate-600">Leverage customer signals and sentiment analytics.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
