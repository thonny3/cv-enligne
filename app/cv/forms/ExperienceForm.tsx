"use client";

import { useCv } from "../CvContext";
import { createId, Experience } from "../types";
import { AddButton, Field, IconButton, Input, Section, Textarea } from "../ui";

function emptyExperience(): Experience {
  return {
    id: createId(),
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  };
}

export function ExperienceForm() {
  const { data, setData } = useCv();

  function update(id: string, patch: Partial<Experience>) {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) => (exp.id === id ? { ...exp, ...patch } : exp)),
    }));
  }

  function add() {
    setData((prev) => ({ ...prev, experiences: [...prev.experiences, emptyExperience()] }));
  }

  function remove(id: string) {
    setData((prev) => ({ ...prev, experiences: prev.experiences.filter((exp) => exp.id !== id) }));
  }

  return (
    <Section title="Expérience professionnelle" subtitle="Vos postes précédents, du plus récent au plus ancien">
      {data.experiences.map((exp) => (
        <div key={exp.id} className="space-y-3 rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Poste</span>
            <IconButton label="Supprimer" variant="danger" onClick={() => remove(exp.id)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Intitulé du poste">
              <Input value={exp.title} onChange={(e) => update(exp.id, { title: e.target.value })} />
            </Field>
            <Field label="Entreprise">
              <Input value={exp.company} onChange={(e) => update(exp.id, { company: e.target.value })} />
            </Field>
          </div>
          <Field label="Ville">
            <Input value={exp.location} onChange={(e) => update(exp.id, { location: e.target.value })} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date de début">
              <Input
                type="month"
                value={exp.startDate}
                onChange={(e) => update(exp.id, { startDate: e.target.value })}
              />
            </Field>
            <Field label="Date de fin">
              <Input
                type="month"
                value={exp.endDate}
                disabled={exp.current}
                onChange={(e) => update(exp.id, { endDate: e.target.value })}
              />
            </Field>
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={exp.current}
              onChange={(e) => update(exp.id, { current: e.target.checked, endDate: "" })}
            />
            Poste actuel
          </label>
          <Field label="Description">
            <Textarea
              value={exp.description}
              onChange={(e) => update(exp.id, { description: e.target.value })}
            />
          </Field>
        </div>
      ))}
      <AddButton label="Ajouter une expérience" onClick={add} />
    </Section>
  );
}
