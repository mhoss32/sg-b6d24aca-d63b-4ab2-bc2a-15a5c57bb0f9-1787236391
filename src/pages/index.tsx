"use client";

import React, { useState } from "react";
import { AtlasHierarchy } from "@/components/AtlasHierarchy";
import { DetailPanel } from "@/components/DetailPanel";
import { Header } from "@/components/Header";
import { type ProductNode } from "@/data/productData";

export default function Home() {
  const [selectedNode, setSelectedNode] = useState<ProductNode | null>(null);

  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <Header />
      <AtlasHierarchy />
      <DetailPanel node={selectedNode} onClose={() => setSelectedNode(null)} />
    </main>
  );
}