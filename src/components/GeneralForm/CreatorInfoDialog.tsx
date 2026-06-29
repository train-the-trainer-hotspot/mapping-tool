import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

type Props = {
  CreatorInfoOpen: boolean;
  setCreatorInfoOpen: (open: boolean) => void;
};

export const CreatorInfoDialog = ({
  CreatorInfoOpen,
  setCreatorInfoOpen,
}: Props) => {
  return (
    <Dialog open={CreatorInfoOpen} onClose={() => setCreatorInfoOpen(false)}>
      <DialogTitle>
        <strong>Creator</strong>
      </DialogTitle>
      <DialogContent>
        {" "}
        <>
          Die Organisation oder Person, die die Lernmaterialien erstellt hat.
          Beispiel: Schöner Lernen AG oder Lisa Mustermann. <br />
          <br />
          Hinweis: Creator und Publisher können identisch sein.
        </>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setCreatorInfoOpen(false)}>Schließen</Button>
      </DialogActions>
    </Dialog>
  );
};
