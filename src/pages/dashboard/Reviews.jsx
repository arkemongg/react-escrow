import { memo, useEffect, useState } from 'react';
import styles from './styles/Reviews.module.css'
import { AxiosInstanceJWT, axiosInstance, convertDatetimeToDate, getJWT, postJWT } from '../AxiosHeaders';
import { EmptyMessage } from '../home/templates/Error';
import LoadingArea from '../GlobalTemplates/LoadingArea';
import { useAuth } from '../../AuthContext';
import { FlaotingErrorCustom } from '../GlobalTemplates/FloatingErrorCustom';
import { apiUrl } from '../Urls';

const ReviewsDashboard= (props) => {
    return (
        <>
            
            <section className={`${styles.ReviewsSection} `}>
                <MyReview />
                <ReviewReceived />
            </section>
        </>
    )
};


// My review component

const MyReview = ()=>{
    const {logout} = useAuth()
    const [url, setUrl] = useState(`/api/myfeedback/?id=&completed=true`)
    const [nextUrl, setNextUrl] = useState(null)
    const [prevUrl, setPrevUrl] = useState(null)

    const [data, setData] = useState([])
    const [fetched, setFetched] = useState(false)
    const [count, setCount] = useState(-1)

    const handlePrevious = () => {
        if (prevUrl === null) {
            return;
        }
        setUrl(prevUrl)
        const element = document.getElementById('myreview');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
    }
    const handleNext = () => {
        if (nextUrl === null) {
            return;
        }
        setUrl(nextUrl)
        const element = document.getElementById('myreview');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
    }
    useEffect(() => {
        setFetched(false)
        const timer = setTimeout(() => {
            const getSeller = getJWT(url)
            getSeller.then(data => {
                if (data.status === 200) {
                    setData(data.data.results)
                    setFetched(true)
                    setCount(data.data.count)

                    //Set prev and next url
                    setPrevUrl(data.data.previous)
                    setNextUrl(data.data.next)
                }
            }).catch(err => {
                //error handling
                if (err.response) {
                    if(err.response.status===401){
                        logout()
                    }else if (err.response.status === 429) {
                        alert("Too many requests.")
                    } else {
                        alert("Unexpected error.")
                    }

                } else {
                    // alert("Unexpected error.")
                }

            })

        }, 2000);

        return (() => clearTimeout(timer))
    }, [url])

    const handleID = (event)=>{
        setUrl(`/api/myfeedback/?id=${event.target.value}&completed=true`)
    }
    return (
        <div id='myreview' className={`${styles.MyReviewsArea}`}>
            <div className='text-3xl p-5 flex justify-between items-center'>
                <h1>My Review</h1>
                <input  onChange={handleID} type="text" placeholder="Review ID" className="input input-bordered w-[150px] rounded-none " />
            </div>
            <hr />
            <div className={styles.reviewArea}>
                {fetched ? (
                    data.length > 0 ? data.map(review => {
                        return <Review key={review.id} data={review} />
                    }) : <EmptyMessage message={"No reviews found."} />
                ) : <LoadingArea />}
            </div>
            <div className={`btnArea flex justify-center p-5 ${count > 5 ? "" : "hidden"}`}>
                <button onClick={handlePrevious} className="btn btn-primary min-w-[150px] mr-2">
                    Previous
                </button>
                <button onClick={handleNext} className="btn btn-primary min-w-[150px]">
                    Next
                </button>
            </div>
        </div>
    )
}

// Received Review component

const ReviewReceived = ()=>{
    const {logout} = useAuth()
    const [url, setUrl] = useState(`/api/receivedfeedback/?id=`)
    const [nextUrl, setNextUrl] = useState(null)
    const [prevUrl, setPrevUrl] = useState(null)

    const [data, setData] = useState([])
    const [fetched, setFetched] = useState(false)
    const [count, setCount] = useState(-1)

    const handlePrevious = () => {
        if (prevUrl === null) {
            return;
        }
        setUrl(prevUrl)
        const element = document.getElementById('receivedReview');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
    }
    const handleNext = () => {
        if (nextUrl === null) {
            return;
        }
        setUrl(nextUrl)
        const element = document.getElementById('receivedReview');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
    }
    const handleID = (event)=>{
        setUrl(`/api/receivedfeedback/?id=${event.target.value}`)
    }

    useEffect(() => {
        setFetched(false)
        const timer = setTimeout(() => {
            const getSeller = axiosInstance.get(url)
            getSeller.then(data => {
                if (data.status === 200) {
                    setData(data.data.results)
                    setFetched(true)
                    setCount(data.data.count)

                    //Set prev and next url
                    setPrevUrl(data.data.previous)
                    setNextUrl(data.data.next)
                }
            }).catch(err => {
                //error handling
                if (err.response) {
                    if(err.response.status===401){
                        logout()
                    }else if (err.response.status === 429) {
                        alert("Too many requests.")
                    } else {
                        alert("Unexpected error.")
                    }

                } else {
                    alert("No response received from the server.");
                }

            })

        }, 2000);

        return (() => clearTimeout(timer))
    }, [url])

    return (
        <div id='receivedReview' className={`${styles.ReceivedReviewsArea}`}>
            <div className='text-3xl p-5 flex justify-between items-center'>
                <h1>Received Review</h1>
                <input onChange={handleID} type="text" placeholder="Review ID" className="input input-bordered  w-[150px] rounded-none" />
            </div>
            <hr />
            <div className={styles.reviewArea}>
                {fetched ? (
                    data.length > 0 ? data.map(review => {
                        return <Review key={review.id} data={review} />
                    }) : <EmptyMessage message={"No reviews found."} />
                ) : <LoadingArea />}
            </div>
            <div className={`btnArea flex justify-center p-5 ${count > 5 ? "" : "hidden"}`}>
                <button onClick={handlePrevious} className="btn btn-primary min-w-[150px] mr-2">
                    Previous
                </button>
                <button onClick={handleNext} className="btn btn-primary min-w-[150px]">
                    Next
                </button>
            </div>
        </div>
    )
}




export default memo(ReviewsDashboard);


const Review = (props) => {
    return (
        <div className={styles.review}>
            <div className={styles.ReviewProfileDetails}>
                <div className={styles.ReviewProfileImageArea}>
                    <img src={props.data.profile === "" ? "/dashboardassets/d.jpg" : `${apiUrl}/media/${props.data.profile}`} alt="profile" />
                </div>
                <div className="ProfileNames flex flex-col justify-center">
                    <div className="font-bold max-w-[400px]">
                        {props.data.reviewer_name === "not_set" ? "Name not set" : props.data.reviewer_name}
                    </div>
                    <div className='flex font-bold text-xl items-center'>
                        <div>{props.data.rating}</div>
                        <img className='w-[20px] h-[20px]' src="/dashboardassets/star.png" alt="star" />
                    </div>
                </div>
            </div>
            <hr />
            <div className='text-sm font-light p-10'>
                {props.data.comment===""?"No comment":props.data.comment}
            </div>
            <hr />
        </div>
    )
}