"use client";

import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getProductionStageById } from "@/lib/constants/production-stages";

interface ProductionStageBadgeProps {
  stageId: string | null;
}

export function ProductionStageBadge({ stageId }: ProductionStageBadgeProps) {
  if (!stageId) return null;

  const stage = getProductionStageById(stageId);
  if (!stage) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge variant="outline" className="cursor-help">
          {stage.emoji} {stage.label}
        </Badge>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>{stage.description}</p>
      </TooltipContent>
    </Tooltip>
  );
}
