import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import TurboConsole from "vite-plugin-turbo-console";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), TurboConsole()],
})
