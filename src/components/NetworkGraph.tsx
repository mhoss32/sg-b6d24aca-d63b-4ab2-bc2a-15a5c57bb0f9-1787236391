"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { productNodes, getConnections, getNodeById, type ProductNode, type NodeType, nodeTypeConfig } from "@/data/productData";

interface SimNode extends ProductNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

const NODE_RADIUS: Record<NodeType, number> = {
  useCase: 42,
  userStory: 34,
  functionality: 30,
};

const COLORS: Record<NodeType, string> = {
  useCase: "#00D4FF",
  userStory: "#FF6B6B",
  functionality: "#A78BFA",
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
    const sim: SimNode[] = productNodes.map((n, i) => {
      const angle = (i / productNodes.length) * Math.PI * 2;
      const dist = Math.min(w, h) * 0.25;
      return {
        ...n,
        x: w / 2 + Math.cos(angle) * dist + (Math.random() - 0.5) * 60,
        y: h / 2 + Math.sin(angle) * dist + (Math.random() - 0.5) * 60,
        vx: 0,
        vy: 0,
        radius: NODE_RADIUS[n.type],
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
        node.x = pos.x;
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

        // Repulsion
        for (let j = 0; j < sim.length; j++) {
          if (i === j) continue;
          const o = sim[j];
          const dx = n.x - o.x;
          const dy = n.y - o.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = 4000 / (dist * dist);
          fx += (dx / dist) * force;
          fy += (dy / dist) * force;
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
            const force = (dist - 180) * 0.003;
            fx += (dx / dist) * force;
            fy += (dy / dist) * force;
          }
        }

        // Centering
        const cdx = dims.w / 2 - n.x;
        const cdy = dims.h / 2 - n.y;
        fx += cdx * 0.0003;
        fy += cdy * 0.0003;

        n.vx = (n.vx + fx) * 0.85;
        n.vy = (n.vy + fy) * 0.85;
        n.x += n.vx;
        n.y += n.vy;
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
        grad.addColorStop(0, COLORS[a.type] + (isHighlighted ? "60" : "18"));
        grad.addColorStop(1, COLORS[b.type] + (isHighlighted ? "60" : "18"));
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
        const isHovered = false;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(10, 10, 15, 0.85)";
        ctx.fill();

        // Glow ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.strokeStyle = COLORS[node.type] + (isSelected ? "FF" : "CC");
        ctx.lineWidth = isSelected ? 3 : 1.5;
        ctx.shadowColor = COLORS[node.type];
        ctx.shadowBlur = isSelected ? 20 : 10;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Inner fill
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius - 2, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius - 2);
        grad.addColorStop(0, COLORS[node.type] + "15");
        grad.addColorStop(1, COLORS[node.type] + "05");
        ctx.fillStyle = grad;
        ctx.fill();

        // Label
        ctx.fillStyle = "#E2E8F0";
        ctx.font = `500 ${node.type === "useCase" ? 13 : 11}px "IBM Plex Sans", sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const words = node.label.split(" ");
        if (words.length <= 2) {
          ctx.fillText(node.label, node.x, node.y);
        } else {
          const mid = Math.ceil(words.length / 2);
          ctx.fillText(words.slice(0, mid).join(" "), node.x, node.y - 7);
          ctx.fillText(words.slice(mid).join(" "), node.x, node.y + 7);
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