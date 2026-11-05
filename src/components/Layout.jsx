import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import AICompanionWidget from './AICompanionWidget';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f0]">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-[#1a3d2e] text-white/60 text-xs py-5 px-6 text-center">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>✓ Official Karnataka Tourism Intelligence · 159 verified destinations across all 31 districts with live weather and daytime photography</span>
          <span>© 2025 Pravasa AI</span>
        </div>
      </footer>
      <AICompanionWidget />
    </div>
  );
}
