
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {

  return (
    <>
    <Header></Header>
      <BrowserRouter basename='kakezan'>
        <Routes>
          <Route index element={<HomePage></HomePage>}></Route>
        </Routes>
      </BrowserRouter>    
      <Footer></Footer>      
    </>
  )
}

export default App
