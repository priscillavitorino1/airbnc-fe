import {useEffect, useState} from "react"
import { ButtonGroup, Button } from '@mui/material'
import './rangeSlider.css'
import Modal from "./Modal"
import axios from 'axios'

export default function Filters ({setSearchParams, setSortOrder}){
   const [showSort, setshowSort] = useState(false)
   const [minPriceChange, setMinPriceChange] = useState(0)
   const [maxPriceChange, setMaxPriceChange] = useState(500)
   const [openModal, setOpenModal] = useState(false)
   const [amenities, setAmenities] = useState([])

    const applyFilter = () => {
        const newParams = new URLSearchParams()
        newParams.set('minPrice', minPriceChange)
        newParams.set('maxPrice', maxPriceChange)
        setSearchParams(newParams)
    }

    const toggleSort = () => {
        setshowSort((currentShowSort) => {return !currentShowSort})
        setShowFilter(false)
    }

    useEffect(()=>{
        axios
            .get('https://airbnc-q89r.onrender.com/api/amenities')
            .then(({data})=>{
                setAmenities(data.amenities)
            })
    },[])

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

            <Modal isOpen={openModal} setModalOpen={setOpenModal}>
                <section className="filter">
                    <p className="filter-price-range">Price range</p>
                    <div className="sliders">
                        <input id="fromSlider" type="range" value={minPriceChange}  min="0" max="500" onChange={(e)=>setMinPriceChange(e.target.value)}/>
                        <input id="toSlider" type="range" value={maxPriceChange} min="0" max="500" onChange={(e)=>setMaxPriceChange(e.target.value)}/>
                    </div>
                    <div className="control">
                            <label htmlFor="fromInput" className="control-container">Min</label>
                            <input className="control-container-input" value={minPriceChange} type="number" id="fromInput" min="0" max="500" onChange={(e)=>setMinPriceChange(e.target.value)}/>
                            <label htmlFor="toInput" className="control-container">Max</label>
                            <input className="control-container-input" value={maxPriceChange} type="number" id="toInput" min="0" max="500" onChange={(e)=>setMaxPriceChange(e.target.value)}/>
                    </div>
                    
                    <p className="filter-amenities">Amenities</p>
                    <ul className="list-amenities">
                        {amenities.map((amenity_slug)=>{
                            return (<li key={amenity_slug.amenity}>{amenity_slug.amenity}</li>)
                        })}
                    </ul>
                    <Button
                        className="filter-button"
                        variant="contained"
                        color="primary"
                        onClick={applyFilter}
                        >
                        Filter
                    </Button>
                </section>
            </Modal>
        </>
    )
}