import { Moment } from "moment";

import { GRETA_COMPETENCES } from "../constants/gretaCompetences";

type BaseFormField = {
  id: keyof FormState;
};

type FormField = BaseFormField & {
    value: string;
    validator: ((value: string) => boolean) | null;
    required: boolean;
    error: boolean;
};

type FormArrayField = BaseFormField & {
  value: string[];
  validator: ((value: string[]) => boolean) | null;
  required: boolean;
  error: boolean;
};

type FormDateField = BaseFormField & {
  value: Moment | null;
  validator: ((value: Moment) => boolean) | null;
  required: boolean;
  error: boolean;
};

type GretaFacetField = BaseFormField & {
  value: GretaFacetLevel[];
  validator: ((value: boolean) => boolean) | null;
  required: boolean;
  error: boolean;
};

type GretaFacetLevel = {
  name: string;
  level: string;
};

type FormState = {
  suitableQ1: FormField;
  suitableQ2: FormField;
  suitableQ3: FormField;
  courseTitle: FormField;
  courseDescription: FormField;
  courseUrl: FormField;
  courseStart: FormDateField;
  courseEnd: FormDateField;
  courseExpires: FormDateField;
  courseType: FormField;
  courseAsynchronous: FormField;
  locationName: FormField;
  locationStreetNumber: FormField;
  locationZip: FormField;
  locationCity: FormField;
  courseCompetenceFramework: FormField;
  courseSkills: GretaFacetField;
  metadataFramework: FormField;
  publisherName: FormField;
  publisherType: FormField;
  creatorName: FormField;
  creatorType: FormField;
  licenseIdentifier: FormField;
  inLanguage: FormArrayField;
  durationUnit: FormField;
  durationValue: FormField;
  keywords: FormField;
  access: FormArrayField;
};

type GretaCompetenceKey = keyof typeof GRETA_COMPETENCES;

export type {
  FormArrayField,
  FormDateField,
  FormField,
  FormState,
  GretaCompetenceKey,
  GretaFacetField,
  GretaFacetLevel,
};
