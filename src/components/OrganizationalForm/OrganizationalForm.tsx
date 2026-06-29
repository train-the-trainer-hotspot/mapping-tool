import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import {
  DateTimeValidationError,
  PickerChangeHandlerContext,
} from "@mui/x-date-pickers";
import { Moment } from "moment";
import { ChangeEvent } from "react";

import { form } from "../../constants/strings";
import { FormState } from "../../types/types";
import { CourseDurationPicker} from "./CourseDurationPicker";
import { CourseStartEndPicker } from "./CourseStartEndPicker";
import { LocationForm } from "./LocationForm";

type Props = {
  formState: FormState;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (event: SelectChangeEvent<string>) => void;
  handleDateChange: (
    date: Moment | null,
    context: PickerChangeHandlerContext<DateTimeValidationError>,
    id: keyof FormState
  ) => void;
};

export const OrganizationalForm = ({
  formState,
  handleSelectChange,
  handleInputChange,
  handleDateChange,
}: Props) => {

  const courseIsOnSite =
    formState.courseType.value === form.courseType.options.präsenz.value;
    
  const courseIsSynchronous = [
    form.courseType.options.präsenz.value,
    form.courseType.options.online_sync.value,
  ].includes(formState.courseType.value);

  return (
    <>
      <Stack spacing={2} mt={4}>
        <Typography alignSelf={"flex-start"} variant="h1" mt={2}>
          {form.sections.organizational}
        </Typography>

        <FormControl style={{ alignItems: "flex-start" }}>
          <Stack direction="row" spacing={2} alignItems="center" width="100%">
            <FormControl
              sx={{
                flex: {
                  xs: 1,
                  sm: 0.5,
                },
              }}
            >
              <InputLabel id="type-select-label">
                {form.courseType.label}
              </InputLabel>
              <Select
                labelId="type-select-label"
                name={formState.courseType.id}
                value={formState.courseType.value}
                label={form.courseType.label}
                onChange={handleSelectChange}
                variant="filled"
              >
                {Object.values(form.courseType.options).map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <FormHelperText>{form.courseType.helperText}</FormHelperText>
        </FormControl>
      </Stack>

      {courseIsOnSite && (
        <LocationForm
          formState={formState}
          handleInputChange={handleInputChange}
        />
      )}

      {courseIsSynchronous && (
        <CourseStartEndPicker
          formState={formState}
          handleDateChange={handleDateChange}
        />
      )}

        <CourseDurationPicker
          formState={formState}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleDateChange={handleDateChange}
        />
    </>
  );
};
