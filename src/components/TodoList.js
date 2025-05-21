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
import { v4 as uuidv4 } from "uuid";
import { useState, useContext, useEffect } from "react";
import { TodosContext } from "@/app/context/todosContext";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const [titleInput, setTitleInput] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  const completedTodos = todos.filter((e) => {
    return e.isCompleted;
  });

  const notCompletedTodos = todos.filter((e) => {
    return !e.isCompleted;
  });

  let todosToBeRendered = todos
  if(displayedTodosType == "completed"){
    todosToBeRendered = completedTodos
  }else if(displayedTodosType == "non-completed"){
    todosToBeRendered = notCompletedTodos
  }

  const todosJsx = todosToBeRendered.map((e) => {
    return <Todo key={e.id} todo={e} />;
  });

  function handleAddClick() {
    if (titleInput == "") {
      alert("Please Enter a Title");
      return;
    }
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitleInput("");
  }

  

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos"));
    if (storageTodos) {
      setTodos(storageTodos);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function changeDisplayedType(e){
    setDisplayedTodosType(e.target.value)
  }

  return (
    <Container maxWidth="sm">
      <Card sx={{minWidth:275}} style={{
          maxHeight:"80vh",
          overflow:"scroll",
         padding: "10px" }} variant="outlined" dir="rtl">
        <CardContent>
          <Typography variant="h2">قائمة المهام</Typography>
        </CardContent>
        <Divider />
        <ToggleButtonGroup
          value={displayedTodosType}
          onChange={changeDisplayedType}
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
              disabled={titleInput.length<=0}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
