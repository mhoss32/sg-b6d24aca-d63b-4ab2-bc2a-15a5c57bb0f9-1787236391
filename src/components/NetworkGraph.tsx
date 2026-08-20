"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { productNodes, getConnections, getNodeById, type ProductNode, type NodeType, nodeTypeConfig } from "@/data/productData";

interface SimNode extends ProductNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  targetY: number;
  targetXRange: [number, number];
}

const NODE_RADIUS: Record<NodeType, number> = {
  atlas: 55,
  systemIntelligence: 48,
  changeIntelligence: 48,
  predictiveIntelligence: 48,
  useCase: 30,
};

const COLORS: Record<NodeType, string> = {
  atlas: "#F59E0B",
  systemIntelligence: "#00D4FF",
  changeIntelligence: "#FF6B6B",
  predictiveIntelligence: "#A78BFA",
  useCase: "#E2E8F0",
};

const PILLAR_X_POSITIONS: Record<string, number> = {
  system: 0.22,
  change: 0.5,
  predictive: 0.78,
};

const PILLAR_USE_CASES: Record<string, string[]> = {
  system: ["uc-04", "uc-05"],
  change: ["uc-02", "uc-07", "uc-08", "uc-12", "uc-13", "uc-14"],
  predictive: ["uc-01", "uc-03", "uc-06", "uc-09", "uc-10", "uc-11"],
};

interface NetworkGraphProps {
  onSelectNode: (node: ProductNode | null) => void;
  selectedNodeId: string | null;
}

