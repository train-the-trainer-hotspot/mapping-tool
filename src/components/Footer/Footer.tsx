import { Container, Link, Typography } from "@mui/material";

import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <Container component="footer" className={styles.footer}>
      <div className={styles.footerLinkContainer}>
        <Typography variant="caption" className={styles.footerText}>
          Powered by{" "}
          <Link href="https://www.wisyki.de/" target="_blank" rel="noopener">
            WISY-KI
          </Link>
        </Typography>

        <Typography variant="caption" className={styles.footerText}>
          Trained by{" "}
          <Link href="https://www.die-bonn.de/" target="_blank" rel="noopener">
            DIE
          </Link>
          {" & "}
          <Link
            href="https://www.wbstraining.de/"
            target="_blank"
            rel="noopener"
          >
            WBS
          </Link>
        </Typography>
      </div>
    </Container>
  );
};
