import Image from "next/image";
import Link from "next/link";

const features = [
  {
    title: "Grille de 11 modèles",
    description:
      "Du classique au créatif, choisissez la mise en page qui met votre profil en valeur.",
  },
  {
    title: "Aperçu en temps réel",
    description:
      "Modifiez vos informations et visualisez instantanément le rendu de votre CV.",
  },
  {
    title: "Téléchargement PDF",
    description:
      "Exportez votre CV au format PDF professionnel en un clic, prêt à envoyer.",
  },
  {
    title: "Sauvegarde automatique",
    description:
      "Vos données sont enregistrées dans votre navigateur. Reprenez où vous vous êtes arrêté.",
  },
  {
    title: "Sans inscription",
    description:
      "Aucun compte nécessaire. Remplissez, personnalisez et téléchargez directement.",
  },
  {
    title: "100 % gratuit",
    description:
      "Créez un CV illimité sans frais, sans limite de téléchargement.",
  },
];

const steps = [
  {
    step: "01",
    title: "Renseignez vos informations",
    description:
      "Ajoutez vos coordonnées, votre profil, vos expériences, formations, compétences et loisirs.",
  },
  {
    step: "02",
    title: "Choisissez un modèle",
    description:
      "Parcourez 11 modèles et personnalisez la couleur d'accent à votre goût.",
  },
  {
    step: "03",
    title: "Téléchargez votre CV",
    description:
      "Générez un PDF professionnel et prêt à l'emploi, directement depuis l'éditeur.",
  },
];

