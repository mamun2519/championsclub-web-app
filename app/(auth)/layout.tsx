import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow matching the red primary theme */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30 mb-3">
            <span className="text-2xl font-black tracking-wider">CC</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            ChampionsClub
          </h1>
          <p className="text-sm text-slate-400 mt-1">Gaming Tournament Platform</p>
        </div>
        {children}
      </div>
    </div>
  );
}
