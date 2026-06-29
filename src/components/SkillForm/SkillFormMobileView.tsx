import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Checkbox,
  Collapse,
  Fab,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from "@mui/material";

import { GRETA_COMPETENCES } from "../../constants/gretaCompetences";
import { GretaFacet } from "../../constants/gretaCompetences";
import { theme } from "../../theme/index";
import { FormState } from "../../types/types";
import { GretaCompetenceKey } from "../../types/types";

type Props = {
  formState: FormState;
  toggleFacet: (name: string) => void;
  handleClick: (index: number) => void;
  isAspectActive: (aspectName: string) => boolean;
  facetIsActive: (facetName: string) => boolean;
  openAspects: boolean[];
};

export const SkillFormMobileView = ({
  formState,
  toggleFacet,
  handleClick,
  isAspectActive,
  facetIsActive,
  openAspects
}: Props) => {
  return (
    <>
    <Fab
      style={{
        position: "fixed",
        bottom: "85px",
        right: "16px",
        backgroundColor: theme.palette.primary.main,
        color: "white",
        zIndex: 1000,
        padding: "12px 16px",
        borderRadius: "50px",
        textAlign: "center",
      }}
      size="medium"
    >
      {`${formState.courseSkills.value.length}/5`}
    </Fab>
      <List>
        {Object.keys(GRETA_COMPETENCES).map((aspect, index) => (
          <div key={aspect}>
            <ListItemButton
              key={`aspect-button-${aspect}`}
              onClick={() => handleClick(index)}
              sx={{
                backgroundColor: isAspectActive(aspect)
                  ? theme.palette.secondary.main
                  : "inherit",
                color: isAspectActive(aspect) ? "white" : "inherit",
                "&:hover": {
                  backgroundColor: isAspectActive(aspect)
                    ? theme.palette.secondary.main
                    : theme.palette.action.hover,
                },
              }}
            >
              <ListItemText primary={aspect} />
              {openAspects[index] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <List dense>
              {Object.keys(
                GRETA_COMPETENCES[aspect as keyof typeof GRETA_COMPETENCES]
              ).map((area) => (
                <Collapse
                  in={openAspects[index]}
                  timeout="auto"
                  unmountOnExit
                  key={`collapse-${area}`}
                >
                  <ListSubheader sx={{ textAlign: "left" }}>{area}</ListSubheader>

                  {(
                      GRETA_COMPETENCES[aspect as GretaCompetenceKey][
                        area as keyof (typeof GRETA_COMPETENCES)[GretaCompetenceKey]
                      ] as GretaFacet[]
                    ).map((facet: GretaFacet) => (
                    <ListItemButton
                      key={facet.id}
                      onClick={() => toggleFacet(facet.name)}
                      disabled={
                        formState.courseSkills.value.length >= 5 &&
                        !facetIsActive(facet.name)
                      }
                    >
                      <Checkbox
                        checked={facetIsActive(facet.name)}
                        tabIndex={-1}
                      />
                      <ListItemText primary={facet.name} />
                    </ListItemButton>
                  ))}
                </Collapse>
              ))}
            </List>
          </div>
        ))}
      </List>
    </>
  );
};
