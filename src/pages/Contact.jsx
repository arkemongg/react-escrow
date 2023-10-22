import { useState } from 'react';
import Subscribe from './home/Subscribe'
import { post } from './AxiosHeaders';

const Contact = () => {
  const [subject, setSubject] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleContact = () => {

    if((subject.length<1 || subject.length>500) || (email.length<1 || email.length>500) || (message.length<1 || message.length>500)){
      alert("Invalid input (max 1 to 500 charecter)")
      return
    }

    const postData = {
      "subject": subject,
      "email": email,
      "message": message
    }
    
    post('/api/support/',postData).then(data=>{
      alert("Successfully sent.")
    }).catch(err=>{
      alert("Unexpected error please try again in 24 hours.")
    })
  }

  return (
    <>
      <section className="text-gray-700 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Contact Us
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Please contact us with your query we will try our best to contact you back.
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label for="name" className="leading-7 text-sm text-gray-600">
                    Subject
                  </label>
                  <input
                    onChange={e => setSubject(e.target.value)}
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    for="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    for="message"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Message
                  </label>
                  <textarea
                    onChange={e => setMessage(e.target.value)}
                    id="message"
                    name="message"
                    className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <button onClick={handleContact} className="flex btn btn-primary mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Subscribe />
    </>
  );
};

export default Contact;