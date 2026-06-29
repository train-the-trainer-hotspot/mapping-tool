import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Button, MobileStepper, SelectChangeEvent, Stack } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import {
  DateTimeValidationError,
  PickerChangeHandlerContext,
} from "@mui/x-date-pickers";
import { Moment } from "moment";
import React, { ChangeEvent, useRef, useState } from "react";

import { FinishForm } from "../../components/FinishForm/FinishForm";
import { GeneralForm } from "../../components/GeneralForm/GeneralForm";
import { Layout } from "../../components/Layout/Layout";
import { OrganizationalForm } from "../../components/OrganizationalForm/OrganizationalForm";
import { SkillForm } from "../../components/SkillForm/Skillform";
import { SkillLevelSelector } from "../../components/SkillLevelSelector/SkillLevelSelector";
import {
  SuitabilityForm,
  SuitabilityFormRef,
} from "../../components/SuitabilityForm/SuitabilityForm";
import { contentFields, suitabilityFields } from "../../constants/formFields";
import { initialFormState } from "../../constants/initialFormState";
import { form } from "../../constants/strings";
import { theme } from "../../theme/index";
import { CompetenceFramework } from "../../types/course";
import { FormState, GretaFacetLevel } from "../../types/types";
import { createMoochubFromForm } from "../../utils/moochub";
import { fetchCompetenciesFromCourse, Skill } from "../../utils/wisyApi";
const steps = form.stepper.steps;

