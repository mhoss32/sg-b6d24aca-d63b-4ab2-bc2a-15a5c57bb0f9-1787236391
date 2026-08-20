"use client";

import React from "react";
import { User, Star, UserCircle } from "lucide-react";
import type { Persona } from "@/data/productData";

export interface PersonaCardProps {
  persona: Persona;
}

export function PersonaCard({ persona }: PersonaCardProps) {
  const isPrimary = persona.engagementType === "primary";
  return (
    <div
      className={cn(
        "relative rounded-xl border p-5 transition-all duration-300",
        "bg-card/50 backdrop-blur-sm",
        "hover:border-cyan/40 hover:bg-card/80",
        isPrimary
          ? "border-cyan/30 shadow-[0_0_20px_rgba(0,212,255,0.08)]"
          : "border-border/40"
      )}
    >
      {isPrimary && (
        <div className="absolute -top-2 -right-2">
          <Star className="w-5 h-5 text-cyan fill-cyan" />
        </div>
      )}
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center",
            isPrimary
              ? "bg-cyan/20 text-cyan"
              : "bg-muted/50 text-muted-foreground"
          )}
        >
          <UserCircle className="w-7 h-7" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-foreground truncate">
              {persona.name}
            </h4>
            <span
              className={cn(
                "text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full",
                isPrimary
                  ? "bg-cyan/15 text-cyan"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {persona.engagementType}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{persona.role}</p>
          {persona.description && (
            <p className="text-xs text-muted-foreground/80 leading-relaxed">
              {persona.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}