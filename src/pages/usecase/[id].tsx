import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowLeft, Network, ChevronDown, Users, GitBranch, Layers, Download } from "lucide-react";
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

function exportAsHTML(nodeLabel: string, detail: UseCaseDetail) {
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${nodeLabel} — Atlas Use Case</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0A0A0F; color: #E2E8F0; line-height: 1.6; padding: 40px 20px; }
    .container { max-width: 1200px; margin: 0 auto; }
    header { margin-bottom: 40px; padding-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.1); }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 16px; }
    .badge-cyan { background: rgba(0,212,255,0.15); color: #00D4FF; border: 1px solid rgba(0,212,255,0.3); }
    h1 { font-size: 36px; font-weight: 700; margin-bottom: 16px; color: #fff; }
    .description { font-size: 18px; color: #94a3b8; max-width: 768px; line-height: 1.7; }
    h2 { font-size: 24px; font-weight: 600; margin: 40px 0 20px; color: #fff; display: flex; align-items: center; gap: 12px; }
    h3 { font-size: 18px; font-weight: 600; margin: 24px 0 12px; color: #cbd5e1; }
    .section { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 24px; margin-bottom: 24px; }
    .stage { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 16px; margin-bottom: 12px; }
    .stage-header { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
    .stage-number { width: 32px; height: 32px; border-radius: 50%; background: rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600; color: #94a3b8; }
    .stage-name { font-weight: 600; color: #e2e8f0; }
    .stage-desc { font-size: 14px; color: #64748b; margin-left: 44px; }
    .marker { padding: 12px 16px; border-radius: 8px; margin: 8px 0; font-size: 14px; }
    .marker-pain { background: rgba(239,68,68,0.08); border-left: 3px solid #ef4444; }
    .marker-time { background: rgba(245,158,11,0.08); border-left: 3px solid #f59e0b; }
    .marker-skill { background: rgba(34,197,94,0.08); border-left: 3px solid #22c55e; }
    .marker-gain { background: rgba(167,139,250,0.08); border-left: 3px solid #a78bfa; }
    .marker-title { font-weight: 600; margin-bottom: 4px; }
    .marker-desc { color: #94a3b8; }
    .persona-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }
    .persona-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 20px; }
    .persona-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
    .persona-avatar { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; font-weight: 600; color: #fff; }
    .persona-name { font-weight: 600; color: #e2e8f0; }
    .persona-role { font-size: 13px; color: #64748b; }
    .engagement-badge { display: inline-block; padding: 2px 10px; border-radius: 9999px; font-size: 11px; font-weight: 600; margin-top: 8px; }
    .engagement-primary { background: rgba(0,212,255,0.15); color: #00D4FF; }
    .engagement-secondary { background: rgba(255,255,255,0.08); color: #94a3b8; }
    .capability { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; padding: 16px; border-radius: 12px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); margin-bottom: 12px; }
    .timeline-badge { display: inline-block; padding: 2px 10px; border-radius: 9999px; font-size: 11px; font-weight: 600; }
    .timeline-ga { background: rgba(34,197,94,0.15); color: #22c55e; }
    .timeline-h1 { background: rgba(245,158,11,0.15); color: #f59e0b; }
    .timeline-h2 { background: rgba(167,139,250,0.15); color: #a78bfa; }
    .footer { margin-top: 60px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center; color: #64748b; font-size: 14px; }
    .external-box { padding: 16px; border-radius: 12px; margin: 12px 0; }
    .external-handoff { background: rgba(34,197,94,0.05); border: 1px solid rgba(34,197,94,0.2); }
    .external-enrichment { background: rgba(6,182,212,0.05); border: 1px solid rgba(6,182,212,0.2); }
    .external-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px; }
    .external-handoff .external-title { color: #4ade80; }
    .external-enrichment .external-title { color: #22d3ee; }
    .handoff-step { display: flex; gap: 12px; margin-bottom: 16px; }
    .step-number { width: 24px; height: 24px; border-radius: 50%; background: rgba(34,197,94,0.2); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: #4ade80; flex-shrink: 0; }
    .step-label { font-weight: 600; font-size: 13px; color: #86efac; margin-bottom: 4px; }
    .step-desc { font-size: 13px; color: #94a3b8; }
    .meta { font-size: 12px; color: #475569; margin-top: 24px; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="badge badge-cyan">Use Case</div>
      <h1>${nodeLabel}</h1>
      <p class="description">${detail.description}</p>
    </header>

    <h2>As-Is Flow</h2>
    <div class="section">
      <h3>${detail.asIs.title}</h3>
      ${detail.asIs.stages.map((stage, i) => {
        const stageMarkers = detail.asIs.markers.filter(m => m.stageIndex === i);
        return `
        <div class="stage">
          <div class="stage-header">
            <div class="stage-number">${i + 1}</div>
            <div class="stage-name">${stage.name}</div>
          </div>
          <div class="stage-desc">${stage.description}</div>
          ${stageMarkers.map(m => `
            <div class="marker marker-${m.type}">
              <div class="marker-title">${m.title}</div>
              <div class="marker-desc">${m.description}</div>
            </div>
          `).join('')}
        </div>`;
      }).join('')}
    </div>

    <h2>To-Be Flow</h2>
    <div class="section">
      <h3>${detail.toBe.title}</h3>
      ${detail.toBe.stages.map((stage, i) => {
        const stageMarkers = detail.toBe.markers.filter(m => m.stageIndex === i);
        const stageExternal = detail.toBe.externalTouchpoints?.filter(tp => tp.stageIndex === i) || [];
        return `
        <div class="stage">
          <div class="stage-header">
            <div class="stage-number">${i + 1}</div>
            <div class="stage-name">${stage.name}</div>
          </div>
          <div class="stage-desc">${stage.description}</div>
          ${stageExternal.map(tp => {
            if (tp.type === 'handoff') {
              return `
              <div class="external-box external-handoff">
                <div class="external-title">${tp.title}</div>
                ${tp.steps.map((step, j) => `
                  <div class="handoff-step">
                    <div class="step-number">${j + 1}</div>
                    <div>
                      <div class="step-label">${step.label}</div>
                      <div class="step-desc">${step.description}</div>
                    </div>
                  </div>
                `).join('')}
              </div>`;
            } else {
              return `
              <div class="external-box external-enrichment">
                <div class="external-title">${tp.title}</div>
                <div class="step-desc">${tp.summary}</div>
              </div>`;
            }
          }).join('')}
          ${stageMarkers.map(m => `
            <div class="marker marker-${m.type}">
              <div class="marker-title">${m.title}</div>
              <div class="marker-desc">${m.description}</div>
            </div>
          `).join('')}
        </div>`;
      }).join('')}
    </div>

    <h2>Personas</h2>
    <div class="persona-grid">
      ${detail.personas.map(p => `
        <div class="persona-card">
          <div class="persona-header">
            <div class="persona-avatar">${p.name.charAt(0)}</div>
            <div>
              <div class="persona-name">${p.name}</div>
              <div class="persona-role">${p.role}</div>
            </div>
          </div>
          <div class="engagement-badge engagement-${p.engagement.toLowerCase()}">${p.engagement}</div>
        </div>
      `).join('')}
    </div>

    <h2>Capabilities Required</h2>
    ${detail.capabilities.map(cap => `
      <div class="capability">
        <div>
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <span style="font-weight: 600; color: #e2e8f0;">${cap.name}</span>
            <span class="timeline-badge timeline-${cap.timeline.toLowerCase().replace(' ', '-')}">${cap.timeline}</span>
          </div>
          <div style="font-size: 14px; color: #94a3b8;">${cap.description}</div>
        </div>
      </div>
    `).join('')}

    <div class="meta">
      <p>Exported from Atlas Platform on ${date} at ${time}</p>
    </div>

    <div class="footer">
      <span>IBM Atlas Platform</span>
      <span>${new Date().getFullYear()}</span>
    </div>
  </div>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${nodeLabel.toLowerCase().replace(/\s+/g, "-")}-atlas-usecase.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

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
  const [detail, setDetail] = useState<UseCaseDetail | null>(null);

  // Load from localStorage or fall back to default data
  React.useEffect(() => {
    if (!id || typeof id !== "string" || !initialDetail) return;
    const saved = localStorage.getItem(`atlas-usecase-${id}`);
    if (saved) {
      try {
        setDetail(JSON.parse(saved));
      } catch {
        setDetail(initialDetail);
      }
    } else {
      setDetail(initialDetail);
    }
  }, [id, initialDetail]);

  // Save to localStorage whenever detail changes
  React.useEffect(() => {
    if (!id || typeof id !== "string" || !detail) return;
    localStorage.setItem(`atlas-usecase-${id}`, JSON.stringify(detail));
  }, [id, detail]);

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
          <button
            onClick={() => detail && exportAsHTML(node.label, detail)}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-border/30 bg-muted/20 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-border/50 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Export HTML
          </button>
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

        <Accordion type="multiple" defaultValue={["flows", "personas", "capabilities"]} className="space-y-4">
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