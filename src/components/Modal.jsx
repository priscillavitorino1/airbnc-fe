
import { useEffect } from 'react'
import closeIcon from '../assets/circle-xmark.png'

export default function Modal({isOpen, title, children, setModalOpen, onClearFilters, onApplyFilters}) {

    useEffect(() => {
       if(isOpen) {
            document.body.style.overflow = "hidden"
       } else {
            document.body.style.overflow = ""
       }

       return () => {
            document.body.style.overflow = "";
       }
    },[isOpen])

    const handleOverlayClick = () => {
        setModalOpen(false)
    }

    const stopModalClick = (e) => {
        e.stopPropagation()
    }

    if (isOpen){
        return (
        <div className='background-modal' onClick={handleOverlayClick}>
            <section className='modal' onClick={stopModalClick}>
                {/*HEADER*/}
                <header className='modal-header'>
                    <h2 className='modal-title'>{title}</h2>
                    <button onClick={()=> {setModalOpen(false)}} className='close-button'>
                        <img src={closeIcon} alt="close" className='close-img'/>
                    </button>
                </header>

                {/*BODY*/}
                <div className='children-modal'>
                    {children}
                </div>


                 {/*FOOTER*/}
                 <footer className="filter-buttons">
                        <button
                            className="clear-filter-button"
                            onClick={() => {
                                if (onClearFilters) onClearFilters()}}
                            >  
                            Clear all
                        </button>
                        <button
                            className="apply-filter-button"
                            variant="contained"
                            color="primary"
                            onClick={() =>{
                                if(onApplyFilters) onApplyFilters()
                                setModalOpen(false)}}
                            >
                            FILTER
                        </button>
                </footer>

            </section> 
        </div>)
    }
    return null
}
