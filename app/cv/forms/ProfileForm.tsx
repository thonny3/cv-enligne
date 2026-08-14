"use client";

import { useCv } from "../CvContext";
import { Section, Textarea } from "../ui";

export function ProfileForm() {
  const { data, setData } = useCv();

  return (
    <Section title="Profil" subtitle="Un résumé court qui met en avant votre parcours">
      <Textarea
        placeholder="Décrivez votre profil professionnel en quelques phrases..."
        value={data.profile}
        onChange={(e) => setData((prev) => ({ ...prev, profile: e.target.value }))}
      />
    </Section>
  );
}
