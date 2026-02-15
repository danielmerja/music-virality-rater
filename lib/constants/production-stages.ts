export interface ProductionStage {
  id: string;
  label: string;
  emoji: string;
  description: string; // shown in hover tooltip
}

export const PRODUCTION_STAGES: ProductionStage[] = [
  {
    id: "demo",
    label: "Demo",
    emoji: "🎤",
    description:
      "A rough recording — early idea, minimal production. Raters: focus on the core song, not polish.",
  },
  {
    id: "mixed",
    label: "Mixed",
    emoji: "🎛️",
    description:
      "Mixed but not mastered — balanced levels and EQ, but no final loudness/polish pass.",
  },
  {
    id: "mastered",
    label: "Mastered",
    emoji: "💿",
    description:
      "Fully mastered and release-ready — final loudness, clarity, and polish applied.",
  },
];

export function getProductionStageById(
  id: string,
): ProductionStage | undefined {
  return PRODUCTION_STAGES.find((s) => s.id === id);
}
