# 1 npm create vite@latest .

# 2 npm install

# 3 npm install tailwindcss @tailwindcss/vite

# 4 Open vite.config.js file and paste

```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

# 5 Open index.css file and paste

```
@import "tailwindcss";
```

# 6 Open app.jsx and paste

```
import React from "react";

function App() {
  return (
    <div className="bg-black text-white h-screen flex flex-col items-center justify-center gap-2">
      <h1 className="text-2xl font-bold">Vite + React + Tailwind</h1>
      <span className="text-gray-400">Tailwind CSS is configured and working!</span>
    </div>
  );
}

export default App;
```

# 7 Run your project

```
npm run dev

```
