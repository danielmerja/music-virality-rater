import { Progress } from "@/components/ui/progress";

interface EarnProgressBarProps {
  ratingProgress: number; // 0-4
}

export function EarnProgressBar({ ratingProgress }: EarnProgressBarProps) {
  const remaining = 5 - ratingProgress;
  return (
    <div className="rounded-lg bg-muted/50 px-4 py-3">
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">
          {ratingProgress}/5 rated
        </span>
        <span className="font-medium text-primary">
          {remaining} more for +1 credit
        </span>
      </div>
      <Progress value={(ratingProgress / 5) * 100} className="h-2" />
    </div>
  );
}
