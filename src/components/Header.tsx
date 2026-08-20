"use client";

import React from "react";
import { Network } from "lucide-react";

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-background/90 to-transparent pointer-events-none">
      <div className="flex items-center gap-3 pointer-events-auto">
        <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
          <Network className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-foreground tracking-tight">Nexus</h1>
          <p className="text-xs text-muted-foreground font-mono">Product Intelligence</p>
        </div>
      </div>
      <div className="text-xs text-muted-foreground font-mono hidden sm:block">
        {new Date().getFullYear()} Nexus Platform
      </div>
    </header>
  );
}