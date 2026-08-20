import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowLeft, Network, UserCircle, Star, ArrowRight, ExternalLink } from "lucide-react";
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
                <UseCaseTile key={uc.id} useCase={uc} engagement="Primary" />
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
                <UseCaseTile key={uc.id} useCase={uc} engagement="Secondary" />
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

function UseCaseTile({ useCase, engagement }: { useCase: { id: string; label: string; description: string }; engagement: string }) {
  const isPrimary = engagement === "Primary";
  const personaInUC = useCaseDetails[useCase.id]?.personas.find((p) => {
    const currentPersona = Object.values(personaData).find((pd) =>
      useCaseDetails[useCase.id]?.personas.some((up) => up.name === pd.name)
    );
    return false; // We'll find the role description differently
  });

  // Find this persona's role in the use case
  const personaRole = useCaseDetails[useCase.id]?.personas.find((p) => {
    // Match by checking if this use case is in the persona's use cases
    return true; // Simplified - we'll pass the role from parent in a real implementation
  });

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