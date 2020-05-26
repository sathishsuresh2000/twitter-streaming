import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import NotificationsIcon from "@material-ui/icons/Notifications";
import socket from "../../common/socket";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
  },
  searchField: {
    width: "100%",
  },
  searchFieldWithButton: {
    width: "80%",
  },
}));

function Search(props) {
  const classes = useStyles();
  const { search, getNewMessages } = props;
  const [searchText, setSearchText] = useState("");
  const { newMessageCount, setNewMessagesCount } = props;

  useEffect(() => {
    socket.on("new_messages", (data) => {
      console.log("new_messages", data);
      setNewMessagesCount(data.result);
    });
  }, []);

  const handleChange = (e) => {
    let searchTerm = e.currentTarget.value;
    setSearchText(searchTerm);
  };

  const keyPressed = (e) => {
    if (e.key === "Enter") {
      search(searchText);
    }
  };

  const handleClick = (e) => {
    getNewMessages(searchText);
  };

  return (
    <div className={classes.root}>
      <TextField
        id="outlined-secondary"
        label="Search"
        variant="outlined"
        color="primary"
        className={
          newMessageCount === 0
            ? classes.searchField
            : classes.searchFieldWithButton
        }
        onChange={handleChange}
        value={searchText}
        onKeyPress={keyPressed}
      />
      {newMessageCount > 0 && (
        <Badge color="secondary" badgeContent={newMessageCount}>
          <Button variant="contained" color="primary" onClick={handleClick}>
            load more
            <NotificationsIcon fontSize="large" />
          </Button>
        </Badge>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  newMessageCount: state.messages.newMessageCount,
});

const mapDispachToProps = (dispatch) => {
  return {
    search: (term) => dispatch({ type: "FETCH_MESSAGES", term }),
    getNewMessages: (term) => dispatch({ type: "FETCH_NEW_MESSAGES", term }),
    setNewMessagesCount: (count) =>
      dispatch({ type: "NEW_MESSAGE_COUNT", count }),
  };
};

export default connect(mapStateToProps, mapDispachToProps)(Search);
