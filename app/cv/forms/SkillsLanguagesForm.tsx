"use client";

import { useCv } from "../CvContext";
import { createId, Language, Skill } from "../types";
import { AddButton, IconButton, Input, Section } from "../ui";

function LevelSlider({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <input
      type="range"
      min={1}
      max={5}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="h-1.5 w-28 cursor-pointer appearance-none rounded-full bg-slate-200 accent-indigo-600"
    />
  );
}

export function SkillsLanguagesForm() {
  const { data, setData } = useCv();

  function addSkill() {
    const skill: Skill = { id: createId(), name: "", level: 3 };
    setData((prev) => ({ ...prev, skills: [...prev.skills, skill] }));
  }
  function updateSkill(id: string, patch: Partial<Skill>) {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    }));
  }
  function removeSkill(id: string) {
    setData((prev) => ({ ...prev, skills: prev.skills.filter((s) => s.id !== id) }));
  }

  function addLanguage() {
    const lang: Language = { id: createId(), name: "", level: 3 };
    setData((prev) => ({ ...prev, languages: [...prev.languages, lang] }));
  }
  function updateLanguage(id: string, patch: Partial<Language>) {
    setData((prev) => ({
      ...prev,
      languages: prev.languages.map((l) => (l.id === id ? { ...l, ...patch } : l)),
    }));
  }
  function removeLanguage(id: string) {
    setData((prev) => ({ ...prev, languages: prev.languages.filter((l) => l.id !== id) }));
  }

  return (
    <>
      <Section title="Compétences" subtitle="Vos compétences clés et leur niveau de maîtrise">
        {data.skills.map((skill) => (
          <div key={skill.id} className="flex items-center gap-3">
            <Input
              placeholder="Ex : Gestion de projet"
              value={skill.name}
              onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
            />
            <LevelSlider value={skill.level} onChange={(level) => updateSkill(skill.id, { level })} />
            <IconButton label="✕" variant="danger" onClick={() => removeSkill(skill.id)} />
          </div>
        ))}
        <AddButton label="Ajouter une compétence" onClick={addSkill} />
      </Section>

      <Section title="Langues" subtitle="Les langues que vous parlez et votre niveau">
        {data.languages.map((lang) => (
          <div key={lang.id} className="flex items-center gap-3">
            <Input
              placeholder="Ex : Anglais"
              value={lang.name}
              onChange={(e) => updateLanguage(lang.id, { name: e.target.value })}
            />
            <LevelSlider value={lang.level} onChange={(level) => updateLanguage(lang.id, { level })} />
            <IconButton label="✕" variant="danger" onClick={() => removeLanguage(lang.id)} />
          </div>
        ))}
        <AddButton label="Ajouter une langue" onClick={addLanguage} />
      </Section>
    </>
  );
}
