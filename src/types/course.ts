type CourseDatenraumPushapi = {
    Source: string
    Id: string
    Title: string
    Description: string
    CourseUrl: string
    LogoUrl: string
    Language: "en" | "de"
    CourseCreator: string
    CourseCreatorLogoUrl: string
    Cost: number
    CourseMode: 'online' | 'hybrid' | 'onsite'
    Street: string
    PostalCode: number
    City: string
    StartDate: Date
    EndDate: Date
}

type CompetenceFramework = "ESCO" | "GRETA" | "DigCompEdu" | "DigCompESCO"


export type { CourseDatenraumPushapi, CompetenceFramework }