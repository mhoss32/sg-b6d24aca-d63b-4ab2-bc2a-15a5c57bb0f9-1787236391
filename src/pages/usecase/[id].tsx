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

  const markerColors: Record<string, { bg: string; border: string; text: string }> = {
    pain: { bg: "rgba(239,68,68,0.08)", border: "#ef4444", text: "#fca5a5" },
    time: { bg: "rgba(245,158,11,0.08)", border: "#f59e0b", text: "#fcd34d" },
    skill: { bg: "rgba(34,197,94,0.08)", border: "#22c55e", text: "#86efac" },
    gain: { bg: "rgba(167,139,250,0.08)", border: "#a78bfa", text: "#c4b5fd" },
  };

  const timelineColors: Record<string, { bg: string; text: string }> = {
    GA: { bg: "rgba(34,197,94,0.15)", text: "#22c55e" },
    "H1 2027": { bg: "rgba(245,158,11,0.15)", text: "#f59e0b" },
    "H2 2027": { bg: "rgba(167,139,250,0.15)", text: "#a78bfa" },
  };

  const gradientColors = ["#667eea", "#764ba2", "#f093fb", "#f5576c", "#4facfe", "#00f2fe", "#43e97b", "#38f9d7", "#fa709a", "#fee140", "#30cfd0", "#330867", "#a8edea", "#fed6e3"];

  const escapeHTML = (str: string) => str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  const renderFlow = (flow: typeof detail.asIs, isAsIs: boolean) => {
    const sectionBorder = isAsIs ? "border-red-500/20" : "border-green-500/20";
    const sectionBg = isAsIs ? "rgba(239,68,68,0.03)" : "rgba(34,197,94,0.03)";
    const iconColor = isAsIs ? "#ef4444" : "#22c55e";
    const iconBg = isAsIs ? "rgba(239,68,68,0.1)" : "rgba(34,197,94,0.1)";
    const subtitle = isAsIs ? "Current state — pain points highlighted" : "Desired outcome — gains highlighted";

    return `
    <div style="border: 1px solid ${isAsIs ? "rgba(239,68,68,0.2)" : "rgba(34,197,94,0.2)"}; border-radius: 16px; background: ${sectionBg}; padding: 24px; margin-bottom: 24px;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
        <div style="width: 40px; height: 40px; border-radius: 10px; background: ${iconBg}; display: flex; align-items: center; justify-content: center;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            ${isAsIs
              ? '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>'
              : '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'}
          </svg>
        </div>
        <div>
          <h3 style="font-size: 18px; font-weight: 600; color: #e2e8f0; margin: 0;">${flow.title}</h3>
          <p style="font-size: 12px; color: #64748b; margin: 2px 0 0;">${subtitle}</p>
        </div>
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px;">
        ${Object.entries(markerColors).map(([key, colors]) => `
          <div style="display: flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 6px; background: ${colors.bg}; border: 1px solid ${colors.border}30;">
            <div style="width: 8px; height: 8px; border-radius: 2px; background: ${colors.border};"></div>
            <span style="font-size: 11px; font-weight: 500; color: ${colors.text}; text-transform: capitalize;">${key}</span>
          </div>
        `).join("")}
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;">
        ${flow.stages.map((stage, i) => {
          const stageMarkers = flow.markers.filter((m) => m.stageIndex === i);
          const stageExternal = flow.externalTouchpoints?.filter((tp) => tp.stageIndex === i) || [];
          return `
          <div style="position: relative;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
              <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600; color: #94a3b8; font-family: monospace;">${i + 1}</div>
            </div>
            <div style="border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; background: rgba(255,255,255,0.02); backdrop-filter: blur(8px); padding: 20px;">
              <h4 style="font-size: 14px; font-weight: 500; color: #e2e8f0; margin-bottom: 6px;">${escapeHTML(stage.name)}</h4>
              <p style="font-size: 12px; color: #64748b; margin-bottom: 12px; line-height: 1.5;">${escapeHTML(stage.description)}</p>

              ${stageExternal.map((tp) => {
                if (tp.type === "handoff") {
                  return `
                  <div style="margin-bottom: 8px; border-radius: 10px; border: 1px solid rgba(34,197,94,0.3); background: rgba(34,197,94,0.05); overflow: hidden;">
                    <div style="padding: 10px 14px; background: rgba(34,197,94,0.1); border-bottom: 1px solid rgba(34,197,94,0.2);">
                      <h5 style="font-size: 11px; font-weight: 700; color: #4ade80; text-transform: uppercase; letter-spacing: 0.05em; margin: 0;">${escapeHTML(tp.title)}</h5>
                    </div>
                    <div style="padding: 14px;">
                      ${tp.steps.map((step, j) => `
                        <div style="display: flex; gap: 10px; margin-bottom: 12px;">
                          <div style="width: 24px; height: 24px; border-radius: 50%; background: rgba(34,197,94,0.2); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: #4ade80; flex-shrink: 0;">${j + 1}</div>
                          <div>
                            <div style="font-size: 12px; font-weight: 600; color: #86efac; margin-bottom: 2px;">${escapeHTML(step.label)}</div>
                            <div style="font-size: 11px; color: #94a3b8; line-height: 1.5;">${escapeHTML(step.description)}</div>
                          </div>
                        </div>
                      `).join("")}
                    </div>
                  </div>`;
                } else {
                  return `
                  <div style="margin-bottom: 8px; border-radius: 10px; border: 1px solid rgba(6,182,212,0.3); background: rgba(6,182,212,0.05); overflow: hidden;">
                    <div style="padding: 10px 14px; background: rgba(6,182,212,0.1); border-bottom: 1px solid rgba(6,182,212,0.2);">
                      <h5 style="font-size: 11px; font-weight: 700; color: #22d3ee; text-transform: uppercase; letter-spacing: 0.05em; margin: 0;">${escapeHTML(tp.title)}</h5>
                    </div>
                    <div style="padding: 14px;">
                      <p style="font-size: 11px; color: #94a3b8; line-height: 1.5;">${escapeHTML(tp.summary)}</p>
                    </div>
                  </div>`;
                }
              }).join("")}

              ${stageMarkers.map((m) => {
                const mc = markerColors[m.type] || markerColors.pain;
                return `
                <div style="padding: 10px 12px; border-radius: 8px; background: ${mc.bg}; border-left: 3px solid ${mc.border}; margin: 6px 0;">
                  <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 3px;">
                    <div style="width: 6px; height: 6px; border-radius: 1px; background: ${mc.border};"></div>
                    <span style="font-size: 11px; font-weight: 600; color: ${mc.text};">${escapeHTML(m.title)}</span>
                  </div>
                  <p style="font-size: 11px; color: #94a3b8; line-height: 1.4; margin-left: 12px;">${escapeHTML(m.description)}</p>
                </div>`;
              }).join("")}
            </div>
          </div>`;
        }).join("")}
      </div>
    </div>`;
  };

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHTML(nodeLabel)} — Atlas Use Case</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif; background: #0A0A0F; color: #E2E8F0; line-height: 1.6; }
    .container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
    header { border-bottom: 1px solid rgba(255,255,255,0.08); background: rgba(10,10,15,0.85); backdrop-filter: blur(12px); position: sticky; top: 0; z-index: 50; }
    .header-inner { max-width: 1280px; margin: 0 auto; padding: 0 24px; height: 56px; display: flex; align-items: center; justify-content: space-between; }
    .header-logo { display: flex; align-items: center; gap: 8px; font-weight: 600; color: #e2e8f0; }
    .header-logo svg { width: 20px; height: 20px; color: #00D4FF; }
    main { padding: 32px 0 48px; }
    .hero { margin-bottom: 32px; }
    .badge { display: inline-flex; align-items: center; gap: 8px; margin-bottom: 12px; }
    .badge-dot { width: 16px; height: 16px; border-radius: 50%; background: #00D4FF; box-shadow: 0 0 12px rgba(0,212,255,0.5); }
    .badge-text { font-family: 'IBM Plex Mono', monospace; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.08em; color: #00D4FF; }
    h1 { font-size: 36px; font-weight: 700; color: #fff; margin-bottom: 16px; line-height: 1.2; }
    .description { font-size: 18px; color: #94a3b8; max-width: 768px; line-height: 1.7; }
    .accordion { border: 1px solid rgba(255,255,255,0.08); border-radius: 18px; background: rgba(255,255,255,0.02); padding: 0 24px; margin-bottom: 16px; overflow: hidden; }
    .accordion-header { display: flex; align-items: center; gap: 12px; padding: 20px 0; cursor: pointer; }
    .accordion-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .accordion-icon.coral { background: rgba(255,107,107,0.1); color: #FF6B6B; }
    .accordion-icon.purple { background: rgba(167,139,250,0.1); color: #A78BFA; }
    .accordion-icon.cyan { background: rgba(0,212,255,0.1); color: #00D4FF; }
    .accordion-title { font-size: 18px; font-weight: 600; color: #e2e8f0; }
    .accordion-subtitle { font-size: 12px; color: #64748b; font-weight: 400; margin-top: 2px; }
    .accordion-body { padding-bottom: 20px; }
    .persona-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px; }
    .persona-card { border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; background: rgba(255,255,255,0.02); padding: 20px; }
    .persona-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
    .persona-avatar { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; color: #fff; font-size: 16px; }
    .persona-name { font-weight: 600; color: #e2e8f0; font-size: 15px; }
    .persona-role { font-size: 13px; color: #64748b; }
    .persona-desc { font-size: 13px; color: #94a3b8; line-height: 1.5; margin-bottom: 12px; }
    .engagement-badge { display: inline-block; padding: 3px 12px; border-radius: 9999px; font-size: 11px; font-weight: 600; letter-spacing: 0.03em; }
    .engagement-primary { background: rgba(0,212,255,0.12); color: #00D4FF; border: 1px solid rgba(0,212,255,0.2); }
    .engagement-secondary { background: rgba(255,255,255,0.05); color: #94a3b8; border: 1px solid rgba(255,255,255,0.1); }
    .capability { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; padding: 16px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.06); background: rgba(255,255,255,0.02); margin-bottom: 12px; }
    .capability-name { font-weight: 500; color: #e2e8f0; font-size: 15px; }
    .capability-desc { font-size: 13px; color: #94a3b8; margin-top: 4px; line-height: 1.5; }
    .timeline-badge { display: inline-block; padding: 2px 10px; border-radius: 9999px; font-size: 10px; font-weight: 600; letter-spacing: 0.03em; text-transform: uppercase; white-space: nowrap; }
    footer { border-top: 1px solid rgba(255,255,255,0.06); padding: 32px 0 48px; margin-top: 32px; }
    .footer-inner { max-width: 1280px; margin: 0 auto; padding: 0 24px; display: flex; justify-content: space-between; align-items: center; color: #64748b; font-size: 14px; }
    .meta { font-size: 12px; color: #475569; margin-top: 32px; text-align: center; }
  </style>
</head>
<body>
  <header>
    <div class="header-inner">
      <div style="color: #94a3b8; font-size: 14px;">&larr; Back to Atlas</div>
      <div class="header-logo">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
        Atlas
      </div>
      <div style="font-size: 12px; color: #475569;">Exported ${date}</div>
    </div>
  </header>

  <main>
    <div class="container">
      <section class="hero">
        <div class="badge">
          <div class="badge-dot"></div>
          <span class="badge-text">Use Case</span>
        </div>
        <h1>${escapeHTML(nodeLabel)}</h1>
        <p class="description">${escapeHTML(detail.description)}</p>
      </section>

      <div class="accordion">
        <div class="accordion-header">
          <div class="accordion-icon coral">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><path d="M11 18H8a2 2 0 0 1-2-2V9"/></svg>
          </div>
          <div>
            <div class="accordion-title">As-Is &amp; To-Be Analysis</div>
            <div class="accordion-subtitle">As-Is flow with pain point legends &middot; To-Be flow with wow legends</div>
          </div>
        </div>
        <div class="accordion-body">
          ${renderFlow(detail.asIs, true)}
          ${renderFlow(detail.toBe, false)}
        </div>
      </div>

      <div class="accordion">
        <div class="accordion-header">
          <div class="accordion-icon purple">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div>
            <div class="accordion-title">Personas</div>
            <div class="accordion-subtitle">${detail.personas.length} involved &mdash; ${detail.personas.filter(p => p.engagement === "Primary").length} primary</div>
          </div>
        </div>
        <div class="accordion-body">
          <div class="persona-grid">
            ${detail.personas.map((p, i) => {
              const [c1, c2] = [gradientColors[i % gradientColors.length], gradientColors[(i + 1) % gradientColors.length]];
              return `
              <div class="persona-card">
                <div class="persona-header">
                  <div class="persona-avatar" style="background: linear-gradient(135deg, ${c1}, ${c2});">${p.name.charAt(0)}</div>
                  <div>
                    <div class="persona-name">${escapeHTML(p.name)}</div>
                    <div class="persona-role">${escapeHTML(p.role)}</div>
                  </div>
                </div>
                <p class="persona-desc">${escapeHTML(p.goals[0] || "")}</p>
                <span class="engagement-badge ${p.engagement === "Primary" ? "engagement-primary" : "engagement-secondary"}">${p.engagement}</span>
              </div>`;
            }).join("")}
          </div>
        </div>
      </div>

      <div class="accordion">
        <div class="accordion-header">
          <div class="accordion-icon cyan">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
          </div>
          <div>
            <div class="accordion-title">Capabilities Required</div>
            <div class="accordion-subtitle">${detail.capabilities.length} Atlas capabilities &middot; ${detail.capabilities.filter(c => c.timeline === "GA").length} GA &middot; ${detail.capabilities.filter(c => c.timeline === "H1 2027").length} H1 2027 &middot; ${detail.capabilities.filter(c => c.timeline === "H2 2027").length} H2 2027</div>
          </div>
        </div>
        <div class="accordion-body">
          ${detail.capabilities.map((cap) => {
            const tc = timelineColors[cap.timeline] || timelineColors.GA;
            return `
            <div class="capability">
              <div>
                <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                  <span class="capability-name">${escapeHTML(cap.name)}</span>
                  <span class="timeline-badge" style="background: ${tc.bg}; color: ${tc.text};">${cap.timeline}</span>
                </div>
                <p class="capability-desc">${escapeHTML(cap.description)}</p>
              </div>
            </div>`;
          }).join("")}
        </div>
      </div>

      <p class="meta">Exported from IBM Atlas Platform on ${date} at ${time}</p>
    </div>
  </main>

  <footer>
    <div class="footer-inner">
      <span>IBM Atlas Platform &mdash; ${new Date().getFullYear()}</span>
      <span style="display: flex; align-items: center; gap: 6px; color: #00D4FF;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
        Explore Atlas
      </span>
    </div>
  </footer>
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