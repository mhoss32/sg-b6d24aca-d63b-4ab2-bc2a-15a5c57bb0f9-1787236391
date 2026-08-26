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

  // Exact colors from asIsMarkerConfig / toBeMarkerConfig in FlowDiagram.tsx
  const asIsConfig: Record<string, { color: string; bg: string; border: string; label: string; iconSvg: string }> = {
    pain: {
      color: "#fb923c", // orange-400
      bg: "rgba(251,146,60,0.1)",
      border: "rgba(251,146,60,0.3)",
      label: "Business Impact",
      iconSvg: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fb923c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    },
    time: {
      color: "#fbbf24", // amber-400
      bg: "rgba(251,191,36,0.1)",
      border: "rgba(251,191,36,0.3)",
      label: "Lost Time",
      iconSvg: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    },
    skill: {
      color: "#f87171", // red-400
      bg: "rgba(248,113,113,0.1)",
      border: "rgba(248,113,113,0.3)",
      label: "Skill Gap / Bottleneck",
      iconSvg: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f87171" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    },
  };

  const toBeConfig: Record<string, { color: string; bg: string; border: string; label: string; iconSvg: string }> = {
    time: {
      color: "#22d3ee", // cyan-400
      bg: "rgba(34,211,238,0.1)",
      border: "rgba(34,211,238,0.3)",
      label: "Time Saving",
      iconSvg: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    },
    gain: {
      color: "#c084fc", // purple-400
      bg: "rgba(192,132,252,0.1)",
      border: "rgba(192,132,252,0.3)",
      label: "New User Capability",
      iconSvg: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c084fc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    },
    skill: {
      color: "#4ade80", // green-400
      bg: "rgba(74,222,128,0.1)",
      border: "rgba(74,222,128,0.3)",
      label: "Atlas AI & Automation",
      iconSvg: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.43.28a2 2 0 0 0 1.68.05 1 1 0 0 1 1.4 1.4 5 5 0 0 1-1.06 5.85l-.84.85a3 3 0 0 1-3.88.27"/><path d="m18 15-2-2"/></svg>',
    },
  };

  const timelineColors: Record<string, { bg: string; text: string }> = {
    GA: { bg: "rgba(34,197,94,0.15)", text: "#22c55e" },
    "H1 2027": { bg: "rgba(245,158,11,0.15)", text: "#f59e0b" },
    "H2 2027": { bg: "rgba(167,139,250,0.15)", text: "#a78bfa" },
  };

  const escapeHTML = (str: string) =>
    str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  const renderFlow = (flow: typeof detail.asIs, isAsIs: boolean) => {
    const config = isAsIs ? asIsConfig : toBeConfig;
    const sectionBg = isAsIs ? "rgba(239,68,68,0.03)" : "rgba(34,197,94,0.03)";
    const sectionBorder = isAsIs ? "rgba(239,68,68,0.2)" : "rgba(34,197,94,0.2)";
    const headerIconColor = isAsIs ? "#ef4444" : "#22c55e";
    const headerIconBg = isAsIs ? "rgba(239,68,68,0.1)" : "rgba(34,197,94,0.1)";
    const legendTitle = isAsIs ? "Pain Points" : "Wows!";
    const legendTitleColor = isAsIs ? "#f87171" : "#4ade80";
    const headerIconSvg = isAsIs
      ? '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>'
      : '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>';
    const subtitle = isAsIs
      ? "Current state — pain points highlighted"
      : "Desired outcome — gains highlighted";

    // Group markers by persona per stage
    const groupedByStage = flow.stages.map((_, stageIndex) => {
      const stageMarkers = flow.markers.filter((m) => m.stageIndex === stageIndex);
      const grouped: Record<string, typeof stageMarkers> = {};
      stageMarkers.forEach((m) => {
        if (!grouped[m.persona]) grouped[m.persona] = [];
        grouped[m.persona].push(m);
      });
      return grouped;
    });

    return `
    <div style="border: 1px solid ${sectionBorder}; border-radius: 16px; background: ${sectionBg}; padding: 24px; margin-bottom: 24px;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
        <div style="width: 40px; height: 40px; border-radius: 10px; background: ${headerIconBg}; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${headerIconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${headerIconSvg}</svg>
        </div>
        <div>
          <h3 style="font-size: 18px; font-weight: 600; color: #e2e8f0; margin: 0;">${escapeHTML(flow.title)}</h3>
          <p style="font-size: 12px; color: #64748b; margin: 2px 0 0;">${subtitle}</p>
        </div>
      </div>

      <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin-bottom: 20px; padding: 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.06); background: rgba(255,255,255,0.02);">
        <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: ${legendTitleColor};">${legendTitle}</span>
        <div style="width: 1px; height: 16px; background: rgba(255,255,255,0.1);"></div>
        ${Object.entries(config).map(([key, style]) => `
          <div style="display: flex; align-items: center; gap: 6px;">
            <div style="width: 20px; height: 20px; border-radius: 4px; background: ${style.bg}; display: flex; align-items: center; justify-content: center;">${style.iconSvg}</div>
            <span style="font-size: 11px; color: #94a3b8;">${style.label}</span>
          </div>
        `).join("")}
      </div>

      ${!isAsIs && flow.externalTouchpoints && flow.externalTouchpoints.length > 0 ? `
      <div style="margin-bottom: 16px; padding: 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.06); background: rgba(255,255,255,0.02);">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.43.28a2 2 0 0 0 1.68.05 1 1 0 0 1 1.4 1.4 5 5 0 0 1-1.06 5.85l-.84.85a3 3 0 0 1-3.88.27"/><path d="m18 15-2-2"/></svg>
          <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b;">External Integrations</span>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          ${["bob-ppz", "concert4z"].map((pid) => {
            const hasTp = flow.externalTouchpoints?.some((tp) => tp.product.toLowerCase().replace(/\\s+/g, "-") === pid);
            const label = pid === "bob-ppz" ? "Bob PPZ" : "Concert4Z";
            return `
            <label style="display: inline-flex; align-items: center; gap: 8px; padding: 6px 12px; border-radius: 6px; border: 1px solid ${hasTp ? "rgba(0,212,255,0.3)" : "rgba(255,255,255,0.1)"}; background: ${hasTp ? "rgba(0,212,255,0.05)" : "rgba(255,255,255,0.02)"}; cursor: ${hasTp ? "pointer" : "not-allowed"}; opacity: ${hasTp ? "1" : "0.4"};">
              <input type="checkbox" ${hasTp ? "" : "disabled"} class="ext-toggle" data-product="${pid}" style="width: 14px; height: 14px; accent-color: #00D4FF;">
              <span style="font-size: 11px; font-weight: 500; color: ${hasTp ? "#e2e8f0" : "#64748b"};">${label}</span>
            </label>`;
          }).join("")}
        </div>
      </div>` : ""}

      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;">
        ${flow.stages.map((stage, i) => {
          const stageExternal = flow.externalTouchpoints?.filter((tp) => tp.stageIndex === i) || [];
          const grouped = groupedByStage[i];
          return `
          <div style="position: relative;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
              <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600; color: #94a3b8; font-family: 'IBM Plex Mono', monospace;">${i + 1}</div>
            </div>
            <div style="border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; background: rgba(255,255,255,0.02); backdrop-filter: blur(8px); padding: 20px;">
              <h4 style="font-size: 14px; font-weight: 500; color: #e2e8f0; margin-bottom: 6px; line-height: 1.4;">${escapeHTML(stage.name)}</h4>
              <p style="font-size: 12px; color: #64748b; margin-bottom: 12px; line-height: 1.6;">${escapeHTML(stage.description)}</p>

              ${stageExternal.map((tp) => {
                const pid = tp.product.toLowerCase().replace(/\\s+/g, "-");
                if (tp.type === "handoff") {
                  return `
                  <div class="ext-box ext-${pid}" style="margin-bottom: 8px; border-radius: 10px; border: 1px solid rgba(34,197,94,0.25); background: rgba(34,197,94,0.04); overflow: hidden; display: none; cursor: pointer;" onclick="openModal(this)">
                    <div style="padding: 10px 14px; background: rgba(34,197,94,0.08); border-bottom: 1px solid rgba(34,197,94,0.15);">
                      <h5 style="font-size: 11px; font-weight: 700; color: #4ade80; text-transform: uppercase; letter-spacing: 0.05em; margin: 0;">${escapeHTML(tp.title)}</h5>
                    </div>
                    <div style="padding: 14px;">
                      ${tp.steps.map((step, j) => `
                        <div style="display: flex; gap: 10px; ${j < tp.steps.length - 1 ? "margin-bottom: 12px;" : ""}">
                          <div style="width: 24px; height: 24px; border-radius: 50%; background: rgba(34,197,94,0.15); display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; color: #4ade80; flex-shrink: 0;">${j + 1}</div>
                          <div>
                            <div style="font-size: 11px; font-weight: 600; color: #86efac; margin-bottom: 2px;">${escapeHTML(step.label)}</div>
                            <div style="font-size: 11px; color: #94a3b8; line-height: 1.5;">${escapeHTML(step.description).replace(/^([^.!?]+[.!?])/g, "$1")}</div>
                          </div>
                        </div>
                      `).join("")}
                    </div>
                  </div>`;
                } else {
                  return `
                  <div class="ext-box ext-${pid}" style="margin-bottom: 8px; border-radius: 10px; border: 1px solid rgba(6,182,212,0.25); background: rgba(6,182,212,0.04); overflow: hidden; display: none; cursor: pointer;" onclick="openModal(this)">
                    <div style="padding: 10px 14px; background: rgba(6,182,212,0.08); border-bottom: 1px solid rgba(6,182,212,0.15);">
                      <h5 style="font-size: 11px; font-weight: 700; color: #22d3ee; text-transform: uppercase; letter-spacing: 0.05em; margin: 0;">${escapeHTML(tp.title)}</h5>
                    </div>
                    <div style="padding: 14px;">
                      <p style="font-size: 11px; color: #94a3b8; line-height: 1.5;">${escapeHTML(tp.summary).replace(/^([^.!?]+[.!?])/g, "$1")}</p>
                    </div>
                  </div>`;
                }
              }).join("")}

              ${Object.entries(grouped).map(([persona, markers]) => `
                <details style="margin-bottom: 6px;">
                  <summary style="display: flex; align-items: center; gap: 8px; padding: 6px 10px; border-radius: 8px; background: rgba(255,255,255,0.03); cursor: pointer; font-size: 12px; font-weight: 600; color: #e2e8f0; list-style: none; user-select: none;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;"><polyline points="9 18 15 12 9 6"/></svg>
                    <span>${escapeHTML(persona)}</span>
                    <span style="margin-left: auto; font-size: 10px; font-weight: 400; color: #64748b;">${markers.length} ${markers.length === 1 ? "item" : "items"}</span>
                  </summary>
                  <div style="padding-left: 22px; padding-top: 4px;">
                    ${markers.map((m) => {
                      const mc = config[m.type];
                      if (!mc) return "";
                      return `
                      <div style="display: flex; flex-direction: column; gap: 4px; padding: 10px 12px; border-radius: 8px; background: ${mc.bg}; border: 1px solid ${mc.border}; margin: 4px 0;">
                        <div style="display: flex; align-items: center; gap: 6px;">
                          ${mc.iconSvg}
                          <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: ${mc.color};">${mc.label}</span>
                        </div>
                        <span style="font-size: 11px; font-weight: 500; color: #e2e8f0; line-height: 1.4;">${escapeHTML(m.title)}</span>
                        <span style="font-size: 10px; color: #94a3b8; line-height: 1.5;">${escapeHTML(m.description)}</span>
                      </div>`;
                    }).join("")}
                  </div>
                </details>
              `).join("")}
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
    .header-logo { display: flex; align-items: center; gap: 8px; font-weight: 600; color: #e2e8f0; font-size: 15px; }
    .header-logo svg { width: 20px; height: 20px; color: #00D4FF; flex-shrink: 0; }
    main { padding: 32px 0 48px; }
    .hero { margin-bottom: 32px; }
    .badge-row { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; flex-wrap: wrap; }
    .badge { display: inline-flex; align-items: center; gap: 8px; }
    .badge-dot { width: 16px; height: 16px; border-radius: 50%; background: #00D4FF; box-shadow: 0 0 12px rgba(0,212,255,0.5); }
    .badge-text { font-family: 'IBM Plex Mono', monospace; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.08em; color: #00D4FF; }
    h1 { font-size: 36px; font-weight: 700; color: #fff; margin-bottom: 16px; line-height: 1.2; }
    .description { font-size: 18px; color: #94a3b8; max-width: 768px; line-height: 1.7; }
    details.accordion { border: 1px solid rgba(255,255,255,0.08); border-radius: 18px; background: rgba(255,255,255,0.02); margin-bottom: 16px; overflow: hidden; }
    details.accordion > summary { display: flex; align-items: center; gap: 12px; padding: 20px 24px; cursor: pointer; list-style: none; user-select: none; }
    details.accordion > summary::-webkit-details-marker { display: none; }
    details.accordion > summary svg.chevron { width: 16px; height: 16px; color: #64748b; flex-shrink: 0; transition: transform 0.2s; margin-left: auto; }
    details.accordion[open] > summary svg.chevron { transform: rotate(180deg); }
    .accordion-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .accordion-icon.coral { background: rgba(255,107,107,0.1); color: #FF6B6B; }
    .accordion-icon.purple { background: rgba(167,139,250,0.1); color: #A78BFA; }
    .accordion-icon.cyan { background: rgba(0,212,255,0.1); color: #00D4FF; }
    .accordion-title { font-size: 18px; font-weight: 600; color: #e2e8f0; }
    .accordion-subtitle { font-size: 12px; color: #64748b; font-weight: 400; margin-top: 2px; }
    .accordion-body { padding: 0 24px 20px; }
    .persona-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px; }
    .persona-card { position: relative; border-radius: 14px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.02); padding: 20px; }
    .persona-card.primary { border-color: rgba(0,212,255,0.25); box-shadow: 0 0 20px rgba(0,212,255,0.06); }
    .persona-star { position: absolute; top: -10px; right: -10px; width: 20px; height: 20px; color: #00D4FF; }
    .persona-header { display: flex; align-items: flex-start; gap: 16px; }
    .persona-avatar { flex-shrink: 0; width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
    .persona-avatar svg { width: 28px; height: 28px; }
    .persona-avatar.primary { background: rgba(0,212,255,0.12); color: #00D4FF; }
    .persona-avatar.secondary { background: rgba(255,255,255,0.06); color: #64748b; }
    .persona-name { font-size: 15px; font-weight: 600; color: #e2e8f0; margin-bottom: 2px; }
    .persona-role { font-size: 13px; color: #64748b; margin-bottom: 12px; }
    .engagement-badge { display: inline-block; padding: 3px 12px; border-radius: 9999px; font-size: 10px; font-weight: 600; letter-spacing: 0.03em; text-transform: uppercase; }
    .engagement-primary { background: rgba(0,212,255,0.1); color: #00D4FF; border: 1px solid rgba(0,212,255,0.2); }
    .engagement-secondary { background: rgba(255,255,255,0.04); color: #94a3b8; border: 1px solid rgba(255,255,255,0.1); }
    .capability { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; padding: 16px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.06); background: rgba(255,255,255,0.02); margin-bottom: 12px; transition: border-color 0.2s; }
    .capability:hover { border-color: rgba(0,212,255,0.2); }
    .capability-name { font-weight: 500; color: #e2e8f0; font-size: 15px; }
    .capability-desc { font-size: 13px; color: #94a3b8; margin-top: 4px; line-height: 1.5; }
    .timeline-badge { display: inline-block; padding: 2px 10px; border-radius: 9999px; font-size: 10px; font-weight: 600; letter-spacing: 0.03em; text-transform: uppercase; white-space: nowrap; }
    footer { border-top: 1px solid rgba(255,255,255,0.06); padding: 32px 0 48px; margin-top: 32px; }
    .footer-inner { max-width: 1280px; margin: 0 auto; padding: 0 24px; display: flex; justify-content: space-between; align-items: center; color: #64748b; font-size: 14px; }
    .meta { font-size: 12px; color: #475569; margin-top: 32px; text-align: center; }
    details > summary::-webkit-details-marker { display: none; }
    details > summary { list-style: none; }
    .modal-overlay { display: none; position: fixed; inset: 0; z-index: 100; align-items: center; justify-content: center; padding: 16px; }
    .modal-overlay.active { display: flex; }
    .modal-backdrop { position: absolute; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); }
    .modal-content { position: relative; max-width: 512px; width: 100%; max-height: 80vh; overflow-y: auto; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); background: rgba(15,15,25,0.95); backdrop-filter: blur(12px); padding: 24px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); }
    .modal-close { position: absolute; top: 16px; right: 16px; background: none; border: none; color: #64748b; cursor: pointer; padding: 4px; }
    .modal-close:hover { color: #e2e8f0; }
  </style>
</head>
<body>
  <div class="modal-overlay" id="modal">
    <div class="modal-backdrop" onclick="closeModal()"></div>
    <div class="modal-content" id="modal-content"></div>
  </div>

  <header>
    <div class="header-inner">
      <div style="color: #94a3b8; font-size: 14px; display: flex; align-items: center; gap: 6px;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
        Back to Atlas
      </div>
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
        <div class="badge-row">
          <div class="badge">
            <div class="badge-dot"></div>
            <span class="badge-text">Use Case</span>
          </div>
        </div>
        <h1>${escapeHTML(nodeLabel)}</h1>
        <p class="description">${escapeHTML(detail.description)}</p>
      </section>

      <details class="accordion" open>
        <summary>
          <div class="accordion-icon coral">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><path d="M11 18H8a2 2 0 0 1-2-2V9"/></svg>
          </div>
          <div>
            <div class="accordion-title">As-Is &amp; To-Be Analysis</div>
            <div class="accordion-subtitle">As-Is flow with pain point legends &middot; To-Be flow with wow legends &middot; Double-click markers to edit</div>
          </div>
          <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </summary>
        <div class="accordion-body">
          ${renderFlow(detail.asIs, true)}
          ${renderFlow(detail.toBe, false)}
        </div>
      </details>

      <details class="accordion" open>
        <summary>
          <div class="accordion-icon purple">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div>
            <div class="accordion-title">Personas</div>
            <div class="accordion-subtitle">${detail.personas.length} involved &mdash; ${detail.personas.filter(p => p.engagement === "Primary").length} primary</div>
          </div>
          <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </summary>
        <div class="accordion-body">
          <div class="persona-grid">
            ${detail.personas.map((p, i) => {
              const isPrimary = p.engagement === "Primary";
              return `
              <div class="persona-card ${isPrimary ? "primary" : ""}">
                ${isPrimary ? `<svg class="persona-star" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>` : ""}
                <div class="persona-header">
                  <div class="persona-avatar ${isPrimary ? "primary" : "secondary"}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/></svg>
                  </div>
                  <div>
                    <div class="persona-name">${escapeHTML(p.name)}</div>
                    <div class="persona-role">${escapeHTML(p.role)}</div>
                    <span class="engagement-badge ${isPrimary ? "engagement-primary" : "engagement-secondary"}">${p.engagement}</span>
                  </div>
                </div>
              </div>`;
            }).join("")}
          </div>
        </div>
      </details>

      <details class="accordion" open>
        <summary>
          <div class="accordion-icon cyan">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
          </div>
          <div>
            <div class="accordion-title">Capabilities Required</div>
            <div class="accordion-subtitle">${detail.capabilities.length} Atlas capabilities &middot; ${detail.capabilities.filter(c => c.timeline === "GA").length} GA &middot; ${detail.capabilities.filter(c => c.timeline === "H1 2027").length} H1 2027 &middot; ${detail.capabilities.filter(c => c.timeline === "H2 2027").length} H2 2027</div>
          </div>
          <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </summary>
        <div class="accordion-body">
          ${detail.capabilities.map((cap) => {
            const tc = timelineColors[cap.timeline] || timelineColors.GA;
            return `
            <div class="capability">
              <div>
                <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 4px;">
                  <span class="capability-name">${escapeHTML(cap.name)}</span>
                  <span class="timeline-badge" style="background: ${tc.bg}; color: ${tc.text};">${cap.timeline}</span>
                </div>
                <p class="capability-desc">${escapeHTML(cap.description)}</p>
              </div>
            </div>`;
          }).join("")}
        </div>
      </details>

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

  <script>
    (function() {
      document.querySelectorAll('.ext-toggle').forEach(function(cb) {
        cb.addEventListener('change', function() {
          var product = this.dataset.product;
          var show = this.checked;
          document.querySelectorAll('.ext-box.ext-' + product).forEach(function(box) {
            box.style.display = show ? 'block' : 'none';
          });
        });
      });
    })();

    function openModal(el) {
      var modal = document.getElementById('modal');
      var content = document.getElementById('modal-content');
      content.innerHTML = '<button class="modal-close" onclick="closeModal()"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>' + el.innerHTML;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      var modal = document.getElementById('modal');
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeModal();
    });
  </script>
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