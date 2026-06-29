import {
  FilledInput,
  FormControl,
  FormHelperText,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import {
  DateTimePicker,
  DateTimeValidationError,
  PickerChangeHandlerContext,
} from "@mui/x-date-pickers";
import { Moment } from "moment";
import { ChangeEvent } from "react";

import { form } from "../../constants/strings";
import { FormState } from "../../types/types";

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

export const CourseDurationPicker = ({
  formState,
  handleInputChange,
  handleSelectChange,
  handleDateChange,
}: Props) => {
  const handleCourseExpiresChange = (
    date: Moment | null,
    context: PickerChangeHandlerContext<DateTimeValidationError>
  ) => {
    handleDateChange(date, context, formState.courseExpires.id);
  };
  return (
    <Stack mt={4} width="100%">
      <Typography alignSelf="flex-start" variant="h5">
        {form.organizational.duration}
      </Typography>
      <Stack spacing={2} mt={1}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems="flex-start"
          width="100%"
        >
          <FormControl fullWidth sx={{ alignSelf: "flex-start" }}>
              <FilledInput
              id={formState.durationValue.id}
              type="number"
              inputProps={{
                step: "any",
                min: "0",
              }}
              endAdornment={
                <InputAdornment position="end">
                  <Select
                    name={formState.durationUnit.id}
                    value={formState.durationUnit.value}
                    onChange={handleSelectChange}
                    variant="standard"
                    sx={{ ml: 1 }}
                  >
                    <MenuItem value="m">Minuten</MenuItem>
                    <MenuItem value="h">Stunden</MenuItem>
                    <MenuItem value="d">Tage</MenuItem>
                    <MenuItem value="w">Wochen</MenuItem>
                    <MenuItem value="M">Monate</MenuItem>
                  </Select>
                </InputAdornment>
              }
              aria-describedby="outlined-weight-helper-text-2"
              value={formState.durationValue.value}
              onChange={handleInputChange}
            />
            </FormControl>

          <FormControl fullWidth sx={{ alignSelf: "flex-start" }}>
        <DateTimePicker
          ampm={false}
          label={form.courseExpires.label}
          slotProps={{ textField: { variant: "filled" } }}
          onChange={handleCourseExpiresChange}
        />
        <FormHelperText>{form.courseExpires.helperText}</FormHelperText>
          </FormControl>
        </Stack>
      </Stack>
    </Stack>
  );
};
