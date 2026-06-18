import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import LayoutRedirect from "./components/layouts/LayoutRedirect";

function App() {

  return <BrowserRouter>
    <Routes>
      <Route element={<LayoutRedirect />}>
        <Route index element={<Navigate to={"/playlists"}/>} />
        <Route path="/playlists" element={<div className="h-full flex items-center justify-center">
          <h1 className="text-4xl">Playlists !</h1>
        </div>} />
        <Route path="/musics" element={<div className="h-full flex items-center justify-center">
          <h1 className="text-4xl">Musics !</h1>
        </div>} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
}

export default App
