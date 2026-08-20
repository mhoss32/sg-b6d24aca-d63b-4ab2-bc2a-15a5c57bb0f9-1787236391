import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowLeft, Network, ExternalLink } from "lucide-react";
import { getNodeById, useCaseDetails, type ProductNode } from "@/data/productData";
import { PersonaCard } from "@/components/PersonaCard";
import { FlowDiagram } from "@/components/FlowDiagram";
import { SEO } from "@/components/SEO";

export default function UseCaseDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const node = id && typeof id === "string" ? getNodeById(id) : null;
  const detail = id && typeof id === "string" ? useCaseDetails[id] : null;

  if (!node || !detail) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Use case not found</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-cyan hover:text-cyan-light transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Atlas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${node.label} — Atlas Use Case`}
        description={node.description}
      />

      {/* Header */}
      <header className="border-b border-border/30 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Atlas
          </Link>
          <div className="flex items-center gap-2">
            <Network className="w-5 h-5 text-cyan" />
            <span className="font-semibold text-foreground">Atlas</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Use Case Header */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: "#00D4FF", boxShadow: "0 0 12px rgba(0,212,255,0.5)" }}
            />
            <span className="text-sm font-mono uppercase tracking-wider text-cyan">
              Use Case
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {node.label}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            {node.description}
          </p>
        </section>

        {/* Personas */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-purple/10 text-purple flex items-center justify-center">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </span>
            Personas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {detail.personas.map((persona) => (
              <PersonaCard key={persona.id} persona={persona} />
            ))}
          </div>
        </section>

        {/* As-Is Flow */}
        <section className="rounded-2xl border border-border/20 bg-card/20 p-6 sm:p-8">
          <FlowDiagram diagram={detail.asIsFlow} variant="asIs" />
        </section>

        {/* To-Be Flow */}
        <section className="rounded-2xl border border-border/20 bg-card/20 p-6 sm:p-8">
          <FlowDiagram diagram={detail.toBeFlow} variant="toBe" />
        </section>

        {/* Footer */}
        <footer className="border-t border-border/20 pt-8 pb-12">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              IBM Atlas Platform — {new Date().getFullYear()}
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-cyan hover:text-cyan-light transition-colors"
            >
              <Network className="w-4 h-4" />
              Explore Atlas
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}