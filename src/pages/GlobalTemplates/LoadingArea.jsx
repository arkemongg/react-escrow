import styles from './LoadingArea.module.css'

const LoadingArea = (props) => {
    return (
        <>
            <section className={`${styles.LoaidngAreaSection} ${props.hidden ? styles.Hidden:"hidden"}`}>
                <span className="loading loading-dots loading-xs"></span>
                <span className="loading loading-dots loading-sm"></span>
                <span className="loading loading-dots loading-md"></span>
                <span className="loading loading-dots loading-lg"></span>
            </section>
        </>
    )
}

export default LoadingArea