export const CourseForm = () => {
  const [suggestedSkills] = useState<Skill[]>([]);
  const [showIsNotSuitableError, setShowIsNotSuitable] = useState(false);
  const [nextIsDisabled, setNextIsDisabled] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const suitabilityFormRef = useRef<SuitabilityFormRef>(null);
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [maxStepReached, setMaxStepReached] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));

  const formHasErrors = (fields: string[]): boolean => {
    let hasAnyError = false;

    for (const field of fields) {
      const fieldKey = field as keyof FormState;
      const id = formState[fieldKey]?.id;

      const hasError =
        formState[fieldKey].validator && formState[fieldKey].value !== undefined
          ? formState[fieldKey].validator(
              formState[fieldKey].value as never
            ) === false
          : false;

      if (hasError) {
        hasAnyError = true;
      }

      setFormState((prevState: FormState) => ({
        ...prevState,
        [id]: {
          ...prevState[id as keyof FormState],
          error: hasError,
        },
      }));
    }
    return hasAnyError;
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (formHasErrors(suitabilityFields)) {
        return;
      } else {
        if (suitabilityFormRef.current) {
          const suitable = suitabilityFormRef.current.isSuitable();
          if (!suitable) {
            setShowIsNotSuitable(true);
            setNextIsDisabled(true);
            return;
          }
        }
      }
    }

    if (activeStep === 1) {
      if (formHasErrors(contentFields)) {
        return;
      } else {
        handleGetCompetencies();
      }
    }
    if (activeStep === steps.length - 1) {
      handleReset();
      return;
    }
    if (activeStep + 1 > maxStepReached) {
      setMaxStepReached(activeStep + 1);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    formHasErrors([...suitabilityFields, ...contentFields]);
    if (activeStep == 0) {
      if (showIsNotSuitableError) {
        setShowIsNotSuitable(false);
        setNextIsDisabled(false);
        return;
      }
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setFormState(initialFormState);
  };

  const isGetCompetenciesPossible =
    formState.courseDescription.value !== "" &&
    formState.courseCompetenceFramework.value !== "";

  const handleGetCompetencies = async () => {
    if (isGetCompetenciesPossible) {
      const apiResponse = await fetchCompetenciesFromCourse(
        formState.courseDescription.value,
        formState.courseCompetenceFramework.value as CompetenceFramework
      );
      const response = apiResponse.learning_outcomes.skills;
      const newSuggestedSkills = [];
      for (const skill of response.slice(0, 5)) {
        const facet: GretaFacetLevel = {
          name: skill.title as keyof FormState,
          level: "",
        };
        newSuggestedSkills.push(facet);
      }
      setFormState({
        ...formState,
        courseSkills: {
          ...formState.courseSkills,
          value: newSuggestedSkills,
        },
      });
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    setFormState((prevState: FormState) => ({
      ...prevState,
      [id]: {
        ...prevState[id as keyof FormState],
        value: String(value),
      },
    }));
  };

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormState((prevState: FormState) => ({
      ...prevState,
      [name]: {
        ...prevState[name as keyof FormState],
        value: value,
      },
    }));
  };

  const handleDateChange = (
    date: Moment | null,
    _context: PickerChangeHandlerContext<DateTimeValidationError>,
    id: keyof FormState
  ) => {
    setFormState((prevState: FormState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        value: date,
      },
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;

    setFormState((prevState: FormState) => ({
      ...prevState,
      [name]: {
        ...prevState[name as keyof FormState],
        value: value,
      },
    }));
  };

  const handleSelectMultipleChange = (event: SelectChangeEvent<string[]>) => {
    const { name, value } = event.target;

    setFormState((prevState: FormState) => ({
      ...prevState,
      [name]: {
        ...prevState[name as keyof FormState],
        value: value,
      },
    }));
  };

  const onGretaFacetToggle = (name: string, level: string) => {
    const newGretaSkills = [...formState.courseSkills.value];

    const existingIndex = newGretaSkills.findIndex(
      (skill) => skill.name === name
    );

    if (existingIndex !== -1) {
      newGretaSkills.splice(existingIndex, 1);
    } else {
      newGretaSkills.push({ name, level });
    }

    setFormState({
      ...formState,
      courseSkills: {
        ...formState.courseSkills,
        value: newGretaSkills,
      },
    });
  };

  const onLearningObjectiveLevelChange = (name: string, level: string) => {
    const newGretaSkills = formState.courseSkills.value.map((skill) => {
      if (skill.name === name) {
        return { ...skill, level };
      }
      return skill;
    });

    setFormState({
      ...formState,
      courseSkills: {
        ...formState.courseSkills,
        value: newGretaSkills,
      },
    });
  };

  const handleDownload = () => {
    const data = createMoochubFromForm(formState);
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = formState.courseTitle.value.replace(/[^a-zA-Z0-9]/g, "");
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderStep = (step: number) => {
    switch (step) {
      case 0:
        return (
          <SuitabilityForm
            formState={formState}
            handleRadioChange={handleRadioChange}
            showIsNotSuitable={showIsNotSuitableError}
            ref={suitabilityFormRef}
          />
        );
      case 1:
        return (
          <GeneralForm
            formState={formState}
            handleInputChange={handleInputChange}
            handleRadioChange={handleRadioChange}
            handleSelectChange={handleSelectChange}
            handleSelectMultipleChange={handleSelectMultipleChange}
            handleDateChange={handleDateChange}
          />
        );
      case 2:
        return (
          <OrganizationalForm
            formState={formState}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            handleDateChange={handleDateChange}
          />
        );
      case 3:
        return (
          <SkillForm
            formState={formState}
            handleSelectChange={handleSelectChange}
            suggestedSkills={suggestedSkills}
            onGretaFacetToggle={onGretaFacetToggle}
            isGetCompetenciesPossible={isGetCompetenciesPossible}
            handleGetCompetencies={handleGetCompetencies}
          />
        );
      case 4:
        return (
          <SkillLevelSelector
            formState={formState}
            onLearningObjectiveLevelChange={onLearningObjectiveLevelChange}
          />
        );
      case 5:
        return (
          <FinishForm
            formState={formState}
            handleSelectChange={handleSelectChange}
            handleDownload={handleDownload}
          />
        );
    }
  };

  return (
    <Layout
      formState={formState}
      activeStep={activeStep}
      maxStepReached={maxStepReached}
    >
      <Stack spacing={3} mt={4}>
        {renderStep(activeStep)}
        <MobileStepper
          variant="dots"
          steps={steps.length}
          position="static"
          activeStep={activeStep}
          sx={{ flexGrow: 1 }}
          nextButton={
            <Button onClick={handleNext} disabled={nextIsDisabled}>
              {activeStep === 2
                ? isMobile
                  ? form.stepper.buttons.next
                  : "Kompetenzzuordnung starten"
                : activeStep == steps.length - 1
                  ? form.stepper.buttons.reset
                  : activeStep === steps.length - 2
                    ? form.stepper.buttons.finish
                    : form.stepper.buttons.next}
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              disabled={activeStep === 0 && !showIsNotSuitableError}
              onClick={handleBack}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              {form.stepper.buttons.back}
            </Button>
          }
        />
      </Stack>
    </Layout>
  );
};
