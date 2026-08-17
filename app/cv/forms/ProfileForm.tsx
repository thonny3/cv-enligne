"use client";

import { useCv } from "../CvContext";
import { ImproveTextButton, Section, Textarea } from "../ui";

export function ProfileForm() {
  const { data, setData } = useCv();

  return (
    <Section title="Profil" subtitle="Un résumé court qui met en avant votre parcours">
      <Textarea
        placeholder="Décrivez votre profil professionnel en quelques phrases..."
        value={data.profile}
        onChange={(e) => setData((prev) => ({ ...prev, profile: e.target.value }))}
      />
      <div className="flex justify-end">
        <ImproveTextButton
          text={data.profile}
          context="Résumé de profil professionnel pour un CV"
          onImproved={(improved) => setData((prev) => ({ ...prev, profile: improved }))}
        />
      </div>
    </Section>
  );
}
