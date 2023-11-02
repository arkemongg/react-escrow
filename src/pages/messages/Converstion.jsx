import { memo, useState } from 'react';
import styles from './styles/Conversation.module.css'
import { useEffect } from 'react';
import { getCookie, getJWT, postJWT } from '../AxiosHeaders';
import { useAuth } from '../../AuthContext';
import LoadingArea from '../GlobalTemplates/LoadingArea';
import { useLocation} from 'react-router-dom';
import { apiUrl } from '../Urls';
import { EmptyMessage } from '../home/templates/Error';

const Conversation = () => {
    const location = useLocation()
    const { logout } = useAuth()
    const [data, setData] = useState([])

    useEffect(() => {
        if (location.search !== "") {
            
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
                    }).catch(err => {
                        if (err.response) {
                            if (err.response.status === 401) {
                                logout();
                            } else if (err.response.status === 404) {
                                alert("Can't send message to yourself.");
                            }else if (err.response.status === 429) {
                                alert("Too many requests.");
                            } else {
                                alert("Unexpected error with status code: ", err.response.status);
                            }
                        } else {
                            alert("No response received from the server.");
                        }
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
                    <MessageBoxs data={data} setConvo={setData} />
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
        if (location.search !== ""){
            setTotalCount(0)
        }
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
                    {fetched && totalCount === 0 ? <EmptyMessage message={"No conversations found."} /> : ""}
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
    // const navigate = useNavigate()
    const handle = () => {
        props.setConvo(props.data)
        document.getElementById('messageboxs').showModal()
        // navigate(`/messages?seller=${props.seller_id}`)
    }
    // console.log(props.data);
    return (
        <>
            <div onClick={handle} className={`${styles.conversation} cursor-pointer  p-2 flex items-center justify-between`}>
                <div className={`${styles.ConverSationProfile}`}>
                    <img src={props.data.seller_dp===null?"/person.png":apiUrl+props.data.seller_dp} alt="chat head" />
                </div>
                <div className={`${styles.ConversationName} p-5 min-w-[190px] grow`}>
                    <div className="name text-xl">
                        {props.data.seller}
                    </div>
                    <div className="name text-sm font-bold">
                        {props.data.last_message===null?"No Message":props.data.last_message.message.slice(0,15)}
                    </div>
                </div>
                <div className={`${styles.ConversationLastMessage} p-2 flex justify-end`}>
                    <div className="time font-light text-sm ">
                        
                        {props.data.last_message===null?convertToReadableTime(props.data.created_at):convertToReadableTime(props.data.last_message.created_at)}
                    </div>
                </div>
            </div>
            <hr />
        </>
    )
}
const MessageBoxs = (props) => {
    const default_dp = '/dashboardassets/d.jpg'
    const [fetched, setFetched] = useState(false)
    const { logout } = useAuth()
    const [data, setData] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [next, setNext] = useState(null)
    const [messageSocket,setMessageSocket] = useState(null)

    const handleNext = () => {
        if (next === null) {
            return;
        }
        const messages = getJWT(next)
        messages.then(data => {
            const newData = data.data.results.reverse()
            setData(old => [...newData, ...old])
            setNext(data.data.next)
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
    }
    const audio = new Audio('/beep.mp3');
    
    useEffect(() => {
        if (props.data.id === undefined) {
            return
        }
        const token = getCookie('token')
        setData([])
        setFetched(false)
        setTimeout(() => {
            const messages = getJWT(`/api/conversations/${props.data.id}/message/`)
            messages.then(data => {
                setData(data.data.results.reverse())
                
                setTotalCount(data.data.count)
                setNext(data.data.next)

                const socket = new WebSocket(`ws://127.0.0.1:8000/conversations/${props.data.id}/?token=${token}`)
                //const socket = new WebSocket(`ws://127.0.0.1:8000/conversations/${props.data.id}/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk3OTU1NzIyLCJpYXQiOjE2OTc4NjkzMjIsImp0aSI6IjNiYzU0NGEyZGEyNzQzZWM5N2Q2MmViMTE1NThiMGJhIiwidXNlcl9pZCI6MTZ9.BOfYRooFLUy4mJJuVfcTSgDMJq-iT19MLFaRq39b6M4/`)
                //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk3OTU1NzIyLCJpYXQiOjE2OTc4NjkzMjIsImp0aSI6IjNiYzU0NGEyZGEyNzQzZWM5N2Q2MmViMTE1NThiMGJhIiwidXNlcl9pZCI6MTZ9.BOfYRooFLUy4mJJuVfcTSgDMJq-iT19MLFaRq39b6M4

                socket.onmessage = event=>{
                    
                    const data = JSON.parse(event.data)
                    if(data.login){
                        socket.send({"message":"message"})
                    }else if(data.accepted){
                        setFetched(true)
                        setMessageSocket(socket)
                        setTimeout(() => {
                            const convoElement = document.getElementById('convos');
                            convoElement.scrollTo({
                                top: convoElement.scrollHeight,
                                behavior: 'smooth'
                            });
                        }, 0);

                    }else if(data.message){

                        if(data.message.sender!==props.data.me){
                            audio.play();
                        }
                        setData(old => [...old, data.message])
                        setTimeout(() => {
                            const convoElement = document.getElementById('convos');
                            convoElement.scrollTo({
                                top: convoElement.scrollHeight,
                                behavior: 'smooth'
                            });
                        }, 0);
                    }
                }

                socket.onerror = (event)=>{
                    console.log(event);
                    alert("Unexpected error. Please reload or try again!")
                }
                

            }).catch(error => {
                console.log(error);
            })
        }, 2000);
        return () => { };
    }, [props.data]);
    const [message,setMessage]= useState("")
    const handleSend = () => {
        if(message==="" || message.length>500){
            alert("Message length should be 1 to 500.")
            return;
        }
        messageSocket.send(message)
        setMessage("")
        setTotalCount(1)

      }
      const handleClose = () => {
        props.setConvo([])
        if(messageSocket!==null){
            messageSocket.close()
        }
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
                    <div className={`${styles.MessageSenderArea}`}>
                        <div className={`${styles.MessageSender} ${fetched?"":"hidden"}`}>
                            <input value={message} onChange={e=>setMessage(e.target.value)} type="text" placeholder="Message" className="h-[100px] input input-bordered w-full rounded-none " />
                        </div>
                        <div className={`py-2 ${fetched?"":"hidden"}`}>
                            <button onClick={handleSend} className="btn btn-primary rounded-none min-w-[150px]">
                                Send
                            </button>
                        </div>
                    </div>


                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button onClick={handleClose} className="btn">Close</button>
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


function convertToReadableTime(timestamp) {
    const dt = new Date(timestamp);
    const localDt = dt.toLocaleString();
    // console.log(localDt);
    // const year = localDt.split(',')[0].split('/')[2];
    // const month = localDt.split(',')[0].split('/')[0].padStart(2, '0');
    // const day = localDt.split(',')[0].split('/')[1].padStart(2, '0');
    // const hours = localDt.split(',')[1].split(':')[0].padStart(2, '0');
    // const minutes = localDt.split(',')[1].split(':')[1].padStart(2, '0');
    // const seconds = localDt.split(',')[1].split(':')[2].padStart(2, '0');
    // const ampm = dt.getHours() >= 12 ? 'PM' : 'AM';
    // const readableTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${ampm}`;

    return localDt;
}


export default memo(Conversation)

