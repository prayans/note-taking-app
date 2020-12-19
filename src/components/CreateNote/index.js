import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import LocalStorage from "../../Utils/localStorage";
import { useStateValue } from "../../statemanagement";
import { useStyles } from "./styles";
import moment from 'moment'

function CreateNote() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    id: 0,
    message: "",
    title: ""
  });
  const [, dispatch] = useStateValue();

  /**
   * handle change inputs
   **/
  function handleChange(name, event) {
    setState({
      ...state,
      [name]: event.target.value,
      id: new Date().getTime(),
      updated_at: new Date(),
      date: moment().format("YYYY/MM/DD"),
      time: new Date().toLocaleTimeString('en-US', { hour12: false }),
    });
  }

  /**
   * Add notes inside of localStorage and context api
   **/
  function addToNotes() {
    //note book is not set, so set the Note in "Note" object
      const allNodes = LocalStorage.getNotes();
      let allNodesObject = allNodes !== null ? JSON.parse(allNodes) : [];
      const rowExists = LocalStorage.rowExists(state);
      if (rowExists.length === 0) {
        if (allNodesObject.length === 0) {
          allNodesObject = [state];
        } else {
          allNodesObject.push(state);
        }
        LocalStorage.setNotes(JSON.stringify(allNodesObject));
        dispatch({
          type: "newNote",
          notes: allNodesObject
        });
      }
  }

  /**
   * On component Did mount , send data from localStorage into context api
   **/
  React.useEffect(() => {
    let All;
    let Notes = LocalStorage.getNotebooks("notes");

    Notes = Notes !== null ? JSON.parse(Notes) : [];
    All = [ ...Notes];
    if (All.length > 0) {
      dispatch({ type: "newNote", notes: All });
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      <Typography
        variant="h5"
        align="center"
        color="primary"
        gutterBottom
        noWrap
      >
        Add a new Note
      </Typography>

      <TextField
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
        Add Note
      </Button>
    </React.Fragment>
  );
}

export default CreateNote;
