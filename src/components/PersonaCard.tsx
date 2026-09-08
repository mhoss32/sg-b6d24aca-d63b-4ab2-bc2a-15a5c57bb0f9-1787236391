"use client";

import React from "react";
import Link from "next/link";
import { User, Star, UserCircle, ArrowRight, Crown } from "lucide-react";
import type { Persona } from "@/data/productData";
import { isTier1Persona } from "@/data/productData";

export interface PersonaCardProps {
  persona: Persona;
  href?: string;
}

export function PersonaCard({ persona, href }: PersonaCardProps) {
  const isPrimary = persona.engagement === "Primary";
  const tier1 = isTier1Persona(persona.name);

  const content = (
    <div
      className={cn(
        "relative rounded-xl border p-5 transition-all duration-300",
        "bg-card/50 backdrop-blur-sm",
        tier1
          ? "border-gold/40 shadow-[0_0_20px_rgba(250,204,21,0.12)] hover:border-gold/60 hover:bg-card/80"
          : "hover:border-cyan/40 hover:bg-card/80",
        !tier1 && isPrimary
          ? "border-cyan/30 shadow-[0_0_20px_rgba(0,212,255,0.08)]"
          : !tier1 && "border-border/40"
      )}
    >
      {tier1 && (
        <div className="absolute -top-2 -right-2">
          <Crown className="w-5 h-5 text-gold fill-gold" />
        </div>
      )}
      {!tier1 && isPrimary && (
        <div className="absolute -top-2 -right-2">
          <Star className="w-5 h-5 text-cyan fill-cyan" />
        </div>
      )}
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center",
            tier1
              ? "bg-gold/20 text-gold"
              : isPrimary
                ? "bg-cyan/20 text-cyan"
                : "bg-muted/50 text-muted-foreground"
          )}
        >
          <UserCircle className="w-7 h-7" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className={cn("font-semibold truncate", tier1 ? "text-gold" : "text-foreground")}>
              {persona.name}
            </h4>
            {tier1 && (
              <span className="text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/20">
                Tier 1
              </span>
            )}
            <span
              className={cn(
                "text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full",
                tier1
                  ? "bg-gold/10 text-gold/80"
                  : isPrimary
                    ? "bg-cyan/15 text-cyan"
                    : "bg-muted text-muted-foreground"
              )}
            >
              {persona.engagement}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{persona.role}</p>
          {href && (
            <div className={cn(
              "flex items-center gap-1 text-xs group-hover:transition-colors",
              tier1 ? "text-gold group-hover:text-gold" : "text-cyan group-hover:text-cyan-light"
            )}>
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