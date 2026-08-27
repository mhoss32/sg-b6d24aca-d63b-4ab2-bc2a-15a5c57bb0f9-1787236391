import { useCaseDetails, productNodes, personaData } from "@/data/productData";
import type { UseCaseDetail, FlowDiagram, ExternalTouchpoint } from "@/data/productData";

const asIsConfig: Record<string, { color: string; bg: string; border: string; label: string; iconSvg: string }> = {
  pain: {
    color: "#fb923c",
    bg: "rgba(251,146,60,0.1)",
    border: "rgba(251,146,60,0.3)",
    label: "Business Impact",
    iconSvg: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fb923c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  },
  time: {
    color: "#fbbf24",
    bg: "rgba(251,191,36,0.1)",
    border: "rgba(251,191,36,0.3)",
    label: "Lost Time",
    iconSvg: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  },
  skill: {
    color: "#f87171",
    bg: "rgba(248,113,113,0.1)",
    border: "rgba(248,113,113,0.3)",
    label: "Skill Gap / Bottleneck",
    iconSvg: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f87171" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  },
};

const toBeConfig: Record<string, { color: string; bg: string; border: string; label: string; iconSvg: string }> = {
  time: {
    color: "#22d3ee",
    bg: "rgba(34,211,238,0.1)",
    border: "rgba(34,211,238,0.3)",
    label: "Time Saving",
    iconSvg: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  },
  gain: {
    color: "#c084fc",
    bg: "rgba(192,132,252,0.1)",
    border: "rgba(192,132,252,0.3)",
    label: "New User Capability",
    iconSvg: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c084fc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  },
  skill: {
    color: "#4ade80",
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

const PILLARS = [
  { id: "system", name: "System Intelligence", shortName: "SI", color: "#00D4FF", bg: "rgba(0,212,255,0.1)", border: "rgba(0,212,255,0.3)" },
  { id: "change", name: "Change Intelligence", shortName: "CI", color: "#FF6B6B", bg: "rgba(255,107,107,0.1)", border: "rgba(255,107,107,0.3)" },
  { id: "predictive", name: "Predictive Intelligence", shortName: "PI", color: "#A78BFA", bg: "rgba(167,139,250,0.1)", border: "rgba(167,139,250,0.3)" },
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

const escapeHTML = (str: string) =>
  str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function renderFlow(flow: FlowDiagram, isAsIs: boolean, ucId: string) {
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
              <input type="checkbox" ${hasTp ? "" : "disabled"} class="ext-toggle" data-uc="${ucId}" data-product="${pid}" style="width: 14px; height: 14px; accent-color: #00D4FF;">
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

              ${stageExternal.map((tp) => renderExternalTouchpoint(tp, ucId)).join("")}

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
}

function renderExternalTouchpoint(tp: ExternalTouchpoint, ucId: string): string {
  const pid = tp.product.toLowerCase().replace(/\s+/g, "-");
  if (tp.type === "handoff") {
    return `
    <div class="ext-box ext-${ucId}-${pid}" style="margin-bottom: 8px; border-radius: 10px; border: 1px solid rgba(34,197,94,0.25); background: rgba(34,197,94,0.04); overflow: hidden; display: none; cursor: pointer;" onclick="openModal(this)">
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
  }
  return `
  <div class="ext-box ext-${ucId}-${pid}" style="margin-bottom: 8px; border-radius: 10px; border: 1px solid rgba(6,182,212,0.25); background: rgba(6,182,212,0.04); overflow: hidden; display: none; cursor: pointer;" onclick="openModal(this)">
    <div style="padding: 10px 14px; background: rgba(6,182,212,0.08); border-bottom: 1px solid rgba(6,182,212,0.15);">
      <h5 style="font-size: 11px; font-weight: 700; color: #22d3ee; text-transform: uppercase; letter-spacing: 0.05em; margin: 0;">${escapeHTML(tp.title)}</h5>
    </div>
    <div style="padding: 14px;">
      <p style="font-size: 11px; color: #94a3b8; line-height: 1.5;">${escapeHTML(tp.summary).replace(/^([^.!?]+[.!?])/g, "$1")}</p>
    </div>
  </div>`;
}

function renderUseCasePage(id: string, detail: UseCaseDetail): string {
  const node = productNodes.find((n) => n.id === id);
  const pillarId = node?.connections[0];
  const pillarConfig: Record<string, { name: string; color: string }> = {
    system: { name: "System Intelligence", color: "#00D4FF" },
    change: { name: "Change Intelligence", color: "#FF6B6B" },
    predictive: { name: "Predictive Intelligence", color: "#A78BFA" },
  };
  const pillar = pillarId ? pillarConfig[pillarId] : null;

  return `
  <section id="uc-${id}" class="page-section" style="display: none;">
    <div class="container" style="padding-top: 32px; padding-bottom: 48px;">
      <section class="hero" style="margin-bottom: 32px;">
        <div class="badge-row" style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px; flex-wrap: wrap;">
          <div class="badge" style="display: inline-flex; align-items: center; gap: 8px;">
            <div class="badge-dot" style="width: 16px; height: 16px; border-radius: 50%; background: #00D4FF; box-shadow: 0 0 12px rgba(0,212,255,0.5);"></div>
            <span class="badge-text" style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.08em; color: #00D4FF;">Use Case</span>
          </div>
          ${pillar ? `
          <span style="display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 500; color: ${pillar.color}; padding: 4px 12px; border-radius: 9999px; border: 1px solid ${pillar.color}33; background: ${pillar.color}14;">
            ${pillar.name}
          </span>` : ""}
        </div>
        <h1 style="font-size: 36px; font-weight: 700; color: #fff; margin-bottom: 16px; line-height: 1.2;">${escapeHTML(detail.label)}</h1>
        <p style="font-size: 18px; color: #94a3b8; max-width: 768px; line-height: 1.7;">${escapeHTML(detail.description)}</p>
      </section>

      <details class="accordion" open>
        <summary style="display: flex; align-items: center; gap: 12px; padding: 20px 24px; cursor: pointer; list-style: none; user-select: none;">
          <div class="accordion-icon coral" style="width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; background: rgba(255,107,107,0.1); color: #FF6B6B;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><path d="M11 18H8a2 2 0 0 1-2-2V9"/></svg>
          </div>
          <div>
            <div style="font-size: 18px; font-weight: 600; color: #e2e8f0;">As-Is &amp; To-Be Analysis</div>
            <div style="font-size: 12px; color: #64748b; font-weight: 400; margin-top: 2px;">As-Is flow with pain point legends &middot; To-Be flow with wow legends</div>
          </div>
          <svg class="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0; transition: transform 0.2s; margin-left: auto;"><polyline points="6 9 12 15 18 9"/></svg>
        </summary>
        <div style="padding: 0 24px 20px;">
          ${renderFlow(detail.asIs, true, id)}
          ${renderFlow(detail.toBe, false, id)}
        </div>
      </details>

      <details class="accordion" open>
        <summary style="display: flex; align-items: center; gap: 12px; padding: 20px 24px; cursor: pointer; list-style: none; user-select: none;">
          <div class="accordion-icon purple" style="width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; background: rgba(167,139,250,0.1); color: #A78BFA;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div>
            <div style="font-size: 18px; font-weight: 600; color: #e2e8f0;">Personas</div>
            <div style="font-size: 12px; color: #64748b; font-weight: 400; margin-top: 2px;">${detail.personas.length} involved &mdash; ${detail.personas.filter(p => p.engagement === "Primary").length} primary</div>
          </div>
          <svg class="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0; transition: transform 0.2s; margin-left: auto;"><polyline points="6 9 12 15 18 9"/></svg>
        </summary>
        <div style="padding: 0 24px 20px;">
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px;">
            ${detail.personas.map((p, i) => {
              const isPrimary = p.engagement === "Primary";
              return `
              <div onclick="showPage('persona-${p.name.toLowerCase()}')" style="cursor: pointer; position: relative; border-radius: 14px; border: 1px solid ${isPrimary ? "rgba(0,212,255,0.25)" : "rgba(255,255,255,0.08)"}; background: rgba(255,255,255,0.02); padding: 20px; ${isPrimary ? "box-shadow: 0 0 20px rgba(0,212,255,0.06);" : ""} transition: border-color 0.2s;">
                ${isPrimary ? `<svg style="position: absolute; top: -10px; right: -10px; width: 20px; height: 20px; color: #00D4FF;" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>` : ""}
                <div style="display: flex; align-items: flex-start; gap: 16px;">
                  <div style="flex-shrink: 0; width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; ${isPrimary ? "background: rgba(0,212,255,0.12); color: #00D4FF;" : "background: rgba(255,255,255,0.06); color: #64748b;"}">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/></svg>
                  </div>
                  <div>
                    <div style="font-size: 15px; font-weight: 600; color: #e2e8f0; margin-bottom: 2px;">${escapeHTML(p.name)}</div>
                    <div style="font-size: 13px; color: #64748b; margin-bottom: 12px;">${escapeHTML(p.role)}</div>
                    <span style="display: inline-block; padding: 3px 12px; border-radius: 9999px; font-size: 10px; font-weight: 600; letter-spacing: 0.03em; text-transform: uppercase; ${isPrimary ? "background: rgba(0,212,255,0.1); color: #00D4FF; border: 1px solid rgba(0,212,255,0.2);" : "background: rgba(255,255,255,0.04); color: #94a3b8; border: 1px solid rgba(255,255,255,0.1);"}">${p.engagement}</span>
                  </div>
                </div>
              </div>`;
            }).join("")}
          </div>
        </div>
      </details>

      <details class="accordion" open>
        <summary style="display: flex; align-items: center; gap: 12px; padding: 20px 24px; cursor: pointer; list-style: none; user-select: none;">
          <div class="accordion-icon cyan" style="width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; background: rgba(0,212,255,0.1); color: #00D4FF;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
          </div>
          <div>
            <div style="font-size: 18px; font-weight: 600; color: #e2e8f0;">Capabilities Required</div>
            <div style="font-size: 12px; color: #64748b; font-weight: 400; margin-top: 2px;">${detail.capabilities.length} Atlas capabilities &middot; ${detail.capabilities.filter(c => c.timeline === "GA").length} GA &middot; ${detail.capabilities.filter(c => c.timeline === "H1 2027").length} H1 2027 &middot; ${detail.capabilities.filter(c => c.timeline === "H2 2027").length} H2 2027</div>
          </div>
          <svg class="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0; transition: transform 0.2s; margin-left: auto;"><polyline points="6 9 12 15 18 9"/></svg>
        </summary>
        <div style="padding: 0 24px 20px;">
          ${detail.capabilities.map((cap) => {
            const tc = timelineColors[cap.timeline] || timelineColors.GA;
            return `
            <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; padding: 16px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.06); background: rgba(255,255,255,0.02); margin-bottom: 12px; transition: border-color 0.2s;">
              <div>
                <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 4px;">
                  <span style="font-weight: 500; color: #e2e8f0; font-size: 15px;">${escapeHTML(cap.name)}</span>
                  <span style="display: inline-block; padding: 2px 10px; border-radius: 9999px; font-size: 10px; font-weight: 600; letter-spacing: 0.03em; text-transform: uppercase; white-space: nowrap; background: ${tc.bg}; color: ${tc.text};">${cap.timeline}</span>
                </div>
                <p style="font-size: 13px; color: #94a3b8; margin-top: 4px; line-height: 1.5;">${escapeHTML(cap.description)}</p>
              </div>
            </div>`;
          }).join("")}
        </div>
      </details>
    </div>
  </section>`;
}

function renderPersonaPage(name: string, info: typeof personaData[string]): string {
  const { primary, secondary } = (() => {
    const p: { id: string; detail: UseCaseDetail }[] = [];
    const s: { id: string; detail: UseCaseDetail }[] = [];
    for (const [id, detail] of Object.entries(useCaseDetails)) {
      const match = detail.personas.find((pp) => pp.name.toLowerCase() === name.toLowerCase());
      if (match) {
        if (match.engagement === "Primary") p.push({ id, detail });
        else s.push({ id, detail });
      }
    }
    return { primary: p, secondary: s };
  })();

  return `
  <section id="persona-${name.toLowerCase()}" class="page-section" style="display: none;">
    <div class="container" style="padding-top: 32px; padding-bottom: 48px;">
      <section class="hero" style="margin-bottom: 32px;">
        <div class="badge-row" style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px; flex-wrap: wrap;">
          <div class="badge" style="display: inline-flex; align-items: center; gap: 8px;">
            <div style="width: 16px; height: 16px; border-radius: 50%; background: #A78BFA; box-shadow: 0 0 12px rgba(167,139,250,0.5);"></div>
            <span style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.08em; color: #A78BFA;">Persona</span>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
          <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(167,139,250,0.12); color: #A78BFA; display: flex; align-items: center; justify-content: center;">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/></svg>
          </div>
          <div>
            <h1 style="font-size: 36px; font-weight: 700; color: #fff; line-height: 1.2;">${escapeHTML(info.name)}</h1>
            <p style="font-size: 16px; color: #94a3b8;">${escapeHTML(info.role)}</p>
          </div>
        </div>
        <p style="font-size: 18px; color: #94a3b8; max-width: 768px; line-height: 1.7;">${escapeHTML(info.summary)}</p>
      </section>

      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px; margin-bottom: 32px;">
        <div>
          ${info.quote ? `
          <div style="border-radius: 14px; border-left: 4px solid #00D4FF; background: rgba(0,212,255,0.05); padding: 20px; margin-bottom: 24px;">
            <p style="font-style: italic; color: #e2e8f0; line-height: 1.6;">"${escapeHTML(info.quote)}"</p>
          </div>` : ""}

          ${info.painPoints && info.painPoints.length > 0 ? `
          <div style="border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; background: rgba(255,255,255,0.02); padding: 20px; margin-bottom: 24px;">
            <h3 style="font-size: 16px; font-weight: 600; color: #e2e8f0; margin-bottom: 12px;">Key Pain Points</h3>
            <ul style="list-style: none; padding: 0; margin: 0;">
              ${info.painPoints.map((point) => `
                <li style="display: flex; align-items: start; gap: 8px; color: #94a3b8; margin-bottom: 8px; line-height: 1.5;">
                  <span style="color: #00D4FF; margin-top: 2px; flex-shrink: 0;">•</span>
                  <span>${escapeHTML(point)}</span>
                </li>
              `).join("")}
            </ul>
          </div>` : ""}
        </div>

        <div style="space-y: 6;">
          <div style="border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; background: rgba(255,255,255,0.02); padding: 20px; margin-bottom: 16px;">
            <h3 style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #475569; margin-bottom: 16px;">Details</h3>
            <div style="margin-bottom: 12px;">
              <p style="font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Experience</p>
              <p style="font-size: 13px; color: #e2e8f0;">${escapeHTML(info.experience)}</p>
            </div>
            <div style="margin-bottom: 12px;">
              <p style="font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Primary Concerns</p>
              <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                ${info.concerns.map((c) => `
                  <span style="font-size: 11px; padding: 4px 10px; border-radius: 6px; background: rgba(255,255,255,0.05); color: #94a3b8;">${escapeHTML(c)}</span>
                `).join("")}
              </div>
            </div>
            <div>
              <p style="font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Use Cases</p>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 13px; font-weight: 500; color: #00D4FF;">${primary.length}</span>
                <span style="font-size: 13px; color: #94a3b8;">Primary</span>
                <span style="color: #475569;">·</span>
                <span style="font-size: 13px; font-weight: 500; color: #A78BFA;">${secondary.length}</span>
                <span style="font-size: 13px; color: #94a3b8;">Secondary</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      ${primary.length > 0 ? `
      <div style="margin-bottom: 24px;">
        <h2 style="font-size: 20px; font-weight: 600; color: #e2e8f0; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          Primary Use Cases
        </h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px;">
          ${primary.map(({ id, detail }) => renderPersonaUseCaseTile(id, detail, "Primary", info.name)).join("")}
        </div>
      </div>` : ""}

      ${secondary.length > 0 ? `
      <div>
        <h2 style="font-size: 20px; font-weight: 600; color: #e2e8f0; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
          <span style="width: 20px; height: 20px; border-radius: 50%; border: 2px solid #A78BFA; display: flex; align-items: center; justify-content: center;">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: #A78BFA;"></span>
          </span>
          Secondary Use Cases
        </h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px;">
          ${secondary.map(({ id, detail }) => renderPersonaUseCaseTile(id, detail, "Secondary", info.name)).join("")}
        </div>
      </div>` : ""}
    </div>
  </section>`;
}

function renderPersonaUseCaseTile(id: string, uc: UseCaseDetail, engagement: string, personaName: string): string {
  const isPrimary = engagement === "Primary";
  const detail = uc;
  const asIsMarkers = detail.asIs.markers.filter((m) => m.persona === personaName) || [];
  const toBeMarkers = detail.toBe.markers.filter((m) => m.persona === personaName) || [];

  const markerConfig: Record<string, { bg: string; border: string; text: string; label: string; iconSvg: string }> = {
    pain: { bg: "rgba(251,146,60,0.1)", border: "rgba(251,146,60,0.3)", text: "#fb923c", label: "Business Impact", iconSvg: '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fb923c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' },
    time: { bg: "rgba(251,191,36,0.1)", border: "rgba(251,191,36,0.3)", text: "#fbbf24", label: "Lost Time", iconSvg: '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' },
    skill: { bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.3)", text: "#f87171", label: "Skill Gap / Bottleneck", iconSvg: '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#f87171" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' },
    gain: { bg: "rgba(192,132,252,0.1)", border: "rgba(192,132,252,0.3)", text: "#c084fc", label: "New User Capability", iconSvg: '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#c084fc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
  };

  const renderMarkers = (markers: typeof asIsMarkers, sectionId: string, sectionLabel: string, labelColor: string) => {
    if (markers.length === 0) return "";
    return `
    <div style="margin-top: 12px;">
      <details style="cursor: default;">
        <summary onclick="event.stopPropagation();" style="display: flex; align-items: center; gap: 8px; padding: 6px 10px; border-radius: 8px; background: rgba(255,255,255,0.03); cursor: pointer; font-size: 12px; font-weight: 600; color: ${labelColor}; list-style: none; user-select: none;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${labelColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0; transition: transform 0.2s;"><polyline points="9 18 15 12 9 6"/></svg>
          <span>${sectionLabel}</span>
          <span style="margin-left: auto; font-size: 10px; font-weight: 400; color: #64748b;">${markers.length} ${markers.length === 1 ? "item" : "items"}</span>
        </summary>
        <div style="padding-top: 8px; display: flex; flex-direction: column; gap: 6px;">
          ${markers.map((m) => {
            const mc = markerConfig[m.type] || markerConfig.pain;
            return `
            <div style="display: flex; flex-direction: column; gap: 4px; padding: 10px 12px; border-radius: 8px; background: ${mc.bg}; border: 1px solid ${mc.border};">
              <div style="display: flex; align-items: center; gap: 6px;">
                ${mc.iconSvg}
                <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: ${mc.text};">${mc.label}</span>
              </div>
              <span style="font-size: 11px; font-weight: 500; color: #e2e8f0; line-height: 1.4;">${escapeHTML(m.title)}</span>
              <span style="font-size: 10px; color: #94a3b8; line-height: 1.5;">${escapeHTML(m.description)}</span>
            </div>`;
          }).join("")}
        </div>
      </details>
    </div>`;
  };

  return `
    <div onclick="showPage('uc-${id}')" style="cursor: pointer; border-radius: 14px; border: 1px solid ${isPrimary ? "rgba(0,212,255,0.2)" : "rgba(255,255,255,0.08)"}; background: rgba(255,255,255,0.02); padding: 20px; transition: all 0.2s; position: relative;">
      <div style="display: flex; align-items: start; justify-content: space-between; margin-bottom: 8px;">
        <span style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: ${isPrimary ? "#00D4FF" : "#94a3b8"}; padding: 2px 10px; border-radius: 9999px; background: ${isPrimary ? "rgba(0,212,255,0.1)" : "rgba(255,255,255,0.04)"}; border: 1px solid ${isPrimary ? "rgba(0,212,255,0.2)" : "rgba(255,255,255,0.1)"};">${engagement}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </div>
      <h3 style="font-size: 14px; font-weight: 500; color: #e2e8f0; margin-bottom: 6px;">${escapeHTML(detail.label)}</h3>
      <p style="font-size: 12px; color: #64748b; line-height: 1.5;">${escapeHTML(detail.description)}</p>
      ${renderMarkers(asIsMarkers, `pain-${id}`, "Pain Points", "#f87171")}
      ${renderMarkers(toBeMarkers, `wow-${id}`, "Wows!", "#4ade80")}
    </div>`;
}

function renderHomePage(): string {
  const useCases = productNodes.filter((n) => n.type === "useCase");

  // Compute layout: rows and column spans for each use case
  const nextRow: Record<number, number> = {};
  for (let i = 1; i <= 4; i++) nextRow[i] = 2;

  const rows: Record<string, number> = {};
  const spans: Record<string, { start: number; end: number }> = {};

  for (const uc of useCases) {
    const ucPillars = getUseCasePillars(uc.id);
    const indices = ucPillars.map((p) => PILLARS.findIndex((pl) => pl.id === p)).filter((i) => i !== -1);
    if (indices.length === 0) continue;
    const minIdx = Math.min(...indices);
    const maxIdx = Math.max(...indices);
    const start = minIdx + 1;
    const end = maxIdx + 2;
    spans[uc.id] = { start, end };

    let maxRow = 0;
    for (let col = start; col < end; col++) {
      maxRow = Math.max(maxRow, nextRow[col]);
    }
    rows[uc.id] = maxRow;
    for (let col = start; col < end; col++) {
      nextRow[col] = maxRow + 1;
    }
  }

  return `
  <section id="home" class="page-section">
    <div style="padding: 64px 24px 48px; text-align: center;">
      <div style="max-width: 768px; margin: 0 auto;">
        <div style="display: inline-flex; align-items: center; gap: 12px; margin-bottom: 24px;">
          <div style="width: 48px; height: 48px; border-radius: 10px; background: rgba(0,212,255,0.1); border: 1px solid rgba(0,212,255,0.3); display: flex; align-items: center; justify-content: center;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          </div>
          <h1 style="font-size: 48px; font-weight: 700; color: #fff; letter-spacing: -0.02em;">Atlas</h1>
          <img src="data:image/png;base64,${IBM_LOGO_B64}" alt="IBM" style="height: 48px; width: auto; opacity: 0.5; margin-left: 24px;">
        </div>
        <p style="font-size: 18px; color: #94a3b8; line-height: 1.7; margin-bottom: 48px;">
          AI-powered platform for IBM Z environment intelligence, change management, and predictive operations.
          Explore use cases across three pillars of intelligence.
        </p>
      </div>
    </div>

    <div style="max-width: 1280px; margin: 0 auto; padding: 0 24px 32px;">
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: minmax(60px, auto); gap: 16px;">
        ${PILLARS.map((pillar, i) => {
            const iconB64 = pillar.id === "system"
              ? "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
...
Trimmed for brevity