import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid2,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { ChangeEvent, forwardRef, useImperativeHandle } from "react";

import { form } from "../../constants/strings";
import { theme } from "../../theme/index";
import { FormState } from "../../types/types";
import { CourseNotSuitable } from "./CourseNotSuitable";

type Props = {
  formState: FormState;
  handleRadioChange: (event: ChangeEvent<HTMLInputElement>) => void;
  showIsNotSuitable: boolean;
};

export type SuitabilityFormRef = {
  isSuitable: () => boolean;
};

export const SuitabilityForm = forwardRef<SuitabilityFormRef, Props>(
  (props, ref) => {
    const { formState, handleRadioChange, showIsNotSuitable } = props;

    const isSuitable = () => {
      return (
        form.suitability.items.reduce(
          (count, item) =>
            formState[item.name as keyof FormState].value === "1"
              ? count + 1
              : count,
          0
        ) >= 3
      )
    };

    useImperativeHandle(ref, () => ({
      isSuitable: isSuitable,
    }));

    return showIsNotSuitable ? (
      <CourseNotSuitable/>
    ) : (
      <>
        <Typography alignSelf="flex-start" variant="h1">
          {form.sections.suitability}
        </Typography>
        {form.suitability.items.map((item) => {
          const currentValue =
            formState[item.name as keyof FormState].value || "";
          const error = formState[item.name as keyof FormState].error;

          return (
            <FormControl
              key={`suitability-form-item-${item.name}-${form.suitability.items.indexOf(item)}`}
              error={error}
              required
            >
              <Grid2
                container
                alignItems="center"
                spacing={{ xs: 0.5, sm: 2 }}
                sx={{ textAlign: "left" }}
              >
                <Grid2 size={{ xs: 12, sm: 8 }}>
                  <Typography
                    variant="body1"
                    color={theme.palette.primary.main}
                  >
                    {item.helperText}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      whiteSpace: "normal",
                      overflowWrap: "break-word",
                      wordBreak: "break-word",
                    }}
                  >
                    {item.label}
                  </Typography>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 1 }} />
                <Grid2
                  size={{ xs: 12, sm: 3 }}
                  sx={{
                    textAlign: { xs: "left", sm: "right" },
                    justifyContent: { xs: "flex-start", sm: "flex-end" },
                    display: "flex",
                    alignItems: { xs: "flex-start", sm: "flex-end" },
                    flexDirection: "column",
                  }}
                >
                  <RadioGroup
                    row
                    name={item.name}
                    value={currentValue || ""}
                    onChange={handleRadioChange}
                    id={
                      formState[item.name as keyof FormState]?.id ||
                      `radio-group-${item.name}`
                    }
                  >
                    {Object.values(form.suitability.options).map(
                      (option: { label: string; value: string }) => (
                        <FormControlLabel
                          key={option.value}
                          value={option.value}
                          control={<Radio />}
                          label={option.label}
                        />
                      )
                    )}
                  </RadioGroup>
                  {error && (
                    <FormHelperText
                      sx={{
                        mt: { xs: -0.5, sm: 0 },
                        ml: { xs: 0, sm: "auto" },
                        alignSelf: { xs: "flex-start", sm: "flex-end" },
                      }}
                    >
                      {form.suitability.error}
                    </FormHelperText>
                  )}
                </Grid2>
              </Grid2>
            </FormControl>
          );
        })}
      </>
    );
  }
);
