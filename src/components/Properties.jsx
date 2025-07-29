import Skeleton from "./Skeleton.jsx"
import {Link, useSearchParams} from "react-router"
import { useEffect, useState } from "react"
import axios from "axios"
import Filters from './Filters.jsx'
import './properties/Properties.css'

export default function Properties (){
    const [properties, setProperties] = useState([])
    const [sortOrder, setSortOrder] = useState('')
    const [searchParams, setSearchParams] = useSearchParams('')
    const maxPrice = searchParams.get('maxPrice') || '500'
    const minPrice = searchParams.get('minPrice') || '0'
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
        setIsLoading(true)
        axios
            .get('https://airbnc-q89r.onrender.com/api/properties',{params: {minPrice, maxPrice, order: sortOrder}})
            .then(({data})=>{
                setProperties(data.properties)
                setIsLoading(false)
              })
        },[maxPrice, minPrice, sortOrder])

    return(
       <>
       <Filters searchParams={searchParams} setSearchParams={setSearchParams} setSortOrder={setSortOrder}/>
            
        {isLoading ? (<Skeleton/>) : 
        (
            <ul className="list-properties">
            {properties.map((property)=>{
                return (   
                        <li key={property.property_id} className="property">
                            <Link to={`/properties/${property.property_id}`}>
                                <img src={property.image} alt={property.property_name} className="properties-img"/>
                                <h4 className="property-name">{property.property_name}</h4>
                                <p className="property-location">{property.location}</p>
                                <p className="property-cost">£{property.price_per_night}/night</p>
                            </Link>
                            
                        </li>
                )
                })}
            </ul>
        )}    
           
       </>
        
    )
}