"use client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Switch } from "@mui/material";
import { red } from "@mui/material/colors";
import TodoList from "@/components/TodoList";
import "./cssFile.css";
import { useState } from "react";
import { ToastProvider } from "./context/toastContext";
import TodosProvider from "./context/todosContext";

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
    <TodosProvider>
      <ToastProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MyPage toggleTheme={toggleTheme} mode={mode} />
        </ThemeProvider>
      </ToastProvider>
    </TodosProvider>
  );
}

function MyPage({ toggleTheme, mode }) {

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
      <TodoList />
    </div>
  );
}
