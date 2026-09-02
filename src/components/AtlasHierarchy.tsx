"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { productNodes, type ProductNode, getSynergyRating, type SynergyRating, externalProducts } from "@/data/productData";
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
  system: ["uc-01", "uc-02", "uc-03", "uc-04", "uc-05", "uc-06", "uc-07", "uc-08", "uc-09", "uc-12", "uc-13"],
  change: ["uc-01", "uc-02", "uc-07", "uc-08", "uc-10", "uc-11", "uc-12", "uc-13", "uc-14"],
  predictive: ["uc-09", "uc-10", "uc-11"],
};

function getUseCasePillars(ucId: string): string[] {
  const pillars: string[] = [];
  for (const [pillarId, ucIds] of Object.entries(PILLAR_USE_CASES)) {
    if (ucIds.includes(ucId)) pillars.push(pillarId);
  }
  return pillars;
}

interface LayoutResult {
  rows: Record<string, number>;
  spans: Record<string, { start: number; end: number }>;
  visibleUCs: ProductNode[];
}

function computeLayout(useCases: ProductNode[], collapsed: Set<string>, pillarOrder: string[]): LayoutResult {
  const visibleUCs = useCases.filter((uc) => {
    const ucPillars = getUseCasePillars(uc.id);
    return ucPillars.some((p) => !collapsed.has(p));
  });

  const spans: Record<string, { start: number; end: number }> = {};
  for (const uc of visibleUCs) {
    const ucPillars = getUseCasePillars(uc.id).filter((p) => !collapsed.has(p));
    const indices = ucPillars.map((p) => pillarOrder.indexOf(p)).filter((i) => i !== -1);
    if (indices.length === 0) continue;
    const minIdx = Math.min(...indices);
    const maxIdx = Math.max(...indices);
    spans[uc.id] = { start: minIdx + 1, end: maxIdx + 2 };
  }

  const nextRow: Record<number, number> = {};
  for (let i = 1; i <= pillarOrder.length + 1; i++) {
    nextRow[i] = 2;
  }

  const rows: Record<string, number> = {};
  for (const uc of visibleUCs) {
    const span = spans[uc.id];
    if (!span) continue;
    let maxRow = 0;
    for (let col = span.start; col < span.end; col++) {
      maxRow = Math.max(maxRow, nextRow[col]);
    }
    rows[uc.id] = maxRow;
    for (let col = span.start; col < span.end; col++) {
      nextRow[col] = maxRow + 1;
    }
  }

  return { rows, spans, visibleUCs };
}

