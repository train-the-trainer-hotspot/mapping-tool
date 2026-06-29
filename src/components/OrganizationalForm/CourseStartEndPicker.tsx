import { FormControl, FormHelperText, Stack, Typography } from "@mui/material";
import {
  DateTimePicker,
  DateTimeValidationError,
  PickerChangeHandlerContext,
} from "@mui/x-date-pickers";
import { Moment } from "moment";

import { form } from "../../constants/strings";
import { FormState } from "../../types/types";

type Props = {
  formState: FormState;
  handleDateChange: (
    date: Moment | null,
    context: PickerChangeHandlerContext<DateTimeValidationError>,
    id: keyof FormState
  ) => void;
};

export const CourseStartEndPicker = ({ formState, handleDateChange }: Props) => {
  return (
    <Stack mt={4} width="100%">
      <Typography alignSelf="flex-start" variant="h5">
        {form.organizational.timeStartEnd}
      </Typography>
      <Stack spacing={2} mt={1}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems="center"
          width="100%"
          mt={1}
        >
          <FormControl fullWidth>
            <DateTimePicker
              disabled={formState.courseAsynchronous.value === "asynchronous"}
              ampm={false}
              label={form.courseStart.label}
              value={formState.courseStart.value}
              slotProps={{ textField: { variant: "filled" } }}
              onChange={(date, context) =>
                handleDateChange(date, context, formState.courseStart.id)
              }
            />
            <FormHelperText>{form.courseStart.helperText}</FormHelperText>
          </FormControl>

          <FormControl fullWidth>
            <DateTimePicker
              ampm={false}
              disabled={formState.courseAsynchronous.value === "asynchronous"}
              label={form.courseEnd.label}
              value={formState.courseEnd.value}
              slotProps={{ textField: { variant: "filled" } }}
              onChange={(date, context) =>
                handleDateChange(date, context, formState.courseEnd.id)
              }
            />
            <FormHelperText>{form.courseEnd.helperText}</FormHelperText>
          </FormControl>
        </Stack>
      </Stack>
    </Stack>
  );
};
