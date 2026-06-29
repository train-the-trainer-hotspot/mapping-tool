import {
  GRETA_COMPETENCES,
  GRETA_LEARNING_OBJECTIVE_TYPES,
  GretaAspectShortLabels,
  GretaFacet} from "../constants/gretaCompetences";

const findFacetByName = (name: string): GretaFacet | undefined => {
  for (const aspect of Object.values(GRETA_COMPETENCES)) {
    for (const area of Object.values(aspect)) {
      const facet = area.find((facet: GretaFacet) => facet.name === name);
      if (facet) {
        return facet;
      }
    }
  }
  return undefined;
};

const getAreaOfFacet = (facetName: string) => {
  for (const aspect of Object.values(GRETA_COMPETENCES)) {
    for (const [areaName, area] of Object.entries(aspect)) {
      const facet = area.find((facet) => facet.name === facetName);
      if (facet) {
        return areaName;
      }
    }
  }
  return null;
};

const getGretaLearningObjectives = (facetName: string) => {
  for (const aspect of Object.values(GRETA_COMPETENCES)) {
    for (const area of Object.values(aspect)) {
      const facet = area.find((facet) => facet.name === facetName);
      if (facet) {
        const type = facet.type;
        return (
          GRETA_LEARNING_OBJECTIVE_TYPES.find((t) => t.id === type) || null
        );
      }
    }
  }
  return null;
};

const getFacetUrl = (facetName: string): string | null => {
  const facet = findFacetByName(facetName);
  return facet ? facet.url : null;
};

const getLearningObjectiveUrl = (
  learningObjectiveName: string
): string | null => {
  for (const learningObjective of GRETA_LEARNING_OBJECTIVE_TYPES) {
    for (const level of learningObjective.levels) {
      if (level.name === learningObjectiveName) {
        return level.url;
      }
    }
  }
  return null;
};

const getLearningObjectiveShortcode = (
  learningObjectiveName: string
): string | null => {
  for (const learningObjective of GRETA_LEARNING_OBJECTIVE_TYPES) {
    for (const level of learningObjective.levels) {
      if (level.name === learningObjectiveName) {
        return level.value;
      }
    }
  }
  return null;
};

const getAspectShortLabel = (aspectName: string): string => {
  return (GretaAspectShortLabels as Record<string, string>)[aspectName] || aspectName;
}

export {
  findFacetByName,
  getAreaOfFacet,
  getAspectShortLabel,
  getFacetUrl,
  getGretaLearningObjectives,
  getLearningObjectiveShortcode,
  getLearningObjectiveUrl};
