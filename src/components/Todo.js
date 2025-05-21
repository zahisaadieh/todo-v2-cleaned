import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext, useState } from "react";
import { TodosContext } from "@/app/context/todosContext";

export default function Todo({ todo }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDetails, setEditDetails] = useState("");

  const { todos, setTodos } = useContext(TodosContext);

  function handleDeleteConfirm() {
    const updatedTodo = todos.filter((e) => e.id !== todo.id);
    setTodos(updatedTodo);
    localStorage.setItem("todos", JSON.stringify(updatedTodo));
    setShowDeleteDialog(false);
  }

  function handleDeleteClick() {
    setShowDeleteDialog(true);
  }

  function handleCheckClick() {
    const updatedTodo = todos.map((e) => {
      if (e.id === todo.id) {
        return { ...e, isCompleted: !e.isCompleted };
      }
      return e;
    });
    setTodos(updatedTodo);
    localStorage.setItem("todos", JSON.stringify(updatedTodo));
  }

  function handleEditClick() {
    setEditTitle(todo.title);
    setEditDetails(todo.details);
    setShowEditDialog(true);
  }

  function handleEditConfirm() {
    const updatedTodos = todos.map((e) => {
      if (e.id === todo.id) {
        return { ...e, title: editTitle, details: editDetails };
      }
      return e;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setShowEditDialog(false);
  }

  return (
    <>
      {/* Delete Dialog */}
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

      {/* Edit Dialog */}
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

      {/* Todo Card */}
      <Card
        className="todoCard"
        variant="outlined"
        sx={{ backgroundColor: todo.isCompleted ? "danger.main" : "secondary.main", color: "white", marginTop: 5 }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography sx={{ textAlign: "right"}} variant="h5">
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
