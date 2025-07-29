
import closeIcon from '../assets/circle-xmark.png'

export default function Modal({isOpen, children, setModalOpen}) {


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
                <button onClick={()=> {setModalOpen(false)}} className='close-button'>
                    <img src={closeIcon} alt="close" className='close-img'/>
                </button>
                <div className='children-modal'>
                    {children}
                </div>
            </section> 
        </div>)
    }
    return null
}
