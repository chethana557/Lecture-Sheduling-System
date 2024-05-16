import emailjs from 'emailjs-com';
import { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Request.css';


const Request = () => {
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);

  function sendEmail(e) {
    e.preventDefault();

    setIsLoading(true)

    emailjs.sendForm('service_apr6i0f', 'template_plimqz3', form.current, 'SzmGhZTROeIUBK36D')
      .then((result) => {
          console.log(result.text);
          toast.success("Message sent successfully")
      }, (error) => {
          console.log(error.text);
          toast.error("Error sending message")
      }
    )
    .finally(() => {
      setIsLoading(false) // Reset loading state
    });

  e.target.reset();
  }

  
  return (
    <div className='req'>
    <section className="x1">
      <container className="x2">
        <h2 className="hedding">
          Request
        </h2>
        <p className="max-w-[803px] text-[13px] md:text-[14px]">
         If You have Any Problems With Lecture days/times Send a email to Admin!
        </p>

        {/* FORM CODE START */}
        <form
          ref={form} 
          onSubmit={sendEmail}
          className="mt-[30px]"
          noValidate=""   
        >
        <div className="grid grid-cols-2 gap-[16px]">
          <div>
            <label 
              className="block"
              >
              <span className="">
                NAME
              </span>
              <input
                required 
                type="text"
                name="name"
                placeholder="enter your name" 
                className="formhead" 
              />
              </label>
          </div>

          <div>
            <label 
              className="block"
              >
              <span className="">
                EMAIL
              </span>
              <input
                required 
                type="email"
                name="email"
                placeholder="enter your email" 
                className="" 
              />
              </label>
          </div>
        </div>

        <div>
          <label className="block3"
          >
          <span className="sub">
            SUBJECT
          </span>
          <select
            required 
            name="subject" 
            className="p-2 mb-3 text-[13px] rounded-md"
            >
            <option>Ask a question</option>
            <option>Request a quote</option>
            <option>Something else</option>
            </select>
          </label>
        </div>

        <label className="block4"
        >
          <span className="">
            MESSAGE
          </span>
          <textarea
            required 
            name="message" 
            rows="3" 
            className="" />
        </label>
        
        <button 
          type="submit"
          disabled={isLoading}
          className="reqbtn">
          {isLoading ? "Loading..." : "Submit"}
          <ToastContainer />
        </button>


        </form>
      </container>
    </section>
    </div>
  );
};

export default  Request;
