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
          <h1 id="title-header">airbNC</h1>
        </Link>
          <div className='generic-search'>
            <input type="search" className='generic-search-text' placeholder="Search"/>

            <button type="button" id="generic-search-button" />
          </div>

      
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
