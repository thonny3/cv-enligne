"use client";

import { useCv } from "./CvContext";
import { ClassicLetterTemplate } from "./templates/letters/ClassicLetterTemplate";
import { ModernLetterTemplate } from "./templates/letters/ModernLetterTemplate";

export function LetterPreview() {
  const { data } = useCv();

  const template =
    data.letter.template === "modern" ? (
      <ModernLetterTemplate data={data} />
    ) : (
      <ClassicLetterTemplate data={data} />
    );

  return (
    <div id="letter-preview" className="mx-auto w-fit bg-white shadow-xl">
      {template}
    </div>
  );
}
