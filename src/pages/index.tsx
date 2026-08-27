"use client";

import React, { useState } from "react";
import { Download } from "lucide-react";
import { AtlasHierarchy } from "@/components/AtlasHierarchy";
import { DetailPanel } from "@/components/DetailPanel";
import { Header } from "@/components/Header";
import { exportSiteHTML } from "@/lib/export";
import { type ProductNode } from "@/data/productData";

export default function Home() {
  const [selectedNode, setSelectedNode] = useState<ProductNode | null>(null);

  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <Header />
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={exportSiteHTML}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border/30 bg-card/50 backdrop-blur-sm text-sm font-medium text-muted-foreground hover:text-foreground hover:border-border/50 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export HTML
        </button>
      </div>
      <AtlasHierarchy />
      <DetailPanel node={selectedNode} onClose={() => setSelectedNode(null)} />
    </main>
  );
}