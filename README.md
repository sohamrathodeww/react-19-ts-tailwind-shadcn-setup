Use Vite (current industry standard for React projects).
npm create vite@latest dev-manager-web -- --template react-ts

Go into project:
cd dev-manager-web

Install dependencies:
npm install

Run project:
npm run dev

You should see:
http://localhost:5173


Install Tailwind CSS (Tailwind v4)
npm install tailwindcss @tailwindcss/vite

Update vite.config.ts
---------------------------
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
});


Configure Tailwind Replace contents of src/index.css
@import "tailwindcss";

Test Tailwind Replace App.tsx
------------------------------
function App() {
  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-4xl font-bold">
        Developer Tool Platform
      </h1>
    </div>
  );
}

export default App;

Run:
npm run dev

Update tsconfig.app.json
-----------------------------
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}

Update vite.config.ts
------------------------
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

Install Node path types if needed
------------------------------
npm install -D @types/node

Update tsconfig.app.json
------------------------
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}

Update vite.config.ts
------------------------
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});


Also Check tsconfig.json
--------------------------
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}


Install shadcn/ui
--------------------
npx shadcn@latest init

provide two options
------------------
Radix  (Choose Radix).
Base

Which preset would you like to use?
----------------------------------------
Nova - Lucide / Geist  (Choose Nova)
Vega 
Maia 
Lyra 
Mira 
Luma 
Sera 
Rhea 
Custom

