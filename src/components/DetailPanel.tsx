"use client";

import React from "react";
import { X } from "lucide-react";
import { type ProductNode, nodeTypeConfig, getNodeById } from "@/data/productData";

interface DetailPanelProps {
  node: ProductNode | null;
  onClose: () => void;
}

export function DetailPanel({ node, onClose }: DetailPanelProps) {
  if (!node) return null;

  const config = nodeTypeConfig[node.type];

  return (
    <div className="absolute top-0 right-0 h-full w-full sm:w-[400px] bg-card/95 backdrop-blur-md border-l border-border z-20 flex flex-col animate-in slide-in-from-right duration-300">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: config.color, boxShadow: `0 0 8px ${config.color}` }}
          />
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            {config.label}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground leading-snug mb-3">
            {node.label}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {node.description}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-3">
            Key Details
          </h3>
          <ul className="space-y-2">
            {node.details.map((detail, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm text-foreground"
              >
                <span
                  className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: config.color }}
                />
                {detail}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-3">
            Connections
          </h3>
          <div className="flex flex-wrap gap-2">
            {node.connections.map((connId) => {
              const targetNode = getNodeById(connId);
              if (!targetNode) return null;
              const targetConfig = nodeTypeConfig[targetNode.type];
              return (
                <span
                  key={connId}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border"
                  style={{
                    borderColor: targetConfig.color + "40",
                    backgroundColor: targetConfig.color + "10",
                    color: targetConfig.color,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: targetConfig.color }}
                  />
                  {targetNode.label}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}