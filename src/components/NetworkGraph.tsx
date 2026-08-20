"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { productNodes, getConnections, type ProductNode, type NodeType, nodeTypeConfig } from "@/data/productData";

interface LayoutNode extends ProductNode {
  x: number;
  y: number;
  radius: number;
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

const PILLAR_USE_CASES: Record<string, string[]> = {
  system: ["uc-04", "uc-05"],
  change: ["uc-02", "uc-07", "uc-08", "uc-12", "uc-13", "uc-14"],
  predictive: ["uc-01", "uc-03", "uc-06", "uc-09", "uc-10", "uc-11"],
};

function computeLayout(w: number, h: number): LayoutNode[] {
  const atlasX = w / 2;
  const atlasY = h * 0.10;

  const pillarY = h * 0.30;
  const systemX = w * 0.20;
  const changeX = w * 0.50;
  const predictiveX = w * 0.80;

  const useCaseStartY = h * 0.52;
  const rowGap = h * 0.18;

  const positions: Record<string, { x: number; y: number }> = {
    atlas: { x: atlasX, y: atlasY },
    system: { x: systemX, y: pillarY },
    change: { x: changeX, y: pillarY },
    predictive: { x: predictiveX, y: pillarY },
  };

  // Position use cases in rows under each pillar
  const pillarCenters: Record<string, number> = {
    system: systemX,
    change: changeX,
    predictive: predictiveX,
  };

  for (const [pillarId, ucIds] of Object.entries(PILLAR_USE_CASES)) {
    const centerX = pillarCenters[pillarId];
    const total = ucIds.length;
    const perRow = 3;
    const rows = Math.ceil(total / perRow);

    for (let i = 0; i < total; i++) {
      const row = Math.floor(i / perRow);
      const col = i % perRow;
      const inRow = Math.min(perRow, total - row * perRow);
      const spread = Math.min(w * 0.18, 220);
      const offset = inRow > 1 ? (col - (inRow - 1) / 2) * (spread / (inRow - 1)) : 0;
      positions[ucIds[i]] = {
        x: centerX + offset,
        y: useCaseStartY + row * rowGap,
      };
    }
  }

  return productNodes.map((n) => ({
    ...n,
    x: positions[n.id]?.x ?? w / 2,
    y: positions[n.id]?.y ?? h / 2,
    radius: NODE_RADIUS[n.type],
  }));
}

interface NetworkGraphProps {
  onSelectNode: (node: ProductNode | null) => void;
  selectedNodeId: string | null;
}

export function NetworkGraph({ onSelectNode, selectedNodeId }: NetworkGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<LayoutNode[]>([]);
  const transformRef = useRef({ x: 0, y: 0, scale: 1 });
  const panningRef = useRef<{ active: boolean; lastX: number; lastY: number } | null>(null);
  const animRef = useRef<number>(0);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  const initLayout = useCallback((w: number, h: number) => {
    nodesRef.current = computeLayout(w, h);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDims({ w: width, h: height });
        initLayout(width, height);
      }
    });
    ro.observe(container);
    return () => ro.disconnect();
  }, [initLayout]);

  const getMouseWorldPos = useCallback((e: React.MouseEvent | MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const t = transformRef.current;
    return {
      x: (mx - t.x) / t.scale,
      y: (my - t.y) / t.scale,
    };
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const pos = getMouseWorldPos(e);
    // Check if clicking a node
    for (const node of nodesRef.current) {
      const dx = pos.x - node.x;
      const dy = pos.y - node.y;
      if (dx * dx + dy * dy < node.radius * node.radius) {
        onSelectNode(node);
        return;
      }
    }
    // Start panning
    panningRef.current = { active: true, lastX: pos.x, lastY: pos.y };
  }, [getMouseWorldPos, onSelectNode]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!panningRef.current?.active) return;
    const pos = getMouseWorldPos(e);
    const dx = pos.x - panningRef.current.lastX;
    const dy = pos.y - panningRef.current.lastY;
    transformRef.current.x += dx * transformRef.current.scale;
    transformRef.current.y += dy * transformRef.current.scale;
    panningRef.current.lastX = pos.x;
    panningRef.current.lastY = pos.y;
  }, [getMouseWorldPos]);

  const handleMouseUp = useCallback(() => {
    panningRef.current = null;
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
    const factor = e.deltaY > 0 ? 0.88 : 1.12;
    const newScale = Math.max(0.25, Math.min(4, t.scale * factor));
    t.scale = newScale;
    t.x = mx - worldX * newScale;
    t.y = my - worldY * newScale;
  }, []);

  const resetView = useCallback(() => {
    transformRef.current = { x: 0, y: 0, scale: 1 };
    onSelectNode(null);
  }, [onSelectNode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dims.w === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = dims.w;
    canvas.height = dims.h;

    const connections = getConnections();

    const draw = () => {
      const nodes = nodesRef.current;
      const t = transformRef.current;

      ctx.clearRect(0, 0, dims.w, dims.h);
      ctx.save();
      ctx.translate(t.x, t.y);
      ctx.scale(t.scale, t.scale);

      // Draw connections
      for (const conn of connections) {
        const a = nodes.find((x) => x.id === conn.source);
        const b = nodes.find((x) => x.id === conn.target);
        if (!a || !b) continue;

        const isHighlighted = selectedNodeId && (conn.source === selectedNodeId || conn.target === selectedNodeId);

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);

        if (isHighlighted) {
          ctx.strokeStyle = COLORS[a.type] + "80";
          ctx.lineWidth = 2.5;
          ctx.shadowColor = COLORS[a.type];
          ctx.shadowBlur = 12;
        } else {
          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          grad.addColorStop(0, COLORS[a.type] + "18");
          grad.addColorStop(1, COLORS[b.type] + "18");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.2;
          ctx.shadowBlur = 0;
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Draw nodes
      for (const node of nodes) {
        const isSelected = node.id === selectedNodeId;

        // Glow ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.strokeStyle = COLORS[node.type] + (isSelected ? "FF" : "CC");
        ctx.lineWidth = isSelected ? 3 : 1.5;
        ctx.shadowColor = COLORS[node.type];
        ctx.shadowBlur = isSelected ? 30 : (node.type === "atlas" ? 20 : 14);
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Solid background
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius - 1, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(10, 10, 15, 0.95)";
        ctx.fill();

        // Inner subtle fill
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius - 3, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius - 3);
        grad.addColorStop(0, COLORS[node.type] + "14");
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
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
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