"use client";

import React from "react";
import { nodeTypeConfig } from "@/data/productData";

export function Legend() {
  return (
    <div className="absolute top-5 left-5 bg-card/80 backdrop-blur-sm border border-border rounded-lg p-4 z-10">
      <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">
        Atlas Hierarchy
      </h3>
      <div className="space-y-2.5">
        {Object.entries(nodeTypeConfig).map(([key, config]) => (
          <div key={key} className="flex items-center gap-2.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{
                backgroundColor: config.color,
                boxShadow: `0 0 6px ${config.color}`,
              }}
            />
            <span className="text-sm text-foreground">{config.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}