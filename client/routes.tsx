import { Navigate, Route, createRoutesFromElements } from 'react-router-dom'

import App from './components/App.tsx'
import Albums from './components/AlbumList.tsx'

export const routes = createRoutesFromElements(
  <Route element={<App />}>
    <Route index element={<Navigate to="albums" />} />
    <Route path="albums" element={<Albums />} />
  </Route>
)
