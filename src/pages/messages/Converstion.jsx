import { useRef, useState } from 'react';
import styles from './styles/Conversation.module.css'
import { useEffect } from 'react';
import { getJWT } from '../AxiosHeaders';
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
    const [data,setData] = useState([])
    const [totalCount,setTotalCount] = useState(-1)
    useEffect(()=>{
        const timeout = setTimeout(() => {
            const conversations = getJWT('/api/conversations/')
            conversations.then(data=>{
                setData(data.data.results)
            }).catch(err=>{
                console.log(err);
            })
        }, 2000);
        return () => clearTimeout(timeout);
    },[])
    
    return (
        <>
            <div className={styles.ConverSationsArea}>
                <ConversationComponent />
                <ConversationComponent />
                <ConversationComponent />
                <ConversationComponent />
                <ConversationComponent />
                <ConversationComponent />
                <div className={`${data <= 5 ? 'hidden' : ''} ConversationPage flex justify-center`}>
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
    const scrollRef = useRef(null)
    useEffect(() => {
      const scrollDiv = scrollRef.current;
      scrollDiv.scrollTop = scrollDiv.scrollHeight;
    }, []);

    const img = '/dashboardassets/d.jpg'
    return (
        <div className={`${styles.MessageBoxArea} `}>
            <div className='flex justify-between items-center p-5'>
                <div className="text-2xl">
                    Seller Name
                </div>
                <div className="btn btn-primary ">Load More</div>
            </div>
            <hr />
            <div ref={scrollRef} className={styles.MessageTexteArea}>
                <div  className={`${styles.MessageText}`}>
                    <div className="chat chat-start">
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img src={img} alt='-'/>
                            </div>
                        </div>
                        <div className="chat-bubble">It was said that you would, destroy the Sith, not join them. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam nam in nesciunt impedit esse corrupti quas maiores magni perferendis dolores aliquam voluptate nostrum amet repudiandae molestiae, ad beatae. Deleniti praesentium, possimus consequuntur blanditiis quas molestiae quidem commodi eius quasi voluptatem dolor, aut repudiandae harum earum cumque aspernatur explicabo ipsam? Corporis.</div>
                    </div>
                    <div className="chat chat-end">
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img src={img} alt='-' />
                            </div>
                        </div>
                        <div className="chat-bubble bg-primary">It was you who would bring balance to the Force</div>
                    </div>
                    <div className="chat chat-end">
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img src={img} alt='-' />
                            </div>
                        </div>
                        <div className="chat-bubble bg-primary">Not leave it in Darkness</div>
                    </div>
                    <div className="chat chat-end">
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img src={img} alt='-'/>
                            </div>
                        </div>
                        <div className="chat-bubble bg-primary">It was said that you would, destroy the Sith, not join them. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam nam in nesciunt impedit esse corrupti quas maiores magni perferendis dolores aliquam voluptate nostrum amet repudiandae molestiae, ad beatae. Deleniti praesentium, possimus consequuntur blanditiis quas molestiae quidem commodi eius quasi voluptatem dolor, aut repudiandae harum earum cumque aspernatur explicabo ipsam? Corporis.</div>
                    </div>
                    <div className="chat chat-start">
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img src={img} alt='-'/>
                            </div>
                        </div>
                        <div className="chat-bubble">It was you who would bring balance to the Force</div>
                    </div>
                    <div className="chat chat-end">
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img src={img} alt='-'/>
                            </div>
                        </div>
                        <div className="chat-bubble bg-primary">Not leave it in Darkness</div>
                    </div>
                </div>
            </div>
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