# todo-v2-cleaned
# ToDo List Application

This is a sophisticated ToDo List application developed with React, utilizing modern React Hooks and best practices for state management and performance optimization.

## Key Features and Technologies

- **useState**: Manages component-level state for local updates.
- **useEffect**: Handles side effects such as synchronizing the application state with the browser’s Local Storage to persist data across sessions.
- **useContext + useReducer**: Implements a scalable and maintainable global state management solution. `useReducer` provides a predictable state transition logic while `useContext` enables easy access to the state throughout the component tree without prop drilling.
- **Local Storage**: Ensures persistence of tasks, allowing users to retain their to-do items even after page reloads or browser restarts.
- **useMemo**: Optimizes performance by memoizing expensive computations and preventing unnecessary re-renders.

## Functionality Overview

- Create, update, and delete tasks seamlessly.
- Real-time synchronization of tasks with Local Storage.
- Centralized state management providing clean separation of concerns and enhanced maintainability.

## Installation and Usage

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npm start` to launch the application locally.

---

This project serves as a comprehensive example of advanced React Hook usage, combining both local and global state management techniques for an efficient and user-friendly ToDo List experience.
