import type { Review } from "@/data/types";
import { formatIsoDate } from "@/lib/format";
import { StatusTag } from "@/components/ui/StatusTag";

type ReviewNoteProps = {
  review?: Review;
  /** Shown when the record has not been researched yet. */
  pendingText: string;
  className?: string;
};

/** States how far a record has been checked, so a partial entry is never mistaken for a finished one. */
export function ReviewNote({ review, pendingText, className = "" }: ReviewNoteProps) {
  return (
    <div className={`flex max-w-prose flex-col items-start gap-2 border-l border-crimson pl-4 ${className}`}>
      <StatusTag>{review ? "Core facts sourced" : "Profile in preparation"}</StatusTag>
      <p className="text-label text-ash">
        {review ? `${review.scope} Last reviewed ${formatIsoDate(review.reviewed)}.` : pendingText}
      </p>
    </div>
  );
}
