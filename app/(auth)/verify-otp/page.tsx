'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { KeyRound, Loader2, ArrowLeft, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import apiClient from '@/lib/api-client';
import { useAuthStore } from '@/store/auth.store';

function VerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const target = searchParams.get('target') || '';
  const setAuth = useAuthStore((state) => state.setAuth);

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value[value.length - 1];
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    if (fullOtp.length !== 6) {
      toast.error('Please enter complete 6-digit OTP');
      return;
    }

    try {
      setIsLoading(true);
      const res = await apiClient.post('/auth/verify-otp', {
        emailOrPhone: target,
        otp: fullOtp,
      });

      const { accessToken, user } = res.data.data;
      setAuth(user, accessToken);
      toast.success('Account verified successfully!');

      if (user.role === 'ADMIN') {
        router.push('/dashboard');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      toast.error(err?.message || 'Invalid or expired OTP code.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setIsResending(true);
      const res = await apiClient.post('/auth/resend-otp', { emailOrPhone: target });
      toast.success('A new OTP has been sent!');
      if (res.data.data?.otp) {
        toast.info(`[Dev Demo OTP]: ${res.data.data.otp}`, { duration: 10000 });
      }
      setTimer(60);
    } catch (err: any) {
      toast.error(err?.message || 'Failed to resend OTP');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
      <div className="flex items-center space-x-2 text-slate-400 mb-4">
        <Link href="/signup" className="hover:text-white transition flex items-center space-x-1 text-xs">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Signup</span>
        </Link>
      </div>

      <h2 className="text-xl font-bold text-white mb-2">Verify Your Account</h2>
      <p className="text-sm text-slate-400 mb-6">
        Enter the 6-digit verification code sent to <span className="text-primary font-semibold">{target || 'your email/phone'}</span>
      </p>

      <form onSubmit={handleVerify} className="space-y-6">
        <div className="flex items-center justify-between gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-14 text-center text-xl font-bold bg-slate-950/80 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={isLoading || otp.join('').length !== 6}
          className="w-full py-3 px-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl text-sm shadow-lg shadow-primary/25 transition duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Verifying Code...</span>
            </>
          ) : (
            <span>Verify & Complete Registration</span>
          )}
        </button>
      </form>

      <div className="mt-6 flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-800/60">
        <span>Didn&apos;t receive code?</span>
        <button
          type="button"
          onClick={handleResend}
          disabled={timer > 0 || isResending}
          className="text-primary hover:underline font-semibold flex items-center space-x-1 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {isResending ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <RotateCcw className="w-3.5 h-3.5" />
          )}
          <span>{timer > 0 ? `Resend in ${timer}s` : 'Resend Code'}</span>
        </button>
      </div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div className="text-center text-slate-400 p-8">Loading OTP verification...</div>}>
      <VerifyOtpForm />
    </Suspense>
  );
}
