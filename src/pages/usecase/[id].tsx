import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowLeft, Network, ChevronDown, Users, GitBranch, Layers } from "lucide-react";
import { getNodeById, useCaseDetails, type ProductNode, type UseCaseDetail } from "@/data/productData";
import { PersonaCard } from "@/components/PersonaCard";
import { FlowDiagram } from "@/components/FlowDiagram";
import { SEO } from "@/components/SEO";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function TimelineBadge({ timeline }: { timeline: string }) {
  const styles = {
    GA: "bg-green/15 text-green border-green/30",
    "H1 2027": "bg-amber/15 text-amber border-amber/30",
    "H2 2027": "bg-purple/15 text-purple border-purple/30",
  };
  return (
    <span className={cn("text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full border", styles[timeline as keyof typeof styles] || "bg-muted text-muted-foreground border-border/30")}>
      {timeline}
    </span>
  );
}

export default function UseCaseDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const node = id && typeof id === "string" ? getNodeById(id) : null;
  const initialDetail = id && typeof id === "string" ? useCaseDetails[id] : null;
  const [detail, setDetail] = useState<UseCaseDetail | null>(initialDetail);

  // Update detail when initialDetail changes (router navigation)
  React.useEffect(() => {
    if (initialDetail) setDetail(initialDetail);
  }, [initialDetail]);

  // Derive pillar from node connections
  const pillarId = node?.connections[0];
  const pillarConfig: Record<string, { name: string; color: string; bg: string; text: string }> = {
    system: { name: "System Intelligence", color: "#00D4FF", bg: "bg-cyan/10", text: "text-cyan" },
    change: { name: "Change Intelligence", color: "#FF6B6B", bg: "bg-coral/10", text: "text-coral" },
    predictive: { name: "Predictive Intelligence", color: "#A78BFA", bg: "bg-purple/10", text: "text-purple" },
  };
  const pillar = pillarId ? pillarConfig[pillarId] : null;

  if (!node || !detail) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Use case not found</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-cyan hover:text-cyan-light transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Atlas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${node.label} — Atlas Use Case`}
        description={node.description}
      />

      {/* Header */}
      <header className="border-b border-border/30 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Atlas
          </Link>
          <div className="flex items-center gap-2">
            <Network className="w-5 h-5 text-cyan" />
            <span className="font-semibold text-foreground">Atlas</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Use Case Header */}
        <section>
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: "#00D4FF", boxShadow: "0 0 12px rgba(0,212,255,0.5)" }}
            />
            <span className="text-sm font-mono uppercase tracking-wider text-cyan">
              Use Case
            </span>
            {pillar && (
              <span className={cn("inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border border-border/30", pillar.bg, pillar.text)}>
                <img src={`/pillars/${pillarId}-intelligence.png`} alt="" className="w-4 h-4 object-contain" />
                {pillar.name}
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {node.label}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            {node.description}
          </p>
        </section>

        <Accordion type="multiple" defaultValue={["personas", "flows"]} className="space-y-4">
          {/* Personas */}
          <AccordionItem value="personas" className="border border-border/20 rounded-2xl bg-card/20 px-6 py-2">
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple/10 text-purple flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <h2 className="text-lg font-semibold text-foreground">Personas</h2>
                  <p className="text-xs text-muted-foreground font-normal">{detail.personas.length} involved — {detail.personas.filter(p => p.engagement === "Primary").length} primary</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 pb-4">
                {detail.personas.map((persona) => (
                  <PersonaCard key={persona.name} persona={persona} href={`/persona/${persona.name.toLowerCase()}`} />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* As-Is / To-Be Flows */}
          <AccordionItem value="flows" className="border border-border/20 rounded-2xl bg-card/20 px-6 py-2">
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-coral/10 text-coral flex items-center justify-center">
                  <GitBranch className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <h2 className="text-lg font-semibold text-foreground">As-Is & To-Be Analysis</h2>
                  <p className="text-xs text-muted-foreground font-normal">As-Is flow with pain point legends · To-Be flow with wow legends · Double-click markers to edit</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-6 pt-2 pb-4">
                <section className="rounded-xl border border-red-500/20 bg-red-950/10 p-6">
                  <FlowDiagram
                    diagram={detail.asIs}
                    variant="asIs"
                    editable
                    onChange={(asIs) => setDetail({ ...detail, asIs })}
                  />
                </section>
                <section className="rounded-xl border border-green-500/20 bg-green-950/10 p-6">
                  <FlowDiagram
                    diagram={detail.toBe}
                    variant="toBe"
                    editable
                    onChange={(toBe) => setDetail({ ...detail, toBe })}
                  />
                </section>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Capabilities Required */}
          <AccordionItem value="capabilities" className="border border-border/20 rounded-2xl bg-card/20 px-6 py-2">
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan/10 text-cyan flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <h2 className="text-lg font-semibold text-foreground">Capabilities Required</h2>
                  <p className="text-xs text-muted-foreground font-normal">{detail.capabilities.length} Atlas capabilities · {detail.capabilities.filter(c => c.timeline === "GA").length} GA · {detail.capabilities.filter(c => c.timeline === "H1 2027").length} H1 2027 · {detail.capabilities.filter(c => c.timeline === "H2 2027").length} H2 2027</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2 pb-4">
                {detail.capabilities.map((cap) => (
                  <div
                    key={cap.name}
                    className="flex items-start justify-between gap-4 p-4 rounded-xl border border-border/20 bg-background/50 hover:border-cyan/20 transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-foreground">{cap.name}</h4>
                        <TimelineBadge timeline={cap.timeline} />
                      </div>
                      <p className="text-sm text-muted-foreground">{cap.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Footer */}
        <footer className="border-t border-border/20 pt-8 pb-12">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              IBM Atlas Platform — {new Date().getFullYear()}
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-cyan hover:text-cyan-light transition-colors"
            >
              <Network className="w-4 h-4" />
              Explore Atlas
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}