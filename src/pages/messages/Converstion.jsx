import styles from './styles/Conversation.module.css'
const Conversation = () => {
    return (
        <>
            <div className={styles.ConverSationSection}>
                <div className={styles.ConversationWrapper}>
                    <ConversationsHeads />
                    <MessageBox />
                </div>
            </div>
        </>
    )
}

const ConversationsHeads = () => {
    return (
        <div className={styles.ConverSationsArea}>
            <div className={styles.conversation}>
                <img src="/" alt="" />
            </div>
        </div>
    )
}

const MessageBox = () => {
    return (
        <div className={`${styles.MessageBoxArea} `}>

        </div>
    )
}

export default Conversation