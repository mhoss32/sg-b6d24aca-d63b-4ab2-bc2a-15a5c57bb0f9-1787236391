"use client";

import React, { useState, useCallback, useRef } from "react";
import {
  AlertTriangle,
  Clock,
  User,
  Zap,
  Users,
  Bot,
  ChevronRight,
  X,
  Plus,
  Pencil,
} from "lucide-react";
import type { FlowStage, FlowDiagram as FlowDiagramType } from "@/data/productData";
import type { LucideIcon } from "lucide-react";

export interface FlowDiagramProps {
  diagram: FlowDiagramType;
  variant: "asIs" | "toBe";
  editable?: boolean;
  onChange?: (diagram: FlowDiagramType) => void;
}

type MarkerType = "pain" | "time" | "skill" | "gain";
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

export function FlowDiagram({ diagram, variant, editable = false, onChange }: FlowDiagramProps) {
  const isAsIs = variant === "asIs";
  const config = isAsIs ? asIsMarkerConfig : toBeMarkerConfig;
  const [editingMarker, setEditingMarker] = useState<number | null>(null);
  const [draftText, setDraftText] = useState("");
  const [draftType, setDraftType] = useState<MarkerType>("pain");
  const [draftStage, setDraftStage] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateMarkers = useCallback((newMarkers: FlowDiagramType["markers"]) => {
    onChange?.({ ...diagram, markers: newMarkers });
  }, [diagram, onChange]);

  const startEdit = useCallback((globalIndex: number) => {
    const m = diagram.markers[globalIndex];
    setEditingMarker(globalIndex);
    setDraftText(m.text);
    setDraftType(m.type as MarkerType);
    setDraftStage(m.stageIndex);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [diagram.markers]);

  const saveEdit = useCallback(() => {
    if (editingMarker === null) return;
    const newMarkers = [...diagram.markers];
    newMarkers[editingMarker] = {
      ...newMarkers[editingMarker],
      text: draftText,
      type: draftType,
      stageIndex: draftStage,
    };
    updateMarkers(newMarkers);
    setEditingMarker(null);
  }, [editingMarker, draftText, draftType, draftStage, diagram.markers, updateMarkers]);

  const deleteMarker = useCallback((globalIndex: number) => {
    const newMarkers = diagram.markers.filter((_, i) => i !== globalIndex);
    updateMarkers(newMarkers);
    setEditingMarker(null);
  }, [diagram.markers, updateMarkers]);

  const addMarker = useCallback(() => {
    const availableTypes = Object.keys(config);
    const defaultType = availableTypes[0] as MarkerType;
    const newMarkers = [
      ...diagram.markers,
      { type: defaultType, text: "New marker", stageIndex: 0 },
    ];
    updateMarkers(newMarkers);
    setTimeout(() => {
      setEditingMarker(newMarkers.length - 1);
      setDraftText("New marker");
      setDraftType(defaultType);
      setDraftStage(0);
    }, 50);
  }, [config, diagram.markers, updateMarkers]);

  const cancelEdit = useCallback(() => {
    setEditingMarker(null);
  }, []);

  const availableTypes = Object.keys(config);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
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
        {editable && (
          <button
            onClick={addMarker}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan hover:text-cyan-light transition-colors px-3 py-1.5 rounded-md border border-cyan/30 hover:bg-cyan/10"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Marker
          </button>
        )}
      </div>

      <MarkerLegend variant={variant} />

      <div className="relative">
        {/* Connection line */}
        <div className="absolute top-[52px] left-0 right-0 h-0.5 bg-gradient-to-r from-border/20 via-border/40 to-border/20 hidden lg:block" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {diagram.stages.map((stage, stageIndex) => (
            <StageCard
              key={stage.name}
              stage={stage}
              index={stageIndex}
              markers={diagram.markers}
              stageMarkers={diagram.markers
                .map((m, gi) => ({ ...m, globalIndex: gi }))
                .filter((m) => m.stageIndex === stageIndex)}
              config={config}
              isLast={stageIndex === diagram.stages.length - 1}
              editable={editable}
              editingMarker={editingMarker}
              onStartEdit={startEdit}
              onSaveEdit={saveEdit}
              onDeleteMarker={deleteMarker}
              onCancelEdit={cancelEdit}
              draftText={draftText}
              setDraftText={setDraftText}
              draftType={draftType}
              setDraftType={setDraftType}
              draftStage={draftStage}
              setDraftStage={setDraftStage}
              availableTypes={availableTypes}
              inputRef={inputRef}
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
  stageMarkers,
  config,
  isLast,
  editable,
  editingMarker,
  onStartEdit,
  onSaveEdit,
  onDeleteMarker,
  onCancelEdit,
  draftText,
  setDraftText,
  draftType,
  setDraftType,
  draftStage,
  setDraftStage,
  availableTypes,
  inputRef,
}: {
  stage: FlowStage;
  index: number;
  stageMarkers: Array<{ type: string; text: string; stageIndex: number; globalIndex: number }>;
  config: Record<string, MarkerStyle>;
  isLast: boolean;
  editable: boolean;
  editingMarker: number | null;
  onStartEdit: (globalIndex: number) => void;
  onSaveEdit: () => void;
  onDeleteMarker: (globalIndex: number) => void;
  onCancelEdit: () => void;
  draftText: string;
  setDraftText: (v: string) => void;
  draftType: MarkerType;
  setDraftType: (v: MarkerType) => void;
  draftStage: number;
  setDraftStage: (v: number) => void;
  availableTypes: string[];
  inputRef: React.RefObject<HTMLInputElement | null>;
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
        {stageMarkers.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {stageMarkers.map((marker) => (
              <MarkerChip
                key={marker.globalIndex}
                marker={marker}
                config={config}
                editable={editable}
                isEditing={editingMarker === marker.globalIndex}
                onStartEdit={() => onStartEdit(marker.globalIndex)}
                onSaveEdit={onSaveEdit}
                onDelete={() => onDeleteMarker(marker.globalIndex)}
                onCancel={onCancelEdit}
                draftText={draftText}
                setDraftText={setDraftText}
                draftType={draftType}
                setDraftType={setDraftType}
                draftStage={draftStage}
                setDraftStage={setDraftStage}
                availableTypes={availableTypes}
                inputRef={inputRef}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MarkerChip({
  marker,
  config,
  editable,
  isEditing,
  onStartEdit,
  onSaveEdit,
  onDelete,
  onCancel,
  draftText,
  setDraftText,
  draftType,
  setDraftType,
  draftStage,
  setDraftStage,
  availableTypes,
  inputRef,
}: {
  marker: { type: string; text: string; stageIndex: number; globalIndex: number };
  config: Record<string, MarkerStyle>;
  editable: boolean;
  isEditing: boolean;
  onStartEdit: () => void;
  onSaveEdit: () => void;
  onDelete: () => void;
  onCancel: () => void;
  draftText: string;
  setDraftText: (v: string) => void;
  draftType: MarkerType;
  setDraftType: (v: MarkerType) => void;
  draftStage: number;
  setDraftStage: (v: number) => void;
  availableTypes: string[];
  inputRef: React.RefObject<HTMLInputElement | null>;
}) {
  const mc = config[marker.type];
  if (!mc) return null;
  const Icon = mc.icon;

  if (isEditing) {
    return (
      <div className="inline-flex flex-col gap-1.5 p-2 rounded-md border border-cyan/40 bg-card/80 backdrop-blur-sm min-w-[200px] z-20 relative">
        <div className="flex items-center gap-1.5">
          <div className={cn("w-5 h-5 rounded flex items-center justify-center flex-shrink-0", mc.bg)}>
            <Icon className={cn("w-3 h-3", mc.color)} />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSaveEdit();
              if (e.key === "Escape") onCancel();
            }}
            className="flex-1 text-[10px] bg-transparent border-none outline-none text-foreground min-w-0"
          />
          <button onClick={onSaveEdit} className="text-cyan hover:text-cyan-light p-0.5">
            <Pencil className="w-3 h-3" />
          </button>
          <button onClick={onDelete} className="text-red hover:text-red/80 p-0.5">
            <X className="w-3 h-3" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={draftType}
            onChange={(e) => setDraftType(e.target.value as MarkerType)}
            className="text-[10px] bg-background border border-border/30 rounded px-1 py-0.5 text-foreground outline-none"
          >
            {availableTypes.map((t) => (
              <option key={t} value={t}>{config[t]?.label || t}</option>
            ))}
          </select>
          <select
            value={draftStage}
            onChange={(e) => setDraftStage(Number(e.target.value))}
            className="text-[10px] bg-background border border-border/30 rounded px-1 py-0.5 text-foreground outline-none"
          >
            {Array.from({ length: 6 }, (_, i) => (
              <option key={i} value={i}>Stage {i + 1}</option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium border cursor-default select-none",
        mc.bg,
        mc.color,
        mc.border,
        editable && "hover:border-cyan/50 cursor-pointer"
      )}
      title={editable ? "Double-click to edit" : marker.text}
      onDoubleClick={() => editable && onStartEdit()}
    >
      <Icon className={cn("w-3 h-3 flex-shrink-0", mc.color)} />
      <span className="truncate max-w-[140px]">{marker.text}</span>
      {editable && (
        <Pencil className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 ml-0.5 transition-opacity" />
      )}
    </div>
  );
}

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}