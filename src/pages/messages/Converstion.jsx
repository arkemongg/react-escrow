import { memo, useRef, useState } from 'react';
import styles from './styles/Conversation.module.css'
import { useEffect } from 'react';
import { getJWT, postJWT } from '../AxiosHeaders';
import { useAuth } from '../../AuthContext';
import LoadingArea from '../GlobalTemplates/LoadingArea';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiUrl } from '../Urls';
import { EmptyMessage } from '../home/templates/Error';

const Conversation = () => {
    const location = useLocation()
    const { logout } = useAuth()
    const [data, setData] = useState([])

    useEffect(() => {
        if (location.search !== "") {
            console.log(location.search);
            const params = new URLSearchParams(location.search);
            const seller = params.get("seller");
            const timeout = setTimeout(() => {
                const postData = {
                    "seller_id": seller
                }
                postJWT(`/api/conversations/`, postData)
                    .then(data => {
                        setData(data.data)

                        document.getElementById('messageboxs').showModal()
                    }).catch(error => {
                        console.log(error);
                    })
            }, 100);

            return () => clearTimeout(timeout);
        }

    }, [location.key])
    return (
        <>
            <div className={styles.ConverSationSection}>
                <div className={styles.ConversationWrapper}>
                    <ConversationsHeads setConvo={setData} />
                    {/* <MessageBox conversation={conversation} fetched={fetched} /> */}
                    <MessageBoxs data={data} />
                </div>
            </div>
        </>
    )
}

const ConversationsHeads = (props) => {
    const location = useLocation()
    const [fetched, setFetched] = useState(false)
    const { logout } = useAuth()
    const [data, setData] = useState([])
    const [totalCount, setTotalCount] = useState(-1)

    const [url, setUrl] = useState('/api/conversations/?limit=5')
    const [prev, setPrev] = useState(null)
    const [next, setNext] = useState(null)

    const handlePrev = () => {
        if (prev === null) {
            return
        }
        setUrl(prev)
    }
    const handleNext = () => {
        if (next === null) {
            return
        }
        setUrl(next)
    }
    useEffect(() => {
        setFetched(false)
        const timeout = setTimeout(() => {
            const conversations = getJWT(url)
            conversations.then(data => {
                setData(data.data.results)
                setFetched(true)
                setTotalCount(data.data.count)

                //set next prev

                setNext(data.data.next)
                setPrev(data.data.previous)

            }).catch(err => {
                if (err.response) {
                    if (err.response.status === 401) {
                        logout();
                    } else if (err.response.status === 429) {
                        alert("Too many requests.");
                    } else {
                        alert("Unexpected error with status code: ", err.response.status);
                    }
                } else {
                    alert("No response received from the server.");
                }
            })
        }, 2000);
        return () => clearTimeout(timeout);
    }, [url])

    return (
        <>
            <div className={styles.ConverSationsArea}>
                <div className='min-h-[500px]'>
                    {fetched ? data.map(conversation => {
                        return <ConversationComponent
                            key={"convo" + conversation.id}
                            data={conversation}
                            // id = {conversation.id}
                            // seller={conversation.seller}
                            // seller_id={conversation.customer1===conversation.me?conversation.customer2:conversation.customer1}
                            setConvo={props.setConvo}
                        />
                    }) : <LoadingArea />}
                </div>
                <div className={`${totalCount <= 5 ? 'hidden' : ''} ConversationPage flex justify-center`}>
                    <div onClick={handlePrev} className="btn btn-primary w-[150px] m-2 ">Previous</div>
                    <div onClick={handleNext} className="btn btn-primary w-[150px] m-2 ">Next</div>
                </div>
            </div>
        </>
    )
}

