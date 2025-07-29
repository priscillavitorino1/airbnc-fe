import { useParams } from "react-router"
import { useEffect, useState } from "react"
import axios from "axios"
import './properties/Properties.css'
import Reviews from "./Reviews"


export default function PropertyDetails (){
    const {id} = useParams()
    const [propertyDetails, setPropertyDetails] = useState([])

    useEffect(()=>{
        axios
            .get(`https://airbnc-q89r.onrender.com/api/properties/${id}`)
            .then(({data})=>{
                setPropertyDetails(data.property)
                })
            
},[id])
    return (
        <>
            <section className="property-id">
                <img src={propertyDetails.host_avatar} alt={propertyDetails.property_name} className="card-img" />
                <h3 className="card-title">{propertyDetails.property_name}</h3>
                <p className="card-location">{propertyDetails.location}</p>
                <p className="card-desc">{propertyDetails.description}</p>
                <p className="card-cost">{propertyDetails.price_per_night}</p>
                <p className="card-host">{propertyDetails.host}</p>
            </section>
        <Reviews id={propertyDetails.property_id}/>
        </>)
}