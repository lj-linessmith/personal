import Albums from './AlbumList.tsx'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient } from '@tanstack/react-query'

function App() {
  return (
    <div>
      {/* <InputForm /> */}
      <Albums />
    </div>
  )
}

export default App
