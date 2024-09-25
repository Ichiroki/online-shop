import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import envCompatible from 'vite-plugin-env-compatible'

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: "REACT_APP_",
  plugins: [
    envCompatible(),
    react()
  ],
})
