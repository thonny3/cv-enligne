"use client";

import { useSyncExternalStore } from "react";
import { CvData, emptyCvData } from "../cv/types";
import { ClassicTemplate } from "../cv/templates/ClassicTemplate";
import { MinimalTemplate } from "../cv/templates/MinimalTemplate";
import { SidebarTemplate } from "../cv/templates/SidebarTemplate";

const STORAGE_KEY = "cv-create-data";

let cached: CvData | null = null;

function getSnapshot(): CvData {
  if (!cached) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        cached = { ...emptyCvData, ...JSON.parse(raw) };
      }
    } catch {
      // ignore corrupted storage
    }
    if (!cached) cached = emptyCvData;
  }
  return cached;
}

function isEmptyCv(data: CvData): boolean {
  const info = data.personalInfo;
  const hasInfo = Object.values(info).some((v) => String(v ?? "").trim() !== "");
  return (
    !hasInfo &&
    !data.profile.trim() &&
    data.experiences.length === 0 &&
    data.educations.length === 0 &&
    data.skills.length === 0 &&
    data.languages.length === 0 &&
    data.hobbies.length === 0
  );
}

export default function PrintPage() {
  const data = useSyncExternalStore(
    () => () => {},
    getSnapshot,
    () => emptyCvData
  );

  if (isEmptyCv(data)) {
    return (
      <div id="cv-preview" className="print-cv-page">
        <div className="flex w-[210mm] min-h-[297mm] flex-col items-center justify-center gap-4 bg-white text-slate-500">
          <p className="text-lg font-semibold">CV vide</p>
          <p className="text-sm text-center">
            Le formulaire est vide. Remplissez vos informations dans l&apos;éditeur puis
            téléchargez à nouveau le PDF.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div id="cv-preview" className="print-cv-page">
      {data.theme.template === "classic" && <ClassicTemplate data={data} />}
      {data.theme.template === "minimal" && <MinimalTemplate data={data} />}
      {data.theme.template === "sidebar" && <SidebarTemplate data={data} />}
    </div>
  );
}
