import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { useCaseDetails, productNodes, personaData } from "@/data/productData";
import type { UseCaseDetail, FlowDiagram, ExternalTouchpoint } from "@/data/productData";
import { getUnitConsumption } from "@/data/unitConsumption";

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

function imgToB64(filePath: string): string {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    const data = fs.readFileSync(fullPath);
    return data.toString("base64");
  } catch {
    return "";
  }
}

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

  const uc = !isAsIs ? getUnitConsumption(ucId) : null;
  const coinSvg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v12"/><path d="M15 10H9.5a2.5 2.5 0 0 0 0 5h5a2.5 2.5 0 0 1 0 5H9"/></svg>';

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
      <div style="margin-bottom: 16px; padding: 12px; border-radius: 8px; border: 1px solid rgba(59,130,246,0.2); background: rgba(59,130,246,0.04);">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.43.28a2 2 0 0 0 1.68.05 1 1 0 0 1 1.4 1.4 5 5 0 0 1-1.06 5.85l-.84.85a3 3 0 0 1-3.88.27"/><path d="m18 15-2-2"/></svg>
          <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #3b82f6;">External Integrations</span>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          ${["bob-ppz", "concert4z"].map((pid) => {
            const hasTp = flow.externalTouchpoints?.some((tp) => tp.product.toLowerCase().replace(/\s+/g, "-") === pid);
            const label = pid === "bob-ppz" ? "Bob PPZ" : "Concert4Z";
            return `
            <label style="display: inline-flex; align-items: center; gap: 8px; padding: 6px 12px; border-radius: 6px; border: 1px solid ${hasTp ? "rgba(0,212,255,0.3)" : "rgba(255,255,255,0.1)"}; background: ${hasTp ? "rgba(0,212,255,0.05)" : "rgba(255,255,255,0.02)"}; cursor: ${hasTp ? "pointer" : "not-allowed"}; opacity: ${hasTp ? "1" : "0.4"};">
              <input type="checkbox" ${hasTp ? "" : "disabled"} class="ext-toggle" data-uc="${ucId}" data-product="${pid}" style="width: 14px; height: 14px; accent-color: #00D4FF;">
              <span style="font-size: 11px; font-weight: 500; color: ${hasTp ? "#e2e8f0" : "#64748b"};">${label}</span>
            </label>`;
          }).join("")}
        </div>
      </div>` : ""}

      ${!isAsIs ? renderUnitConsumptionControls(ucId) : ""}

      <div class="stage-grid stage-grid-${ucId} ${!isAsIs ? 'stage-grid-tobe-' + ucId : ''}" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; transition: all 0.3s;">
        ${flow.stages.map((stage, i) => {
          const stageExternal = flow.externalTouchpoints?.filter((tp) => tp.stageIndex === i) || [];
          const grouped = groupedByStage[i];
          const stepConsumption = uc?.steps[i];
          const stepTotal = stepConsumption ? stepConsumption.activities.reduce((s, a) => s + (parseFloat(a.units) || 0), 0) : 0;
          return `
          <div style="position: relative;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
              <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600; color: #94a3b8; font-family: 'IBM Plex Mono', monospace;">${i + 1}</div>
            </div>
            <div style="border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; background: rgba(255,255,255,0.02); backdrop-filter: blur(8px); padding: 20px;">
              <h4 style="font-size: 14px; font-weight: 500; color: #e2e8f0; margin-bottom: 6px; line-height: 1.4;">${escapeHTML(stage.name)}</h4>
              <p style="font-size: 12px; color: #64748b; margin-bottom: 12px; line-height: 1.6;">${escapeHTML(stage.description)}</p>

              ${stageExternal.map((tp) => renderExternalTouchpoint(tp, ucId)).join("")}

              ${stepConsumption ? `
              <div class="uc-step-wrap uc-step-${ucId}-${i}" style="display: none; margin-bottom: 10px; border-radius: 10px; border: 1px solid rgba(74,222,128,0.2); background: rgba(74,222,128,0.05); overflow: hidden;">
                <div style="padding: 10px 14px; background: rgba(74,222,128,0.08); border-bottom: 1px solid rgba(74,222,128,0.15); display: flex; align-items: center; gap: 6px;">
                  ${coinSvg.replace('currentColor', '#4ade80')}
                  <span style="font-size: 11px; font-weight: 600; color: #4ade80; text-transform: uppercase; letter-spacing: 0.05em;">Atlas Units</span>
                  <span class="uc-step-total" data-base="${stepTotal.toFixed(1)}" style="margin-left: auto; font-size: 11px; font-weight: 600; color: #86efac;">${stepTotal.toFixed(1)} units</span>
                </div>
                <div style="padding: 12px 14px;">
                  <table style="width: 100%; font-size: 11px; border-collapse: collapse;">
                    <thead>
                      <tr style="border-bottom: 1px solid rgba(74,222,128,0.15);">
                        <th style="text-align: left; padding: 5px 6px 5px 0; color: #86efac; font-weight: 600;">Activity</th>
                        <th style="text-align: left; padding: 5px 6px; color: #86efac; font-weight: 600;">Tokens/events</th>
                        <th style="text-align: right; padding: 5px 0 5px 6px; color: #86efac; font-weight: 600;">Units</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${stepConsumption.activities.map((act) => `
                        <tr style="border-bottom: 1px solid rgba(74,222,128,0.08); ${act.provisionedEnv ? 'background: rgba(34,211,238,0.08);' : ''}">
                          <td style="padding: 5px 6px 5px 0; ${act.provisionedEnv ? 'color: #a5f3fc; font-weight: 500;' : 'color: #94a3b8;'}">${escapeHTML(act.activity)}</td>
                          <td style="padding: 5px 6px; ${act.provisionedEnv ? 'color: #a5f3fc;' : 'color: #94a3b8;'}">${escapeHTML(act.tokens)}</td>
                          <td class="uc-unit-cell" data-base="${act.units}" style="padding: 5px 0 5px 6px; text-align: right; ${act.provisionedEnv ? 'color: #67e8f9; font-weight: 500;' : 'color: #86efac; font-weight: 500;'}">${act.units}</td>
                        </tr>
                      `).join("")}
                    </tbody>
                  </table>
                </div>
              </div>` : ""}

              ${Object.entries(grouped).map(([persona, markers]) => `
                <details style="margin-bottom: 6px;">
                  <summary style="display: flex; align-items: center; gap: 8px; padding: 6px 10px; border-radius: 8px; background: rgba(255,255,255,0.03); cursor: pointer; font-size: 12px; font-weight: 600; color: #e2e8f0; list-style: none; user-select: none;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;"><polyline points="9 18 15 12 9 6"/></svg>
                    <span>${escapeHTML(persona)}</span>
                    <span style="margin-left: auto; font-size: 10px; font-weight: 400; color: #64748b;">${markers.length} ${markers.length === 1 ? ("pain" in config ? "pain point" : "WOW!") : ("pain" in config ? "pain points" : "WOWs!")}</span>
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

      ${!isAsIs ? renderUnitConsumptionSummary(ucId) : ""}
    </div>`;
}

function renderUnitConsumptionControls(ucId: string): string {
  const uc = getUnitConsumption(ucId);
  if (!uc) return "";

  const coinSvg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v12"/><path d="M15 10H9.5a2.5 2.5 0 0 0 0 5h5a2.5 2.5 0 0 1 0 5H9"/></svg>';

  const baseTotal = uc.steps.reduce((sum, s) => sum + s.activities.reduce((a, act) => a + (parseFloat(act.units) || 0), 0), 0), 0);

  const toggleHtml = `
    <div class="uc-toggle-wrap" style="margin-bottom: 12px; padding: 12px; border-radius: 8px; border: 1px solid rgba(74,222,128,0.2); background: rgba(74,222,128,0.05);">
      <label style="display: inline-flex; align-items: center; gap: 8px; cursor: pointer;">
        <input type="checkbox" class="uc-toggle" data-uc="${ucId}" style="width: 16px; height: 16px; accent-color: #4ade80;">
        <span style="color: #4ade80; display: inline-flex; align-items: center; gap: 6px;">
          ${coinSvg}
          <span style="font-size: 12px; font-weight: 600;">Show Atlas token/unit consumption estimates</span>
        </span>
      </label>
    </div>`;

  const totalHtml = `
    <div class="uc-panel uc-total-${ucId}" style="display: none; margin-bottom: 12px; border-radius: 10px; border: 1px solid rgba(74,222,128,0.2); background: rgba(74,222,128,0.05); overflow: hidden;">
      <div style="padding: 12px 16px; background: rgba(74,222,128,0.08); border-bottom: 1px solid rgba(74,222,128,0.15); display: flex; align-items: center; gap: 8px;">
        ${coinSvg.replace('currentColor', '#4ade80')}
        <span style="font-size: 13px; font-weight: 600; color: #4ade80;">Total Estimated Units</span>
        <span class="uc-total-val" data-base="${baseTotal.toFixed(1)}" style="margin-left: auto; font-size: 13px; font-weight: 700; color: #86efac;">${baseTotal.toFixed(1)}</span>
      </div>
    </div>`;

  const estateHtml = uc.estateSize.length > 0 ? `
    <div class="uc-panel uc-estate-${ucId}" style="display: none; margin-bottom: 12px; border-radius: 10px; border: 1px solid rgba(74,222,128,0.2); background: rgba(74,222,128,0.05); overflow: hidden;">
      <div style="padding: 12px 16px; background: rgba(74,222,128,0.08); border-bottom: 1px solid rgba(74,222,128,0.15); display: flex; align-items: center; gap: 8px;">
        ${coinSvg.replace('currentColor', '#4ade80')}
        <span style="font-size: 13px; font-weight: 600; color: #4ade80;">Estate Size</span>
      </div>
      <div style="padding: 12px 16px;">
        <table style="width: 100%; font-size: 12px; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 1px solid rgba(74,222,128,0.15);">
              <th style="text-align: left; padding: 6px 8px 6px 0; color: #86efac; font-weight: 600; width: 28px;"></th>
              <th style="text-align: left; padding: 6px 8px; color: #86efac; font-weight: 600;">Scenario</th>
              <th style="text-align: left; padding: 6px 8px; color: #86efac; font-weight: 600;">Adjustment</th>
              <th style="text-align: right; padding: 6px 0 6px 8px; color: #86efac; font-weight: 600;">Multiplier</th>
            </tr>
          </thead>
          <tbody>
            ${uc.estateSize.map((row, i) => `
              <tr style="border-bottom: 1px solid rgba(74,222,128,0.08);">
                <td style="padding: 6px 8px 6px 0;">
                  <input type="radio" name="estate-${ucId}" value="${row.multiplierValue}" class="uc-estate-radio" data-uc="${ucId}" style="accent-color: #4ade80;">
                </td>
                <td style="padding: 6px 8px; color: #94a3b8;">${escapeHTML(row.scenario)}</td>
                <td style="padding: 6px 8px; color: #94a3b8;">${escapeHTML(row.adjustment)}</td>
                <td style="padding: 6px 0 6px 8px; text-align: right; color: #86efac; font-weight: 500;">${row.multiplierDisplay}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>` : "";

  const adjHtml = uc.additionalAdjustments.length > 0 ? `
    <div class="uc-panel uc-adj-${ucId}" style="display: none; margin-bottom: 12px; border-radius: 10px; border: 1px solid rgba(74,222,128,0.2); background: rgba(74,222,128,0.05); overflow: hidden;">
      <div style="padding: 12px 16px; background: rgba(74,222,128,0.08); border-bottom: 1px solid rgba(74,222,128,0.15); display: flex; align-items: center; gap: 8px;">
        ${coinSvg.replace('currentColor', '#4ade80')}
        <span style="font-size: 13px; font-weight: 600; color: #4ade80;">Additional Adjustments</span>
      </div>
      <div style="padding: 12px 16px;">
        <table style="width: 100%; font-size: 12px; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 1px solid rgba(74,222,128,0.15);">
              <th style="text-align: left; padding: 6px 8px 6px 0; color: #86efac; font-weight: 600; width: 28px;"></th>
              <th style="text-align: left; padding: 6px 8px; color: #86efac; font-weight: 600;">Scenario</th>
              <th style="text-align: left; padding: 6px 8px; color: #86efac; font-weight: 600;">Adjustment</th>
              <th style="text-align: right; padding: 6px 0 6px 8px; color: #86efac; font-weight: 600;">Unit Delta</th>
            </tr>
          </thead>
          <tbody>
            ${uc.additionalAdjustments.map((row, i) => `
              <tr style="border-bottom: 1px solid rgba(74,222,128,0.08);">
                <td style="padding: 6px 8px 6px 0;">
                  <input type="checkbox" value="${row.unitDelta}" class="uc-adj-check" data-uc="${ucId}" style="accent-color: #4ade80;">
                </td>
                <td style="padding: 6px 8px; color: #94a3b8;">${escapeHTML(row.scenario)}</td>
                <td style="padding: 6px 8px; color: #94a3b8;">${escapeHTML(row.adjustment)}</td>
                <td style="padding: 6px 0 6px 8px; text-align: right; color: ${row.unitDelta >= 0 ? '#86efac' : '#fca5a5'}; font-weight: 500;">${row.unitDelta >= 0 ? '+' : ''}${row.unitDelta}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>` : "";

  return `
    <div class="uc-wrap" data-uc="${ucId}" style="margin-bottom: 16px;">
      ${toggleHtml}
      <div class="uc-content-${ucId}" style="display: none;">
        ${totalHtml}
        ${estateHtml}
        ${adjHtml}
      </div>
    </div>`;
}

function renderUnitConsumptionSummary(ucId: string): string {
  const uc = getUnitConsumption(ucId);
  if (!uc || uc.fullFlowSummary.length === 0) return "";

  const baseTotal = uc.steps.reduce((sum, s) => sum + s.activities.reduce((a, act) => a + (parseFloat(act.units) || 0), 0), 0), 0);

  return `
    <div class="uc-panel uc-summary-${ucId}" style="display: none; margin-top: 16px; border-radius: 10px; border: 1px solid rgba(74,222,128,0.2); background: rgba(74,222,128,0.05); overflow: hidden;">
      <div style="padding: 12px 16px; background: rgba(74,222,128,0.08); border-bottom: 1px solid rgba(74,222,128,0.15);">
        <span style="font-size: 13px; font-weight: 600; color: #4ade80;">Full Flow Summary</span>
      </div>
      <div style="padding: 12px 16px;">
        <table style="width: 100%; font-size: 12px; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 1px solid rgba(74,222,128,0.15);">
              <th style="text-align: left; padding: 6px 8px 6px 0; color: #86efac; font-weight: 600;">Step</th>
              <th style="text-align: left; padding: 6px 8px; color: #86efac; font-weight: 600;">Activity</th>
              <th style="text-align: right; padding: 6px 0 6px 8px; color: #86efac; font-weight: 600;">Units</th>
            </tr>
          </thead>
          <tbody>
            ${uc.fullFlowSummary.map((row) => `
              <tr style="border-bottom: 1px solid rgba(74,222,128,0.08);">
                <td style="padding: 6px 8px 6px 0; color: #94a3b8;">${escapeHTML(row.step)}</td>
                <td style="padding: 6px 8px; color: #94a3b8;">${escapeHTML(row.activity)}</td>
                <td class="uc-summary-unit" data-base="${row.units}" style="padding: 6px 0 6px 8px; text-align: right; color: #86efac; font-weight: 500;">${row.units}</td>
              </tr>
            `).join("")}
            <tr style="border-top: 2px solid rgba(74,222,128,0.2);">
              <td style="padding: 8px 8px 8px 0; color: #e2e8f0; font-weight: 600;" colspan="2">Total</td>
              <td class="uc-summary-total" data-base="${baseTotal.toFixed(1)}" style="padding: 8px 0 8px 8px; text-align: right; color: #86efac; font-weight: 700;">${baseTotal.toFixed(1)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>`;
}

function renderExternalTouchpoint(tp: ExternalTouchpoint, ucId: string): string {
  const pid = tp.product.toLowerCase().replace(/\s+/g, "-");
  if (tp.type === "handoff") {
    return `
    <div class="ext-box ext-${ucId}-${pid}" style="margin-bottom: 8px; border-radius: 10px; border: 1px solid rgba(59,130,246,0.25); background: rgba(59,130,246,0.04); overflow: hidden; display: none; cursor: pointer;" onclick="openModal(this)">
      <div style="padding: 10px 14px; background: rgba(59,130,246,0.08); border-bottom: 1px solid rgba(59,130,246,0.15);">
        <h5 style="font-size: 11px; font-weight: 700; color: #60a5fa; text-transform: uppercase; letter-spacing: 0.05em; margin: 0;">${escapeHTML(tp.title)}</h5>
      </div>
      <div style="padding: 14px;">
        ${tp.steps.map((step, j) => `
          <div style="display: flex; gap: 10px; ${j < tp.steps.length - 1 ? "margin-bottom: 12px;" : ""}">
            <div style="width: 24px; height: 24px; border-radius: 50%; background: rgba(59,130,246,0.15); display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; color: #60a5fa; flex-shrink: 0;">${j + 1}</div>
            <div>
              <div style="font-size: 11px; font-weight: 600; color: #93c5fd; margin-bottom: 2px;">${escapeHTML(step.label)}</div>
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

  const asIsMarkerConfig: Record<string, { bg: string; border: string; text: string; label: string; iconSvg: string }> = {
    pain: { bg: "rgba(251,146,60,0.1)", border: "rgba(251,146,60,0.3)", text: "#fb923c", label: "Business Impact", iconSvg: '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fb923c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' },
    time: { bg: "rgba(251,191,36,0.1)", border: "rgba(251,191,36,0.3)", text: "#fbbf24", label: "Lost Time", iconSvg: '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' },
    skill: { bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.3)", text: "#f87171", label: "Skill Gap / Bottleneck", iconSvg: '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#f87171" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' },
  };

  const painPointsHtml = asIsMarkers.length === 0 ? "" : `
    <div style="margin-top: 12px;">
      <details style="cursor: default;">
        <summary onclick="event.stopPropagation();" style="display: flex; align-items: center; gap: 8px; padding: 6px 10px; border-radius: 8px; background: rgba(255,255,255,0.03); cursor: pointer; font-size: 12px; font-weight: 600; color: #f87171; list-style: none; user-select: none;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f87171" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0; transition: transform 0.2s;"><polyline points="9 18 15 12 9 6"/></svg>
          <span>Pain Points</span>
          <span style="margin-left: auto; font-size: 10px; font-weight: 400; color: #64748b;">${asIsMarkers.length} ${asIsMarkers.length === 1 ? ("pain" in asIsMarkerConfig ? "pain point" : "WOW!") : ("pain" in asIsMarkerConfig ? "pain points" : "WOWs!")}</span>
        </summary>
        <div style="padding-top: 8px; display: flex; flex-direction: column; gap: 6px;">
          ${asIsMarkers.map((m) => {
            const mc = asIsMarkerConfig[m.type];
            if (!mc) return "";
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

  const wowsHtml = toBeMarkers.length === 0 ? "" : `
    <div style="margin-top: 12px;">
      <details style="cursor: default;">
        <summary onclick="event.stopPropagation();" style="display: flex; align-items: center; gap: 8px; padding: 6px 10px; border-radius: 8px; background: rgba(255,255,255,0.03); cursor: pointer; font-size: 12px; font-weight: 600; color: #4ade80; list-style: none; user-select: none;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0; transition: transform 0.2s;"><polyline points="9 18 15 12 9 6"/></svg>
          <span>Wows!</span>
          <span style="margin-left: auto; font-size: 10px; font-weight: 400; color: #64748b;">${toBeMarkers.length} ${toBeMarkers.length === 1 ? ("pain" in toBeConfig ? "pain point" : "WOW!") : ("pain" in toBeConfig ? "pain points" : "WOWs!")}</span>
        </summary>
        <div style="padding-top: 8px; display: flex; flex-direction: column; gap: 6px;">
          ${toBeMarkers.map((m) => {
            const mc = toBeConfig[m.type];
            if (!mc) return "";
            return `
            <div style="display: flex; flex-direction: column; gap: 4px; padding: 10px 12px; border-radius: 8px; background: ${mc.bg}; border: 1px solid ${mc.border};">
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
    </div>`;

  return `
    <div onclick="showPage('uc-${id}')" style="cursor: pointer; border-radius: 14px; border: 1px solid ${isPrimary ? "rgba(0,212,255,0.2)" : "rgba(255,255,255,0.08)"}; background: rgba(255,255,255,0.02); padding: 20px; transition: all 0.2s; position: relative;">
      <div style="display: flex; align-items: start; justify-content: space-between; margin-bottom: 8px;">
        <span style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: ${isPrimary ? "#00D4FF" : "#94a3b8"}; padding: 2px 10px; border-radius: 9999px; background: ${isPrimary ? "rgba(0,212,255,0.1)" : "rgba(255,255,255,0.04)"}; border: 1px solid ${isPrimary ? "rgba(0,212,255,0.2)" : "rgba(255,255,255,0.1)"};">${engagement}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </div>
      <h3 style="font-size: 14px; font-weight: 500; color: #e2e8f0; margin-bottom: 6px;">${escapeHTML(detail.label)}</h3>
      <p style="font-size: 12px; color: #64748b; line-height: 1.5;">${escapeHTML(detail.description)}</p>
      ${painPointsHtml}
      ${wowsHtml}
    </div>`;
}

function renderHomePage(ibmB64: string, systemB64: string, changeB64: string, predictiveB64: string): string {
  const useCases = productNodes.filter((n) => n.type === "useCase");

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
          <img src="data:image/png;base64,${ibmB64}" alt="IBM" style="height: 48px; width: auto; opacity: 0.5; margin-left: 24px;">
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
          const iconB64 = pillar.id === "system" ? systemB64 : pillar.id === "change" ? changeB64 : predictiveB64;
          const visibleCount = useCases.filter((uc) => getUseCasePillars(uc.id).includes(pillar.id)).length;
          return `
          <div style="grid-column: ${i + 1} / ${i + 2}; grid-row: 1 / 2;">
            <div style="width: 100%; display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 24px; border-radius: 12px; border: 1px solid ${pillar.border}; background: ${pillar.bg}; color: ${pillar.color};">
              <div style="width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                <img src="data:image/png;base64,${iconB64}" alt="${pillar.name}" style="width: 28px; height: 28px; object-fit: contain;">
              </div>
              <div style="text-align: center;">
                <h2 style="font-size: 16px; font-weight: 600; color: ${pillar.color};">${pillar.name}</h2>
                <p style="font-size: 11px; color: #64748b; margin-top: 4px;">${visibleCount} use cases</p>
              </div>
            </div>
          </div>`;
        }).join("")}

        ${useCases.map((uc) => {
          const ucPillars = getUseCasePillars(uc.id);
          const row = rows[uc.id];
          const span = spans[uc.id];
          if (!row || !span) return "";
          const leftColor = PILLARS.find((p) => p.id === ucPillars[0])?.color || "#00D4FF";
          const rightColor = PILLARS.find((p) => p.id === ucPillars[ucPillars.length - 1])?.color || leftColor;
          const isMulti = ucPillars.length > 1;

          return `
          <div onclick="showPage('uc-${uc.id}')" style="cursor: pointer; grid-column: ${span.start} / ${span.end}; grid-row: ${row} / ${row + 1}; border-radius: 14px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); padding: 20px 24px; transition: border-color 0.2s; border-left: 4px solid ${leftColor}; ${isMulti ? `border-right: 4px solid ${rightColor};` : ""}">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="display: flex; gap: 4px; flex-shrink: 0;">
                ${ucPillars.map((pid) => {
                  const p = PILLARS.find((pl) => pl.id === pid);
                  if (!p) return "";
                  return `<span style="font-size: 9px; font-weight: 700; color: ${p.color}; padding: 2px 6px; border-radius: 4px; background: ${p.bg}; border: 1px solid ${p.border};">${p.shortName}</span>`;
                }).join("")}
              </div>
              <div>
                <h3 style="font-size: 14px; font-weight: 500; color: #e2e8f0; margin: 0 0 2px;">${escapeHTML(uc.label)}</h3>
                <p style="font-size: 12px; color: #64748b; margin: 0; line-height: 1.4;">${escapeHTML(uc.description)}</p>
              </div>
            </div>
          </div>`;
        }).join("")}
      </div>
    </div>
  </section>`;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const ibmB64 = imgToB64("public/ibm-logo-black-and-white.png");
  const systemB64 = imgToB64("public/pillars/system-intelligence.png");
  const changeB64 = imgToB64("public/pillars/change-intelligence.png");
  const predictiveB64 = imgToB64("public/pillars/predictive-intelligence.png");

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
    return `<button onclick="showPage('persona-${key}')" class="nav-item" data-page="persona-${key}" style="display: block; width: 100%; text-align: left; padding: 8px 16px; border-radius: 8px; border: none; background: transparent; color: #94a3b8; font-size: 13px; cursor: pointer; transition: all 0.15s; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${escapeHTML(info.name)}<br><span style="font-size: 11px; color: #64748b;">${escapeHTML(info.role)}</span></button>`;
  }).join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Atlas - Use Case Library</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'IBM Plex Sans', system-ui, sans-serif; background: #0a0a0f; color: #e2e8f0; min-height: 100vh; overflow-x: hidden; }
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
    .topbar { position: sticky; top: 0; z-index: 100; height: 52px; background: rgba(10,10,15,0.8); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255,255,255,0.06); display: flex; align-items: center; justify-content: space-between; padding: 0 24px; }
    .layout { display: flex; min-height: calc(100vh - 52px); }
    .sidebar { position: sticky; top: 52px; height: calc(100vh - 52px); overflow-y: auto; width: 260px; border-right: 1px solid rgba(255,255,255,0.06); background: rgba(10,10,15,0.5); backdrop-filter: blur(8px); flex-shrink: 0; padding: 16px 0; }
    .main { flex: 1; min-width: 0; overflow-y: auto; height: calc(100vh - 52px); }
    .sidebar-section { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #475569; padding: 12px 16px 8px; }
    .nav-item:hover, .nav-item.active { background: rgba(255,255,255,0.04); color: #e2e8f0; }
    .page-section { display: none; animation: fadeIn 0.3s ease; }
    .page-section.active { display: block; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    .accordion { border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; background: rgba(255,255,255,0.02); backdrop-filter: blur(8px); margin-bottom: 24px; overflow: hidden; }
    .accordion summary { list-style: none; user-select: none; }
    .accordion summary::-webkit-details-marker { display: none; }
    .accordion[open] > summary svg.chevron { transform: rotate(180deg); }
    .accordion-icon { display: flex; align-items: center; justify-content: center; flex-shrink: 0; width: 32px; height: 32px; border-radius: 8px; }
    .accordion-icon.coral { background: rgba(255,107,107,0.1); color: #FF6B6B; }
    .accordion-icon.purple { background: rgba(167,139,250,0.1); color: #A78BFA; }
    .accordion-icon.cyan { background: rgba(0,212,255,0.1); color: #00D4FF; }
    details > summary { display: flex; align-items: center; gap: 12px; padding: 20px 24px; cursor: pointer; list-style: none; user-select: none; }
    details > summary::-webkit-details-marker { display: none; }
    details > summary svg { transition: transform 0.2s; }
    details[open] > summary svg { transform: rotate(180deg); }
    details svg[class*="chevron"] { transition: transform 0.2s !important; }
    details[open] svg[class*="chevron"] { transform: rotate(180deg) !important; }
    .badge { display: inline-flex; align-items: center; gap: 8px; padding: 4px 12px; border-radius: 9999px; border: 1px solid rgba(0,212,255,0.2); background: rgba(0,212,255,0.05); }
    .badge-dot { width: 16px; height: 16px; border-radius: 50%; background: #00D4FF; box-shadow: 0 0 12px rgba(0,212,255,0.5); }
    .badge-text { font-family: 'IBM Plex Mono', monospace; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.08em; color: #00D4FF; }
    .badge-row { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; flex-wrap: wrap; }
    .hero { margin-bottom: 32px; }
    #modalOverlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 1000; align-items: center; justify-content: center; padding: 20px; }
    #modalOverlay.active { display: flex; }
    #modalContent { max-width: 600px; width: 100%; max-height: 80vh; overflow-y: auto; border-radius: 16px; background: #14141f; border: 1px solid rgba(255,255,255,0.08); }
    #modalHeader { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.06); }
    #modalBody { padding: 20px; }
    #modalClose { background: transparent; border: none; color: #94a3b8; font-size: 24px; cursor: pointer; }
    @media (max-width: 1024px) { .sidebar { display: none; } }
    .stage-grid { transition: all 0.3s; }
    .stage-grid.wide { grid-template-columns: repeat(2, 1fr) !important; }
    @media (max-width: 768px) { .stage-grid.wide { grid-template-columns: 1fr !important; } }
  </style>
</head>
<body>
  <div class="topbar">
    <img src="data:image/png;base64,${ibmB64}" alt="IBM" style="height: 32px; width: auto; opacity: 0.6;">
    <div onclick="showPage('home')" style="display: flex; align-items: center; gap: 6px; color: #94a3b8; font-size: 14px; cursor: pointer; transition: color 0.15s;">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
      <span id="page-title">Return to Atlas</span>
    </div>
  </div>

  <div class="layout">
    <aside class="sidebar">
      <div class="sidebar-section">Navigation</div>
      <div style="padding: 0 8px 12px;">
        <button onclick="showPage('home')" class="nav-item" data-page="home" style="display: block; width: 100%; text-align: left; padding: 8px 16px; border-radius: 8px; border: none; background: transparent; color: #94a3b8; font-size: 13px; cursor: pointer; transition: all 0.15s;">Atlas Home</button>
      </div>
      <div class="sidebar-section">Use Cases</div>
      <div style="padding: 0 8px 12px;">
        ${navItems}
      </div>
      <div class="sidebar-section">Personas</div>
      <div style="padding: 0 8px 12px;">
        ${personaNavItems}
      </div>
    </aside>

    <main class="main">
      ${renderHomePage(ibmB64, systemB64, changeB64, predictiveB64)}
      ${useCaseSections}
      ${personaSections}
    </main>
  </div>

  <div id="modalOverlay" onclick="if(event.target===this)closeModal()">
    <div id="modalContent">
      <div id="modalHeader">
        <span id="modalTitle" style="font-size: 16px; font-weight: 600; color: #e2e8f0;"></span>
        <button id="modalClose" onclick="closeModal()">&times;</button>
      </div>
      <div id="modalBody"></div>
    </div>
  </div>

  <script>
    (function() {
      var titleMap = { home: 'Return to Atlas' };
      ${Object.keys(useCaseDetails).map((id) => `titleMap['uc-${id}'] = '${escapeHTML(useCaseDetails[id].label)}';`).join("\n      ")}
      ${Object.entries(personaData).map(([key, info]) => `titleMap['persona-${key}'] = '${escapeHTML(info.name)}';`).join("\n      ")}

      function showPage(pageId) {
        document.querySelectorAll('.page-section').forEach(function(s) { s.classList.remove('active'); s.style.display = 'none'; });
        document.querySelectorAll('.nav-item').forEach(function(n) { n.classList.remove('active'); n.style.background = 'transparent'; n.style.color = '#94a3b8'; });
        var target = document.getElementById(pageId);
        if (target) { target.classList.add('active'); target.style.display = 'block'; target.scrollTop = 0; }
        var nav = document.querySelector('.nav-item[data-page="' + pageId + '"]');
        if (nav) { nav.classList.add('active'); nav.style.background = 'rgba(255,255,255,0.04)'; nav.style.color = '#e2e8f0'; }
        document.getElementById('page-title').textContent = titleMap[pageId] || 'Return to Atlas';
        document.querySelector('.main').scrollTop = 0;
      }
      window.showPage = showPage;
      showPage('home');

      document.querySelectorAll('.ext-toggle').forEach(function(cb) {
        cb.addEventListener('change', function() {
          var uc = this.dataset.uc;
          var product = this.dataset.product;
          document.querySelectorAll('.ext-' + uc + '-' + product).forEach(function(box) {
            box.style.display = cb.checked ? 'block' : 'none';
          });
        });
      });

      document.querySelectorAll('.uc-toggle').forEach(function(cb) {
        cb.addEventListener('change', function() {
          var uc = this.dataset.uc;
          var content = document.querySelector('.uc-content-' + uc);
          var panels = document.querySelectorAll('.uc-panel.uc-total-' + uc + ', .uc-panel.uc-estate-' + uc + ', .uc-panel.uc-adj-' + uc + ', .uc-panel.uc-summary-' + uc);
          var steps = document.querySelectorAll('.uc-step-wrap.uc-step-' + uc + '-0, .uc-step-wrap.uc-step-' + uc + '-1, .uc-step-wrap.uc-step-' + uc + '-2, .uc-step-wrap.uc-step-' + uc + '-3, .uc-step-wrap.uc-step-' + uc + '-4, .uc-step-wrap.uc-step-' + uc + '-5, .uc-step-wrap.uc-step-' + uc + '-6, .uc-step-wrap.uc-step-' + uc + '-7, .uc-step-wrap.uc-step-' + uc + '-8');
          var grid = document.querySelector('.stage-grid-tobe-' + uc);
          if (content) content.style.display = cb.checked ? 'block' : 'none';
          panels.forEach(function(p) { p.style.display = cb.checked ? 'block' : 'none'; });
          steps.forEach(function(s) { s.style.display = cb.checked ? 'block' : 'none'; });
          if (grid) {
            if (cb.checked) grid.classList.add('wide');
            else grid.classList.remove('wide');
          }
        });
      });

      document.querySelectorAll('.uc-estate-radio').forEach(function(radio) {
        radio.addEventListener('change', function() {
          var uc = this.dataset.uc;
          var multiplier = parseFloat(this.value) || 1.0;
          updateUcTotals(uc, multiplier);
        });
      });

      document.querySelectorAll('.uc-adj-check').forEach(function(check) {
        check.addEventListener('change', function() {
          var uc = this.dataset.uc;
          var radios = document.querySelectorAll('.uc-estate-radio[data-uc="' + uc + '"]');
          var multiplier = 1.0;
          radios.forEach(function(r) { if (r.checked) multiplier = parseFloat(r.value) || 1.0; });
          updateUcTotals(uc, multiplier);
        });
      });

      function updateUcTotals(uc, multiplier) {
        var adjDelta = 0;
        document.querySelectorAll('.uc-adj-check[data-uc="' + uc + '"]').forEach(function(c) {
          if (c.checked) adjDelta += parseFloat(c.value) || 0;
        });

        document.querySelectorAll('.uc-unit-cell[data-base]').forEach(function(cell) {
          var base = parseFloat(cell.dataset.base) || 0;
          var mult = cell.closest('.uc-wrap[data-uc="' + uc + '"]') ? multiplier : 1.0;
          if (mult !== 1.0) {
            var val = base * mult;
            cell.textContent = (val % 1 === 0 ? val.toFixed(0) : val.toFixed(1));
          } else {
            cell.textContent = cell.dataset.base;
          }
        });

        document.querySelectorAll('.uc-step-total[data-base]').forEach(function(el) {
          var base = parseFloat(el.dataset.base) || 0;
          var val = base * multiplier;
          el.textContent = (val % 1 === 0 ? val.toFixed(0) : val.toFixed(1)) + ' units';
        });

        document.querySelectorAll('.uc-summary-unit[data-base]').forEach(function(el) {
          var base = parseFloat(el.dataset.base) || 0;
          var val = base * multiplier;
          el.textContent = (val % 1 === 0 ? val.toFixed(0) : val.toFixed(1));
        });

        document.querySelectorAll('.uc-total-val[data-base]').forEach(function(el) {
          var base = parseFloat(el.dataset.base) || 0;
          var val = base * multiplier + adjDelta;
          el.textContent = (val % 1 === 0 ? val.toFixed(0) : val.toFixed(1));
        });

        document.querySelectorAll('.uc-summary-total[data-base]').forEach(function(el) {
          var base = parseFloat(el.dataset.base) || 0;
          var val = base * multiplier + adjDelta;
          el.textContent = (val % 1 === 0 ? val.toFixed(0) : val.toFixed(1));
        });
      }
    })();
  </script>
</body>
</html>`;

  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Disposition", "attachment; filename=atlas-export.html");
  res.status(200).send(html);
}