"use client";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { CssBaseline, Switch } from "@mui/material"; 
import { green, red, blue } from "@mui/material/colors";
import TodoList from "@/components/TodoList";
import "./cssFile.css";
import { v4 as uuidv4 } from "uuid";
import { TodosContext } from "./context/todosContext";
import { useState } from "react";
export default function Home() {
  const [mode, setMode] = useState("light");

  const getDesignTokens = (mode) => ({
    palette: {
      mode,
      primary: {
        main: mode === "dark" ? "#00897b" : "#4caf50",
      },
      secondary: {
        main: mode === "dark" ? "#0d47a1" : "#1e88e5",
      },
      danger: {
        main: red[500],
      },
      background: {
        default: mode === "dark" ? "#121212" : "#f5f5f5",
        paper: mode === "dark" ? "#1e1e1e" : "#fff",
      },
    },
    typography: {
      fontFamily: ["Alexander"],
    },
  });

  const theme = createTheme(getDesignTokens(mode));

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MyPage toggleTheme={toggleTheme} mode={mode} />
    </ThemeProvider>
  );
}
const initialTodos = [
  {
    id: uuidv4(),
    title: "غسل الصحون",
    Details: "غسل الصحون بعد العشا",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "الذهاب للسوبرماركت",
    Details: "اشتري خبز، حليب، وبيض",
    isCompleted: false,
  },
];
function MyPage({ toggleTheme, mode }) {
  const [todos, setTodos] = useState(initialTodos);

  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: mode === "dark" ? "#191b1f" : "#f5f5f5",
        height: "100vh",
        direction: "rtl",
        flexDirection: "column",
      }}
    >
      <Switch
        onChange={toggleTheme}
        checked={mode === "dark"}
        color="primary"
      />
      <TodosContext.Provider value={{ todos, setTodos }}>
        <TodoList />
      </TodosContext.Provider>
    </div>
  );
}
