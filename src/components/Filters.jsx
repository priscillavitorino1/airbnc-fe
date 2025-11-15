import {useState} from "react"
import { ButtonGroup, Button } from '@mui/material'
import './rangeSlider.css'
import Modal from "./Modal"
import Amenities from "./Amenities"

export default function Filters ({setSearchParams, setSortOrder}){
   const [showSort, setshowSort] = useState(false)
   const [minPriceChange, setMinPriceChange] = useState(0)
   const [maxPriceChange, setMaxPriceChange] = useState(500)
   const [selectedAmenities, setSelectedAmenities] = useState([])
   const [openModal, setOpenModal] = useState(false)
   //const [clear, setClear] = useState('')

    const applyFilter = () => {
        const newParams = new URLSearchParams()
        newParams.set('minPrice', minPriceChange)
        newParams.set('maxPrice', maxPriceChange)
        newParams.set('amenity', selectedAmenities)
        setSearchParams(newParams)
    }

    const handleAmenitiesChange = (amenities) => {
        setSelectedAmenities(amenities)
    }

     const clearFilter = () => {
        setMinPriceChange(0)
        setMaxPriceChange(500)
        const newParams = new URLSearchParams()
        newParams.delete('minPrice')
        newParams.delete('maxPrice')
        setSearchParams(newParams)
    }


    const toggleSort = () => {
        setshowSort((currentShowSort) => {return !currentShowSort})
        //setShowFilter(false)
    }

  
    return (
        <>
            <div className="button">
                <ButtonGroup variant="text" color="black" aria-label="Basic button group">
                    <Button onClick={toggleSort}>Sort</Button>
                    <Button onClick={()=> setOpenModal(true)}>Filter</Button>
                </ButtonGroup>
            </div>
                {showSort ? 
                (
                <div className="button">
                    <ButtonGroup variant="text" color="black" aria-label="Basic button group">
                        <Button>Popularity</Button>
                        <Button onClick={()=>setSortOrder('asc')}>Ascending</Button>
                        <Button onClick={()=>setSortOrder('desc')}>Descending</Button>
                    </ButtonGroup>
                </div>
                ) : null}

            <Modal isOpen={openModal} setModalOpen={setOpenModal} title="Filter" onClearFilters={clearFilter} onApplyFilters={applyFilter}>
                <section className="filter">
                    <p className="filter-price-range">Price range</p>
                    <div className="sliders">
                        <input id="fromSlider" type="range" value={minPriceChange}  min="0" max="500" onChange={(e)=>setMinPriceChange(e.target.value)}/>
                        <input id="toSlider" type="range" value={maxPriceChange} min="0" max="500" onChange={(e)=>setMaxPriceChange(e.target.value)}/>
                    </div>
                    <div className="control">
                        <div className="control-item">
                            <label htmlFor="fromInput" className="control-container">Min</label>
                            <input className="control-container-input" value={minPriceChange} type="number" id="fromInput" min="0" max="500" onChange={(e)=>setMinPriceChange(e.target.value)}/>
                            
                        </div>
                        <div className="control-item">
                            <label htmlFor="toInput" className="control-container">Max</label>
                            <input className="control-container-input" value={maxPriceChange} type="number" id="toInput" min="0" max="500" onChange={(e)=>setMaxPriceChange(e.target.value)}/>
                        </div>
                    </div>
                            
                    
                    <p className="filter-amenities">Amenities</p>
                    <Amenities onSelectAmenities={handleAmenitiesChange}/>
                    
                </section>
            </Modal>
        </>
    )
}