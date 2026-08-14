"use client";

import { useCv } from "./CvContext";
import { ClassicTemplate } from "./templates/ClassicTemplate";
import { MinimalTemplate } from "./templates/MinimalTemplate";
import { SidebarTemplate } from "./templates/SidebarTemplate";
import { ModernTemplate } from "./templates/ModernTemplate";
import { TealTemplate } from "./templates/TealTemplate";
import { ChronologicalTemplate } from "./templates/ChronologicalTemplate";
import { FunctionalTemplate } from "./templates/FunctionalTemplate";
import { TimelineTemplate } from "./templates/TimelineTemplate";
import { CreativeTemplate } from "./templates/CreativeTemplate";
import { TwoColumnTemplate } from "./templates/TwoColumnTemplate";
import { AiryTemplate } from "./templates/AiryTemplate";

export function Preview() {
  const { data } = useCv();

  const template =
    data.theme.template === "classic" ? (
      <ClassicTemplate data={data} />
    ) : data.theme.template === "minimal" ? (
      <MinimalTemplate data={data} />
    ) : data.theme.template === "sidebar" ? (
      <SidebarTemplate data={data} />
    ) : data.theme.template === "modern" ? (
      <ModernTemplate data={data} />
    ) : data.theme.template === "teal" ? (
      <TealTemplate data={data} />
    ) : data.theme.template === "chrono" ? (
      <ChronologicalTemplate data={data} />
    ) : data.theme.template === "functional" ? (
      <FunctionalTemplate data={data} />
    ) : data.theme.template === "timeline" ? (
      <TimelineTemplate data={data} />
    ) : data.theme.template === "creative" ? (
      <CreativeTemplate data={data} />
    ) : data.theme.template === "twocol" ? (
      <TwoColumnTemplate data={data} />
    ) : (
      <AiryTemplate data={data} />
    );

  return (
    <div id="cv-preview" className="mx-auto w-fit bg-white shadow-xl">
      {template}
    </div>
  );
}
