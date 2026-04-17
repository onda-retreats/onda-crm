import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { ConversationsProvider } from "@/store/conversations"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <ConversationsProvider>
        <App />
      </ConversationsProvider>
    </ThemeProvider>
  </StrictMode>
)