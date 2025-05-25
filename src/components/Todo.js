import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useToast } from "@/app/context/toastContext";
import { useTodosDispatch } from "@/app/context/todosContext";

export default function Todo({ todo, showDelete, showEdit }) {
  const dispatch = useTodosDispatch();
  const { showHideToast } = useToast();

  function handleCheckClick() {
    dispatch({
      type: "toggledCompleted",
      payload: {
        todos: todo,
      },
    });
    showHideToast(`${todo.title} checked successfully`);
  }

  function handleEditClick() {
    showEdit(todo);
  }

  function handleDeleteClick() {
    showDelete(todo);
  }

  return (
    <>
      <Card
        className="todoCard"
        variant="outlined"
        sx={{
          backgroundColor: todo.isCompleted ? "danger.main" : "secondary.main",
          color: "white",
          marginTop: 5,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography sx={{ textAlign: "right" }} variant="h5">
                {todo.title}
              </Typography>
              <Typography sx={{ textAlign: "right" }} variant="h6">
                {todo.details}
              </Typography>
            </Grid>
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <IconButton
                onClick={() => {
                  handleCheckClick();
                }}
                className="iconButton"
                variant="contained"
                color="primary"
                aria-label="add an alarm"
                style={{
                  border: "solid primary 3px",
                  background: todo.isCompleted ? " #8bc34a " : "white",
                }}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                onClick={handleEditClick}
                className="iconButton"
                variant="contained"
                color="secondary"
                aria-label="add an alarm"
                style={{ border: "solid secondary 3px", background: "white" }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={handleDeleteClick}
                className="iconButton"
                variant="contained"
                color="danger"
                aria-label="add an alarm"
                style={{ border: "solid danger 3px", background: "white" }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
