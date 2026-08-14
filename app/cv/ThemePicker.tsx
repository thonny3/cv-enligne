"use client";

import { accentColors, templates } from "./types";
import { useCv } from "./CvContext";
import { Section } from "./ui";

export function ThemePicker() {
  const { data, setData } = useCv();
  const { theme } = data;

  function setTemplate(template: (typeof templates)[number]["id"]) {
    setData((prev) => ({ ...prev, theme: { ...prev.theme, template } }));
  }

  function setColor(color: string) {
    setData((prev) => ({ ...prev, theme: { ...prev.theme, color } }));
  }

  return (
    <Section title="Modèle & couleur" subtitle="Choisissez la mise en page et la couleur d'accent du CV">
      <div>
        <span className="mb-2 block text-sm font-medium text-slate-700">Modèle</span>
        <div className="grid grid-cols-3 gap-3">
          {templates.map((t) => {
            const active = theme.template === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTemplate(t.id)}
                className={`rounded-xl border-2 p-2 text-left transition ${
                  active ? "border-indigo-500 bg-indigo-50" : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="mb-2 h-16 w-full overflow-hidden rounded-md border border-slate-200 bg-white">
                  <TemplateThumbnail id={t.id} color={theme.color} />
                </div>
                <span className="text-xs font-medium text-slate-600">{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <span className="mb-2 block text-sm font-medium text-slate-700">Couleur d&apos;accent</span>
        <div className="flex flex-wrap items-center gap-2">
          {accentColors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setColor(color)}
              aria-label={color}
              style={{ backgroundColor: color }}
              className={`h-8 w-8 rounded-full border-2 transition ${
                theme.color === color ? "border-slate-900 scale-110" : "border-transparent"
              }`}
            />
          ))}
          <input
            type="color"
            value={theme.color}
            onChange={(e) => setColor(e.target.value)}
            className="h-8 w-8 cursor-pointer rounded-full border border-slate-300 bg-transparent p-0"
            title="Couleur personnalisée"
          />
        </div>
      </div>
    </Section>
  );
}

function TemplateThumbnail({ id, color }: { id: string; color: string }) {
  if (id === "sidebar") {
    return (
      <div className="flex h-full w-full">
        <div className="h-full w-2/5" style={{ backgroundColor: "#1e293b" }} />
        <div className="flex-1 space-y-1 p-1.5">
          <div className="h-1.5 w-3/4 rounded" style={{ backgroundColor: color }} />
          <div className="h-1 w-full rounded bg-slate-200" />
          <div className="h-1 w-full rounded bg-slate-200" />
        </div>
      </div>
    );
  }
  if (id === "classic") {
    return (
      <div className="flex h-full w-full flex-col">
        <div className="h-1/3 w-full" style={{ backgroundColor: color }} />
        <div className="flex-1 space-y-1 p-1.5">
          <div className="h-1 w-full rounded bg-slate-200" />
          <div className="h-1 w-full rounded bg-slate-200" />
        </div>
      </div>
    );
  }
  if (id === "modern") {
    return (
      <div className="flex h-full w-full flex-col">
        <div className="h-2/5 w-full" style={{ backgroundColor: "#0f172a" }} />
        <div className="flex flex-1">
          <div className="flex-1 space-y-1 p-1.5">
            <div className="h-1 w-full rounded bg-slate-200" />
            <div className="h-1 w-full rounded bg-slate-200" />
          </div>
          <div className="w-1/3 space-y-1 border-l border-slate-100 p-1.5">
            <div className="h-1 w-full rounded" style={{ backgroundColor: color }} />
            <div className="h-1 w-full rounded bg-slate-200" />
          </div>
        </div>
      </div>
    );
  }
  if (id === "teal") {
    return (
      <div className="flex h-full w-full">
        <div className="flex h-full w-2/5 items-center justify-center" style={{ backgroundColor: color }}>
          <div className="h-4 w-4 rounded-full border border-white/70" />
        </div>
        <div className="flex-1 space-y-1 p-1.5">
          <div className="h-1.5 w-3/4 rounded" style={{ backgroundColor: color }} />
          <div className="h-1 w-full rounded bg-slate-200" />
          <div className="h-1 w-full rounded bg-slate-200" />
        </div>
      </div>
    );
  }
  return (
    <div className="h-full w-full space-y-1 p-1.5">
      <div className="h-1.5 w-2/3 rounded" style={{ backgroundColor: color }} />
      <div className="h-1 w-full rounded bg-slate-200" />
      <div className="h-1 w-full rounded bg-slate-200" />
      <div className="h-1 w-3/4 rounded bg-slate-200" />
    </div>
  );
}
