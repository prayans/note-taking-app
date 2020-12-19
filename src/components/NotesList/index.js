import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Note from "./Note";
import { useStateValue } from "../../statemanagement";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useListStyles as useStyles } from "./styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import moment from 'moment'

function NotesList() {
  const classes = useStyles();
  const [{ notes }, dispatch] = useStateValue();
  const [mainData, setMainData] = useState([]);
  const [state, setState] = useState("");

  /**
   * Find the object with complexicity O(n2)
   **/
  function searchFor(keyword, key, array) {
    const toSearch = keyword.toLowerCase();
    return array.filter(data => {
      return data[key]!==undefined && data[key].toLowerCase().includes(toSearch)
    });
  }

  /**
   * Handle Search in titles
   **/
  function search(event) {
    const value = event.target.value;
    setState(value);
    const searched = searchFor(value, "title", notes);
    if (searched.length > 0) {
      setMainData(searched);
    }
    if (value.length === 0) {
      setMainData(notes);
    }
  }

  /**
   * Handle sorting of notes from newest to oldest
   */
  function sortNewest(){
    if(mainData.length > 0){
      const data = [].concat(notes)
      .sort(function(a, b) {
        var keyA = new Date(a.updated_at),
          keyB = new Date(b.updated_at);
        if (keyA > keyB) return -1;
        if (keyA < keyB) return 1;
        return 0;
      });
        if(data.length > 0) setMainData(data);
        else setMainData([]);
    }
  }
  function sortOldest(){
    if(mainData.length > 0){
      const data = [].concat(notes)
      .sort(function(a, b) {
        var keyA = new Date(a.updated_at),
          keyB = new Date(b.updated_at);
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
        if(data.length > 0) setMainData(data);
        else setMainData([]);
    }
  }

  function filterNotes(key,DaysBefore){
    return notes.filter(data => {
      return data[key] >= DaysBefore 
    })
  }

  function sortByWeek(){
    var sevenDaysBefore = moment().subtract(7, 'days');
    sevenDaysBefore = sevenDaysBefore.format("YYYY/MM/DD");
    var data = filterNotes("date",sevenDaysBefore);
    if(data.length > 0) setMainData(data);
    else setMainData([]);
  }

  function sortByMonth(){
    var DaysBefore = moment().subtract(30, 'days');
    DaysBefore = DaysBefore.format("YYYY/MM/DD");
    var data = filterNotes("date",DaysBefore);
    if(data.length > 0) setMainData(data);
    else setMainData([]);
  }

  function sortByYear(){
    var DaysBefore = moment().subtract(365, 'days');
    DaysBefore = DaysBefore.format("YYYY/MM/DD");
    var data = filterNotes("date",DaysBefore);
    if(data.length > 0) setMainData(data);
    else setMainData([]);
  }

  React.useEffect(() => {
    setMainData(notes);
  }, [notes]);

  return (
    <React.Fragment>
      <Typography
        variant="h5"
        align="center"
        color="primary"
        gutterBottom
        noWrap
      >
        Notes
      </Typography>

      <TextField
        value={state}
        id="outlined-textarea"
        label="search"
        placeholder="search title of note"
        className={classes.textField}
        margin="normal"
        variant="outlined"
        fullWidth
        onChange={e => search(e)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />

      <ButtonGroup
        fullWidth
        variant="text"
        color="secondary"
        size="large"
        aria-label="large contained secondary button group"
      >
         <Button
          color={"primary"}
          onClick={() => sortNewest()}
        >
          Newest
        </Button>
        
        <Button
          color={"primary"}
          onClick={() => sortOldest()}
        >
          Oldest
        </Button>

        <Button
          color={"primary"}
          onClick={() => sortByWeek()}
        >
          Week
        </Button>
        <Button
          color={"primary"}
          onClick={() => sortByMonth()}
        >
          Month
        </Button>
        <Button
          color={"primary"}
          onClick={() => sortByYear()}
        >
          Year
        </Button>
      </ButtonGroup>
      <div className={classes.margin}>
        {mainData.length > 0 &&
          mainData.map((item, index) => (
            <Note
              row={index}
              item={item}
              key={item.id}
            />
          ))}
      </div>
    </React.Fragment>
  );
}

export default NotesList;
