import { BrowserRouter, Route, Routes } from "react-router-dom"
import { GlobalProvider } from "./context/GlobalContext"

import DefaultLayout from "./layouts/DefaultLayout"
import GamesList from "./pages/GamesList"

function App() {


  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />} />
            <Route path="/" element={<GamesList />} />
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  )
}

export default App
