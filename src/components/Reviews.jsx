import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Reviews({id}) {
    const [propertyReviews, setPropertyReviews] = useState([])

    useEffect(()=>{
        axios
            .get(`https://airbnc-q89r.onrender.com/api/properties/${id}/reviews`)
            .then(({data})=>{
                setPropertyReviews(data.reviews)
                console.log(data)
            })
    },[id])

    return (
        <>
        </>
        )
}