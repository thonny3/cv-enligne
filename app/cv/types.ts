
export type PersonalInfo = {
  photo: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
};

export type Experience = {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
};

export type Education = {
  id: string;
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type Skill = {
  id: string;
  name: string;
  level: number;
};

export type Language = {
  id: string;
  name: string;
  level: number;
};

export type Hobby = {
  id: string;
  name: string;
};

export type TemplateId =
  | "sidebar"
  | "classic"
  | "minimal"
  | "modern"
  | "teal"
  | "chrono"
  | "functional"
  | "timeline"
  | "creative"
  | "twocol"
  | "airy";

export type Theme = {
  template: TemplateId;
  color: string;
};

export const templates: { id: TemplateId; label: string }[] = [
  { id: "sidebar", label: "Barre latérale" },
  { id: "classic", label: "Classique" },
  { id: "minimal", label: "Minimal" },
  { id: "modern", label: "Moderne" },
  { id: "teal", label: "Arrondi" },
  { id: "chrono", label: "Chronologique" },
  { id: "functional", label: "Fonctionnel" },
  { id: "timeline", label: "Timeline" },
  { id: "creative", label: "Créatif" },
  { id: "twocol", label: "2 colonnes" },
  { id: "airy", label: "Aéré" },
];

export const accentColors = [
  "#4f46e5",
  "#0891b2",
  "#059669",
  "#d97706",
  "#dc2626",
  "#db2777",
  "#7c3aed",
  "#334155",
];

export type LetterTemplateId = "classic" | "modern";

export const letterTemplates: { id: LetterTemplateId; label: string }[] = [
  { id: "classic", label: "Classique" },
  { id: "modern", label: "Moderne" },
];

export type LetterData = {
  template: LetterTemplateId;
  date: string;
  recipientName: string;
  recipientCompany: string;
  recipientAddress: string;
  subject: string;
  body: string;
  closing: string;
};

export const emptyLetterData: LetterData = {
  template: "classic",
  date: "",
  recipientName: "",
  recipientCompany: "",
  recipientAddress: "",
  subject: "",
  body: "",
  closing: "Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.",
};

export type CvData = {
  theme: Theme;
  personalInfo: PersonalInfo;
  profile: string;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  languages: Language[];
  hobbies: Hobby[];
  letter: LetterData;
};

export const emptyCvData: CvData = {
  theme: {
    template: "sidebar",
    color: accentColors[0],
  },
  personalInfo: {
    photo: "",
    firstName: "",
    lastName: "",
    jobTitle: "",
    email: "",
    phone: "",
    address: "",
    postalCode: "",
    city: "",
  },
  profile: "",
  experiences: [],
  educations: [],
  skills: [],
  languages: [],
  hobbies: [],
  letter: emptyLetterData,
};

export function createId() {
  return Math.random().toString(36).slice(2, 10);
}
