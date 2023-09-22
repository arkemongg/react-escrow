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
    const data = 6;
    return (
        <>
            <div className={styles.ConverSationsArea}>
                <ConversationComponent />
                <ConversationComponent />
                <ConversationComponent />
                <ConversationComponent />
                <ConversationComponent />
                <div className={`${data<=5?'hidden':''} ConversationPage flex justify-center`}>
                    <div className="btn btn-primary w-[150px] m-2 ">Previous</div>
                    <div className="btn btn-primary w-[150px] m-2 ">Next</div>
                </div>
            </div>
        </>
    )
}

const ConversationComponent = () => {
    return (
        <>
            <div className={`${styles.conversation} p-2 flex items-center justify-between`}>
                <div className={`${styles.ConverSationProfile}`}>
                    <img src="/dashboardassets/d.jpg" alt="chat head" />
                </div>
                <div className={`${styles.ConversationName} p-5 min-w-[190px] grow`}>
                    <div className="name text-xl">
                        Seller Name
                    </div>
                    <div className="name text-sm font-bold">
                        Lorem, ipsum dolor .......
                    </div>
                </div>
                <div className={`${styles.ConversationLastMessage} p-2 flex justify-end`}>
                    <div className="time font-light text-sm ">
                        12/12/45 12:45
                    </div>
                </div>

            </div>
            <hr />
        </>
    )
}

const MessageBox = () => {
    return (
        <div className={`${styles.MessageBoxArea} `}>
            <div className={styles.MessageSenderArea}>
                <div className={`${styles.MessageSender}`}>
                    <input type="text" placeholder="Message" className="h-[100px] input input-bordered w-full rounded-none " />
                </div>
                <div className="btnArea py-2">
                    <button className="btn btn-primary rounded-none min-w-[150px]">
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Conversation