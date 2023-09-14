import styles from './PageLocation.module.css'

export const PageLocation = (props) => {
    return (
        <>
            <section className={`${styles.PageLocationSection}`}>
                <div className={`${styles.PageLocationArea} flex justify-between items-center`}>
                    <div className="text-4xl text-white">
                        {props.head}
                    </div>
                    <div className="text-2xl text-white">
                        <a className='btn' href="#">{props.tail}</a>
                    </div>
                </div>
            </section>
        </>
    )
}