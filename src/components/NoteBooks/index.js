import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { useStateValue } from "../../statemanagement";
import { useListStyles as useStyles } from "./styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import FolderIcon from "@material-ui/icons/Folder";
import LocalStorage from "../../Utils/localStorage";

function NoteBooks() {
  const classes = useStyles();
  const [activeNote, setActiveNote] = useState("all");
  const [, dispatch] = useStateValue();
  function showNotesOf() {
    let Notes = LocalStorage.getNotebooks("notes");
    setActiveNote("all");
      let All;
      Notes = Notes !== null ? JSON.parse(Notes) : [];
      All = [...Notes];
      if (All.length > 0) {
        dispatch({ type: "newNote", notes: All });
      }
  }

  return (
    <React.Fragment>
      <Typography
        variant="h5"
        align="center"
        color="primary"
        gutterBottom
        noWrap
      >
        Note Books
      </Typography>

      <div className={classes.noteBooksContainer}>
        <div className={classes.demo}>
          <List dense={false}>
            <ListItem
              className={[
                classes.noteBookList,
                activeNote === "all" && classes.active
              ].join(" ")}
              onClick={() => showNotesOf()}
            >
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="All" />
            </ListItem>
          </List>
        </div>
      </div>
    </React.Fragment>
  );
}

export default NoteBooks;
