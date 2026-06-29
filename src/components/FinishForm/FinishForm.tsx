import { InfoOutlined } from "@mui/icons-material";
import { Button, SelectChangeEvent, Stack, Typography } from "@mui/material";

import { form } from "../../constants/strings";
import { FormState } from "../../types/types";
import { ingressPath } from "../../constants/api";

type Props = {
  handleSelectChange: (event: SelectChangeEvent<string>) => void;
  handleDownload: () => void;
  formState: FormState;
};

export const FinishForm = ({ handleDownload }: Props) => {
  const downloadGretaLabel = async () => {
    const svg = await fetch( ingressPath + "/in_line_with_greta.svg").then((response) =>
      response.text()
    );

    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "in_line_with_greta.svg";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Stack spacing={3} mt={4} alignItems={"flex-start"}>
        <Typography alignSelf={"flex-start"} variant="h1" textAlign="center">
          {form.finish.info}
        </Typography>
        <Typography alignSelf={"flex-start"} variant="body1" textAlign="left">
          {form.finish.helpertext}
        </Typography>
        <Typography
          alignSelf={"flex-start"}
          variant="body1"
          textAlign="left"
          display="flex"
          alignItems="center"
        >
          <InfoOutlined sx={{ marginRight: 0.5 }} />{" "}
          {form.finish.buttonHelperText}
        </Typography>
      </Stack>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1}
        justifyContent="center"
        alignItems="center"
      >
        <Button
          sx={{ mt: { xs: 2, sm: 4 }, width: { xs: "100%", sm: "auto" } }}
          variant="contained"
          onClick={handleDownload}
        >
          {form.finish.buttons.download}
        </Button>
        {/* <Tooltip title="In Entwicklung">
            <span style={{ width: isMobile ? "100%" : "auto" }}>
            <Button
              sx={{ width: { xs: "100%", sm: "auto" } }}
              variant="contained"
              disabled
            >
              {form.finish.buttons.assessment}
            </Button>
          </span>
        </Tooltip>
        <Tooltip title="In Entwicklung">
          <span style={{ width: isMobile ? "100%" : "auto" }}>
            <Button
              sx={{ width: { xs: "100%", sm: "auto" } }}
              variant="contained"
              disabled
            >
              {form.finish.buttons.connect}
            </Button>
          </span>
        </Tooltip> */}
        <Button
          sx={{ mt: { xs: 2, sm: 4 }, width: { xs: "100%", sm: "auto" } }}
          variant="contained"
          onClick={downloadGretaLabel}
        >
          {form.finish.buttons.downloadGretaLabel}
        </Button>
      </Stack>
    </>
  );
};
