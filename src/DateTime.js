import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import EventNoteIcon from "@mui/icons-material/EventNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";

export default function BasicDateTimePicker() {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [taskEvent, setTaskEvent] = useState("");
  const [events, setEvents] = useState([]);
  const [alert, setAlert] = useState();

  useEffect(() => {
    let events = localStorage.getItem("Event");
    console.log(JSON.parse(events));
    if (events) {
      setEvents(JSON.parse(localStorage.getItem("Event")));
    }
    // setEvents();
  }, []);

  const addEvent = async () => {
    // console.log(startTime, endTime);
    setAlert("");
    if (taskEvent && endTime > startTime) {
      await setEvents((prevEvent) => [
        ...prevEvent,
        {
          id: prevEvent.length + 1,
          eventName: taskEvent,
          startTime: startTime,
          endTime: endTime,
        },
      ]);

      localStorage.setItem("Event", JSON.stringify(events));
    } else {
      if (!taskEvent) {
        setAlert(<Alert severity="error">Event cannot be empty</Alert>);
      } else {
        setAlert(
          <Alert severity="error">
            End Time Cannot be less than Start time
          </Alert>
        );
      }
      setTimeout(() => {
        setAlert("");
      }, 6000);
    }
  };

  const deleteTask = (id) => {
    setEvents((prevEvent) => prevEvent.filter((event) => event.id !== id));
  };

  return (
    <Container style={{ marginTop: 30 }}>
      <Box
        sx={{
          "& > :not(style)": { m: 1, width: "55ch" },
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="DateTimePicker"
            value={startTime}
            onChange={(newValue) => {
              setStartTime(newValue);
              //   console.log(newValue);
            }}
          />
        </LocalizationProvider>
      </Box>
      <Box
        sx={{
          "& > :not(style)": { m: 1, width: "55ch" },
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="DateTimePicker"
            value={endTime}
            onChange={(newValue) => {
              setEndTime(newValue);
              //   console.log(newValue);
            }}
          />
        </LocalizationProvider>
      </Box>
      <Box
        sx={{
          "& > :not(style)": { m: 1, width: "55ch" },
        }}
      >
        <TextField
          id="outlined-basic"
          label="Add an Event"
          variant="outlined"
          value={taskEvent}
          onChange={(newValue) => {
            setTaskEvent(newValue.target.value);
            //   console.log(newValue);
          }}
        />
        <Box
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
        >
          {alert}
        </Box>
      </Box>
      <Box
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
      >
        <Button variant="contained" onClick={addEvent}>
          Add Event
        </Button>
      </Box>
      <Box
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
      >
        {events
          .filter(
            (event) => event.startTime >= startTime && event.endTime <= endTime
          )
          .map((event) => (
            <Box
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              key={event.id}
            >
              <nav aria-label="main mailbox folders">
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <EventNoteIcon />
                      </ListItemIcon>
                      <ListItemText primary={event.eventName} />

                      <ListItemIcon>
                        <DeleteIcon onClick={() => deleteTask(event.id)} />
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                </List>
              </nav>
            </Box>
          ))}
      </Box>
    </Container>
  );
}
