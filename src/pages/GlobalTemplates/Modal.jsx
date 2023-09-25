import { useState } from 'react'
import styles  from  './Modal.module.css'

const Modal = ()=>{
    const [hidden,setHidden] = useState(false)
    const handleHideBtn = ()=>{
        setHidden(true)
    }
    return(
        <>
            <div class={`${styles.blurryBackgroundSection} ${styles.blurryBackground} ${hidden?'hidden':""}` }>
                <div className={styles.ModalArea}>
                    <button onClick={handleHideBtn} className={styles.closeModal}>
                        <img src="/dashboardassets/delete.png" alt="" />
                    </button>
                </div>
            </div>
        </>
    )
}

export default Modal