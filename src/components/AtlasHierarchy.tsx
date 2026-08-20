"use client";

import React, { useState } from "react";
import Link from "next/link";
import { productNodes, type ProductNode } from "@/data/productData";
import { Network, ChevronDown, ChevronUp } from "lucide-react";

interface PillarConfig {
  id: string;
  name: string;
  shortName: string;
  color: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  icon: string;
}

const PILLARS: PillarConfig[] = [
  {
    id: "system",
    name: "System Intelligence",
    shortName: "SI",
    color: "#00D4FF",
    bgClass: "bg-cyan/10",
    textClass: "text-cyan",
    borderClass: "border-cyan/30",
    icon: "/pillars/system-intelligence.png",
  },
  {
    id: "change",
    name: "Change Intelligence",
    shortName: "CI",
    color: "#FF6B6B",
    bgClass: "bg-coral/10",
    textClass: "text-coral",
    borderClass: "border-coral/30",
    icon: "/pillars/change-intelligence.png",
  },
  {
    id: "predictive",
    name: "Predictive Intelligence",
    shortName: "PI",
    color: "#A78BFA",
    bgClass: "bg-purple/10",
    textClass: "text-purple",
    borderClass: "border-purple/30",
    icon: "/pillars/predictive-intelligence.png",
  },
];

const PILLAR_USE_CASES: Record<string, string[]> = {
  system: ["uc-04", "uc-05"],
  change: ["uc-02", "uc-07", "uc-08", "uc-12", "uc-13", "uc-14"],
  predictive: ["uc-01", "uc-03", "uc-06", "uc-09", "uc-10", "uc-11"],
};

function getUseCasePillars(ucId: string): string[] {
  const pillars: string[] = [];
  for (const [pillarId, ucIds] of Object.entries(PILLAR_USE_CASES)) {
    if (ucIds.includes(ucId)) pillars.push(pillarId);
  }
  const node = productNodes.find((n) => n.id === ucId);
  if (node) {
    for (const conn of node.connections) {
      if ((conn === "system" || conn === "change" || conn === "predictive") && !pillars.includes(conn)) {
        pillars.push(conn);
      }
    }
  }
  return pillars;
}

function getPillarForUseCase(ucId: string): PillarConfig | undefined {
  const pillars = getUseCasePillars(ucId);
  if (pillars.length === 0) return undefined;
  return PILLARS.find((p) => p.id === pillars[0]);
}

export function AtlasHierarchy() {
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const togglePillar = (pillarId: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(pillarId)) next.delete(pillarId);
      else next.add(pillarId);
      return next;
    });
  };

  const useCases = productNodes.filter((n) => n.type === "useCase");

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-cyan/10 border border-cyan/30 flex items-center justify-center">
              <Network className="w-6 h-6 text-cyan" />
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-foreground tracking-tight">
              Atlas
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            AI-powered platform for IBM Z environment intelligence, change management, and predictive operations. 
            Explore use cases across three pillars of intelligence.
          </p>
        </div>
      </section>

      {/* Three Column Pillar Layout */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {PILLARS.map((pillar) => {
              const isCollapsed = collapsed.has(pillar.id);
              const pillarUseCases = useCases.filter((uc) => {
                const ucPillars = getUseCasePillars(uc.id);
                return ucPillars.includes(pillar.id);
              });

              return (
                <div
                  key={pillar.id}
                  className={cn(
                    "rounded-2xl border bg-card/20 backdrop-blur-sm overflow-hidden transition-all duration-300",
                    pillar.borderClass
                  )}
                >
                  {/* Pillar Header */}
                  <button
                    onClick={() => togglePillar(pillar.id)}
                    className={cn(
                      "w-full flex items-center justify-between p-5 transition-colors hover:bg-card/30",
                      pillar.bgClass
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={pillar.icon}
                        alt={pillar.name}
                        className="w-8 h-8 object-contain"
                      />
                      <div className="text-left">
                        <h2 className={cn("text-lg font-semibold", pillar.textClass)}>
                          {pillar.name}
                        </h2>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {pillarUseCases.length} use cases
                        </p>
                      </div>
                    </div>
                    {isCollapsed ? (
                      <ChevronDown className={cn("w-5 h-5", pillar.textClass)} />
                    ) : (
                      <ChevronUp className={cn("w-5 h-5", pillar.textClass)} />
                    )}
                  </button>

                  {/* Use Case List */}
                  {!isCollapsed && (
                    <div className="p-4 space-y-3">
                      {pillarUseCases.map((uc) => {
                        const ucPillars = getUseCasePillars(uc.id);
                        const isMultiPillar = ucPillars.length > 1;

                        return (
                          <Link
                            key={uc.id}
                            href={`/usecase/${uc.id}`}
                            className={cn(
                              "block rounded-xl border p-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg",
                              "bg-card/40 hover:bg-card/60",
                              pillar.borderClass,
                              "hover:border-opacity-60"
                            )}
                            style={{
                              borderColor: pillar.color + "40",
                              boxShadow: `0 0 20px ${pillar.color}08`,
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${pillar.color}15`;
                              (e.currentTarget as HTMLElement).style.borderColor = pillar.color + "60";
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${pillar.color}08`;
                              (e.currentTarget as HTMLElement).style.borderColor = pillar.color + "40";
                            }}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0"
                                style={{
                                  backgroundColor: pillar.color,
                                  boxShadow: `0 0 8px ${pillar.color}60`,
                                }}
                              />
                              <div className="min-w-0 flex-1">
                                <h3 className="text-sm font-medium text-foreground leading-snug">
                                  {uc.label}
                                </h3>
                                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">
                                  {uc.description}
                                </p>
                                {isMultiPillar && (
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {ucPillars.map((pId) => {
                                      const p = PILLARS.find((pl) => pl.id === pId);
                                      if (!p) return null;
                                      return (
                                        <span
                                          key={pId}
                                          className="text-[10px] px-1.5 py-0.5 rounded-full border"
                                          style={{
                                            color: p.color,
                                            borderColor: p.color + "40",
                                            backgroundColor: p.color + "10",
                                          }}
                                        >
                                          {p.shortName}
                                        </span>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}

                  {/* Collapsed State */}
                  {isCollapsed && (
                    <div className="p-4 text-center">
                      <p className="text-sm text-muted-foreground">
                        {pillarUseCases.length} use cases hidden
                      </p>
                      <button
                        onClick={() => togglePillar(pillar.id)}
                        className={cn(
                          "mt-2 text-xs font-medium hover:underline",
                          pillar.textClass
                        )}
                      >
                        Show use cases
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/20 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            IBM Atlas Platform — {new Date().getFullYear()}
          </p>
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-cyan" />
            <span className="text-sm text-muted-foreground">Explore the Atlas</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}