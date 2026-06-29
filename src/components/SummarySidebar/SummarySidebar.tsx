import {
  ExpandLess,
  ExpandMore,
  Extension,
  Schedule,
  Subject,
} from "@mui/icons-material";
import {
  Card,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import moment from "moment";
import { useState } from "react";

import {
  contentFields,
  organizationalFieldsOnline,
  organizationalFieldsOnsite,
} from "../../constants/formFields";
import { form } from "../../constants/strings";
import { FormState } from "../../types/types";
import { getISO8601Duration } from "../../utils/moochub";

type Props = {
  formState: FormState;
  activeStep: number;
  maxStepReached: number;
};

export const SummarySidebar = ({
  formState,
  activeStep,
  maxStepReached,
}: Props) => {
  const [contentFieldsOpen, setContentFieldsOpen] = useState(false);
  const [organizationalFieldsOpen, setOrganizationalFieldsOpen] =
    useState(false);
  const [skillFieldsOpen, setSkillFieldsOpen] = useState(activeStep === 3);

  const contentFormState = Object.entries(formState).filter(([key]) =>
    contentFields.includes(key)
  );

  const organizationalFormState = Object.entries(formState).filter(([key]) =>
    formState.courseType.value === "onsite"
      ? organizationalFieldsOnsite.includes(key)
      : organizationalFieldsOnline.includes(key)
  );

  const handleClick = (type: string) => {
    switch (type) {
      case "content":
        setContentFieldsOpen(!contentFieldsOpen);
        break;
      case "organizational":
        setOrganizationalFieldsOpen(!organizationalFieldsOpen);
        break;
      case "skills":
        setSkillFieldsOpen(!skillFieldsOpen);
        break;
    }
  };

  return (
    <Card>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          "& .MuiListItemText-primary": {
            fontSize: "14px",
            fontWeight: 500,
          },
        }}
        component="nav"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            color="primary"
            sx={{ fontWeight: 600 }}
          >
            Vorschau
          </ListSubheader>
        }
      >
        <ListItemButton
          onClick={() => handleClick("content")}
          disabled={maxStepReached < 1}
        >
          <ListItemIcon>
            <Subject color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Inhaltliche Angaben" />
          {contentFieldsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={contentFieldsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding dense>
            {contentFormState.map((item) => {
              let maxChar = 0;
              maxChar = item[0] === "courseUrl" ? 35 : 150;
              const key = item[0] as keyof typeof form;
              const label =
                key in form && "label" in form[key] ? form[key].label : "";
              return (
                <ListItem key={item[0]} alignItems="flex-start" sx={{ pl: 4 }}>
                  <ListItemText
                    primary={String(label || "")}
                    secondary={
                      Array.isArray(item[1].value)
                        ? item[1].value.join(", ")
                        : item[1].value && typeof item[1].value === "string"
                          ? item[1].value.length > 60
                            ? `${item[1].value.substring(0, maxChar)} ...`
                            : item[1].value
                          : "—"
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        </Collapse>
        <ListItemButton
          onClick={() => handleClick("organizational")}
          disabled={maxStepReached < 2}
        >
          <ListItemIcon>
            <Schedule color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Organisatorische Angaben" />
          {organizationalFieldsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={organizationalFieldsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding dense>
            {organizationalFormState.map((item) => {
              const key = item[0] as keyof typeof form;
              const label =
                key in form && "label" in form[key] ? form[key].label : "";
              return (
                <ListItem key={item[0]} alignItems="flex-start" sx={{ pl: 4 }}>
                  <ListItemText
                    primary={
                      item[0] === "durationValue"
                        ? "Kursdauer"
                        : String(label || "")
                    }
                    secondary={
                      item[0] === "durationValue"
                        ? getISO8601Duration(
                            formState.durationValue.value,
                            formState.durationUnit.value
                          ) || "—"
                        : item[1].value && typeof item[1].value === "string"
                          ? item[1].value.length > 100
                            ? `${item[1].value.substring(0, 150)} ...`
                            : item[1].value
                          : moment.isMoment(item[1].value)
                            ? item[1].value.format("DD/MM/YYYY, HH:mm") + " Uhr"
                            : "—"
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        </Collapse>
        <ListItemButton
          onClick={() => handleClick("skills")}
          disabled={maxStepReached < 3}
        >
          <ListItemIcon>
            <Extension color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Kompetenzen" />
          {skillFieldsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={skillFieldsOpen} timeout="auto" unmountOnExit>
          <List
            component="div"
            disablePadding
            dense
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              "& .MuiListItemText-primary": {
                fontSize: "14px",
                fontWeight: 500,
              },
            }}
          >
            {formState.courseSkills.value.map((facet) => (
              <ListItem key={facet.name} alignItems="flex-start" sx={{ pl: 4 }}>
                <ListItemText primary={`• ${facet.name}`} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </Card>
  );
};
