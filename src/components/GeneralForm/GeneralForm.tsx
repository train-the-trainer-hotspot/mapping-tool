import { ArrowDropDown, InfoOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Collapse,
  Fab,
  FilledInput,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  DateTimeValidationError,
  PickerChangeHandlerContext,
} from "@mui/x-date-pickers";
import { Moment } from "moment";
import { ChangeEvent, useState } from "react";

import { form } from "../../constants/strings";
import { FormState } from "../../types/types";
import { notEmptyValidator } from "../../utils/validator";
import { CreatorInfoDialog } from "./CreatorInfoDialog";
import { LicenseInfoDialog } from "./LicenseInfoDialog";
import { PublisherInfoDialog } from "./PublisherInfoDialog";

type Props = {
  formState: FormState;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (event: SelectChangeEvent<string>) => void;
  handleSelectMultipleChange: (event: SelectChangeEvent<string[]>) => void;
  handleDateChange: (
    date: Moment | null,
    context: PickerChangeHandlerContext<DateTimeValidationError>,
    id: keyof FormState
  ) => void;
  handleRadioChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

type OptionType = {
  value: string;
  label: string;
};

export const GeneralForm = ({
  formState,
  handleInputChange,
  handleSelectChange,
  handleSelectMultipleChange,
  handleRadioChange,
}: Props) => {
  const [optionalFieldsVisible, setOptionalFieldsVisible] = useState(false);
  const [licenseInfoOpen, setLicenseInfoOpen] = useState(false);
  const [publisherInfoOpen, setPublisherInfoOpen] = useState(false);
  const [creatorInfoOpen, setCreatorInfoOpen] = useState(false);

  return (
    <Stack spacing={2} mt={4}>
      <Typography variant="h1" sx={{ textAlign: { xs: "center", sm: "left" } }}>
        {form.sections.general}
      </Typography>

      <FormControl required error={formState.courseTitle.error}>
        <InputLabel>{form.courseTitle.label}</InputLabel>
        <FilledInput
          id={formState.courseTitle.id}
          value={formState.courseTitle.value}
          onChange={handleInputChange}
        />
        <FormHelperText>
          {formState.courseTitle.error
            ? form.courseTitle.error
            : form.courseTitle.helperText}
        </FormHelperText>
      </FormControl>

      <FormControl required error={formState.courseUrl.error}>
        <InputLabel>{form.courseUrl.label}</InputLabel>
        <FilledInput
          id={formState.courseUrl.id}
          value={formState.courseUrl.value}
          onChange={handleInputChange}
        />
        <FormHelperText>
          {formState.courseUrl.error
            ? notEmptyValidator(formState.courseUrl.value) === false
              ? form.courseUrl.errorEmpty
              : form.courseUrl.errorInvalid
            : form.courseUrl.helperText}
        </FormHelperText>
      </FormControl>

      <FormControl>
        <InputLabel>{form.courseDescription.label}</InputLabel>

        <FilledInput
          multiline
          minRows={3}
          id={formState.courseDescription.id}
          value={formState.courseDescription.value}
          onChange={handleInputChange}
        />
        <FormHelperText>{form.courseDescription.helperText}</FormHelperText>
      </FormControl>

      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        width="100%"
        mt={2}
      >
        <FormControl
          style={{ flex: 1 }}
          required
          error={formState.licenseIdentifier.error}
        >
          <InputLabel>Lizenz</InputLabel>
            <Select
            name={formState.licenseIdentifier.id}
            value={formState.licenseIdentifier.value || ""}
            onChange={handleSelectChange}
            displayEmpty
            variant="filled"
            MenuProps={{
              PaperProps: {
              style: {
                maxHeight: 200, 
                overflowY: "auto",
              },
              },
            }}
            >
            {form.licenseIdentifier.options.map((option) => (
              <MenuItem
              key={option.value}
              value={option.value}
              style={{
                whiteSpace: "normal", 
                wordWrap: "break-word",
              }}
              >
              {option.label}
              </MenuItem>
            ))}
            </Select>
          <FormHelperText>
            {form.licenseIdentifier.helperText}
              <InfoOutlined
                sx={{
                  verticalAlign: "middle",
                  ml: 1,
                  cursor: "pointer",
                  fontSize: "medium",
                }}
                onClick={() => setLicenseInfoOpen(true)}
              />
            <LicenseInfoDialog
              licenseInfoOpen={licenseInfoOpen}
              setLicenseInfoOpen={setLicenseInfoOpen}
            />
          </FormHelperText>
        </FormControl>
      </Stack>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2 }}
        width="100%"
        mt={2}
      >
        <FormControl
          sx={{ flex: 3, width: "100%" }}
          required
          error={formState.publisherName.error}
        >
          <InputLabel>{form.publisherName.label}</InputLabel>
          <FilledInput
            id={formState.publisherName.id}
            value={formState.publisherName.value}
            onChange={handleInputChange}
          />
          <FormHelperText>
            {" "}
            {formState.publisherName.error
              ? form.publisherName.error
              : form.publisherName.helperText}
              <InfoOutlined
                sx={{
                  verticalAlign: "middle",
                  ml: 1,
                  cursor: "pointer",
                  fontSize: "medium",
                }}
                onClick={() => setPublisherInfoOpen(true)}
              />
            <PublisherInfoDialog
              PublisherInfoOpen={publisherInfoOpen}
              setPublisherInfoOpen={setPublisherInfoOpen}
            />
          </FormHelperText>
        </FormControl>

        <FormControl required error={formState.creatorType.error}>
          <RadioGroup
            row
            name={formState.publisherType.id}
            value={formState.publisherType.value}
            onChange={handleRadioChange}
            id={formState.publisherType.id}
            sx={{ ml: { xs: 1, sm: 0 } }}
          >
            <FormControlLabel
              key="Organization"
              value="Organization"
              control={<Radio />}
              label="Organisation"
            />
            <FormControlLabel
              key="Person"
              value="Person"
              control={<Radio />}
              label="Person"
            />
          </RadioGroup>
          {formState.creatorType.error && (
            <FormHelperText sx={{ mt: { xs: -0.5, sm: 0 } }}>
              {form.creatorType.error}
            </FormHelperText>
          )}
        </FormControl>
      </Stack>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2 }}
        width="100%"
        mt={2}
      >
        <FormControl
          sx={{ flex: 3, width: "100%" }}
          required
          error={formState.creatorName.error}
        >
          <InputLabel>{form.creatorName.label}</InputLabel>
          <FilledInput
            id={formState.creatorName.id}
            value={formState.creatorName.value}
            onChange={handleInputChange}
          />
          <FormHelperText>
            {" "}
            {formState.creatorName.error
              ? form.creatorName.error
              : form.creatorName.helperText}
              <InfoOutlined
                sx={{
                  verticalAlign: "middle",
                  ml: 1,
                  cursor: "pointer",
                  fontSize: "medium",
                }}
                onClick={() => setCreatorInfoOpen(true)}
              />
            <CreatorInfoDialog
              CreatorInfoOpen={creatorInfoOpen}
              setCreatorInfoOpen={setCreatorInfoOpen}
            />
          </FormHelperText>
        </FormControl>

        <FormControl required error={formState.creatorType.error}>
          <RadioGroup
            row
            name={formState.creatorType.id}
            value={formState.creatorType.value}
            onChange={handleRadioChange}
            id={formState.creatorType.id}
            sx={{ ml: { xs: 1, sm: 0 } }}
          >
            <FormControlLabel
              key="Organization"
              value="Organization"
              control={<Radio />}
              label="Organisation"
            />
            <FormControlLabel
              key="Person"
              value="Person"
              control={<Radio />}
              label="Person"
            />
          </RadioGroup>
          {formState.creatorType.error && (
            <FormHelperText sx={{ mt: { xs: -0.5, sm: 0 } }}>
              {form.creatorType.error}
            </FormHelperText>
          )}
        </FormControl>
      </Stack>

      <Box display="flex" justifyContent="center">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="caption" mb={1}>
            Mehr Optionen
          </Typography>
          <Tooltip title={optionalFieldsVisible ? "" : "Mehr Optionen"}>
            <Fab
              size="small"
              color="primary"
              aria-label="add"
              onClick={() => setOptionalFieldsVisible((prev) => !prev)}
            >
              <ArrowDropDown />
            </Fab>
          </Tooltip>
        </Box>
      </Box>

      <Collapse in={optionalFieldsVisible}>
        <Stack spacing={2} mt={2}>
          <FormControl>
            <Stack
              direction="row"
              spacing={1}
              justifyContent="space-between"
              flexWrap="nowrap"
              overflow="auto"
            >
              {form.inLanguage.options.map((language) => (
                <Button
                  key={language.value}
                  onClick={() => {
                    const currentValues = formState.inLanguage.value || [];
                    const newValues = currentValues.includes(language.value)
                      ? currentValues.filter((val) => val !== language.value)
                      : [...currentValues, language.value];
                      handleSelectMultipleChange({
                        target: {
                          name: formState.inLanguage.id,
                          value: newValues,
                        },
                      } as SelectChangeEvent<string[]>);
                  }}
                  variant={
                    formState.inLanguage.value?.includes(language.value)
                      ? "contained"
                      : "outlined"
                  }
                  sx={{ flex: 1 }}
                >
                  {language.label}
                </Button>
              ))}
            </Stack>
            <FormHelperText>{form.inLanguage.helperText}</FormHelperText>
          </FormControl>

          <FormControl>
            <InputLabel>{form.keywords.label}</InputLabel>
            <FilledInput
              id={formState.keywords.id}
              value={formState.keywords.value}
              onChange={handleInputChange}
              placeholder="Web Development, JavaScript, React"
            />
            <FormHelperText>{form.keywords.helperText}</FormHelperText>
          </FormControl>

          <Stack mt={2}>
            <FormControl>
              <InputLabel>{form.access.label}</InputLabel>
              <Select
                name={formState.access.id}
                multiple
                value={formState.access.value}
                onChange={handleSelectMultipleChange}
                variant={"filled"}
                displayEmpty
              >
                {form.access.options.map((option: OptionType) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{form.access.helperText}</FormHelperText>
            </FormControl>
          </Stack>
        </Stack>
      </Collapse>
    </Stack>
  );
};
