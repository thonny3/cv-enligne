"use client";

import { CvProvider, useCv } from "./CvContext";
import { EducationForm } from "./forms/EducationForm";
import { ExperienceForm } from "./forms/ExperienceForm";
import { HobbiesForm } from "./forms/HobbiesForm";
import { LetterForm } from "./forms/LetterForm";
import { PersonalInfoForm } from "./forms/PersonalInfoForm";
import { ProfileForm } from "./forms/ProfileForm";
import { SkillsLanguagesForm } from "./forms/SkillsLanguagesForm";
import { LetterPreview } from "./LetterPreview";
import { Preview } from "./Preview";
import { ThemePicker } from "./ThemePicker";
import { Toolbar } from "./Toolbar";

function ViewTabs() {
  const { view, setView } = useCv();
  return (
    <div className="flex gap-2 rounded-lg bg-slate-100 p-1">
      <button
        type="button"
        onClick={() => setView("cv")}
        className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition ${
          view === "cv" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
        }`}
      >
        CV
      </button>
      <button
        type="button"
        onClick={() => setView("letter")}
        className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition ${
          view === "letter" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
        }`}
      >
        Lettre de motivation
      </button>
    </div>
  );
}

function EditorContent() {
  const { view } = useCv();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Toolbar />
      <div className="flex flex-1">
        <div className="h-[calc(100vh-4rem)] w-full max-w-xl space-y-6 overflow-y-auto px-6 py-8 lg:w-1/2">
          <ViewTabs />
          {view === "cv" ? (
            <>
              <ThemePicker />
              <PersonalInfoForm />
              <ProfileForm />
              <ExperienceForm />
              <EducationForm />
              <SkillsLanguagesForm />
              <HobbiesForm />
            </>
          ) : (
            <LetterForm />
          )}
        </div>
        <div
          id="cv-preview-panel"
          className="sticky top-16 hidden h-[calc(100vh-4rem)] flex-1 overflow-y-auto bg-slate-200 px-6 py-8 lg:block"
        >
          <div className="preview-scale-wrapper origin-top">
            {view === "cv" ? <Preview /> : <LetterPreview />}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Editor() {
  return (
    <CvProvider>
      <EditorContent />
    </CvProvider>
  );
}
