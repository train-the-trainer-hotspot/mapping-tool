import { Button,Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";


type Props = {
    licenseInfoOpen: boolean;   
    setLicenseInfoOpen: (open: boolean) => void;
  };

export const LicenseInfoDialog = ({licenseInfoOpen, setLicenseInfoOpen}: Props) => {
  return (
    <Dialog
    open={licenseInfoOpen}
    onClose={() => setLicenseInfoOpen(false)}
  >
    <DialogTitle><strong>Kurs-Lizenz</strong></DialogTitle>
    <DialogContent>
        {" "}
        <>
          Die Lizenz legt fest, wie Ihr Kursmaterial genutzt werden
          darf. Zum Beispiel:
          <ul>
            <li>
              <strong>Proprietär:</strong> geeignet für kostenpflichtige oder interne
              Angebote – alle Rechte bleiben vorbehalten.
            </li>
            <li>
              <strong>Creative Commons (z. B. CC BY 4.0):</strong> geeignet für offene,
              frei zugängliche Inhalte.
            </li>
            <li>
              <strong>MIT / Apache: </strong>offene Software-Lizenzen (eher technisch).
            </li>
          </ul>
          Wählen Sie die Lizenz, die zur Nutzung Ihrer Materialien
          passt.
        </>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setLicenseInfoOpen(false)}>
        Schließen
      </Button>
    </DialogActions>
  </Dialog>
  );
}