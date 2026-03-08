import { BrowserRouter, Route, Routes } from "react-router-dom"
import { GlobalProvider } from "./context/GlobalContext"

import DefaultLayout from "./layouts/DefaultLayout"
import GamesList from "./pages/GamesList"
import GamesDetails from "./pages/GamesDetails"
import Favourites from "./pages/Favourites"
import GamesCompare from "./pages/GamesCompare"

function App() {


  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />} >
              <Route path="/" element={<GamesList />} />
              <Route path="/games/:id" element={<GamesDetails />} />
              <Route path="/favourite" element={<Favourites />} />
              <Route path="/compare" element={<GamesCompare />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider >
    </>
  )
}

export default App
