"use client";

import { cn } from "@/lib/utils";
import { VOTE_PACKAGES, type VotePackage } from "@/lib/constants/packages";

interface VotePackageSelectorProps {
  selected: VotePackage;
  onSelect: (pkg: VotePackage) => void;
  userCredits: number;
}

export function VotePackageSelector({
  selected,
  onSelect,
  userCredits,
}: VotePackageSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {VOTE_PACKAGES.map((pkg) => {
        const isSelected = selected.votes === pkg.votes;
        const canAfford = pkg.isFree || userCredits >= pkg.credits;
        return (
          <button
            key={pkg.votes}
            type="button"
            onClick={() => canAfford && onSelect(pkg)}
            disabled={!canAfford}
            className={cn(
              "flex flex-col items-center gap-1 rounded-xl border-2 p-3 transition-all",
              isSelected
                ? "border-primary bg-primary/5"
                : canAfford
                  ? "border-border hover:border-primary/50"
                  : "cursor-not-allowed border-border opacity-50"
            )}
          >
            <span className="text-lg font-bold">{pkg.votes}</span>
            <span className="text-xs text-muted-foreground">votes</span>
            <span
              className={cn(
                "mt-1 rounded-full px-2 py-0.5 text-xs font-medium",
                pkg.isFree
                  ? "bg-green-100 text-green-700"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {pkg.isFree ? "Free" : `${pkg.credits} credits`}
            </span>
          </button>
        );
      })}
    </div>
  );
}
