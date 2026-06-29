import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

type Props = {
  PublisherInfoOpen: boolean;
  setPublisherInfoOpen: (open: boolean) => void;
};

export const PublisherInfoDialog = ({
  PublisherInfoOpen,
  setPublisherInfoOpen,
}: Props) => {
  return (
    <Dialog
      open={PublisherInfoOpen}
      onClose={() => setPublisherInfoOpen(false)}
    >
      <DialogTitle>
        <strong>Publisher</strong>
      </DialogTitle>
      <DialogContent>
        {" "}
        <>
          Die Organisation oder Person, die den Kurs veröffentlicht hat.
          <br />
          <br />
          Beispiel: Schöner Lernen AG oder Lisa Mustermann.
        </>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setPublisherInfoOpen(false)}>Schließen</Button>
      </DialogActions>
    </Dialog>
  );
};
