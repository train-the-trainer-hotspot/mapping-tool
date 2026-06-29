export type GretaFacet = {
  id: string;
  url: string;
  name: string;
  type: "greta_kognitive_lernziele" | "greta_affektive_lernziele";
};

export type GretaArea =
  | "Didaktik und Methodik"
  | "Beratung/individualisierte Lernunterstützung"
  | "Kommunikation und Interaktion"
  | "Organisation"
  | "Feldbezug"
  | "Berufsethos"
  | "Berufsbezogene Überzeugungen"
  | "Motivationale Orientierungen"
  | "Selbstregulation"
  | "Berufspraktische Erfahrung";

export type GretaAspect =
  | "Berufspraktisches Wissen und Können"
  | "Fach- und feldspezifisches Wissen"
  | "Werthaltungen und Überzeugungen"
  | "Professionelle Selbststeuerung";

export const GretaAspectShortLabels = 
{
  "Berufspraktisches Wissen und Können": "Berufspraxis",
  "Fach- und feldspezifisches Wissen": "Fachwissen",
  "Werthaltungen und Überzeugungen": "Werte & Haltung",
  "Professionelle Selbststeuerung": "Selbststeuerung",
} 

export type GretaCompetences = {
  "Berufspraktisches Wissen und Können": {
    "Didaktik und Methodik": GretaFacet[];
    "Beratung/individualisierte Lernunterstützung": GretaFacet[];
    "Kommunikation und Interaktion": GretaFacet[];
    Organisation: GretaFacet[];
  };
  "Fach- und feldspezifisches Wissen": {
    Feldbezug: GretaFacet[];
  };
  "Werthaltungen und Überzeugungen": {
    Berufsethos: GretaFacet[];
    "Berufsbezogene Überzeugungen": GretaFacet[];
  };
  "Professionelle Selbststeuerung": {
    "Motivationale Orientierungen": GretaFacet[];
    Selbstregulation: GretaFacet[];
    "Berufspraktische Erfahrung": GretaFacet[];
  };
};

export type GretaLearningObjectiveLevel = {
  value: string;
  name: string;
  description: string;
  url: string
};

export type GretaLearningObjectiveType = {
  id: string;
  name: string;
  levels: GretaLearningObjectiveLevel[];
};

export const GRETA_LEARNING_OBJECTIVE_TYPES: GretaLearningObjectiveType[] = [
  {
    id: "greta_kognitive_lernziele",
    name: "kognitive Lernziele",
    levels: [
      {
        value: "lk01",
        name: "kennen und verstehen",
        description: "Inhalte wiedergeben und einordnen",
        url: "https://www.greta-die.de/webpages/kompetenzfacetten-index/lernzielstufe-kennen-und-verstehen-1"

      },
      {
        value: "lk02",
        name: "anwenden und umsetzen",
        description: "Inhalte anwenden und Vorgehensweisen umsetzen",
        url: "https://www.greta-die.de/webpages/kompetenzfacetten-index/lernzielstufe-anwenden-und-umsetzen"
      },
      {
        value: "lk03",
        name: "analysieren und beurteilen",
        description: "Zusammenhänge und Situationen deuten und bewerten",
        url: "https://www.greta-die.de/webpages/kompetenzfacetten-index/lernzielstufe-analysieren-und-beurteilen"

      },
      {
        value: "lk04",
        name: "weiterentwickeln und kreieren",
        description:
          "Inhalte aufeinander beziehen und Situationen neu gestalten",
        url: "https://www.greta-die.de/webpages/kompetenzfacetten-index/lernzielstufe-weiterentwickeln-und-kreieren"

      },
    ],
  },
  {
    id: "greta_affektive_lernziele",
    name: "affektive Lernziele",
    levels: [
      {
        value: "la01",
        name: "wahrnehmen und beachten",
        description: "Auf etwas aufmerksam werden und sich etwas widmen",
        url: "https://www.greta-die.de/webpages/kompetenzfacetten-index/lernzielstufe-wahrnehmen-und-beachten-1"
      },
      {
        value: "la02",
        name: "aufgreifen und reagieren",
        description: "Für etwas bereit sein und daran interessiert sein",
        url: "https://www.greta-die.de/webpages/kompetenzfacetten-index/lernzielstufe-aufgreifen-und-reagieren"
      },
      {
        value: "la03",
        name: "abwägen und werten",
        description:
          "Ein individuelles Wertesystem aufbauen und Beurteilungsmaßstäbe finden",
        url: "https://www.greta-die.de/webpages/kompetenzfacetten-index/lernzielstufe-abwaegen-und-werten"

      },
      {
        value: "la04",
        name: "verinnerlichen und intuitiv anwenden",
        description:
          "Ein eigenes Wertesystem zu Grunde legen und konsistent nach dessen Grundsätzen handeln",
        url: "https://www.greta-die.de/webpages/kompetenzfacetten-index/lernzielstufe-verinnerlichen-und-intuitiv-anwenden"
      },
    ],
  },
];

