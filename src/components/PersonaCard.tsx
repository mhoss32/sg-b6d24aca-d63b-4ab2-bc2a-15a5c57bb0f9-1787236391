"use client";

import React from "react";
import Link from "next/link";
import { User, Star, UserCircle, ArrowRight } from "lucide-react";
import type { Persona } from "@/data/productData";

export interface PersonaCardProps {
  persona: Persona;
  href?: string;
}

export function PersonaCard({ persona, href }: PersonaCardProps) {
  const isPrimary = persona.engagement === "Primary";
  const content = (
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
        <div className="min-w-0 flex-1">
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
              {persona.engagement}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{persona.role}</p>
          {href && (
            <div className="flex items-center gap-1 text-xs text-cyan group-hover:text-cyan-light transition-colors">
              <span>View profile</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block group">
        {content}
      </Link>
    );
  }

  return content;
}

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}