import { Box, Container } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";

import { theme } from "../../theme/index";
import { FormState } from "../../types/types";
import { Footer } from "../Footer/Footer";
import { SummarySidebar } from "../SummarySidebar/SummarySidebar";

type Props = {
  children: React.ReactNode;
  formState: FormState;
  activeStep: number;
  maxStepReached: number;
};

export const Layout = ({ children, formState, activeStep, maxStepReached }: Props) => {
  const isLessThanXl = useMediaQuery(theme.breakpoints.down("xl"));

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
      display: "flex",
      minHeight: "100vh",
      gap: 3,
      p: 2,
      alignItems: "flex-start",
      }}
    >
      <Box
      sx={{
        flex: isLessThanXl ? "none" : 8,
        width: isLessThanXl ? "100%" : "auto",
        p: 0,
      }}
      >
      {children}
      <Footer />
      </Box>

      {!isLessThanXl && (
      <Box
        component={motion.div}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.5,
        }}
        sx={{
        display: { xs: "none", lg: "block" },
        width: "30%",
        flexShrink: 0,
        position: { md: "sticky" },
        top: { md: 60 },
        alignSelf: "flex-start",
        borderTop: "none",
        bgcolor: "background.paper",
        p: 0,
        zIndex: 1,
        }}
      >
        <SummarySidebar formState={formState} activeStep={activeStep} maxStepReached={maxStepReached} />
      </Box>
      )}
    </Container>
  );
};