export const GRETA_COMPETENCES: GretaCompetences = {
  "Berufspraktisches Wissen und Können": {
    "Didaktik und Methodik": [
      {
        id: "greta-ka01-kb01-kf01",
        url: "https://www.greta-die.de/webpages/kompetenzfacetten-index/kompetenzfacette-lerninhalte-und-ziel",
        name: "Lerninhalte und -ziele",
        type: "greta_kognitive_lernziele",
      },
      {
        id: "greta-ka01-kb01-kf02",
        url: "https://www.greta-die.de/webpages/kompetenzfacetten-index/kompetenzfacette-methoden-medien-und-lernmaterialien",
        name: "Methoden, Medien und Lernmaterialien",
        type: "greta_kognitive_lernziele",
      },
      {
        id: "greta-ka01-kb01-kf03",
        url: "https://www.greta-die.de/webpages/kompetenzfacetten-index/kompetenzfacette-rahmenbedingungen-und-lernumgebungen",
        name: "Rahmenbedingungen und Lernumgebungen",
        type: "greta_kognitive_lernziele",
      },
      {
        id: "greta-ka01-kb01-kf04",
        url: "https://www.greta-die.de/webpages/kompetenzfacetten-index/kompetenzfacette-outcomeorientierung",
        name: "Outcomeorientierung",
        type: "greta_kognitive_lernziele",
      },
    ],
    "Beratung/individualisierte Lernunterstützung": [
      {
        id: "greta-ka01-kb02-kf01",
        url: "https://www.greta-die.de/webpages/kompetenzfacetten-index/kompetenzfacette-teilnehmendenorientierung",
        name: "Teilnehmendenorientierung",
        type: "greta_kognitive_lernziele",
      },
      {
        id: "greta-ka01-kb02-kf02",
        url: "https://www.greta-die.de/webpages/kompetenzfacetten-index/kompetenzfacette-foerderung-der-lernmotivation",
        name: "Diagnostik und Lernberatung",
        type: "greta_kognitive_lernziele",
      },
    ],
    "Kommunikation und Interaktion": [
      {
        id: "greta-ka01-kb03-kf01",
        url: "https://www.greta-die.de/webpages/kompetenzfacetten-index/kompetenzfacette-moderation-und-steuerung-von-gruppen",
        name: "Moderation und Steuerung von Gruppen",
        type: "greta_kognitive_lernziele",
      },
      {
        id: "greta-ka01-kb03-kf02",
        url: "https://www.greta-die.de/webpages/kompetenzfacetten-index/kompetenzfacette-professionelle-kommunikation",
        name: "Professionelle Kommunikation",
        type: "greta_kognitive_lernziele",
      },
    ],
    Organisation: [
      {
        id: "greta-ka01-kb04-kf01",
        url: "https://www.greta-die.de/webpages/kompetenzfacetten-index/kompetenzfacette-kooperation-mit-den-auftraggebenden-arbeitgebenden",
        name: "Kooperation mit den Auftraggebenden/Arbeitgebenden",
        type: "greta_kognitive_lernziele",
      },
      {
        id: "greta-ka01-kb04-kf02",
        url: "https://www.greta-die.de/webpages/kompetenzfacetten-index/kompetenzfacette-kollegiale-zusammenarbeit-netzwerken",
        name: "Kollegiale Zusammenarbeit/Netzwerken",
        type: "greta_kognitive_lernziele",
      },
    ],
  },
  "Fach- und feldspezifisches Wissen": {
    Feldbezug: [
      {
        id: "greta-ka02-kb01-kf01",
        url: "https://www.greta-die.de/webpages/kompetenzfacetten-index/kompetenzfacette-adressatinnen-und-adressaten",
        name: "Adressatinnen und Adressaten",
        type: "greta_kognitive_lernziele",
      },
      {
        id: "greta-ka02-kb01-kf02",
        url: "https://www.greta-die.de/webpages/kompetenzfacetten-index/kompetenzfacette-feldspezifisches-wissen",
        name: "Feldspezifisches Wissen",
        type: "greta_kognitive_lernziele",
      },
      {
        id: "greta-ka02-kb01-kf03",
        url: "https://www.greta-die.de/webpages/kompetenzfacetten-index/kompetenzfacette-curriculare-und-institutionelle-rahmenbedingungen",
        name: "Curriculare und institutionelle Rahmenbedingungen",
        type: "greta_kognitive_lernziele",
      },
    ],
  },
  "Werthaltungen und Überzeugungen": {
    Berufsethos: [
      {
        id: "greta-ka03-kb01-kf01",
        url: "https://www.greta-die.de/webpages/kompetenzfacetten-index/kompetenzfacette-menschenbilder",
        name: "Menschenbilder",
        type: "greta_affektive_lernziele",
      },
      {
        id: "greta-ka03-kb01-kf02",
        url: "https://www.greta-die.de/webpages/kompetenzfacetten-index/kompetenzfacette-wertvorstellungen",
        name: "Wertvorstellungen",
        type: "greta_affektive_lernziele",
      },
    ],
    "Berufsbezogene Überzeugungen": [
      {
        id: "greta-ka03-kb02-kf01",
        url: "https://www.greta-die.de/webpages/kompetenzfacetten-index/kompetenzfacette-eigenes-rollenbewusstsein",
        name: "Eigenes Rollenbewusstsein",
        type: "greta_affektive_lernziele",
      },
      {
        id: "greta-ka03-kb02-kf02",
        url: "https://www.greta-die.de/webpages/kompetenzfacetten-index/kompetenzfacette-subjektive-annahmen-ueber-das-lehren-und-lernen",
        name: "Subjektive Annahmen über das Lehren und Lernen",
        type: "greta_affektive_lernziele",
      },
    ],
  },
  "Professionelle Selbststeuerung": {
    "Motivationale Orientierungen": [
      {
        id: "greta-ka04-kb01-kf01",
        url: "https://www.greta-die.de/webpages/kompetenzfacetten-index/kompetenzfacette-selbstwirksamkeitsueberzeugungen",
        name: "Selbstwirksamkeitsüberzeugungen",
        type: "greta_affektive_lernziele",
      },
      {
        id: "greta-ka04-kb01-kf02",
        url: "https://www.greta-die.de/webpages/kompetenzfacetten-index/kompetenzfacette-enthusiasmus",
        name: "Enthusiasmus",
        type: "greta_affektive_lernziele",
      },
    ],
    Selbstregulation: [
      {
        id: "greta-ka04-kb02-kf01",
        url: "https://www.greta-die.de/webpages/kompetenzfacetten-index/kompetenzfacette-umgang-mit-feedback-und-kritik",
        name: "Umgang mit Feedback und Kritik",
        type: "greta_affektive_lernziele",
      },
      {
        id: "greta-ka04-kb02-kf02",
        url: "https://www.greta-die.de/webpages/kompetenzfacetten-index/kompetenzfacette-engagement-und-distanz",
        name: "Engagement und Distanz",
        type: "greta_affektive_lernziele",
      },
    ],
    "Berufspraktische Erfahrung": [
      {
        id: "greta-ka04-kb03-kf01",
        url: "https://www.greta-die.de/webpages/kompetenzfacetten-index/kompetenzfacette-reflexion-des-eigenen-lehrhandelns",
        name: "Reflexion des eigenen Lehrhandelns",
        type: "greta_affektive_lernziele",
      },
      {
        id: "greta-ka04-kb03-kf02",
        url: "https://www.greta-die.de/webpages/kompetenzfacetten-index/kompetenzfacette-berufliche-weiterentwicklung",
        name: "Berufliche Weiterentwicklung",
        type: "greta_affektive_lernziele",
      },
    ],
  },
};
