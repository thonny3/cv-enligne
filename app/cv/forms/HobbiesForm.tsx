"use client";

import { useCv } from "../CvContext";
import { createId } from "../types";
import { AddButton, IconButton, Input, Section } from "../ui";

export function HobbiesForm() {
  const { data, setData } = useCv();

  function add() {
    setData((prev) => ({ ...prev, hobbies: [...prev.hobbies, { id: createId(), name: "" }] }));
  }
  function update(id: string, name: string) {
    setData((prev) => ({
      ...prev,
      hobbies: prev.hobbies.map((h) => (h.id === id ? { ...h, name } : h)),
    }));
  }
  function remove(id: string) {
    setData((prev) => ({ ...prev, hobbies: prev.hobbies.filter((h) => h.id !== id) }));
  }

  return (
    <Section title="Loisirs" subtitle="Vos centres d'intérêt">
      {data.hobbies.map((hobby) => (
        <div key={hobby.id} className="flex items-center gap-3">
          <Input
            placeholder="Ex : Photographie"
            value={hobby.name}
            onChange={(e) => update(hobby.id, e.target.value)}
          />
          <IconButton label="✕" variant="danger" onClick={() => remove(hobby.id)} />
        </div>
      ))}
      <AddButton label="Ajouter un loisir" onClick={add} />
    </Section>
  );
}
