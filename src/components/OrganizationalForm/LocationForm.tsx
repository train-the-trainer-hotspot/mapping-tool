import {
  FilledInput,
  FormControl,
  FormHelperText,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import { ChangeEvent } from "react";

import { form } from "../../constants/strings";
import { FormState } from "../../types/types";

type Props = {
  formState: FormState;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const LocationForm = ({ formState, handleInputChange }: Props) => {
  return (
    <Stack mt={4} width="100%">
      <Typography alignSelf="flex-start" variant="h5">
        {form.organizational.address}
      </Typography>
    <Stack spacing={2} mt={1}>
        <FormControl fullWidth>
          <InputLabel>{form.locationName.label}</InputLabel>
          <FilledInput
            id={formState.locationName.id}
            value={formState.locationName.value}
            onChange={handleInputChange}
          />
          <FormHelperText>{form.locationName.helperText}</FormHelperText>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>{form.locationStreetNumber.label}</InputLabel>
          <FilledInput
            id={formState.locationStreetNumber.id}
            value={formState.locationStreetNumber.value}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>{form.locationZip.label}</InputLabel>
          <FilledInput
            id={formState.locationZip.id}
            value={formState.locationZip.value}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>{form.locationCity.label}</InputLabel>
          <FilledInput
            id={formState.locationCity.id}
            value={formState.locationCity.value}
            onChange={handleInputChange}
          />
        </FormControl>
    </Stack>
    </Stack>

  );
};
