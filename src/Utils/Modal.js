import React from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useStateValue } from "../statemanagement";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import LocalStorage from "../Utils/localStorage";
import DialogContent from "@material-ui/core/DialogContent";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  button: {
    margin: theme.spacing(1)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  },
  formControl: {
    margin: theme.spacing(1),
    width: "100%"
  }
}));

export default function ModalBase() {
  const [{ modal, edit }, dispatch] = useStateValue();
  const classes = useStyles();
  const [state, setState] = React.useState({
    message: "",
    title: ""
  });

  const handleClose = () => {
    dispatch({ type: "openModal", modal: false });
  };

  function addToNotes() {
    if (LocalStorage.updateId(edit, state)) {
      dispatch({
        type: "newNote",
        notes: []
      });
      const allNodes = JSON.parse(
        LocalStorage.getNotebooks(
          "notes"
        )
      );

      dispatch({
        type: "newNote",
        notes: allNodes
      });
      handleClose();
    }
  }

  function handleChange(name, event) {
    setState({
      ...state,
      [name]: event.target.value
    });
  }

  React.useEffect(() => {
    if (edit !== null) {
      const rowExists = LocalStorage.findId(edit);
      if (rowExists.length > 0) {
        setState(rowExists[0]);
      }
    }
  }, [edit]);

  React.useEffect(() => {
    return () => {
      setState({ message: "", title: "" });
    };
  }, []);

  return (
    <React.Fragment>
      <Dialog
        open={modal}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Note</DialogTitle>
        <DialogContent>
          <TextField
            value={state !== undefined && state.title}
            id="outlined-textarea"
            label="Title"
            placeholder="Write your title"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            fullWidth
            onChange={e => handleChange("title", e)}
          />
          <TextField
            value={state !== undefined && state.message}
            id="outlined-textarea"
            label="Write your Message"
            placeholder="Write your note"
            multiline
            className={classes.textField}
            margin="normal"
            variant="outlined"
            onChange={e => handleChange("message", e)}
            rows={10}
            fullWidth
          />
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={addToNotes}
          >
            Edit Note
          </Button>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
