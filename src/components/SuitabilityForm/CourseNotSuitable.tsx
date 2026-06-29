import { Button, Link, Stack, Typography } from "@mui/material";

import { GRETA_COMPETENCE_MODEL_URL } from "../../constants/urls";

export const CourseNotSuitable = () => {
  return (
    <>
      <Stack
        spacing={2}
        sx={{
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <Typography
          variant="h1"
          sx={{ textAlign: { xs: "center", sm: "left" } }}
        >
          Ihr Angebot passt nicht ganz zu den TrainSpot-Kriterien
        </Typography>
        <Typography
          variant="body1"
          sx={{ textAlign: { xs: "center", sm: "left" } }}
        >
          Ihr Kurs erfüllt derzeit <b>nicht alle Kriterien</b> für eine
          Veröffentlichung auf dem TrainSpot.
        </Typography>
        <Typography
          variant="body1"
          sx={{ textAlign: { xs: "center", sm: "left" } }}
        >
          TrainSpot richtet sich an <b>Lehrende und Trainer:innen</b>, deren
          Angebote <b>pädagogische Kompetenzen stärken</b> und{" "}
          <b>professionelles Lehrhandeln fördern.</b>
        </Typography>
        <Typography
          variant="body1"
          sx={{ textAlign: { xs: "center", sm: "left" } }}
        >
          Wenn Sie unsicher sind,{" "}
          <b>welche Merkmale für eine erfolgreiche Anbindung wichtig sind</b>,
          finden Sie auf der Seite zum
          <Link
            href={GRETA_COMPETENCE_MODEL_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            GRETA-Kompetenzmodell{" "}
          </Link>
          wichtige Hinweise.
        </Typography>
        <Typography
          variant="body1"
          sx={{ textAlign: { xs: "center", sm: "left" } }}
        >
          Wir freuen uns, wenn Sie weitere Angebote für eine Anbindung in
          Betracht ziehen.
        </Typography>
      </Stack>
      <Stack mt={2} mb={4} sx={{ alignItems: "center" }}>
        <Button
          sx={{ width: "200px" }}
          variant="contained"
          href={GRETA_COMPETENCE_MODEL_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          ZUM GRETAMODELL
        </Button>
      </Stack>
    </>
  );
};
