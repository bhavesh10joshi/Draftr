'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Pencil, ArrowRight, Eye, EyeOff, Loader2, Check } from 'lucide-react';
import { BACKEND_URL } from '../config';
import axios from 'axios';

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

   try
    {
        const payload = formData;
        const response = await axios.post(`${BACKEND_URL}/signUp` , payload);
        if(!response)
        {
            alert("Problem Encountered : " + response);
            setLoading(false);
            return;
        }
        setLoading(false);
        router.push("/signin");
        return;
    }
    catch(e)
    {
        alert("Problem Encountered " + e);
        setLoading(false);
        return false ;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 relative bg-background selection:bg-primary/20">
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-40 -z-10" />

      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
            <Pencil className="h-5 w-5" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-foreground">Draftr</span>
        </Link>
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          Create your account
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Start collaborating in real-time on shared whiteboards
        </p>
      </div>

      {/* Card Form */}
      <div className="w-full sm:max-w-md">
        <div className="bg-card border border-border px-6 py-8 shadow-xl rounded-2xl sm:px-10">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Jane Doe"
                className="w-full h-11 rounded-xl border border-input bg-background px-3.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@example.com"
                className="w-full h-11 rounded-xl border border-input bg-background px-3.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="At least 8 characters"
                  className="w-full h-11 rounded-xl border border-input bg-background pl-3.5 pr-10 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5 pt-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Check className={`h-3.5 w-3.5 ${formData.password.length >= 8 ? 'text-success' : 'text-muted-foreground/40'}`} />
                <span>Must be at least 8 characters</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 font-semibold text-sm text-primary-foreground shadow transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-[0.99] disabled:opacity-70 cursor-pointer"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link
              href="/signin"
              className="font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}