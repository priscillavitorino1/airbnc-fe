import './App.css'
import Properties from './components/Properties'
import PropertyDetails from './components/PropertyDetails'
import {Routes, Route} from "react-router"
import {Link} from "react-router-dom"



function App() {
  return (
    <>
      <header>
        <Link to="/">
          <img src="src/assets/logo-page.png" alt="logo header"/>
        </Link>
        <h1 id="title-header">airbNC</h1>
        <p>Hello, username!</p>
      </header>

      <Routes>
          <Route path="/" element={<Properties/>}></Route>
          <Route path="/properties/:id" element={<PropertyDetails/>}></Route>
      </Routes>
      
      
    </>
  )
}

export default App
