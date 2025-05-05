// Import polyfills first to ensure global variables are set before any other imports
import "./lib/polyfills";

import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "./contexts/auth-context";
import { LanguageProvider } from "./contexts/language-context";
import { Web3ContextProvider } from "./contexts/web3-context";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider attribute="class" defaultTheme="light">
    <LanguageProvider>
      <AuthProvider>
        <Web3ContextProvider>
          <App />
        </Web3ContextProvider>
      </AuthProvider>
    </LanguageProvider>
  </ThemeProvider>
);
