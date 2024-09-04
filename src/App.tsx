import "./App.css";
import { ThemeProvider } from "./components/themeProvider";
import { AppRoutes } from "./routes/Router";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
