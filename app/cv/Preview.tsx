"use client";

import { useCv } from "./CvContext";
import { ClassicTemplate } from "./templates/ClassicTemplate";
import { MinimalTemplate } from "./templates/MinimalTemplate";
import { SidebarTemplate } from "./templates/SidebarTemplate";

export function Preview() {
  const { data } = useCv();

  return (
    <div id="cv-preview" className="mx-auto bg-white shadow-xl">
      {data.theme.template === "classic" && <ClassicTemplate data={data} />}
      {data.theme.template === "minimal" && <MinimalTemplate data={data} />}
      {data.theme.template === "sidebar" && <SidebarTemplate data={data} />}
    </div>
  );
}
