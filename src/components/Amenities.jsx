import {useEffect, useState} from "react"
import axios from 'axios'

export default function Amenities ({onSelectAmenities}){
    const [amenities, setAmenities] = useState([])
    const [isShowMore, setIsShowMore] = useState(false)
    const [selectedAmenities, setSelectedAmenities] = useState([])

    useEffect(()=>{
        axios
            .get('https://airbnc-q89r.onrender.com/api/amenities')
            .then(({data})=>{
                setAmenities(data.amenities)
            })
    })

    useEffect(()=>{
        if(onSelectAmenities) onSelectAmenities(selectedAmenities)
    })

    const showAmenities = isShowMore ? amenities : amenities.slice(0,5)

    const handleSelectAmenities = (amenityName) => {
        setSelectedAmenities((previous) => {
            if(previous.includes(amenityName)){
                return previous.filter((a) => a !== amenityName)
            } else {
                return [...previous, amenityName]
            }
        })

    }

    return (
        <>
            <ul className="list-amenities">
                {showAmenities.map((amenity_slug)=>{
                    return (
                        <li key={amenity_slug.amenity}>
                            <input
                                type="checkbox"
                                value={amenity_slug.amenity}
                                id={amenity_slug.amenity}
                                checked={selectedAmenities.includes(amenity_slug.amenity)}
                                onChange={() => handleSelectAmenities(amenity_slug.amenity)}
                            />
                            <label htmlFor={amenity_slug.amenity}>
                                {amenity_slug.amenity}
                            </label>
                        </li>)
                })}
            </ul>
            
            {amenities.length > 5 && (
            <button 
                className="show-more-button"
                onClick={()=>setIsShowMore(!isShowMore)}
            >
                {isShowMore ? "Show less" : "Show more"}
            </button>
            )
            }

        </>
        
    )

}
