"use client";
import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Todo from "./Todo";
import { useState, useEffect, useMemo } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useToast } from "@/app/context/toastContext";
import { useTodos, useTodosDispatch } from "@/app/context/todosContext";

export default function TodoList() {
  const todos = useTodos();
  const dispatch = useTodosDispatch();
  const [titleInput, setTitleInput] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("all");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [dialogTodo, setDialogTodo] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDetails, setEditDetails] = useState("");
  const { showHideToast } = useToast();

  function handleAddClick() {
    dispatch({
      type: "added",
      payload: { title: titleInput },
    });
    setTitleInput("");
    showHideToast(`${titleInput} added successfully`);
  }

  function handleEditConfirm() {
    dispatch({
      type: "edited",
      payload: {
        dialogTodo: dialogTodo,
        editTitle: editTitle,
        editDetails: editDetails,
      },
    });
    setShowEditDialog(false);
    showHideToast(`${dialogTodo.title} edited successfully`);
  }
  function handleEditClick(todo) {
    setDialogTodo(todo);
    setEditTitle(todo.title);
    setEditDetails(todo.details);
    setShowEditDialog(true);
  }

  function handleDeleteConfirm() {
    dispatch({
      type: "deleted",
      payload: {
        dialogTodo: dialogTodo,
      },
    });
    setShowDeleteDialog(false);
    showHideToast(`${dialogTodo.title} deleted successfully`);
  }

  function handleDeleteClick(todo) {
    setDialogTodo(todo);
    setShowDeleteDialog(true);
  }

  const completedTodos = useMemo(() => {
    return todos.filter((e) => {
      return e.isCompleted;
    });
  }, [todos]);

  const notCompletedTodos = useMemo(() => {
    return todos.filter((e) => {
      return !e.isCompleted;
    });
  }, [todos]);

  let todosToBeRendered = todos;
  if (displayedTodosType == "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType == "non-completed") {
    todosToBeRendered = notCompletedTodos;
  }

  const todosJsx = todosToBeRendered.map((e) => {
    return (
      <Todo
        key={e.id}
        todo={e}
        showDelete={handleDeleteClick}
        showEdit={handleEditClick}
      />
    );
  });

  useEffect(() => {
    dispatch({
      type: "get",
    });
  }, []);

  return (
    <>
      <Dialog
        open={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        aria-labelledby="edit-dialog-title"
        aria-describedby="edit-dialog-description"
        dir="rtl"
      >
        <DialogTitle id="edit-dialog-title">تعديل النشاط</DialogTitle>
        <DialogContent>
          <DialogContentText id="edit-dialog-description">
            غيّر عنوان أو تفاصيل النشاط ثم اضغط على حفظ.
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="العنوان"
            type="text"
            fullWidth
            variant="outlined"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />

          <TextField
            margin="dense"
            id="details"
            label="التفاصيل"
            type="text"
            fullWidth
            variant="outlined"
            value={editDetails}
            onChange={(e) => setEditDetails(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setShowEditDialog(false)}>إلغاء</Button>
          <Button onClick={handleEditConfirm} autoFocus>
            حفظ
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        onClose={() => setShowDeleteDialog(false)}
        open={showDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        dir="rtl"
      >
        <DialogTitle id="alert-dialog-title">
          {"هل أنت متأكد أنك تريد حذف هذا النشاط؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك استرجاع النشاط بعد حذفه.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>لا</Button>
          <Button autoFocus onClick={handleDeleteConfirm}>
            نعم
          </Button>
        </DialogActions>
      </Dialog>
      <Container maxWidth="sm">
        <Card
          sx={{ minWidth: 275 }}
          style={{
            maxHeight: "80vh",
            overflow: "scroll",
            padding: "10px",
          }}
          variant="outlined"
          dir="rtl"
        >
          <CardContent>
            <Typography variant="h2">قائمة المهام</Typography>
          </CardContent>
          <Divider />
          <ToggleButtonGroup
            value={displayedTodosType}
            onChange={(e) => {
              setDisplayedTodosType(e.target.value);
            }}
            style={{ direction: "ltr", marginTop: "30px" }}
            exclusive
            aria-label="تصفية المهام"
          >
            <ToggleButton value="non-completed">لم تُنجز بعد</ToggleButton>
            <ToggleButton value="completed">تم إنجازها</ToggleButton>
            <ToggleButton value="all">الكل</ToggleButton>
          </ToggleButtonGroup>
          {todosJsx}
          <Grid style={{ marginTop: "20px" }} container spacing={2}>
            <Grid
              size={8}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <TextField
                value={titleInput}
                onChange={(e) => {
                  setTitleInput(e.target.value);
                }}
                style={{ width: "100%" }}
                id="outlined-basic"
                label="Title"
                variant="outlined"
              />
            </Grid>
            <Grid
              size={4}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Button
                onClick={() => {
                  handleAddClick();
                }}
                style={{ width: "100%", height: "100%" }}
                variant="contained"
                disabled={titleInput.length <= 0}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
}
