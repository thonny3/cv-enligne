"use client";

import { useCv } from "../CvContext";
import { Section, Textarea } from "../ui";

export function CoverLetterForm() {
  const { data, setData } = useCv();

  if (!data.coverLetter) return null;

  return (
    <Section title="Lettre de motivation" subtitle="Générée automatiquement, modifiable librement">
      <Textarea
        value={data.coverLetter}
        onChange={(e) => setData((prev) => ({ ...prev, coverLetter: e.target.value }))}
        className="min-h-[280px]"
      />
    </Section>
  );
}
