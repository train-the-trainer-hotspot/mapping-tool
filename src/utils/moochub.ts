import { v4 as uuidv4 } from "uuid";

import {form } from "../constants/strings";
import { FormState, GretaFacetLevel } from "../types/types";
import { ensureValidIRI } from "../utils/validator"
import { findFacetByName, getFacetUrl, getLearningObjectiveShortcode, getLearningObjectiveUrl } from "./gretaCompetences";

export const getISO8601Duration = (
  durationValue: string,
  durationUnit: string
): string => {
  const value = parseFloat(durationValue);
  if (isNaN(value) || value <= 0) {
    return "";
  }

  let duration = "P";
  switch (durationUnit) {
    case "w": // weeks
      if (value % 1 !== 0) {
        const days = value * 7;
        const fullDays = Math.floor(days);
        const remainingHours = (days - fullDays) * 24;
        duration += `${fullDays ? `${fullDays}D` : ""}`;
        if (remainingHours) duration += `T${remainingHours}H`;
      } else {
        duration += `${value}W`;
      }
      break;

    case "d": // days
      if (value % 1 !== 0) {
        const fullDays = Math.floor(value);
        const remainingHours = (value - fullDays) * 24;
        duration += `${fullDays ? `${fullDays}D` : ""}`;
        if (remainingHours) duration += `T${remainingHours}H`;
      } else {
        duration += `${value}D`;
      }
      break;

    case "h": // hours
      duration += "T";
      if (value % 1 !== 0) {
        const fullHours = Math.floor(value);
        const remainingMinutes = (value - fullHours) * 60;
        duration += `${fullHours ? `${fullHours}H` : ""}`;
        if (remainingMinutes) duration += `${remainingMinutes}M`;
      } else {
        duration += `${value}H`;
      }
      break;

    case "m": // minutes
      duration += "T";
      if (value % 1 !== 0) {
        const fullMinutes = Math.floor(value);
        const remainingSeconds = (value - fullMinutes) * 60;
        duration += `${fullMinutes ? `${fullMinutes}M` : ""}`;
        if (remainingSeconds) duration += `${remainingSeconds}S`;
      } else {
        duration += `${value}M`;
      }
      break;

    case "M": // months
      if (value % 1 !== 0) {
        const fullMonths = Math.floor(value);
        const remainingDays = (value - fullMonths) * 30;
        duration += `${fullMonths ? `${fullMonths}M` : ""}`;
        if (remainingDays) duration += `${remainingDays}D`;
      } else {
        duration += `${value}M`;
      }
      break;

    default:
      return "";
  }

  return ISO8601Validator(duration) ? duration : "";
};

const getCourseModes = (courseMode: string) => {
  return courseMode.split(",").map((mode) => mode.trim());
}
  

const ISO8601Validator = (value: string) => {
  const pattern =
    "^P(?!$)(\\d+(?:\\.\\d+)?Y)?(\\d+(?:\\.\\d+)?M)?(\\d+(?:\\.\\d+)?W)?(\\d+(?:\\.\\d+)?D)?(T(?=\\d)(\\d+(?:\\.\\d+)?H)?(\\d+(?:\\.\\d+)?M)?(\\d+(?:\\.\\d+)?S)?)?$";
  const regex = new RegExp(pattern);
  return regex.test(value);
};


const getLicenseUrl = (identifier: string): string => {
  return (
    form.licenseIdentifier.options.find((option) => option.value === identifier)
      ?.url || ""
  );
};

const getEducationalLevel = (skill: GretaFacetLevel, educationalFramework: string) => {
 if (skill.level === "") {
  return null
 } else {
  return {
    name: [
     {
       name: skill.level,
       inLanguage: "de",
     }
    ],
    educationalFramework: educationalFramework,
    educationalFrameworkVersion: "2.0",
    type: "EducationalLevel",
    shortCode: getLearningObjectiveShortcode(skill.level) || "",
    url: getLearningObjectiveUrl(skill.level) || "",
   }
 }
}


const createMoochubFromForm = (formState: FormState) => {
  const courseId = uuidv4();
  const courseUrl = ensureValidIRI(formState.courseUrl.value);
  const licenseUrl = getLicenseUrl(formState.licenseIdentifier.value);

  return {
    links: {
      self: courseUrl,
      first: courseUrl,
      last: courseUrl,
    },
    data: [
      {
        id: courseId,
        type: "Course",
        attributes: {
          name: formState.courseTitle.value,
          description: formState.courseDescription.value,
          url: courseUrl,
          learningResourceType: {
            identifier: "https://w3id.org/kim/hcrt/course",
            type: "Concept",
            inScheme: "https://w3id.org/kim/hcrt/scheme",
          },
          publisher: {
            name: formState.publisherName.value,
            type: formState.publisherType.value,
          },
          license: [
            {
              identifier: formState.licenseIdentifier.value,
              url: licenseUrl,
            },
          ],
          creator: [
            {
              name: formState.creatorName.value,
              type: formState.creatorType.value,
            },
          ],
          courseMode: getCourseModes(formState.courseType.value),
          inLanguage: formState.inLanguage.value,
          startDate: formState.courseStart.value
            ? [formState.courseStart.value.toISOString()]
            : null,
          endDate: formState.courseEnd.value
            ? [formState.courseEnd.value.toISOString()]
            : null,
          expires: formState.courseExpires.value
            ? [formState.courseExpires.value.toISOString()]
            : null,
          duration: getISO8601Duration(
            formState.durationValue.value,
            formState.durationUnit.value
          ),
          access: formState.access.value,
          contentLocation: {
            address: {
              name: formState.locationName.value || null,
              streetAddress: formState.locationStreetNumber.value || null,
              postalCode: formState.locationZip.value || null,
              city: formState.locationCity.value || null,
            }
          },
          keywords: formState.keywords.value
            ? formState.keywords.value.split(",").map((k) => k.trim())
            : null,
          teaches: [
            ...formState.courseSkills.value.map((skill) => ({
              name: [
                {
                  name: skill.name,
                  inLanguage: "de",
                },
              ],
              educationalFramework: formState.courseCompetenceFramework.value,
              educationalFrameworkVersion: "2.0",
              shortCode: findFacetByName(skill.name)?.id || "",
              url: getFacetUrl(skill.name) || "",
              educationalLevel: getEducationalLevel(skill, formState.courseCompetenceFramework.value),
            })),
          ],
        },
      },
    ],
  };
};

export { createMoochubFromForm };
