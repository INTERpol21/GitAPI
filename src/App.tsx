
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './Page/Main'
import Card from './Page/Card'



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:id" element={<Card />} />
      </Routes>
    </BrowserRouter>
  )
}
