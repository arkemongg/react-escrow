import styles from './Error.module.css'

export const Error = (props) => {
    return (
        <>
            <div className={styles.Error}>
                <div className="alert alert-error">
                    <span>Error! Failed to fetch. Reason: {props.error?props.error:"404"}.</span>
                </div>
            </div>
        </>
    )
}