export function NetworkGraph({ onSelectNode, selectedNodeId }: NetworkGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const simRef = useRef<SimNode[]>([]);
  const transformRef = useRef({ x: 0, y: 0, scale: 1 });
  const draggingRef = useRef<{ nodeId: string | null; startX: number; startY: number; lastX: number; lastY: number } | null>(null);
  const animRef = useRef<number>(0);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  const initSim = useCallback((w: number, h: number) => {
    const sim: SimNode[] = productNodes.map((n) => {
      let x = w / 2;
      let y = h * 0.5;
      let targetY = h * 0.5;
      let targetXRange: [number, number] = [0, w];

      if (n.type === "atlas") {
        x = w / 2;
        y = h * 0.1;
        targetY = h * 0.1;
        targetXRange = [w * 0.35, w * 0.65];
      } else if (n.type === "systemIntelligence") {
        x = w * 0.22;
        y = h * 0.32;
        targetY = h * 0.32;
        targetXRange = [w * 0.1, w * 0.34];
      } else if (n.type === "changeIntelligence") {
        x = w / 2;
        y = h * 0.32;
        targetY = h * 0.32;
        targetXRange = [w * 0.38, w * 0.62];
      } else if (n.type === "predictiveIntelligence") {
        x = w * 0.78;
        y = h * 0.32;
        targetY = h * 0.32;
        targetXRange = [w * 0.66, w * 0.9];
      } else if (n.type === "useCase") {
        // Find which pillar this use case belongs to
        let pillarId = "";
        for (const [pid, ucs] of Object.entries(PILLAR_USE_CASES)) {
          if (ucs.includes(n.id)) {
            pillarId = pid;
            break;
          }
        }
        const pillarX = pillarId ? PILLAR_X_POSITIONS[pillarId] * w : w / 2;
        const useCases = pillarId ? PILLAR_USE_CASES[pillarId] : [];
        const idx = useCases.indexOf(n.id);
        const total = useCases.length;
        const spread = Math.min(w * 0.16, total * 70);
        const offset = total > 1 ? (idx - (total - 1) / 2) * (spread / Math.max(total - 1, 1)) : 0;
        x = pillarX + offset + (Math.random() - 0.5) * 20;
        y = h * 0.62 + (idx % 2) * h * 0.12 + (Math.random() - 0.5) * 20;
        targetY = h * 0.62 + (idx % 2) * h * 0.12;
        targetXRange = [pillarX - spread / 2 - 30, pillarX + spread / 2 + 30];
      }

      return {
        ...n,
        x,
        y,
        vx: 0,
        vy: 0,
        radius: NODE_RADIUS[n.type],
        targetY,
        targetXRange,
      };
    });
    simRef.current = sim;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDims({ w: width, h: height });
        if (simRef.current.length === 0) {
          initSim(width, height);
        }
      }
    });
    ro.observe(container);
    return () => ro.disconnect();
  }, [initSim]);

  const getMouseWorldPos = useCallback((e: React.MouseEvent | MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left);
    const my = (e.clientY - rect.top);
    const t = transformRef.current;
    return {
      x: (mx - t.x) / t.scale,
      y: (my - t.y) / t.scale,
    };
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const pos = getMouseWorldPos(e);
    for (const node of simRef.current) {
      const dx = pos.x - node.x;
      const dy = pos.y - node.y;
      if (dx * dx + dy * dy < node.radius * node.radius) {
        draggingRef.current = { nodeId: node.id, startX: pos.x, startY: pos.y, lastX: pos.x, lastY: pos.y };
        onSelectNode(node);
        return;
      }
    }
    draggingRef.current = { nodeId: null, startX: pos.x, startY: pos.y, lastX: pos.x, lastY: pos.y };
  }, [getMouseWorldPos, onSelectNode]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!draggingRef.current) return;
    const pos = getMouseWorldPos(e);
    const drag = draggingRef.current;

    if (drag.nodeId) {
      const node = simRef.current.find((n) => n.id === drag.nodeId);
      if (node) {
        node.x = Math.max(node.targetXRange[0], Math.min(node.targetXRange[1], pos.x));
        node.y = pos.y;
        node.vx = 0;
        node.vy = 0;
      }
    } else {
      const dx = pos.x - drag.lastX;
      const dy = pos.y - drag.lastY;
      transformRef.current.x += dx * transformRef.current.scale;
      transformRef.current.y += dy * transformRef.current.scale;
    }
    drag.lastX = pos.x;
    drag.lastY = pos.y;
  }, [getMouseWorldPos]);

  const handleMouseUp = useCallback(() => {
    draggingRef.current = null;
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const t = transformRef.current;
    const worldX = (mx - t.x) / t.scale;
    const worldY = (my - t.y) / t.scale;
    const factor = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.max(0.3, Math.min(3, t.scale * factor));
    t.scale = newScale;
    t.x = mx - worldX * newScale;
    t.y = my - worldY * newScale;
  }, []);

  const resetView = useCallback(() => {
    if (!containerRef.current) return;
    const { w, h } = dims;
    transformRef.current = { x: 0, y: 0, scale: 1 };
    initSim(w, h);
    onSelectNode(null);
  }, [dims, initSim, onSelectNode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dims.w === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = dims.w;
    canvas.height = dims.h;

    const connections = getConnections();

    const step = () => {
      const sim = simRef.current;
      const t = transformRef.current;

      // Physics
      for (let i = 0; i < sim.length; i++) {
        const n = sim[i];
        if (draggingRef.current?.nodeId === n.id) continue;

        let fx = 0, fy = 0;

        // Repulsion between all nodes
        for (let j = 0; j < sim.length; j++) {
          if (i === j) continue;
          const o = sim[j];
          const dx = n.x - o.x;
          const dy = n.y - o.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const minDist = n.radius + o.radius + 25;
          if (dist < minDist) {
            const force = 3000 / (dist * dist);
            fx += (dx / dist) * force;
            fy += (dy / dist) * force;
          } else {
            const force = 1200 / (dist * dist);
            fx += (dx / dist) * force;
            fy += (dy / dist) * force;
          }
        }

        // Attraction along connections
        for (const conn of connections) {
          let a: SimNode | undefined, b: SimNode | undefined;
          if (conn.source === n.id) {
            a = n;
            b = sim.find((x) => x.id === conn.target);
          } else if (conn.target === n.id) {
            a = n;
            b = sim.find((x) => x.id === conn.source);
          }
          if (a && b) {
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            let targetDist = 180;
            if (a.type === "atlas" || b.type === "atlas") targetDist = 140;
            if (a.type === "useCase" && b.type === "useCase") targetDist = 250;
            const force = (dist - targetDist) * 0.004;
            fx += (dx / dist) * force;
            fy += (dy / dist) * force;
          }
        }

        // Tier constraint - pull toward target Y
        const yDiff = n.targetY - n.y;
        fy += yDiff * 0.015;

        // X range constraint
        const midX = (n.targetXRange[0] + n.targetXRange[1]) / 2;
        const xDiff = midX - n.x;
        fx += xDiff * 0.003;

        n.vx = (n.vx + fx) * 0.88;
        n.vy = (n.vy + fy) * 0.88;
        n.x += n.vx;
        n.y += n.vy;

        // Hard bounds
        n.x = Math.max(n.radius + 10, Math.min(dims.w - n.radius - 10, n.x));
        n.y = Math.max(n.radius + 10, Math.min(dims.h - n.radius - 10, n.y));
      }

      // Render
      ctx.clearRect(0, 0, dims.w, dims.h);
      ctx.save();
      ctx.translate(t.x, t.y);
      ctx.scale(t.scale, t.scale);

      // Connections
      ctx.lineWidth = 1.2;
      for (const conn of connections) {
        const a = sim.find((x) => x.id === conn.source);
        const b = sim.find((x) => x.id === conn.target);
        if (!a || !b) continue;

        const isHighlighted = selectedNodeId && (conn.source === selectedNodeId || conn.target === selectedNodeId);

        const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        const alpha = isHighlighted ? "60" : "14";
        grad.addColorStop(0, COLORS[a.type] + alpha);
        grad.addColorStop(1, COLORS[b.type] + alpha);
        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();

        if (isHighlighted) {
          ctx.shadowColor = COLORS[a.type];
          ctx.shadowBlur = 8;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      }

      // Nodes
      for (const node of sim) {
        const isSelected = node.id === selectedNodeId;

        // Node body
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(10, 10, 15, 0.9)";
        ctx.fill();

        // Glow ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.strokeStyle = COLORS[node.type] + (isSelected ? "FF" : "CC");
        ctx.lineWidth = isSelected ? 3 : 1.5;
        ctx.shadowColor = COLORS[node.type];
        ctx.shadowBlur = isSelected ? 25 : (node.type === "atlas" ? 18 : 12);
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Inner fill
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius - 2, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius - 2);
        grad.addColorStop(0, COLORS[node.type] + "12");
        grad.addColorStop(1, COLORS[node.type] + "04");
        ctx.fillStyle = grad;
        ctx.fill();

        // Label
        ctx.fillStyle = node.type === "useCase" ? "#94A3B8" : "#E2E8F0";
        const fontSize = node.type === "atlas" ? 15 : node.type === "useCase" ? 10 : 12;
        ctx.font = `500 ${fontSize}px "IBM Plex Sans", sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        if (node.type === "useCase") {
          // Multi-line for use cases
          const words = node.label.split(" ");
          if (words.length <= 2) {
            ctx.fillText(node.label, node.x, node.y);
          } else {
            const mid = Math.ceil(words.length / 2);
            ctx.fillText(words.slice(0, mid).join(" "), node.x, node.y - 5);
            ctx.fillText(words.slice(mid).join(" "), node.x, node.y + 6);
          }
        } else {
          ctx.fillText(node.label, node.x, node.y);
        }
      }

      ctx.restore();
      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [dims, selectedNodeId]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      />
      <button
        onClick={resetView}
        className="absolute bottom-5 right-5 bg-card/80 backdrop-blur-sm border border-border text-foreground px-4 py-2 rounded-md text-sm font-mono hover:bg-card transition-colors z-10"
      >
        Reset View
      </button>
    </div>
  );
}