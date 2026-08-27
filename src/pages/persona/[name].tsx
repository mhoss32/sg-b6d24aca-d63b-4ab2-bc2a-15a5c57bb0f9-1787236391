import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowLeft, Network, UserCircle, Star, ArrowRight, ExternalLink, ChevronDown } from "lucide-react";
import { personaData, getPersonaUseCases, useCaseDetails } from "@/data/productData";
import { SEO } from "@/components/SEO";

export default function PersonaDetailPage() {
  const router = useRouter();
  const { name } = router.query;

  const personaKey = name && typeof name === "string" ? name.toLowerCase() : "";
  const persona = personaData[personaKey];

  if (!persona) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Persona not found</p>
          <Link href="/" className="inline-flex items-center gap-2 text-cyan hover:text-cyan-light transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Atlas
          </Link>
        </div>
      </div>
    );
  }

  const { primary, secondary } = getPersonaUseCases(persona.name);

  return (
    <div className="min-h-screen bg-background">
      <SEO title={`${persona.name} — Atlas Persona`} description={persona.summary.slice(0, 160)} />

      {/* Header */}
      <header className="border-b border-border/30 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
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
        {/* Persona Header */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-cyan/15 text-cyan flex items-center justify-center">
              <UserCircle className="w-9 h-9" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">{persona.name}</h1>
              <p className="text-lg text-muted-foreground">{persona.role}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Summary */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl border border-border/20 bg-card/20 p-6">
                <h2 className="text-lg font-semibold text-foreground mb-3">Overview</h2>
                <p className="text-muted-foreground leading-relaxed">{persona.summary}</p>
              </div>

              {persona.quote && (
                <div className="rounded-xl border-l-4 border-cyan bg-cyan/5 p-5">
                  <p className="text-foreground italic leading-relaxed">"{persona.quote}"</p>
                </div>
              )}

              {persona.painPoints && persona.painPoints.length > 0 && (
                <div className="rounded-2xl border border-border/20 bg-card/20 p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-3">Key Pain Points</h2>
                  <ul className="space-y-2">
                    {persona.painPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-cyan mt-1">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-border/20 bg-card/20 p-6">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Details</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Experience</p>
                    <p className="text-sm text-foreground">{persona.experience}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Primary Concerns</p>
                    <div className="flex flex-wrap gap-1.5">
                      {persona.concerns.map((concern, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded-md bg-muted/50 text-muted-foreground">
                          {concern}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Use Cases</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-cyan">{primary.length}</span>
                      <span className="text-sm text-muted-foreground">Primary</span>
                      <span className="text-sm text-muted-foreground">·</span>
                      <span className="text-sm font-medium text-purple">{secondary.length}</span>
                      <span className="text-sm text-muted-foreground">Secondary</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Primary Use Cases */}
        {primary.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Star className="w-5 h-5 text-cyan fill-cyan" />
              Primary Use Cases
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {primary.map((uc) => (
                <UseCaseTile key={uc.id} useCase={uc} engagement="Primary" personaName={persona.name} />
              ))}
            </div>
          </section>
        )}

        {/* Secondary Use Cases */}
        {secondary.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full border-2 border-purple flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-purple" />
              </span>
              Secondary Use Cases
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {secondary.map((uc) => (
                <UseCaseTile key={uc.id} useCase={uc} engagement="Secondary" personaName={persona.name} />
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="border-t border-border/20 pt-8 pb-12">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">IBM Atlas Platform — {new Date().getFullYear()}</p>
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-cyan hover:text-cyan-light transition-colors">
              <Network className="w-4 h-4" />
              Explore Atlas
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}

function UseCaseTile({ useCase, engagement, personaName }: { useCase: { id: string; label: string; description: string }; engagement: string; personaName: string }) {
  const isPrimary = engagement === "Primary";
  const detail = useCaseDetails[useCase.id];
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const asIsMarkers = detail?.asIs.markers.filter((m) => m.persona === personaName) || [];
  const toBeMarkers = detail?.toBe.markers.filter((m) => m.persona === personaName) || [];

  const markerConfig: Record<string, { bg: string; border: string; text: string; label: string }> = {
    pain: { bg: "bg-orange-400/10", border: "border-orange-400/30", text: "text-orange-300", label: "Business Impact" },
    time: { bg: "bg-amber-400/10", border: "border-amber-400/30", text: "text-amber-300", label: "Lost Time" },
    skill: { bg: "bg-red-400/10", border: "border-red-400/30", text: "text-red-300", label: "Skill Gap / Bottleneck" },
    gain: { bg: "bg-purple-400/10", border: "border-purple-400/30", text: "text-purple-300", label: "New User Capability" },
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <Link href={`/usecase/${useCase.id}`} className="group block">
      <div
        className={cn(
          "rounded-xl border p-5 h-full transition-all duration-300",
          "bg-card/50 backdrop-blur-sm",
          "hover:border-cyan/40 hover:bg-card/80",
          isPrimary ? "border-cyan/20" : "border-border/40"
        )}
      >
        <div className="flex items-start justify-between mb-3">
          <div
            className={cn(
              "text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full",
              isPrimary ? "bg-cyan/15 text-cyan" : "bg-purple/15 text-purple"
            )}
          >
            {engagement}
          </div>
          <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <h3 className="font-semibold text-foreground mb-2 group-hover:text-cyan transition-colors">{useCase.label}</h3>
        <p className="text-sm text-muted-foreground line-clamp-3">{useCase.description}</p>

        {/* Pain Points */}
        {asIsMarkers.length > 0 && (
          <div className="mt-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleSection(`pain-${useCase.id}`);
              }}
              className="flex items-center gap-2 w-full text-left py-1.5 px-2 rounded-md hover:bg-red-400/5 transition-colors"
            >
              <ChevronDown
                className={cn(
                  "w-3.5 h-3.5 text-red-400 transition-transform",
                  expandedSection === `pain-${useCase.id}` ? "rotate-180" : ""
                )}
              />
              <span className="text-xs font-semibold text-red-400">Pain Points</span>
              <span className="text-[10px] text-muted-foreground ml-auto">{asIsMarkers.length} {asIsMarkers.length === 1 ? "item" : "items"}</span>
            </button>
            {expandedSection === `pain-${useCase.id}` && (
              <div className="flex flex-col gap-1.5 mt-1 pl-6">
                {asIsMarkers.map((m, i) => {
                  const mc = markerConfig[m.type] || markerConfig.pain;
                  return (
                    <div key={i} className={cn("flex flex-col gap-1 p-2.5 rounded-lg border", mc.bg, mc.border)}>
                      <div className="flex items-center gap-2">
                        <div className={cn("w-1.5 h-1.5 rounded-sm", mc.text.replace("text-", "bg-"))} />
                        <span className={cn("text-[10px] font-bold uppercase tracking-wider", mc.text)}>{mc.label}</span>
                      </div>
                      <span className="text-xs font-medium text-foreground leading-snug">{m.title}</span>
                      <span className="text-[11px] text-muted-foreground leading-relaxed">{m.description}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Wows */}
        {toBeMarkers.length > 0 && (
          <div className="mt-3">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleSection(`wow-${useCase.id}`);
              }}
              className="flex items-center gap-2 w-full text-left py-1.5 px-2 rounded-md hover:bg-green-400/5 transition-colors"
            >
              <ChevronDown
                className={cn(
                  "w-3.5 h-3.5 text-green-400 transition-transform",
                  expandedSection === `wow-${useCase.id}` ? "rotate-180" : ""
                )}
              />
              <span className="text-xs font-semibold text-green-400">Wows!</span>
              <span className="text-[10px] text-muted-foreground ml-auto">{toBeMarkers.length} {toBeMarkers.length === 1 ? "item" : "items"}</span>
            </button>
            {expandedSection === `wow-${useCase.id}` && (
              <div className="flex flex-col gap-1.5 mt-1 pl-6">
                {toBeMarkers.map((m, i) => {
                  const mc = markerConfig[m.type] || markerConfig.gain;
                  return (
                    <div key={i} className={cn("flex flex-col gap-1 p-2.5 rounded-lg border", mc.bg, mc.border)}>
                      <div className="flex items-center gap-2">
                        <div className={cn("w-1.5 h-1.5 rounded-sm", mc.text.replace("text-", "bg-"))} />
                        <span className={cn("text-[10px] font-bold uppercase tracking-wider", mc.text)}>{mc.label}</span>
                      </div>
                      <span className="text-xs font-medium text-foreground leading-snug">{m.title}</span>
                      <span className="text-[11px] text-muted-foreground leading-relaxed">{m.description}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        <div className="mt-4 flex items-center gap-1 text-xs text-cyan opacity-0 group-hover:opacity-100 transition-opacity">
          <span>View use case</span>
          <ArrowRight className="w-3 h-3" />
        </div>
      </div>
    </Link>
  );
}

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}