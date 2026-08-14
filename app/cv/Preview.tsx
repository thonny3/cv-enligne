"use client";

import { useCv } from "./CvContext";
import { ClassicTemplate } from "./templates/ClassicTemplate";
import { MinimalTemplate } from "./templates/MinimalTemplate";
import { SidebarTemplate } from "./templates/SidebarTemplate";
import { ModernTemplate } from "./templates/ModernTemplate";
import { TealTemplate } from "./templates/TealTemplate";

export function Preview() {
  const { data } = useCv();

  return (
    <div id="cv-preview" className="mx-auto bg-white shadow-xl">
      {data.theme.template === "classic" && <ClassicTemplate data={data} />}
      {data.theme.template === "minimal" && <MinimalTemplate data={data} />}
      {data.theme.template === "sidebar" && <SidebarTemplate data={data} />}
      {data.theme.template === "modern" && <ModernTemplate data={data} />}
      {data.theme.template === "teal" && <TealTemplate data={data} />}
    </div>
  );
}
