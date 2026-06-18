import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import LayoutRedirect from "./components/layouts/LayoutRedirect";

function App() {

  return <BrowserRouter>
    <Routes>
      <Route index element={<LayoutRedirect />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
}

export default App
