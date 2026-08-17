"use client";

import { CvProvider } from "./CvContext";
import { AutoGenerateForm } from "./forms/AutoGenerateForm";
import { CoverLetterForm } from "./forms/CoverLetterForm";
import { EducationForm } from "./forms/EducationForm";
import { ExperienceForm } from "./forms/ExperienceForm";
import { HobbiesForm } from "./forms/HobbiesForm";
import { PersonalInfoForm } from "./forms/PersonalInfoForm";
import { ProfileForm } from "./forms/ProfileForm";
import { SkillsLanguagesForm } from "./forms/SkillsLanguagesForm";
import { Preview } from "./Preview";
import { ThemePicker } from "./ThemePicker";
import { Toolbar } from "./Toolbar";

export function Editor() {
  return (
    <CvProvider>
      <div className="flex min-h-screen flex-col bg-slate-50">
        <Toolbar />
        <div className="flex flex-1">
          <div className="h-[calc(100vh-4rem)] w-full max-w-xl space-y-6 overflow-y-auto px-6 py-8 lg:w-1/2">
            <ThemePicker />
            <AutoGenerateForm />
            <PersonalInfoForm />
            <ProfileForm />
            <ExperienceForm />
            <EducationForm />
            <SkillsLanguagesForm />
            <HobbiesForm />
            <CoverLetterForm />
          </div>
          <div
            id="cv-preview-panel"
            className="sticky top-16 hidden h-[calc(100vh-4rem)] flex-1 overflow-y-auto bg-slate-200 px-6 py-8 lg:block"
          >
            <div className="preview-scale-wrapper origin-top">
              <Preview />
            </div>
          </div>
        </div>
      </div>
    </CvProvider>
  );
}
