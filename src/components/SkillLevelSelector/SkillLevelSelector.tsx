import { InfoOutlined } from "@mui/icons-material";
import {
  Alert,
  Box,
  FormControl,
  Grid2,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";

import { GretaLearningObjectiveLevel } from "../../constants/gretaCompetences";
import { form } from "../../constants/strings";
import { GRETA_SKILL_LEVEL_URL } from "../../constants/urls";
import { FormState } from "../../types/types";
import { getGretaLearningObjectives } from "../../utils/gretaCompetences";

type Props = {
  formState: FormState;
  onLearningObjectiveLevelChange: (
    competenceName: string,
    level: string
  ) => void;
};

export const SkillLevelSelector = ({
  formState,
  onLearningObjectiveLevelChange,
}: Props) => {
  const handleLearningObjectiveLevelChange = (
    event: SelectChangeEvent,
    competenceName: string
  ) => {
    onLearningObjectiveLevelChange(competenceName, event.target.value);
  };
  return (
    <>
      <Stack spacing={3} mt={4} alignItems={"flex-start"}>
        <Typography
          alignSelf={"flex-start"}
          variant="h1"
          sx={{ textAlign: { xs: "center", sm: "left" } }}
        >
          {form.sections.skillLevels}
        </Typography>
        <Typography alignSelf={"flex-start"} variant="body1" textAlign="left">
          {form.skillLevelSelect.helperText}
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          flexDirection="row"
          textAlign="left"
        >
          <InfoOutlined sx={{ marginRight: 0.5 }} />
          <Typography variant="body1" textAlign="left">
            Finden Sie{" "}
            <Link
              sx={{ marginRight: 0.5 }}
              href={GRETA_SKILL_LEVEL_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              hier
            </Link>
            mehr Informationen zu den GRETA-Lernzielstufen.
          </Typography>
        </Box>
      </Stack>
      <Stack spacing={2}>
        {(!formState.courseSkills.value || formState.courseSkills.value.length === 0) && (
          <Alert severity="error">
            {" "}
            {form.skillLevelSelect.noSkillsSelected}
          </Alert>
        )}

        {formState.courseSkills.value.map((facet) => {
          const currentLevel =
            formState.courseSkills.value.find(
              (skill) => skill.name === facet.name
            )?.level || "";

          const learningObjectiveLevels = facet.name
            ? getGretaLearningObjectives(facet.name)?.levels
            : [];

          return (
            <Grid2
              key={facet.name}
              container
              spacing={2}
              sx={{ textAlign: "left" }}
            >
              <Grid2 size={7}>
                <Typography variant="body1" noWrap title={facet.name}>
                  {facet.name}
                </Typography>
              </Grid2>
              <Grid2
                size={5}
                sx={{
                  textAlign: { xs: "left", sm: "right" },
                  justifyContent: { xs: "flex-start", sm: "flex-start" },
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FormControl style={{ flex: 1 }}>
                  <InputLabel
                    id={`learning-objective-level-label-${facet.name}`}
                  >
                    Lernzielstufe
                  </InputLabel>
                  <Select
                    fullWidth
                    id={`learning-objective-level-select-${facet.name}`}
                    value={currentLevel}
                    size="small"
                    label="Lernzielstufe"
                    sx={{ textAlign: "left" }}
                    onChange={(event: SelectChangeEvent) =>
                      handleLearningObjectiveLevelChange(event, facet.name)
                    }
                    variant="filled"
                  >
                    <MenuItem value="" disabled>
                      Bitte auswählen
                    </MenuItem>
                    {learningObjectiveLevels &&
                      learningObjectiveLevels.map(
                        (level: GretaLearningObjectiveLevel, index: number) => (
                          <MenuItem key={`${level.name}-${index}`} value={level.name}>
                            {level.name}
                          </MenuItem>
                        )
                      )}
                  </Select>
                </FormControl>
              </Grid2>
            </Grid2>
          );
        })}
      </Stack>
    </>
  );
};
