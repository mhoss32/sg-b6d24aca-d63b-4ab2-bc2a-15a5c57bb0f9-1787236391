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
    const p: UseCaseDetail[] = [];
    const s: UseCaseDetail[] = [];
    for (const detail of Object.values(useCaseDetails)) {
      const match = detail.personas.find((pp) => pp.name.toLowerCase() === name.toLowerCase());
      if (match) {
        if (match.engagement === "Primary") p.push(detail);
        else s.push(detail);
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
          ${primary.map((uc) => renderPersonaUseCaseTile(uc, "Primary", name)).join("")}
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
          ${secondary.map((uc) => renderPersonaUseCaseTile(uc, "Secondary", name)).join("")}
        </div>
      </div>` : ""}
    </div>
  </section>`;
}

function renderPersonaUseCaseTile(uc: UseCaseDetail, engagement: string, personaName: string): string {
  const isPrimary = engagement === "Primary";
  const detail = useCaseDetails[uc.id];
  const asIsMarkers = detail?.asIs.markers.filter((m) => m.persona === personaName) || [];
  const toBeMarkers = detail?.toBe.markers.filter((m) => m.persona === personaName) || [];

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
      <details>
        <summary style="display: flex; align-items: center; gap: 8px; padding: 6px 10px; border-radius: 8px; background: rgba(255,255,255,0.03); cursor: pointer; font-size: 12px; font-weight: 600; color: ${labelColor}; list-style: none; user-select: none;">
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
    <div onclick="showPage('uc-${uc.id}')" style="cursor: pointer; border-radius: 14px; border: 1px solid ${isPrimary ? "rgba(0,212,255,0.2)" : "rgba(255,255,255,0.08)"}; background: rgba(255,255,255,0.02); padding: 20px; transition: all 0.2s; position: relative;">
      <div style="display: flex; align-items: start; justify-content: space-between; margin-bottom: 8px;">
        <span style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: ${isPrimary ? "#00D4FF" : "#94a3b8"}; padding: 2px 10px; border-radius: 9999px; background: ${isPrimary ? "rgba(0,212,255,0.1)" : "rgba(255,255,255,0.04)"}; border: 1px solid ${isPrimary ? "rgba(0,212,255,0.2)" : "rgba(255,255,255,0.1)"};">${engagement}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </div>
      <h3 style="font-size: 14px; font-weight: 500; color: #e2e8f0; margin-bottom: 6px;">${escapeHTML(uc.label)}</h3>
      <p style="font-size: 12px; color: #64748b; line-height: 1.5;">${escapeHTML(uc.description)}</p>
      ${renderMarkers(asIsMarkers, `pain-${uc.id}`, "Pain Points", "#f87171")}
      ${renderMarkers(toBeMarkers, `wow-${uc.id}`, "Wows!", "#4ade80")}
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
            const iconSvg = pillar.id === "system"
              ? '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>'
              : pillar.id === "change"
              ? '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>'
              : '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>';
            const visibleCount = useCases.filter((uc) => getUseCasePillars(uc.id).includes(pillar.id)).length;
            return `
          <div style="grid-column: ${i + 1} / ${i + 2}; grid-row: 1 / 2;">
            <div style="width: 100%; display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 24px; border-radius: 12px; border: 1px solid ${pillar.border}; background: ${pillar.bg}; color: ${pillar.color};">
              <div style="width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                ${iconSvg}
              </div>
              <div style="text-align: center;">
                <h2 style="font-size: 16px; font-weight: 600; color: ${pillar.color};">${pillar.name}</h2>
                <p style="font-size: 11px; color: #64748b; margin-top: 4px;">${visibleCount} use cases</p>
              </div>
            </div>
          </div>`;
        }).join("")}

        ${useCases.map((uc) => {
          const span = spans[uc.id];
          const row = rows[uc.id];
          const ucPillars = getUseCasePillars(uc.id);
          const primaryPillar = PILLARS.find((p) => p.id === ucPillars[0]);
          const isMultiPillar = ucPillars.length > 1;
          if (!span || !row) return "";
          return `
          <div onclick="showPage('uc-${uc.id}')" style="cursor: pointer; border-radius: 14px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.02); padding: 16px; transition: all 0.2s; position: relative; overflow: hidden; grid-column: ${span.start} / ${span.end}; grid-row: ${row} / ${row + 1}; border-left: 3px solid ${primaryPillar?.color || "#E2E8F0"}; box-shadow: 0 0 20px ${primaryPillar?.color || "#E2E8F0"}08;">
            ${isMultiPillar ? `<div style="position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(to right, ${ucPillars.map(pid => PILLARS.find(p => p.id === pid)?.color).join(", ")});"></div>` : ""}
            <div style="display: flex; align-items: start; gap: 12px;">
              <div style="width: 10px; height: 10px; border-radius: 50%; margin-top: 4px; flex-shrink: 0; background: ${primaryPillar?.color}; box-shadow: 0 0 8px ${primaryPillar?.color}60;"></div>
              <div style="min-width: 0; flex: 1;">
                <h3 style="font-size: 13px; font-weight: 500; color: #e2e8f0; line-height: 1.4; margin-bottom: 6px;">${escapeHTML(uc.label)}</h3>
                <p style="font-size: 11px; color: #64748b; line-height: 1.6; margin-bottom: 8px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${escapeHTML(uc.description)}</p>
                <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                  ${ucPillars.map((pId) => {
                    const p = PILLARS.find((pl) => pl.id === pId);
                    if (!p) return "";
                    return `<span style="font-size: 10px; padding: 2px 8px; border-radius: 9999px; border: 1px solid ${p.color}40; background: ${p.color}10; color: ${p.color}; font-weight: 500;">${p.shortName}</span>`;
                  }).join("")}
                </div>
              </div>
            </div>
          </div>`;
        }).join("")}
      </div>

      <div style="margin-top: 32px; display: flex; align-items: center; justify-content: center; gap: 24px; flex-wrap: wrap;">
        ${PILLARS.map((pillar) => `
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 10px; height: 10px; border-radius: 50%; background: ${pillar.color}; box-shadow: 0 0 6px ${pillar.color}60;"></div>
            <span style="font-size: 12px; color: #64748b;">${pillar.name}</span>
          </div>
        `).join("")}
      </div>
    </div>
  </section>`;
}

const IBM_LOGO_B64 = "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";

export function exportSiteHTML() {
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  const year = new Date().getFullYear();

  const useCaseSections = Object.entries(useCaseDetails)
    .map(([id, detail]) => renderUseCasePage(id, detail))
    .join("");

  const personaSections = Object.entries(personaData)
    .map(([name, info]) => renderPersonaPage(name, info))
    .join("");

  const navItems = Object.keys(useCaseDetails).map((id) => {
    const detail = useCaseDetails[id];
    return `<button onclick="showPage('uc-${id}')" class="nav-item" data-page="uc-${id}" style="display: block; width: 100%; text-align: left; padding: 8px 16px; border-radius: 8px; border: none; background: transparent; color: #94a3b8; font-size: 13px; cursor: pointer; transition: all 0.15s; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${escapeHTML(detail.label.replace("UC-", "").replace(": ", " "))}</button>`;
  }).join("");

  const personaNavItems = Object.entries(personaData).map(([key, info]) => {
    return `<button onclick="showPage('persona-${key}')" class="nav-item" data-page="persona-${key}" style="display: block; width: 100%; text-align: left; padding: 8px 16px; border-radius: 8px; border: none; background: transparent; color: #94a3b8; font-size: 13px; cursor: pointer; transition: all 0.15s; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${escapeHTML(info.name)}</button>`;
  }).join("");

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Atlas Platform — Complete Use Case Library</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif; background: #0A0A0F; color: #E2E8F0; line-height: 1.6; }
    .layout { display: flex; min-height: 100vh; }
    .sidebar { width: 280px; background: rgba(255,255,255,0.02); border-right: 1px solid rgba(255,255,255,0.06); position: fixed; top: 0; bottom: 0; left: 0; overflow-y: auto; z-index: 40; }
    .sidebar-header { padding: 20px 16px; border-bottom: 1px solid rgba(255,255,255,0.06); }
    .sidebar-logo { display: flex; align-items: center; gap: 8px; font-weight: 600; color: #e2e8f0; font-size: 15px; cursor: pointer; }
    .sidebar-logo svg { width: 20px; height: 20px; color: #00D4FF; flex-shrink: 0; }
    .sidebar-section { padding: 12px 16px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #475569; }
    .nav-item:hover { background: rgba(255,255,255,0.04) !important; color: #e2e8f0 !important; }
    .nav-item.active { background: rgba(0,212,255,0.08) !important; color: #00D4FF !important; }
    .main { flex: 1; margin-left: 280px; }
    .topbar { height: 56px; border-bottom: 1px solid rgba(255,255,255,0.08); background: rgba(10,10,15,0.85); backdrop-filter: blur(12px); position: sticky; top: 0; z-index: 30; display: flex; align-items: center; justify-content: space-between; padding: 0 24px; }
    .container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
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
    details.accordion > summary svg.chevron { transition: transform 0.2s; margin-left: auto; }
    details.accordion[open] > summary svg.chevron { transform: rotate(180deg); }
    .accordion-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .accordion-icon.coral { background: rgba(255,107,107,0.1); color: #FF6B6B; }
    .accordion-icon.purple { background: rgba(167,139,250,0.1); color: #A78BFA; }
    .accordion-icon.cyan { background: rgba(0,212,255,0.1); color: #00D4FF; }
    .capability { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; padding: 16px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.06); background: rgba(255,255,255,0.02); margin-bottom: 12px; transition: border-color 0.2s; }
    .capability:hover { border-color: rgba(0,212,255,0.2); }
    .timeline-badge { display: inline-block; padding: 2px 10px; border-radius: 9999px; font-size: 10px; font-weight: 600; letter-spacing: 0.03em; text-transform: uppercase; white-space: nowrap; }
    footer { border-top: 1px solid rgba(255,255,255,0.06); padding: 32px 24px 48px; margin-top: 32px; }
    .footer-inner { max-width: 1280px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; color: #64748b; font-size: 14px; }
    .meta { font-size: 12px; color: #475569; margin-top: 32px; text-align: center; }
    .modal-overlay { display: none; position: fixed; inset: 0; z-index: 100; align-items: center; justify-content: center; padding: 16px; }
    .modal-overlay.active { display: flex; }
    .modal-backdrop { position: absolute; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); }
    .modal-content { position: relative; max-width: 640px; width: 100%; max-height: 80vh; overflow-y: auto; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); background: rgba(15,15,25,0.95); backdrop-filter: blur(12px); padding: 24px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); }
    .modal-close { position: absolute; top: 16px; right: 16px; background: none; border: none; color: #64748b; cursor: pointer; padding: 4px; }
    .modal-close:hover { color: #e2e8f0; }
    .page-section { display: none; }
    .page-section.active { display: block; }
    details > summary::-webkit-details-marker { display: none; }
    details > summary { list-style: none; }
    @media (max-width: 768px) { .sidebar { display: none; } .main { margin-left: 0; } }
  </style>
</head>
<body>
  <div class="modal-overlay" id="modal">
    <div class="modal-backdrop" onclick="closeModal()"></div>
    <div class="modal-content" id="modal-content"></div>
  </div>

  <div class="layout">
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="sidebar-logo" onclick="showPage('home')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          Atlas
        </div>
      </div>
      <div class="sidebar-section">Use Cases</div>
      <div style="padding: 0 8px 12px;">
        ${navItems}
      </div>
      <div class="sidebar-section">Personas</div>
      <div style="padding: 0 8px 12px;">
        ${personaNavItems}
      </div>
      <div style="padding: 16px; border-top: 1px solid rgba(255,255,255,0.06); font-size: 11px; color: #475569;">
        Exported ${date}
      </div>
    </aside>

    <main class="main">
      <div class="topbar">
        <img src="data:image/png;base64,${IBM_LOGO_B64}" alt="IBM" style="height: 32px; width: auto; opacity: 0.6;">
        <div onclick="showPage('home')" style="display: flex; align-items: center; gap: 6px; color: #94a3b8; font-size: 14px; cursor: pointer; transition: color 0.15s;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          <span id="page-title">Return to Atlas</span>
        </div>
      </div>

      ${renderHomePage()}
      ${useCaseSections}
      ${personaSections}

      <footer>
        <div class="footer-inner">
          <span>IBM Atlas Platform &mdash; ${year}</span>
          <span style="display: flex; align-items: center; gap: 6px; color: #00D4FF;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            Explore Atlas
          </span>
        </div>
      </footer>
    </main>
  </div>

  <script>
    (function() {
      document.querySelectorAll('.ext-toggle').forEach(function(cb) {
        cb.addEventListener('change', function() {
          var uc = this.dataset.uc;
          var product = this.dataset.product;
          var show = this.checked;
          document.querySelectorAll('.ext-box.ext-' + uc + '-' + product).forEach(function(box) {
            box.style.display = show ? 'block' : 'none';
          });
        });
      });
    })();

    function showPage(pageId) {
      document.querySelectorAll('.page-section').forEach(function(s) {
        s.classList.remove('active');
        s.style.display = 'none';
      });
      document.querySelectorAll('.nav-item').forEach(function(n) {
        n.classList.remove('active');
      });
      var target = document.getElementById(pageId);
      if (target) {
        target.classList.add('active');
        target.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      var nav = document.querySelector('.nav-item[data-page="' + pageId + '"]');
      if (nav) nav.classList.add('active');
      var titleMap = { home: 'Return to Atlas' };
      ${Object.keys(useCaseDetails).map((id) => `titleMap['uc-${id}'] = '${escapeHTML(useCaseDetails[id].label)}';`).join("")}
      ${Object.entries(personaData).map(([key, info]) => `titleMap['persona-${key}'] = '${escapeHTML(info.name)}';`).join("")}
      var title = titleMap[pageId] || 'Return to Atlas';
      var titleEl = document.getElementById('page-title');
      if (titleEl) titleEl.textContent = title;
      document.title = title + ' — Atlas Platform';
    }

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

    showPage('home');
  </script>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "atlas-platform-complete.html";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}