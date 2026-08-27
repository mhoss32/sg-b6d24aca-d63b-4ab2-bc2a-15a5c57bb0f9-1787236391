"use client";

import React, { useState, useCallback, useRef } from "react";
import {
  AlertTriangle,
  Clock,
  User,
  Zap,
  Users,
  Handshake,
  ChevronRight,
  ChevronDown,
  X,
  Plus,
  Pencil,
  Coins,
} from "lucide-react";
import type { FlowStage, FlowDiagram as FlowDiagramType, FlowMarker, ExternalTouchpoint } from "@/data/productData";
import { externalProducts } from "@/data/productData";
import type { LucideIcon } from "lucide-react";
import { getUnitConsumption } from "@/data/unitConsumption";
import type { StepConsumption } from "@/data/unitConsumption";

export interface FlowDiagramProps {
  diagram: FlowDiagramType;
  variant: "asIs" | "toBe";
  editable?: boolean;
  onChange?: (diagram: FlowDiagramType) => void;
  useCaseId?: string;
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
    icon: Handshake,
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

export function FlowDiagram({ diagram, variant, editable = false, onChange, useCaseId }: FlowDiagramProps) {
  const isAsIs = variant === "asIs";
  const config = isAsIs ? asIsMarkerConfig : toBeMarkerConfig;
  const [editingMarker, setEditingMarker] = useState<number | null>(null);
  const [managingStage, setManagingStage] = useState<number | null>(null);
  const [expandedPersonas, setExpandedPersonas] = useState<Record<string, boolean>>({});
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [modalTouchpoint, setModalTouchpoint] = useState<ExternalTouchpoint | null>(null);
  const [draftPersona, setDraftPersona] = useState("Zach");
  const [draftTitle, setDraftTitle] = useState("");
  const [draftDescription, setDraftDescription] = useState("");
  const [draftType, setDraftType] = useState<MarkerType>("pain");
  const [draftStage, setDraftStage] = useState(0);
  const [showUnitEstimates, setShowUnitEstimates] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const unitConsumption = useCaseId && !isAsIs ? getUnitConsumption(useCaseId) : null;

  const togglePersona = useCallback((key: string) => {
    setExpandedPersonas((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const toggleProduct = useCallback((productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
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

  // Filter external touchpoints for selected products
  const activeExternalTouchpoints = selectedProducts.length > 0
    ? (diagram.externalTouchpoints || []).filter((tp) =>
        selectedProducts.includes(tp.product.toLowerCase().replace(/\s+/g, "-"))
      )
    : [];

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

      {/* External Integrations Selector — only for To-Be */}
      {!isAsIs && (
        <ExternalProductSelector
          selectedProducts={selectedProducts}
          onToggleProduct={toggleProduct}
          availableTouchpoints={diagram.externalTouchpoints || []}
        />
      )}

      {/* Unit Consumption Toggle — only for To-Be */}
      {!isAsIs && unitConsumption && (
        <div className="mb-4 p-3 rounded-lg border border-green-500/20 bg-green-950/10">
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showUnitEstimates}
              onChange={(e) => setShowUnitEstimates(e.target.checked)}
              className="w-4 h-4 rounded border-border/40 text-green-400 focus:ring-green-400/20"
            />
            <span className="text-xs font-semibold text-green-400">Show Atlas token/unit consumption estimates</span>
          </label>
        </div>
      )}

      <div className="relative">
        {/* Connection line */}
        <div className="absolute top-[52px] left-0 right-0 h-0.5 bg-gradient-to-r from-border/20 via-border/40 to-border/20 hidden lg:block" />

        <div className={cn(
          "grid gap-6",
          showUnitEstimates
            ? "grid-cols-1 md:grid-cols-2"
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        )}>
          {diagram.stages.map((stage, stageIndex) => {
            const stageExternalTouchpoints = activeExternalTouchpoints.filter(
              (tp) => tp.stageIndex === stageIndex
            );

            return (
              <StageCard
                key={stage.name}
                stage={stage}
                index={stageIndex}
                stageMarkers={diagram.markers
                  .map((m, gi) => ({ ...m, globalIndex: gi }))
                  .filter((m) => m.stageIndex === stageIndex)}
                externalTouchpoints={stageExternalTouchpoints}
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
                onOpenModal={setModalTouchpoint}
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
                showUnitEstimates={showUnitEstimates}
                unitConsumption={unitConsumption?.steps[stageIndex] || null}
              />
            );
          })}
        </div>
      </div>

      {/* Full Flow Summary & Sensitivity Analysis */}
      {!isAsIs && showUnitEstimates && unitConsumption && (
        <div className="mt-6 space-y-4">
          <div className="rounded-lg border border-green-500/20 bg-green-950/10 overflow-hidden">
            <div className="px-4 py-3 bg-green-500/10 border-b border-green-500/20 flex items-center gap-2">
              <Coins className="w-4 h-4 text-green-400" />
              <span className="text-sm font-semibold text-green-400">Total Estimated Units: {unitConsumption.totalNominal}</span>
            </div>
          </div>

          {unitConsumption.fullFlowSummary && unitConsumption.fullFlowSummary.length > 0 && (
            <div className="rounded-lg border border-green-500/20 bg-green-950/10 overflow-hidden">
              <div className="px-4 py-3 bg-green-500/10 border-b border-green-500/20">
                <span className="text-sm font-semibold text-green-400">Full Flow Summary</span>
              </div>
              <div className="p-4">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-green-500/20">
                      <th className="text-left py-2 pr-4 font-semibold text-green-300">Step</th>
                      <th className="text-left py-2 pr-4 font-semibold text-green-300">Activity</th>
                      <th className="text-right py-2 font-semibold text-green-300">Units</th>
                    </tr>
                  </thead>
                  <tbody>
                    {unitConsumption.fullFlowSummary.map((row, i) => (
                      <tr key={i} className="border-b border-green-500/10 last:border-0">
                        <td className="py-2 pr-4 text-muted-foreground">{row.step}</td>
                        <td className="py-2 pr-4 text-muted-foreground">{row.activity}</td>
                        <td className="py-2 text-right text-green-300 font-medium">{row.units}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {unitConsumption.sensitivityAnalysis && unitConsumption.sensitivityAnalysis.length > 0 && (
            <div className="rounded-lg border border-green-500/20 bg-green-950/10 overflow-hidden">
              <div className="px-4 py-3 bg-green-500/10 border-b border-green-500/20">
                <span className="text-sm font-semibold text-green-400">Sensitivity Analysis</span>
              </div>
              <div className="p-4">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-green-500/20">
                      <th className="text-left py-2 pr-4 font-semibold text-green-300">Scenario</th>
                      <th className="text-left py-2 pr-4 font-semibold text-green-300">Adjustment</th>
                      <th className="text-right py-2 font-semibold text-green-300">Est. Units</th>
                    </tr>
                  </thead>
                  <tbody>
                    {unitConsumption.sensitivityAnalysis.map((row, i) => (
                      <tr key={i} className="border-b border-green-500/10 last:border-0">
                        <td className="py-2 pr-4 text-muted-foreground">{row.scenario}</td>
                        <td className="py-2 pr-4 text-muted-foreground">{row.adjustment}</td>
                        <td className="py-2 text-right text-green-300 font-medium">{row.estimatedUnits}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal Overlay */}
      {modalTouchpoint && (
        <ExternalTouchpointModal
          touchpoint={modalTouchpoint}
          onClose={() => setModalTouchpoint(null)}
        />
      )}
    </div>
  );
}

function truncateToFirstSentence(text: string): string {
  const match = text.match(/^[^.!?]+[.!?]/);
  return match ? match[0].trim() : text;
}

function ExternalProductSelector({
  selectedProducts,
  onToggleProduct,
  availableTouchpoints,
}: {
  selectedProducts: string[];
  onToggleProduct: (id: string) => void;
  availableTouchpoints: ExternalTouchpoint[];
}) {
  return (
    <div className="mb-4 p-3 rounded-lg border border-border/20 bg-background/50">
      <div className="flex items-center gap-2 mb-2">
        <Handshake className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          External Integrations
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {externalProducts.map((product) => {
          const isSelected = selectedProducts.includes(product.id);
          const hasTouchpoints = availableTouchpoints.some(
            (tp) => tp.product.toLowerCase().replace(/\s+/g, "-") === product.id
          );
          return (
            <label
              key={product.id}
              className={cn(
                "inline-flex items-center gap-2 px-3 py-1.5 rounded-md border transition-all",
                hasTouchpoints
                  ? isSelected
                    ? "border-cyan-400/50 bg-cyan-400/10 cursor-pointer"
                    : "border-border/30 bg-muted/20 hover:border-border/50 cursor-pointer"
                  : "border-border/20 bg-muted/10 opacity-50 cursor-not-allowed"
              )}
              title={hasTouchpoints ? product.description : `No ${product.label} touchpoints for this use case`}
            >
              <input
                type="checkbox"
                checked={isSelected && hasTouchpoints}
                disabled={!hasTouchpoints}
                onChange={() => hasTouchpoints && onToggleProduct(product.id)}
                className="w-3.5 h-3.5 rounded border-border/40 text-cyan-400 focus:ring-cyan-400/20 disabled:opacity-30"
              />
              <span className={cn("text-xs font-medium", isSelected && hasTouchpoints ? "text-cyan-400" : "text-foreground")}>
                {product.label}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function ExternalTouchpointRenderer({
  touchpoint,
  onClick,
}: {
  touchpoint: ExternalTouchpoint;
  onClick: () => void;
}) {
  if (touchpoint.type === "handoff") {
    return (
      <div
        className="mb-2 rounded-lg border border-green-400/30 bg-green-400/5 overflow-hidden cursor-pointer hover:border-green-400/50 transition-colors"
        onClick={onClick}
      >
        <div className="px-3 py-2 bg-green-400/10 border-b border-green-400/20">
          <h5 className="text-xs font-semibold text-green-400 uppercase tracking-wider">
            {touchpoint.title}
          </h5>
        </div>
        <div className="p-3 space-y-3">
          {touchpoint.steps.map((step, i) => (
            <div key={i} className="relative">
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-green-400/20 flex items-center justify-center text-[10px] font-bold text-green-400 flex-shrink-0">
                    {i + 1}
                  </div>
                  {i < touchpoint.steps.length - 1 && (
                    <div className="w-0.5 h-full bg-green-400/30 mt-1" />
                  )}
                </div>
                <div className="flex-1 pb-3">
                  <span className="text-[11px] font-semibold text-green-300 block mb-0.5">
                    {step.label}
                  </span>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    {truncateToFirstSentence(step.description)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Enrichment
  return (
    <div
      className="mb-2 rounded-lg border border-cyan-400/30 bg-cyan-400/5 overflow-hidden cursor-pointer hover:border-cyan-400/50 transition-colors"
      onClick={onClick}
    >
      <div className="px-3 py-2 bg-cyan-400/10 border-b border-cyan-400/20">
        <h5 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
          {touchpoint.title}
        </h5>
      </div>
      <div className="p-3">
        <p className="text-[10px] text-muted-foreground leading-relaxed">
          {truncateToFirstSentence(touchpoint.summary)}
        </p>
      </div>
    </div>
  );
}

function ExternalTouchpointModal({
  touchpoint,
  onClose,
}: {
  touchpoint: ExternalTouchpoint;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative max-w-lg w-full max-h-[80vh] overflow-y-auto rounded-xl border border-border/40 bg-card/95 backdrop-blur-md shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground">
            {touchpoint.title}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-muted/50 transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {touchpoint.type === "handoff" ? (
          <div className="space-y-4">
            {touchpoint.steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full bg-green-400/20 flex items-center justify-center text-xs font-bold text-green-400 flex-shrink-0">
                      {i + 1}
                    </div>
                    {i < touchpoint.steps.length - 1 && (
                      <div className="w-0.5 h-full bg-green-400/30 mt-1" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <span className="text-xs font-semibold text-green-300 block mb-1">
                      {step.label}
                    </span>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground leading-relaxed">
            {touchpoint.summary}
          </p>
        )}
      </div>
    </div>
  );
}

function StageCard({
  stage,
  index,
  stageMarkers,
  externalTouchpoints,
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
  onOpenModal,
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
  showUnitEstimates,
  unitConsumption,
}: {
  stage: FlowStage;
  index: number;
  stageMarkers: Array<FlowMarker & { globalIndex: number }>;
  externalTouchpoints: ExternalTouchpoint[];
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
  onOpenModal: (tp: ExternalTouchpoint) => void;
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
  showUnitEstimates: boolean;
  unitConsumption: StepConsumption | null;
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

        {/* External Touchpoints */}
        {externalTouchpoints.length > 0 && (
          <div className="mb-3 space-y-2">
            {externalTouchpoints.map((tp, i) => (
              <ExternalTouchpointRenderer key={i} touchpoint={tp} onClick={() => onOpenModal(tp)} />
            ))}
          </div>
        )}

        {/* Unit Consumption Estimates */}
        {showUnitEstimates && unitConsumption && (
          <UnitConsumptionBox consumption={unitConsumption} />
        )}

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

function UnitConsumptionBox({ consumption }: { consumption: StepConsumption }) {
  const totalUnits = consumption.activities.reduce((sum, a) => sum + (parseFloat(a.units) || 0), 0);
  return (
    <div className="mb-3 rounded-lg border border-green-500/20 bg-green-950/10 overflow-hidden">
      <div className="px-3 py-2 bg-green-500/10 border-b border-green-500/20 flex items-center gap-2">
        <Coins className="w-3.5 h-3.5 text-green-400" />
        <span className="text-xs font-semibold text-green-400 uppercase tracking-wider">Atlas Units</span>
        <span className="ml-auto text-xs font-medium text-green-300">{totalUnits.toFixed(1)} units</span>
      </div>
      <div className="p-3">
        <table className="w-full text-[11px]">
          <thead>
            <tr className="border-b border-green-500/20">
              <th className="text-left py-1.5 pr-2 font-semibold text-green-300">Activity</th>
              <th className="text-left py-1.5 pr-2 font-semibold text-green-300">Tokens/events</th>
              <th className="text-right py-1.5 font-semibold text-green-300">Units</th>
            </tr>
          </thead>
          <tbody>
            {consumption.activities.map((activity, i) => (
              <tr key={i} className="border-b border-green-500/10 last:border-0">
                <td className="py-1.5 pr-2 text-muted-foreground">{activity.activity}</td>
                <td className="py-1.5 pr-2 text-muted-foreground">{activity.tokens}</td>
                <td className="py-1.5 text-right text-green-300 font-medium">{activity.units}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}