"use client";

import React from "react";
import {
  AlertTriangle,
  Clock,
  User,
  Zap,
  Users,
  Bot,
  ChevronRight,
} from "lucide-react";
import type { FlowStage, FlowDiagram as FlowDiagramType } from "@/data/productData";
import type { LucideIcon } from "lucide-react";

export interface FlowDiagramProps {
  diagram: FlowDiagramType;
  variant: "asIs" | "toBe";
}

type MarkerStyle = { icon: LucideIcon; color: string; bg: string; border: string; label: string };

const asIsMarkerConfig: Record<string, MarkerStyle> = {
  pain: {
    icon: AlertTriangle,
    color: "text-orange",
    bg: "bg-orange/10",
    border: "border-orange/30",
    label: "Business Impact",
  },
  time: {
    icon: Clock,
    color: "text-amber",
    bg: "bg-amber/10",
    border: "border-amber/30",
    label: "Lost Time",
  },
  skill: {
    icon: User,
    color: "text-red",
    bg: "bg-red/10",
    border: "border-red/30",
    label: "Skill Gap / Bottleneck",
  },
};

const toBeMarkerConfig: Record<string, MarkerStyle> = {
  time: {
    icon: Zap,
    color: "text-cyan",
    bg: "bg-cyan/10",
    border: "border-cyan/30",
    label: "Time Saving",
  },
  gain: {
    icon: Users,
    color: "text-purple",
    bg: "bg-purple/10",
    border: "border-purple/30",
    label: "New User Capability",
  },
  skill: {
    icon: Bot,
    color: "text-green",
    bg: "bg-green/10",
    border: "border-green/30",
    label: "Atlas AI & Automation",
  },
};

function MarkerLegend({ variant }: { variant: "asIs" | "toBe" }) {
  const config = variant === "asIs" ? asIsMarkerConfig : toBeMarkerConfig;
  const title = variant === "asIs" ? "Pain Points" : "Wows!";
  const titleColor = variant === "asIs" ? "text-red" : "text-green";

  return (
    <div className="flex flex-wrap items-center gap-3 mb-4 p-3 rounded-lg border border-border/20 bg-background/50">
      <span className={cn("text-xs font-semibold uppercase tracking-wider", titleColor)}>
        {title}
      </span>
      <div className="w-px h-4 bg-border/40" />
      {Object.entries(config).map(([key, style]) => {
        const Icon = style.icon;
        return (
          <div key={key} className="flex items-center gap-1.5">
            <div className={cn("w-5 h-5 rounded flex items-center justify-center", style.bg)}>
              <Icon className={cn("w-3 h-3", style.color)} />
            </div>
            <span className="text-[11px] text-muted-foreground">{style.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export function FlowDiagram({ diagram, variant }: FlowDiagramProps) {
  const isAsIs = variant === "asIs";
  const config = isAsIs ? asIsMarkerConfig : toBeMarkerConfig;

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-4">
        <div
          className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center",
            isAsIs ? "bg-red/10 text-red" : "bg-green/10 text-green"
          )}
        >
          {isAsIs ? (
            <AlertTriangle className="w-5 h-5" />
          ) : (
            <Zap className="w-5 h-5" />
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {diagram.title}
          </h3>
          <p className="text-xs text-muted-foreground">
            {isAsIs
              ? "Current state — pain points highlighted"
              : "Desired outcome — gains highlighted"}
          </p>
        </div>
      </div>

      <MarkerLegend variant={variant} />

      <div className="relative">
        {/* Connection line */}
        <div className="absolute top-[52px] left-0 right-0 h-0.5 bg-gradient-to-r from-border/20 via-border/40 to-border/20 hidden lg:block" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {diagram.stages.map((stage, index) => (
            <StageCard
              key={stage.name}
              stage={stage}
              index={index}
              markers={diagram.markers.filter((m) => m.stageIndex === index)}
              config={config}
              isLast={index === diagram.stages.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function StageCard({
  stage,
  index,
  markers,
  config,
  isLast,
}: {
  stage: FlowStage;
  index: number;
  markers: FlowDiagramType["markers"];
  config: Record<string, MarkerStyle>;
  isLast: boolean;
}) {
  return (
    <div className="relative flex flex-col">
      {/* Stage number and connector */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-muted/50 border border-border/40 flex items-center justify-center text-xs font-mono font-medium text-muted-foreground">
          {index + 1}
        </div>
        {!isLast && (
          <div className="hidden lg:flex items-center text-muted-foreground/30">
            <ChevronRight className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* Stage card */}
      <div className="flex-1 rounded-xl border border-border/30 bg-card/30 backdrop-blur-sm p-4 hover:border-cyan/20 transition-colors">
        <h4 className="text-sm font-medium text-foreground mb-2 leading-snug">
          {stage.name}
        </h4>
        <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
          {stage.description}
        </p>

        {/* Markers */}
        {markers.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {markers.map((marker, mi) => {
              const mc = config[marker.type];
              if (!mc) return null;
              const Icon = mc.icon;
              return (
                <div
                  key={mi}
                  className={cn(
                    "inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium border",
                    mc.bg,
                    mc.color,
                    mc.border
                  )}
                  title={marker.text}
                >
                  <Icon className={cn("w-3 h-3 flex-shrink-0", mc.color)} />
                  <span className="truncate max-w-[120px]">{marker.text}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}