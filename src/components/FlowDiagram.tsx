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
  ChevronDown,
  X,
  Plus,
  Pencil,
} from "lucide-react";
import type { FlowStage, FlowDiagram as FlowDiagramType, FlowMarker } from "@/data/productData";
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
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    border: "border-orange-400/30",
    label: "Business Impact",
  },
  time: {
    icon: Clock,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/30",
    label: "Lost Time",
  },
  skill: {
    icon: User,
    color: "text-red-400",
    bg: "bg-red-400/10",
    border: "border-red-400/30",
    label: "Skill Gap / Bottleneck",
  },
};

const toBeMarkerConfig: Record<string, MarkerStyle> = {
  time: {
    icon: Zap,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/30",
    label: "Time Saving",
  },
  gain: {
    icon: Users,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/30",
    label: "New User Capability",
  },
  skill: {
    icon: Bot,
    color: "text-green-400",
    bg: "bg-green-400/10",
    border: "border-green-400/30",
    label: "Atlas AI & Automation",
  },
};

function MarkerLegend({ variant }: { variant: "asIs" | "toBe" }) {
  const config = variant === "asIs" ? asIsMarkerConfig : toBeMarkerConfig;
  const title = variant === "asIs" ? "Pain Points" : "Wows!";
  const titleColor = variant === "asIs" ? "text-red-400" : "text-green-400";

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
  const [managingStage, setManagingStage] = useState<number | null>(null);
  const [expandedPersonas, setExpandedPersonas] = useState<Record<string, boolean>>({});
  const [draftPersona, setDraftPersona] = useState("Zach");
  const [draftTitle, setDraftTitle] = useState("");
  const [draftDescription, setDraftDescription] = useState("");
  const [draftType, setDraftType] = useState<MarkerType>("pain");
  const [draftStage, setDraftStage] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const togglePersona = useCallback((key: string) => {
    setExpandedPersonas((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const updateMarkers = useCallback((newMarkers: FlowMarker[]) => {
    onChange?.({ ...diagram, markers: newMarkers });
  }, [diagram, onChange]);

  const startEdit = useCallback((globalIndex: number) => {
    const m = diagram.markers[globalIndex];
    setEditingMarker(globalIndex);
    setDraftPersona(m.persona);
    setDraftTitle(m.title);
    setDraftDescription(m.description);
    setDraftType(m.type as MarkerType);
    setDraftStage(m.stageIndex);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [diagram.markers]);

  const saveEdit = useCallback(() => {
    if (editingMarker === null) return;
    const newMarkers = [...diagram.markers];
    newMarkers[editingMarker] = {
      ...newMarkers[editingMarker],
      persona: draftPersona,
      title: draftTitle,
      description: draftDescription,
      type: draftType,
      stageIndex: draftStage,
    };
    updateMarkers(newMarkers);
    setEditingMarker(null);
  }, [editingMarker, draftPersona, draftTitle, draftDescription, draftType, draftStage, diagram.markers, updateMarkers]);

  const deleteMarker = useCallback((globalIndex: number) => {
    const newMarkers = diagram.markers.filter((_, i) => i !== globalIndex);
    updateMarkers(newMarkers);
    setEditingMarker(null);
  }, [diagram.markers, updateMarkers]);

  const addMarkerToStage = useCallback((stageIndex: number) => {
    const availableTypes = Object.keys(config) as MarkerType[];
    const defaultType = availableTypes[0];
    const newMarkers: FlowMarker[] = [
      ...diagram.markers,
      { persona: "Zach", type: defaultType, title: "New marker", description: "Description", stageIndex },
    ];
    updateMarkers(newMarkers);
    setTimeout(() => {
      setEditingMarker(newMarkers.length - 1);
      setDraftPersona("Zach");
      setDraftTitle("New marker");
      setDraftDescription("Description");
      setDraftType(defaultType);
      setDraftStage(stageIndex);
    }, 50);
  }, [config, diagram.markers, updateMarkers]);

  const cancelEdit = useCallback(() => {
    setEditingMarker(null);
    setManagingStage(null);
  }, []);

  const startStageManage = useCallback((stageIndex: number) => {
    setManagingStage(stageIndex);
    setEditingMarker(null);
  }, []);

  const availableTypes = Object.keys(config) as MarkerType[];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center",
              isAsIs ? "bg-red-400/10 text-red-400" : "bg-green-400/10 text-green-400"
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
              {editable && " · Double-click a step to manage markers"}
            </p>
          </div>
        </div>
      </div>

      <MarkerLegend variant={variant} />

      <div className="relative">
        {/* Connection line */}
        <div className="absolute top-[52px] left-0 right-0 h-0.5 bg-gradient-to-r from-border/20 via-border/40 to-border/20 hidden lg:block" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {diagram.stages.map((stage, stageIndex) => (
            <StageCard
              key={stage.name}
              stage={stage}
              index={stageIndex}
              stageMarkers={diagram.markers
                .map((m, gi) => ({ ...m, globalIndex: gi }))
                .filter((m) => m.stageIndex === stageIndex)}
              config={config}
              isLast={stageIndex === diagram.stages.length - 1}
              editable={editable}
              editingMarker={editingMarker}
              managingStage={managingStage}
              expandedPersonas={expandedPersonas}
              onTogglePersona={togglePersona}
              onStartEdit={startEdit}
              onSaveEdit={saveEdit}
              onDeleteMarker={deleteMarker}
              onCancelEdit={cancelEdit}
              onStartStageManage={startStageManage}
              onAddMarker={addMarkerToStage}
              draftPersona={draftPersona}
              setDraftPersona={setDraftPersona}
              draftTitle={draftTitle}
              setDraftTitle={setDraftTitle}
              draftDescription={draftDescription}
              setDraftDescription={setDraftDescription}
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
  managingStage,
  expandedPersonas,
  onTogglePersona,
  onStartEdit,
  onSaveEdit,
  onDeleteMarker,
  onCancelEdit,
  onStartStageManage,
  onAddMarker,
  draftPersona,
  setDraftPersona,
  draftTitle,
  setDraftTitle,
  draftDescription,
  setDraftDescription,
  draftType,
  setDraftType,
  draftStage,
  setDraftStage,
  availableTypes,
  inputRef,
}: {
  stage: FlowStage;
  index: number;
  stageMarkers: Array<FlowMarker & { globalIndex: number }>;
  config: Record<string, MarkerStyle>;
  isLast: boolean;
  editable: boolean;
  editingMarker: number | null;
  managingStage: number | null;
  expandedPersonas: Record<string, boolean>;
  onTogglePersona: (key: string) => void;
  onStartEdit: (globalIndex: number) => void;
  onSaveEdit: () => void;
  onDeleteMarker: (globalIndex: number) => void;
  onCancelEdit: () => void;
  onStartStageManage: (stageIndex: number) => void;
  onAddMarker: (stageIndex: number) => void;
  draftPersona: string;
  setDraftPersona: (v: string) => void;
  draftTitle: string;
  setDraftTitle: (v: string) => void;
  draftDescription: string;
  setDraftDescription: (v: string) => void;
  draftType: MarkerType;
  setDraftType: (v: MarkerType) => void;
  draftStage: number;
  setDraftStage: (v: number) => void;
  availableTypes: MarkerType[];
  inputRef: React.RefObject<HTMLInputElement | null>;
}) {
  const isManaging = managingStage === index;

  // Group markers by persona
  const grouped = stageMarkers.reduce<Record<string, Array<FlowMarker & { globalIndex: number }>>>((acc, m) => {
    if (!acc[m.persona]) acc[m.persona] = [];
    acc[m.persona].push(m);
    return acc;
  }, {});

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
      <div
        className={cn(
          "rounded-xl border bg-card/30 backdrop-blur-sm p-5 transition-all",
          isManaging
            ? "border-cyan-400/40 shadow-lg shadow-cyan-400/5"
            : "border-border/30 hover:border-cyan-400/20",
          editable && !isManaging && "cursor-pointer"
        )}
        onDoubleClick={() => editable && onStartStageManage(index)}
        title={editable && !isManaging ? "Double-click to manage markers" : undefined}
      >
        <h4 className="text-sm font-medium text-foreground mb-2 leading-snug">
          {stage.name}
        </h4>
        <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
          {stage.description}
        </p>

        {/* Persona sections */}
        {!isManaging && Object.entries(grouped).map(([persona, markers]) => {
          const key = `${index}-${persona}`;
          const isExpanded = expandedPersonas[key];
          return (
            <div key={persona} className="mb-2">
              <button
                onClick={() => onTogglePersona(key)}
                className="flex items-center gap-2 w-full text-left py-1.5 px-2 rounded-md hover:bg-muted/30 transition-colors"
              >
                {isExpanded ? (
                  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                )}
                <span className="text-xs font-semibold text-foreground">{persona}</span>
                <span className="text-[10px] text-muted-foreground ml-auto">
                  {markers.length} {markers.length === 1 ? "item" : "items"}
                </span>
              </button>

              {isExpanded && (
                <div className="flex flex-col gap-1.5 mt-1 pl-6">
                  {markers.map((marker) => (
                    <MarkerTile
                      key={marker.globalIndex}
                      marker={marker}
                      config={config}
                      editable={editable}
                      isEditing={editingMarker === marker.globalIndex}
                      onStartEdit={() => onStartEdit(marker.globalIndex)}
                      onSaveEdit={onSaveEdit}
                      onDelete={() => onDeleteMarker(marker.globalIndex)}
                      onCancel={onCancelEdit}
                      draftPersona={draftPersona}
                      setDraftPersona={setDraftPersona}
                      draftTitle={draftTitle}
                      setDraftTitle={setDraftTitle}
                      draftDescription={draftDescription}
                      setDraftDescription={setDraftDescription}
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
          );
        })}

        {/* Marker manager — shown when stage is double-clicked */}
        {isManaging && (
          <div className="space-y-2 mt-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-400">
                Markers
              </span>
              <button
                onClick={() => onAddMarker(index)}
                className="inline-flex items-center gap-1 text-[10px] font-medium text-cyan-400 hover:text-cyan-300 transition-colors px-2 py-1 rounded-md border border-cyan-400/30 hover:bg-cyan-400/10"
              >
                <Plus className="w-3 h-3" />
                Add
              </button>
            </div>

            {stageMarkers.length === 0 && (
              <p className="text-[10px] text-muted-foreground italic">No markers for this step</p>
            )}

            <div className="space-y-1.5">
              {stageMarkers.map((marker) => (
                <div key={marker.globalIndex}>
                  {editingMarker === marker.globalIndex ? (
                    <MarkerEditor
                      marker={marker}
                      config={config}
                      draftPersona={draftPersona}
                      setDraftPersona={setDraftPersona}
                      draftTitle={draftTitle}
                      setDraftTitle={setDraftTitle}
                      draftDescription={draftDescription}
                      setDraftDescription={setDraftDescription}
                      draftType={draftType}
                      setDraftType={setDraftType}
                      draftStage={draftStage}
                      setDraftStage={setDraftStage}
                      availableTypes={availableTypes}
                      onSave={onSaveEdit}
                      onDelete={() => onDeleteMarker(marker.globalIndex)}
                      onCancel={onCancelEdit}
                      inputRef={inputRef}
                    />
                  ) : (
                    <div
                      className="flex items-center gap-2 p-2 rounded-md border border-border/20 bg-background/50 hover:border-cyan-400/30 transition-colors cursor-pointer group"
                      onDoubleClick={(e) => {
                        e.stopPropagation();
                        onStartEdit(marker.globalIndex);
                      }}
                      title="Double-click to edit"
                    >
                      {(() => {
                        const mc = config[marker.type];
                        if (!mc) return null;
                        const Icon = mc.icon;
                        return (
                          <div className={cn("w-5 h-5 rounded flex items-center justify-center flex-shrink-0", mc.bg)}>
                            <Icon className={cn("w-3 h-3", mc.color)} />
                          </div>
                        );
                      })()}
                      <div className="flex-1 min-w-0">
                        <span className="text-[11px] text-foreground block truncate">
                          {marker.title}
                        </span>
                        <span className="text-[10px] text-muted-foreground block truncate">
                          {marker.persona}
                        </span>
                      </div>
                      <Pencil className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={onCancelEdit}
              className="w-full text-[10px] text-muted-foreground hover:text-foreground transition-colors py-1"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function MarkerTile({
  marker,
  config,
  editable,
  isEditing,
  onStartEdit,
  onSaveEdit,
  onDelete,
  onCancel,
  draftPersona,
  setDraftPersona,
  draftTitle,
  setDraftTitle,
  draftDescription,
  setDraftDescription,
  draftType,
  setDraftType,
  draftStage,
  setDraftStage,
  availableTypes,
  inputRef,
}: {
  marker: FlowMarker & { globalIndex: number };
  config: Record<string, MarkerStyle>;
  editable: boolean;
  isEditing: boolean;
  onStartEdit: () => void;
  onSaveEdit: () => void;
  onDelete: () => void;
  onCancel: () => void;
  draftPersona: string;
  setDraftPersona: (v: string) => void;
  draftTitle: string;
  setDraftTitle: (v: string) => void;
  draftDescription: string;
  setDraftDescription: (v: string) => void;
  draftType: MarkerType;
  setDraftType: (v: MarkerType) => void;
  draftStage: number;
  setDraftStage: (v: number) => void;
  availableTypes: MarkerType[];
  inputRef: React.RefObject<HTMLInputElement | null>;
}) {
  const mc = config[marker.type];
  if (!mc) return null;
  const Icon = mc.icon;

  if (isEditing) {
    return (
      <MarkerEditor
        marker={marker}
        config={config}
        draftPersona={draftPersona}
        setDraftPersona={setDraftPersona}
        draftTitle={draftTitle}
        setDraftTitle={setDraftTitle}
        draftDescription={draftDescription}
        setDraftDescription={setDraftDescription}
        draftType={draftType}
        setDraftType={setDraftType}
        draftStage={draftStage}
        setDraftStage={setDraftStage}
        availableTypes={availableTypes}
        onSave={onSaveEdit}
        onDelete={onDelete}
        onCancel={onCancel}
        inputRef={inputRef}
      />
    );
  }

  return (
    <div
      className={cn(
        "group flex flex-col gap-1 px-3 py-2 rounded-md border cursor-default select-none transition-all duration-200",
        mc.bg,
        mc.border,
        editable && "hover:border-cyan-400/50 cursor-pointer"
      )}
      title={editable ? "Double-click to edit" : `${marker.title} — ${marker.description}`}
      onDoubleClick={(e) => {
        e.stopPropagation();
        if (editable) onStartEdit();
      }}
    >
      <div className="flex items-center gap-1.5">
        <Icon className={cn("w-3 h-3 flex-shrink-0", mc.color)} />
        <span className={cn("text-[10px] font-semibold uppercase tracking-wider", mc.color)}>
          {mc.label}
        </span>
      </div>
      <span className="text-[11px] font-medium text-foreground leading-snug">
        {marker.title}
      </span>
      <span className="text-[10px] text-muted-foreground leading-relaxed">
        {marker.description}
      </span>
    </div>
  );
}

function MarkerEditor({
  marker,
  config,
  draftPersona,
  setDraftPersona,
  draftTitle,
  setDraftTitle,
  draftDescription,
  setDraftDescription,
  draftType,
  setDraftType,
  draftStage,
  setDraftStage,
  availableTypes,
  onSave,
  onDelete,
  onCancel,
  inputRef,
}: {
  marker: FlowMarker & { globalIndex: number };
  config: Record<string, MarkerStyle>;
  draftPersona: string;
  setDraftPersona: (v: string) => void;
  draftTitle: string;
  setDraftTitle: (v: string) => void;
  draftDescription: string;
  setDraftDescription: (v: string) => void;
  draftType: MarkerType;
  setDraftType: (v: MarkerType) => void;
  draftStage: number;
  setDraftStage: (v: number) => void;
  availableTypes: MarkerType[];
  onSave: () => void;
  onDelete: () => void;
  onCancel: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}) {
  const mc = config[marker.type];
  const Icon = mc?.icon || AlertTriangle;

  return (
    <div className="flex flex-col gap-1.5 p-2 rounded-md border border-cyan-400/40 bg-card/80 backdrop-blur-sm z-20 relative">
      <div className="flex items-center gap-1.5">
        <div className={cn("w-5 h-5 rounded flex items-center justify-center flex-shrink-0", mc?.bg || "bg-muted")}>
          <Icon className={cn("w-3 h-3", mc?.color || "text-foreground")} />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={draftTitle}
          onChange={(e) => setDraftTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSave();
            if (e.key === "Escape") onCancel();
          }}
          className="flex-1 text-[10px] bg-transparent border-none outline-none text-foreground min-w-0"
          placeholder="Title"
        />
        <button onClick={onSave} className="text-cyan-400 hover:text-cyan-300 p-0.5">
          <Pencil className="w-3 h-3" />
        </button>
        <button onClick={onDelete} className="text-red-400 hover:text-red-300 p-0.5">
          <X className="w-3 h-3" />
        </button>
      </div>
      <input
        type="text"
        value={draftDescription}
        onChange={(e) => setDraftDescription(e.target.value)}
        className="text-[10px] bg-background border border-border/30 rounded px-1.5 py-0.5 text-foreground outline-none"
        placeholder="Description"
      />
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={draftPersona}
          onChange={(e) => setDraftPersona(e.target.value)}
          className="text-[10px] bg-background border border-border/30 rounded px-1 py-0.5 text-foreground outline-none w-20"
          placeholder="Persona"
        />
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
          {Array.from({ length: 8 }, (_, i) => (
            <option key={i} value={i}>Stage {i + 1}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}