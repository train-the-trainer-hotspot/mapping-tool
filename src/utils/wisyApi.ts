import { wisyChatsearchEndpoint,wisyHost, ingressPath } from "../constants/api";
import { CompetenceFramework } from "../types/course";

export type Skill = {
    title: string;
    uri: string;
    score: number;
    metadata: {
        Kompetenzaspekt: string;
        Kompetenzbereich: string;
    };
    taxonomy: CompetenceFramework;
    source: string | null;
};

export type ChatsearchApiResponse = {
    natural: [string];
    learning_outcomes: {
        skills: Skill[]
    }
    results: [Skill];
};

const fetchCompetenciesFromCourse = async (
    courseText: string,
    competenceFramework: CompetenceFramework
): Promise<ChatsearchApiResponse> => {
    const response = await fetch(ingressPath + wisyHost + wisyChatsearchEndpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            doc: courseText,
            top_k: 5,
            use_llm: false,
            strict: 1,
            skillfit_validation: false,
            taxonomies: [competenceFramework],
        }),
    });
    const apiResponse: ChatsearchApiResponse = await response.json();
    return apiResponse;
};

const fetchAccurateCompetenciesFromCourse = async (
    courseText: string,
    competenceFramework: CompetenceFramework,
    verifiedSkills: Skill[],
    unverifiedSkills: Skill[],
): Promise<ChatsearchApiResponse> => {
    // adds previous validated Skills to request to increase accuracy on prediction

    const response = await fetch(ingressPath + wisyHost + wisyChatsearchEndpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            doc: courseText,
            skills: prepareSkills(verifiedSkills, unverifiedSkills),
            top_k: 5,
            use_llm: false,
            strict: 1,
            skillfit_validation: false,
            taxonomies: [competenceFramework],
        }),
    });
    const apiResponse: ChatsearchApiResponse = await response.json();
    return apiResponse;
};

type VerifiedSkill = Skill & { valid: boolean }

const prepareSkills = (verifiedSkills: Skill[], unverifiedSkills: Skill[]) => {
    const preparedVerifiedSkills: VerifiedSkill[] = [];
    verifiedSkills.map(currSkill => {
        preparedVerifiedSkills.push({ ...currSkill, valid: true })
    })
    unverifiedSkills.map(currSkill => {
        preparedVerifiedSkills.push({ ...currSkill, valid: false })
    })
    return preparedVerifiedSkills;
};

export { fetchAccurateCompetenciesFromCourse,fetchCompetenciesFromCourse };
