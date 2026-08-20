"use client";

import React, { useState } from "react";
import { NetworkGraph } from "@/components/NetworkGraph";
import { DetailPanel } from "@/components/DetailPanel";
import { Legend } from "@/components/Legend";
import { Header } from "@/components/Header";
import { type ProductNode } from "@/data/productData";

export default function Home() {
  const [selectedNode, setSelectedNode] = useState<ProductNode | null>(null);

  return (
    <main className="relative w-screen h-screen bg-background overflow-hidden">
      <Header />
      <Legend />
      <NetworkGraph
        onSelectNode={setSelectedNode}
        selectedNodeId={selectedNode?.id ?? null}
      />
      <DetailPanel node={selectedNode} onClose={() => setSelectedNode(null)} />
    </main>
  );
}