const templateLabels = [
  "Barre latérale",
  "Classique",
  "Minimal",
  "Moderne",
  "Arrondi",
  "Chronologique",
  "Fonctionnel",
  "Timeline",
  "Créatif",
  "2 colonnes",
  "Aéré",
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo_cv_ko.png"
              alt="Logo cv ko"
              width={56}
              height={56}
              className="h-14 w-14 object-contain"
            />
            <span className="text-sm font-semibold">cv ko</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
            <a href="#fonctionnalites" className="transition hover:text-slate-900">
              Fonctionnalités
            </a>
            <a href="#modeles" className="transition hover:text-slate-900">
              Modèles
            </a>
            <a href="#etapes" className="transition hover:text-slate-900">
              Comment ça marche
            </a>
          </nav>
          <Link
            href="/cv"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500"
          >
            Créer mon CV
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-indigo-50 via-white to-white" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:py-32">
          <div>
            <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
              Gratuit · Sans inscription · En ligne
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Créez un CV professionnel{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                en quelques minutes
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
              Composez, personnalisez et téléchargez votre CV au format PDF avec un
              éditeur simple et moderne. Aucun compte requis.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/cv"
                className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
              >
                Créer mon CV gratuitement
              </Link>
              <a
                href="#fonctionnalites"
                className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Découvrir
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-xl shadow-indigo-100">
              <div className="flex gap-3">
                <div className="hidden w-2/5 flex-col gap-3 rounded-xl bg-slate-900 p-4 sm:flex">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500" />
                  <div className="h-2.5 w-3/4 rounded bg-slate-200" />
                  <div className="h-2 w-1/2 rounded bg-slate-600" />
                  <div className="mt-2 h-2 w-full rounded bg-slate-700" />
                  <div className="h-2 w-5/6 rounded bg-slate-700" />
                  <div className="mt-4 h-2.5 w-1/2 rounded bg-violet-400" />
                  <div className="h-2 w-full rounded bg-slate-700" />
                  <div className="h-2 w-4/5 rounded bg-slate-700" />
                </div>
                <div className="flex-1 space-y-3 p-2">
                  <div className="h-2.5 w-2/3 rounded bg-indigo-500" />
                  <div className="h-2 w-full rounded bg-slate-200" />
                  <div className="h-2 w-5/6 rounded bg-slate-200" />
                  <div className="h-2 w-full rounded bg-slate-200" />
                  <div className="flex gap-2 pt-2">
                    <div className="h-8 w-8 rounded-full bg-slate-200" />
                    <div className="h-8 w-8 rounded-full bg-slate-200" />
                    <div className="h-8 w-8 rounded-full bg-slate-200" />
                  </div>
                  <div className="mt-2 h-2 w-3/4 rounded bg-slate-200" />
                  <div className="h-2 w-2/3 rounded bg-slate-200" />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-6 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold">PDF téléchargé</p>
                  <p className="text-[11px] text-slate-500">Prêt à l&apos;envoi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="fonctionnalites" className="bg-slate-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Tout ce qu&apos;il faut pour un CV qui impressionne
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Un éditeur complet pensé pour vous faire gagner du temps.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:shadow-lg hover:shadow-indigo-50"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0Z" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="modeles" className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Des modèles pour chaque profil
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Choisissez parmi 11 mises en page et personnalisez la couleur d&apos;accent.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {templateLabels.map((label, i) => (
              <div
                key={label}
                className="group rounded-xl border border-slate-200 bg-white p-3 transition hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-50"
              >
                <div className="mb-3 h-28 w-full overflow-hidden rounded-md border border-slate-100 bg-slate-50 p-2">
                  <TemplateThumbnail index={i} />
                </div>
                <p className="text-center text-xs font-medium text-slate-600 group-hover:text-indigo-600">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="etapes" className="bg-slate-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Trois étapes suffisent
            </h2>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.step} className="relative rounded-2xl border border-slate-200 bg-white p-8">
                <span className="text-5xl font-bold text-indigo-100">{step.step}</span>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 px-8 py-16 text-center sm:px-16">
            <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-white/10" />
            <h2 className="relative text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Prêt à créer votre CV ?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-lg text-indigo-100">
              Rejoignez les milliers de personnes qui ont déjà créé leur CV gratuitement.
            </p>
            <div className="relative mt-8">
              <Link
                href="/cv"
                className="inline-block rounded-lg bg-white px-8 py-3 text-sm font-semibold text-indigo-700 shadow-sm transition hover:bg-indigo-50"
              >
                Commencer maintenant
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <Image
              src="/logo_cv_ko.png"
              alt="Logo cv ko"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <span className="text-sm font-semibold">cv ko</span>
          </div>
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} cv ko. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}

function TemplateThumbnail({ index }: { index: number }) {
  const variants = [
    <div key="0" className="flex h-full w-full">
      <div className="h-full w-2/5" style={{ backgroundColor: "#1e293b" }} />
      <div className="flex-1 space-y-1 p-1.5">
        <div className="h-1.5 w-3/4 rounded bg-indigo-500" />
        <div className="h-1 w-full rounded bg-slate-200" />
        <div className="h-1 w-full rounded bg-slate-200" />
      </div>
    </div>,
    <div key="1" className="flex h-full w-full flex-col">
      <div className="h-1/3 w-full bg-indigo-500" />
      <div className="flex-1 space-y-1 p-1.5">
        <div className="h-1 w-full rounded bg-slate-200" />
        <div className="h-1 w-full rounded bg-slate-200" />
      </div>
    </div>,
    <div key="2" className="flex h-full w-full flex-col items-center justify-center gap-1.5 p-2">
      <div className="h-1.5 w-1/2 rounded bg-indigo-500" />
      <div className="h-1 w-3/4 rounded bg-slate-200" />
      <div className="h-1 w-2/3 rounded bg-slate-200" />
    </div>,
    <div key="3" className="flex h-full w-full flex-col">
      <div className="h-2/5 w-full bg-slate-900" />
      <div className="flex flex-1">
        <div className="flex-1 space-y-1 p-1.5">
          <div className="h-1 w-full rounded bg-slate-200" />
          <div className="h-1 w-full rounded bg-slate-200" />
        </div>
        <div className="w-1/3 space-y-1 border-l border-slate-100 p-1.5">
          <div className="h-1 w-full rounded bg-indigo-500" />
          <div className="h-1 w-full rounded bg-slate-200" />
        </div>
      </div>
    </div>,
    <div key="4" className="flex h-full w-full">
      <div className="flex h-full w-2/5 items-center justify-center bg-indigo-500">
        <div className="h-3 w-3 rounded-full border border-white/70" />
      </div>
      <div className="flex-1 space-y-1 p-1.5">
        <div className="h-1.5 w-3/4 rounded bg-indigo-500" />
        <div className="h-1 w-full rounded bg-slate-200" />
        <div className="h-1 w-full rounded bg-slate-200" />
      </div>
    </div>,
    <div key="5" className="flex h-full w-full flex-col">
      <div className="mx-auto h-1.5 w-1/2 rounded bg-indigo-500" />
      <div className="mt-1 h-px w-full bg-slate-200" />
      <div className="flex-1 space-y-1 p-1.5">
        <div className="h-1 w-full rounded bg-slate-200" />
        <div className="flex gap-1">
          <div className="h-1 w-1/4 rounded bg-slate-300" />
          <div className="h-1 flex-1 rounded bg-slate-200" />
        </div>
        <div className="flex gap-1">
          <div className="h-1 w-1/4 rounded bg-slate-300" />
          <div className="h-1 flex-1 rounded bg-slate-200" />
        </div>
      </div>
    </div>,
    <div key="6" className="flex h-full w-full flex-col space-y-1 p-1.5">
      <div className="h-1.5 w-2/3 rounded bg-indigo-500" />
      <div className="h-1 w-full rounded bg-slate-200" />
      <div className="h-1 w-5/6 rounded bg-slate-200" />
      <div className="flex flex-col gap-1">
        <div className="h-1 w-full rounded bg-slate-200" />
        <div className="h-1 w-4/5 rounded bg-slate-200" />
      </div>
    </div>,
    <div key="7" className="flex h-full w-full flex-col p-1.5">
      <div className="h-1.5 w-2/3 rounded bg-indigo-500" />
      <div className="mt-1 flex flex-1 gap-1">
        <div className="flex w-1/4 flex-col items-center">
          <div className="h-1 w-1 rounded-full bg-indigo-500" />
          <div className="w-px flex-1 bg-slate-200" />
        </div>
        <div className="flex-1 space-y-1">
          <div className="h-1 w-full rounded bg-slate-200" />
          <div className="h-1 w-5/6 rounded bg-slate-200" />
          <div className="h-1 w-full rounded bg-slate-200" />
        </div>
      </div>
    </div>,
    <div key="8" className="flex h-full w-full flex-col">
      <div className="flex h-2/5 w-full items-center justify-between bg-slate-900 px-1.5">
        <div className="h-2.5 w-2.5 rounded bg-indigo-500" />
        <div className="h-1.5 w-1/2 rounded bg-indigo-500" />
      </div>
      <div className="flex flex-1 space-y-1 p-1.5">
        <div className="flex-1">
          <div className="h-1 w-full rounded bg-slate-200" />
          <div className="mt-1 h-1 w-full rounded bg-slate-200" />
        </div>
        <div className="w-1/3 space-y-1">
          <div className="h-1 w-full rounded bg-slate-200" />
          <div className="h-1 w-full rounded bg-slate-200" />
        </div>
      </div>
    </div>,
    <div key="9" className="flex h-full w-full">
      <div className="flex-1 space-y-1 border-r border-slate-100 p-1.5">
        <div className="h-1 w-full rounded bg-slate-200" />
        <div className="h-1 w-full rounded bg-slate-200" />
        <div className="h-1 w-3/4 rounded bg-slate-200" />
      </div>
      <div className="w-2/5 space-y-1 bg-slate-50 p-1.5">
        <div className="h-1 w-full rounded bg-indigo-500" />
        <div className="h-1 w-full rounded bg-slate-200" />
        <div className="h-1 w-full rounded bg-slate-200" />
      </div>
    </div>,
    <div key="10" className="flex h-full w-full flex-col items-center p-1.5">
      <div className="h-1 w-3/4 rounded bg-indigo-500" />
      <div className="mt-1.5 h-1 w-1/2 rounded bg-slate-200" />
      <div className="mt-1 h-1 w-full rounded bg-slate-200" />
      <div className="mt-0.5 h-1 w-5/6 rounded bg-slate-200" />
    </div>,
  ];
  return variants[index % variants.length];
}