const ConversationComponent = (props) => {
    const navigate = useNavigate()
    const handle = () => {
        props.setConvo(props.data)
        document.getElementById('messageboxs').showModal()
        // navigate(`/messages?seller=${props.seller_id}`)
    }
    return (
        <>
            <div onClick={handle} className={`${styles.conversation}  p-2 flex items-center justify-between`}>
                <div className={`${styles.ConverSationProfile}`}>
                    <img src="/dashboardassets/d.jpg" alt="chat head" />
                </div>
                <div className={`${styles.ConversationName} p-5 min-w-[190px] grow`}>
                    <div className="name text-xl">
                        {props.data.seller}
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
const MessageBoxs = (props) => {
    const convoRef = useRef(null);
    const default_dp = '/dashboardassets/d.jpg'
    const [fetched, setFetched] = useState(false)
    const { logout } = useAuth()
    const [data, setData] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [next, setNext] = useState(null)
    const handleNext = () => {
        if (next === null) {
            return;
        }
        const messages = getJWT(next)
        messages.then(data => {
            const newData = data.data.results.reverse()
            setData(old => [...newData, ...old])
            setNext(data.data.next)
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        if (props.data.id === undefined) {
            return
        }
        setData([])
        setFetched(false)
        setTimeout(() => {
            const messages = getJWT(`/api/conversations/${props.data.id}/message/`)
            messages.then(data => {
                setData(data.data.results.reverse())
                setFetched(true)
                setTotalCount(data.data.count)
                setNext(data.data.next)
                setTimeout(() => {
                    const convoElement = document.getElementById('convos');
                    convoElement.scrollTo({
                        top: convoElement.scrollHeight,
                        behavior: 'smooth'
                    });
                }, 0);
            }).catch(error => {
                console.log(error);
            })
        }, 2000);
        return () => { };
    }, [props.data]);
    const handleSend = () => {
        const data = {
            "id": 69420,
            "message": Math.random(5),
            "sender": 2
        }
    
        setTotalCount(1)
        setData(old => [...old, data])
        setTimeout(() => {
            const convoElement = document.getElementById('convos');
            convoElement.scrollTo({
                top: convoElement.scrollHeight,
                behavior: 'smooth'
            });
        }, 0);
      }
    return (
        <>
            <dialog id="messageboxs" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">

                    <div className='flex justify-between items-center pb-3'>
                        <div className="text-2xl">
                            {props.data.seller}
                            <br />
                            <span className='text-sm font-light text-primary'>ID # {props.data.id}</span>
                        </div>
                        <div onClick={handleNext} className="btn btn-primary ">Load More</div>
                    </div>
                    <hr />
                    <div id="convos" className={styles.MessageTexteArea}>
                        <div  className={`${styles.MessageText} `}>
                            {fetched ? data.map(message => {
                                if (message.sender === props.data.me) {
                                    return <ChatMe
                                        key={"key" + Math.random(2)}
                                        dp={props.data.my_dp === null ? default_dp : apiUrl + props.data.my_dp}
                                        message={message.message}
                                        created_at={message.created_at}
                                    />
                                }
                                return <ChatSeller
                                    key={"key" + Math.random(2)}
                                    seller={props.data.seller}
                                    dp={props.data.seller_dp === null ? default_dp : apiUrl + props.data.seller_dp}
                                    message={message.message}
                                    created_at={message.created_at}
                                />
                            }) : <LoadingArea />}
                            {fetched && totalCount === 0 ? <EmptyMessage message={"Empty"} /> : ""}
                        </div>
                    </div>
                    <div className={styles.MessageSenderArea}>
                        <div className={`${styles.MessageSender}`}>
                            <input type="text" placeholder="Message" className="h-[100px] input input-bordered w-full rounded-none " />
                        </div>
                        <div className="btnArea py-2">
                            <button onClick={handleSend} className="btn btn-primary rounded-none min-w-[150px]">
                                Send
                            </button>
                        </div>
                    </div>


                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

const ChatMe = (props) => {
    return (
        <>
            <div className="chat chat-start">
                {/* <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img src={props.dp} />
                    </div>
                </div> */}
                <div className="chat-header">
                    Me  <br />
                    <time className="text-xs opacity-50"> {" " + convertToReadableTime(props.created_at)}</time>
                </div>
                <div className="chat-bubble">{props.message}</div>

            </div>
        </>
    )
}
const ChatSeller = (props) => {
    return (
        <>
            <div className="chat chat-end">
                {/* <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img src={props.dp} />
                    </div>
                </div> */}
                <div className="chat-header">
                    {props.seller}
                    <br />
                    <time className="text-xs opacity-50">{convertToReadableTime(props.created_at)}</time>


                </div>
                <div className="chat-bubble">{props.message}</div>

            </div>
        </>
    )
}

const chat = (userName, timestamp, messageContent)=>{
    const chatDiv = document.createElement('div');
    chatDiv.classList.add('chat', 'chat-start');

    const chatHeader = document.createElement('div');
    chatHeader.classList.add('chat-header');
    chatHeader.innerHTML = userName + ' <br />';

    const timeElement = document.createElement('time');
    timeElement.classList.add('text-xs', 'opacity-50');
    timeElement.textContent = timestamp;

    chatHeader.appendChild(timeElement);

    const chatBubble = document.createElement('div');
    chatBubble.classList.add('chat-bubble');
    chatBubble.textContent = messageContent;

    chatDiv.appendChild(chatHeader);
    chatDiv.appendChild(chatBubble);

    return chatDiv;
}
function convertToReadableTime(timestamp) {
    const dt = new Date(timestamp);
    const year = dt.getFullYear();
    const month = String(dt.getMonth() + 1).padStart(2, '0');
    const day = String(dt.getDate()).padStart(2, '0');
    const hours = String(dt.getHours() % 12 || 12).padStart(2, '0'); // Adjusted for AM/PM
    const minutes = String(dt.getMinutes()).padStart(2, '0');
    const seconds = String(dt.getSeconds()).padStart(2, '0');
    const ampm = dt.getHours() >= 12 ? 'PM' : 'AM'; // Determine AM or PM

    const readableTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${ampm}`;

    return readableTime;
}
const MessageBox = (props) => {

    const img = '/dashboardassets/d.jpg'
    return (
        <>
            <div id='messagebox' className={`${styles.MessageBoxArea} ${props.conversation ? "" : "hidden"} `}>
                <div className='flex justify-between items-center p-5'>
                    <div className="text-2xl">
                        Seller Name
                    </div>
                    <div className="btn btn-primary ">Load More</div>
                </div>
                <hr />
                <div className={styles.MessageTexteArea}>
                    <div className={`${styles.MessageText}`}>
                        <div className="chat chat-start">
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                    <img src={img} alt='-' />
                                </div>
                            </div>
                            <div className="chat-bubble">It was said .</div>
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
                                    <img src={img} alt='-' />
                                </div>
                            </div>
                            <div className="chat-bubble bg-primary">It was said that you would, destroy the Sith, not join them. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam nam in nesciunt impedit esse corrupti quas maiores magni perferendis dolores aliquam voluptate nostrum amet repudiandae molestiae, ad beatae. Deleniti praesentium, possimus consequuntur blanditiis quas molestiae quidem commodi eius quasi voluptatem dolor, aut repudiandae harum earum cumque aspernatur explicabo ipsam? Corporis.</div>
                        </div>
                        <div className="chat chat-start">
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                    <img src={img} alt='-' />
                                </div>
                            </div>
                            <div className="chat-bubble">It was you who would bring balance to the Force</div>
                        </div>
                        <div className="chat chat-end">
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                    <img src={img} alt='-' />
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
        </>
    )
}

export default memo(Conversation)

