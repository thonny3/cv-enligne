"use client";

import { useCv } from "../CvContext";
import { Field, Input, Section } from "../ui";

export function PersonalInfoForm() {
  const { data, setData } = useCv();
  const info = data.personalInfo;

  function update<K extends keyof typeof info>(key: K, value: (typeof info)[K]) {
    setData((prev) => ({ ...prev, personalInfo: { ...prev.personalInfo, [key]: value } }));
  }

  function onPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update("photo", reader.result as string);
    reader.readAsDataURL(file);
  }

  return (
    <Section title="Informations personnelles" subtitle="Vos coordonnées et votre titre de poste">
      <div className="flex items-start gap-4">
        <label className="group relative flex h-24 w-24 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-400 transition hover:border-indigo-400">
          {info.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={info.photo} alt="Photo de profil" className="h-full w-full object-cover" />
          ) : (
            <span className="text-center leading-tight">Ajouter<br />une photo</span>
          )}
          <input type="file" accept="image/*" className="hidden" onChange={onPhoto} />
        </label>
        <div className="grid flex-1 grid-cols-2 gap-3">
          <Field label="Prénom">
            <Input value={info.firstName} onChange={(e) => update("firstName", e.target.value)} />
          </Field>
          <Field label="Nom de famille">
            <Input value={info.lastName} onChange={(e) => update("lastName", e.target.value)} />
          </Field>
          <Field label="Emploi recherché" className="col-span-2">
            <Input value={info.jobTitle} onChange={(e) => update("jobTitle", e.target.value)} />
          </Field>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Adresse e-mail">
          <Input type="email" value={info.email} onChange={(e) => update("email", e.target.value)} />
        </Field>
        <Field label="Numéro de téléphone">
          <Input value={info.phone} onChange={(e) => update("phone", e.target.value)} />
        </Field>
      </div>

      <Field label="Adresse">
        <Input value={info.address} onChange={(e) => update("address", e.target.value)} />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Code postal">
          <Input value={info.postalCode} onChange={(e) => update("postalCode", e.target.value)} />
        </Field>
        <Field label="Ville">
          <Input value={info.city} onChange={(e) => update("city", e.target.value)} />
        </Field>
      </div>
    </Section>
  );
}