function SynergyColumn({ ratings }: { ratings: SynergyRating }) {
  const items: { label: string; rating: "High" | "Medium" | "Low" | "None" }[] = [
    { label: "Bob PPZ", rating: ratings.bobPpz },
    { label: "Concert4Z", rating: ratings.concert4z },
    { label: "Terraform", rating: ratings.terraform },
  ].filter((i) => i.rating !== "None");

  if (items.length === 0) return null;

  const colors = {
    High: { bg: "rgba(74,222,128,0.12)", text: "#4ade80", border: "rgba(74,222,128,0.25)" },
    Medium: { bg: "rgba(250,204,21,0.12)", text: "#facc15", border: "rgba(250,204,21,0.25)" },
    Low: { bg: "rgba(251,146,60,0.12)", text: "#fb923c", border: "rgba(251,146,60,0.25)" },
  };

  return (
    <div className="flex flex-col gap-1.5 ml-2 py-2 px-2.5 rounded-lg bg-white/[0.04] border border-white/[0.06] flex-shrink-0 self-stretch justify-center min-w-[110px]">
      <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider mb-0.5 text-center">External Product Synergies</div>
      {items.map((item) => {
        const c = colors[item.rating];
        return (
          <div key={item.label} className="text-right">
            <div className="text-[9px] text-muted-foreground uppercase tracking-wider leading-tight">{item.label}</div>
            <span
              className="inline-block text-[10px] px-1.5 py-0.5 rounded-full font-semibold border mt-0.5"
              style={{ color: c.text, borderColor: c.border, backgroundColor: c.bg }}
            >
              {item.rating}
            </span>
          </div>
        );
      })}
    </div>
  );
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

  const useCases = useMemo(() => productNodes.filter((n) => n.type === "useCase"), []);
  const pillarOrder = useMemo(() => PILLARS.map((p) => p.id), []);

  const { rows, spans, visibleUCs } = useMemo(
    () => computeLayout(useCases, collapsed, pillarOrder),
    [useCases, collapsed, pillarOrder]
  );

  const resetView = () => setCollapsed(new Set());

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

      {/* Pillar + Use Case Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: "repeat(3, 1fr)",
              gridAutoRows: "minmax(60px, auto)",
            }}
          >
            {/* Pillar Headers */}
            {PILLARS.map((pillar, i) => {
              const isCollapsed = collapsed.has(pillar.id);
              const visibleCount = visibleUCs.filter((uc) => {
                const ucPillars = getUseCasePillars(uc.id);
                return ucPillars.includes(pillar.id);
              }).length;

              return (
                <div
                  key={pillar.id}
                  style={{ gridColumn: `${i + 1} / ${i + 2}`, gridRow: "1 / 2" }}
                >
                  <button
                    onClick={() => togglePillar(pillar.id)}
                    className={cn(
                      "w-full flex flex-col items-center gap-3 p-6 rounded-xl border transition-all duration-300 hover:scale-[1.02]",
                      pillar.bgClass,
                      pillar.borderClass,
                      isCollapsed && "opacity-50"
                    )}
                  >
                    <img
                      src={pillar.icon}
                      alt={pillar.name}
                      className="w-10 h-10 object-contain"
                    />
                    <div className="text-center">
                      <h2 className={cn("text-lg font-semibold", pillar.textClass)}>
                        {pillar.name}
                      </h2>
                      <p className="text-xs text-muted-foreground mt-1">
                        {visibleCount} use cases
                      </p>
                    </div>
                    {isCollapsed ? (
                      <ChevronDown className={cn("w-5 h-5", pillar.textClass)} />
                    ) : (
                      <ChevronUp className={cn("w-5 h-5", pillar.textClass)} />
                    )}
                  </button>
                </div>
              );
            })}

            {/* Use Cases */}
            {visibleUCs.map((uc) => {
              const span = spans[uc.id];
              const row = rows[uc.id];
              const ucPillars = getUseCasePillars(uc.id);
              const primaryPillar = PILLARS.find((p) => p.id === ucPillars[0]);
              const isMultiPillar = ucPillars.length > 1;

              return (
                <Link
                  key={uc.id}
                  href={`/usecase/${uc.id}`}
                  className="block rounded-xl border border-border/30 bg-card/40 backdrop-blur-sm p-4 transition-all duration-200 hover:scale-[1.01] hover:shadow-lg relative overflow-hidden"
                  style={{
                    gridColumn: `${span.start} / ${span.end}`,
                    gridRow: `${row} / ${row + 1}`,
                    borderLeftWidth: "3px",
                    borderLeftStyle: "solid",
                    borderLeftColor: primaryPillar?.color || "#E2E8F0",
                    boxShadow: `0 0 20px ${primaryPillar?.color || "#E2E8F0"}08`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 30px ${primaryPillar?.color || "#E2E8F0"}15`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 20px ${primaryPillar?.color || "#E2E8F0"}08`;
                  }}
                >
                  {isMultiPillar && (
                    <div
                      className="absolute top-0 left-0 right-0 h-1"
                      style={{
                        background: `linear-gradient(to right, ${ucPillars
                          .map((pid) => PILLARS.find((p) => p.id === pid)?.color)
                          .join(", ")})`,
                      }}
                    />
                  )}
                  <div className="flex items-start gap-3">
                    <div
                      className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0"
                      style={{
                        backgroundColor: primaryPillar?.color,
                        boxShadow: `0 0 8px ${primaryPillar?.color}60`,
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-medium text-foreground leading-snug">
                        {uc.label}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">
                        {uc.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {ucPillars.map((pId) => {
                          const p = PILLARS.find((pl) => pl.id === pId);
                          if (!p) return null;
                          return (
                            <span
                              key={pId}
                              className="text-[10px] px-1.5 py-0.5 rounded-full border font-medium"
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
                    </div>
                    <SynergyColumn ratings={getSynergyRating(uc.id)} />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-8 flex items-center justify-center gap-6 flex-wrap">
            {PILLARS.map((pillar) => (
              <div key={pillar.id} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: pillar.color, boxShadow: `0 0 6px ${pillar.color}60` }}
                />
                <span className="text-xs text-muted-foreground">{pillar.name}</span>
              </div>
            ))}
          </div>

          {/* Reset button */}
          {collapsed.size > 0 && (
            <div className="mt-6 text-center">
              <button
                onClick={resetView}
                className="px-4 py-2 rounded-lg bg-card/50 border border-border/30 text-sm text-muted-foreground hover:bg-card/80 transition-colors"
              >
                Reset View
              </button>
            </div>
          )}
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