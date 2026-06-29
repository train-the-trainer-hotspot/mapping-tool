import { InfoOutlined } from "@mui/icons-material";
import {
  Alert,
  Checkbox,
  Chip,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  SelectChangeEvent,
  Stack,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";

import {
  GRETA_COMPETENCES,
  GretaFacet,
} from "../../constants/gretaCompetences";
import { form } from "../../constants/strings";
import { theme } from "../../theme/index";
import { FormState, GretaCompetenceKey } from "../../types/types";
import {
  getAreaOfFacet,
  getAspectShortLabel,
} from "../../utils/gretaCompetences";
import { Skill } from "../../utils/wisyApi";
import { SkillFormMobileView } from "./SkillFormMobileView";
type Props = {
  formState: FormState;
  handleSelectChange: (event: SelectChangeEvent<string>) => void;
  suggestedSkills: Skill[];
  onGretaFacetToggle: (name: string, level: string) => void;
  isGetCompetenciesPossible: boolean;
  handleGetCompetencies: () => void;
};

export const SkillForm = ({ formState, onGretaFacetToggle }: Props) => {
  const [selectedAspect, setSelectedAspect] =
    useState<GretaCompetenceKey | null>(null);
  const [, setSelectedArea] = useState<string | null>(null);
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));
  const [openAspect0, setOpenAspect0] = useState(true);
  const [openAspect1, setOpenAspect1] = useState(false);
  const [openAspect2, setOpenAspect2] = useState(false);
  const [openAspect3, setOpenAspect3] = useState(false);

  const isAspectActive = (aspectName: string) => {
    return formState.courseSkills.value.some((skill) => {
      if (!skill.name) return false;

      const area = getAreaOfFacet(skill.name);
      if (!area) return false;

      const aspect = Object.keys(GRETA_COMPETENCES).find((asp) =>
        Object.keys(
          GRETA_COMPETENCES[asp as keyof typeof GRETA_COMPETENCES]
        ).includes(area)
      );

      return aspect === aspectName;
    });
  };

  const facetIsActive = (facetName: string) => {
    return formState.courseSkills.value.some(
      (skill) => skill.name === facetName
    );
  };

  const toggleFacet = (facetName: string) => {
    onGretaFacetToggle(facetName, "");
  };

  // Set initial selectedAspect, selectedArea, and selectedFacet based on courseSkills
  useState(() => {
    let firstAspect: string | null = null;
    let firstArea: string | null = null;

    for (const aspect of Object.keys(GRETA_COMPETENCES)) {
      const areas = Object.keys(
        GRETA_COMPETENCES[aspect as keyof typeof GRETA_COMPETENCES]
      );

      if (!firstAspect && areas.length > 0) {
        firstAspect = aspect;
        firstArea = areas[0];
      }

      for (const area of areas) {
        const isActive = formState.courseSkills.value.some((skill) => {
          const skillArea = skill.name ? getAreaOfFacet(skill.name) : null;
          return skillArea === area;
        });

        if (isActive) {
          setSelectedAspect(aspect as keyof typeof GRETA_COMPETENCES);
          setSelectedArea(area);
          return;
        }
      }
    }

    if (firstAspect && firstArea) {
      setSelectedAspect(firstAspect as keyof typeof GRETA_COMPETENCES);
      setSelectedArea(firstArea);
    }
  });

  const handleClick = (index: number) => {
    switch (index) {
      case 0:
        setOpenAspect0(!openAspect0);
        break;
      case 1:
        setOpenAspect1(!openAspect1);
        break;
      case 2:
        setOpenAspect2(!openAspect2);
        break;
      case 3:
        setOpenAspect3(!openAspect3);
        break;
    }
  };

  return (
    <>
      <Stack spacing={3} mt={4} alignItems={"flex-start"}>
        <Typography alignSelf={"flex-start"} variant="h1">
          {form.sections.competencies}
        </Typography>
        <Typography alignSelf={"flex-start"} variant="body1" textAlign="left">
          {formState.courseSkills.value.length > 0 ? (
            form.competenceFrameworkSelect.helperText
          ) : (
            <Alert severity="error">
              {form.competenceFrameworkSelect.errorLoadingSkills}
            </Alert>
          )}
        </Typography>

        <Typography
          alignSelf={"flex-start"}
          variant="body1"
          textAlign="left"
          display="flex"
          alignItems="center"
        >
          <InfoOutlined
            sx={{ marginRight: 0.5 }}
            color={
              formState.courseSkills.value.length == 5 ? "primary" : "inherit"
            }
          />{" "}
          {form.competenceFrameworkSelect.maxSkillsWarning}
          {!isMobile
            ? ` Bereits ausgewählt: ${formState.courseSkills.value.length}/5.`
            : ""}
        </Typography>
      </Stack>
      {isMobile ? (
        <SkillFormMobileView
          formState={formState}
          facetIsActive={facetIsActive}
          toggleFacet={toggleFacet}
          isAspectActive={isAspectActive}
          handleClick={handleClick}
          openAspects={[ openAspect0, openAspect1, openAspect2, openAspect3 ]}
        />
      ) : (
        <Paper variant="outlined">
          <Tabs
            value={selectedAspect}
            onChange={(_, newValue) => {
              setSelectedAspect(newValue);
              setSelectedArea(null);
            }}
            variant="fullWidth"
            scrollButtons="auto"
          >
            {Object.keys(GRETA_COMPETENCES).map((aspect) => {
              const selectedFacetsCount = formState.courseSkills.value.filter(
                (skill) => {
                  const area = skill.name ? getAreaOfFacet(skill.name) : null;
                  const aspectOfSkill = Object.keys(GRETA_COMPETENCES).find(
                    (asp) =>
                      Object.keys(
                        GRETA_COMPETENCES[asp as keyof typeof GRETA_COMPETENCES]
                      ).includes(area || "")
                  );
                  return aspectOfSkill === aspect;
                }
              ).length;

              return (
                <Tab
                  key={aspect}
                  label={
                    <Stack direction="row" alignItems="center">
                      <span>{getAspectShortLabel(aspect)}</span>
                      <Chip
                        label={selectedFacetsCount}
                        color="primary"
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    </Stack>
                  }
                  value={aspect}
                />
              );
            })}
          </Tabs>
          {selectedAspect ? (
            <div
              style={{
                height: "50vh",
                overflowY: "auto",
              }}
            >
              <Typography variant="h4" sx={{ textAlign: "left", mt: 2, ml: 2 }}>
                {selectedAspect}
              </Typography>
              {Object.keys(
                GRETA_COMPETENCES[
                  selectedAspect as keyof typeof GRETA_COMPETENCES
                ]
              ).map((area) => (
                <div key={area}>
                  <Typography
                    variant="subtitle2"
                    sx={{ textAlign: "left", mt: 2, ml: 2 }}
                  >
                    {area}
                  </Typography>
                  <List dense>
                    {(
                      GRETA_COMPETENCES[selectedAspect as GretaCompetenceKey][
                        area as keyof (typeof GRETA_COMPETENCES)[GretaCompetenceKey]
                      ] as GretaFacet[]
                    ).map((facet: GretaFacet) => (
                      <ListItemButton
                        disabled={
                          formState.courseSkills.value.length >= 5 &&
                          !facetIsActive(facet.name)
                        }
                        key={facet.id}
                        onClick={() => toggleFacet(facet.name)}
                      >
                        <Checkbox
                          checked={facetIsActive(facet.name)}
                          tabIndex={-1}
                        />
                        <ListItemText primary={facet.name} />
                      </ListItemButton>
                    ))}
                  </List>
                </div>
              ))}
            </div>
          ) : (
            <Typography color="text.secondary" sx={{ mt: 2 }}>
              Wählen Sie zuerst einen Aspekt
            </Typography>
          )}
        </Paper>
      )}
    </>
  );
};
