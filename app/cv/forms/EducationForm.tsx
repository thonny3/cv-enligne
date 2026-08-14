"use client";

import { useCv } from "../CvContext";
import { createId, Education } from "../types";
import { AddButton, Field, IconButton, Input, Section, Textarea } from "../ui";

function emptyEducation(): Education {
  return {
    id: createId(),
    degree: "",
    school: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  };
}

export function EducationForm() {
  const { data, setData } = useCv();

  function update(id: string, patch: Partial<Education>) {
    setData((prev) => ({
      ...prev,
      educations: prev.educations.map((edu) => (edu.id === id ? { ...edu, ...patch } : edu)),
    }));
  }

  function add() {
    setData((prev) => ({ ...prev, educations: [...prev.educations, emptyEducation()] }));
  }

  function remove(id: string) {
    setData((prev) => ({ ...prev, educations: prev.educations.filter((edu) => edu.id !== id) }));
  }

  return (
    <Section title="Formation" subtitle="Vos diplômes et parcours scolaire">
      {data.educations.map((edu) => (
        <div key={edu.id} className="space-y-3 rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Diplôme</span>
            <IconButton label="Supprimer" variant="danger" onClick={() => remove(edu.id)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Diplôme">
              <Input value={edu.degree} onChange={(e) => update(edu.id, { degree: e.target.value })} />
            </Field>
            <Field label="École / Université">
              <Input value={edu.school} onChange={(e) => update(edu.id, { school: e.target.value })} />
            </Field>
          </div>
          <Field label="Ville">
            <Input value={edu.location} onChange={(e) => update(edu.id, { location: e.target.value })} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date de début">
              <Input
                type="month"
                value={edu.startDate}
                onChange={(e) => update(edu.id, { startDate: e.target.value })}
              />
            </Field>
            <Field label="Date de fin">
              <Input
                type="month"
                value={edu.endDate}
                onChange={(e) => update(edu.id, { endDate: e.target.value })}
              />
            </Field>
          </div>
          <Field label="Description">
            <Textarea
              value={edu.description}
              onChange={(e) => update(edu.id, { description: e.target.value })}
            />
          </Field>
        </div>
      ))}
      <AddButton label="Ajouter une formation" onClick={add} />
    </Section>
  );
}
