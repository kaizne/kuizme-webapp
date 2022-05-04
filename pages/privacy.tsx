import Link from 'next/link'
import Footer from '../components/Footer'

const Privacy = () => (  
  <>
    <div className='text-justify px-8 py-10 md:px-20 md:py-10 font-Poppins min-h-screen'>
      <h1 className='text-2xl md:text-6xl font-bold'>Privacy Policy</h1>
      <br></br>
      <a>At&nbsp;</a>
      <a href='https://www.kuizme.com/' className='text-blue-500'>kuizme.com</a>
      <a>,&nbsp;the privacy of our visitors is imperative. 
      This Privacy Policy outlines the information 
      that is collected and recorded by&nbsp;</a>
      <a href='https://www.kuizme.com/' className='text-blue-500'>kuizme.com</a>
      <a>,&nbsp;and how we use it. If you have any questions or require additional 
      information about our Privacy Policy, please do not hesitate to contact us.</a>
      <br></br><br></br>
      This Privacy Policy applies to, and is valid for, visitors to&nbsp;
      <a href='https://www.kuizme.com/' className='text-blue-500'>kuizme.com</a>
      .&nbsp;This policy is not applicable to any information collected offline or 
      via channels outside of&nbsp;
      <a href='https://www.kuizme.com/' className='text-blue-500'>kuizme.com</a>
      .&nbsp;
      <br></br><br></br>
      <h1 className='text-xl md:text-4xl'>Consent</h1>
      <br></br>
      By using our website, you hereby consent to our Privacy Policy 
      and agree to its terms. The personal information that you are asked to 
      provide, and the reasons for which you are asked to provide it, will be made 
      clear to you at the point at which we ask you to provide your 
      personal information.
      If you contact us directly, we may receive additional information 
      about you such as your name, email address, phone number, the 
      contents of the message and/or attachments you may send us, and 
      any other information you may choose to provide. 
      {/*When you register for an account, we may ask for your contact information, 
      including items such as name, company name, address, email address, and 
      telephone number.*/}
      We use the information we collect in various ways, including to: 
      <ul className='list-disc px-10 py-2'>
        <li>provide, operate, and maintain our website;</li>  
        <li>improve, personalize, and expand our website;</li> 
        <li>understand and analyze how you use our website</li> 
        {/*<li>communicate with you, either directly or through one of our partners, 
        including for customer service, to provide you with updates and other 
        information relating to the website, and for marketing and promotional 
        purposes;</li>*/}
        {/*<li>send you emails;</li>*/}
      </ul>
      <br></br>
      <h1 className='text-xl md:text-4xl'>Visitor Data</h1>
      <br></br>
      The visitor data collected for each unique visitor on&nbsp;
      <a href='https://www.kuizme.com/' className='text-blue-500'>kuizme.com</a>
      &nbsp;includes 
      include municipal location, browser type, operating system (OS) type, 
      date and time stamp, and entry and exit pages. 
      These data are not linked to any information that is personally identifiable. 
      <br></br><br></br>
      <h1 className='text-xl md:text-4xl'>Cookies</h1>
      <br></br>
      <a href='https://www.kuizme.com/' className='text-blue-500'>kuizme.com</a>
      &nbsp;uses cookies, which are used to store information including visitor 
      preferences and viewed pages. The information is used to optimize user 
      experience by customizing our web page content. 
      <br></br><br></br>
      <h1 className='text-xl md:text-4xl'>Advertising Partners</h1>
      <br></br>
      Some of advertisers on our site may use cookies. Our 
      advertising partners are listed below. Each of our advertising partners has 
      their own Privacy Policy. Please consult the advertising partner list 
      below to read the respective Privacy Policy for each of our advertising partners.&nbsp;
      <a href='https://www.kuizme.com/' className='text-blue-500'>kuizme.com</a>
      &nbsp;has no access to, or control over, the cookies used by 
      third-party advertisers. 
      <ul className='list-disc px-10 py-2'>
        <li>Google: <a href='https://policies.google.com/technologies/ads' 
        className='underline'>
        https://policies.google.com/ <br></br> technologies/ads</a></li>
      </ul>
      <br></br>
      <h1 className='text-xl md:text-4xl'>Security</h1>
      <br></br>
      <a href='https://www.kuizme.com/' className='text-blue-500'>kuizme.com</a>
      &nbsp;takes reasonable measures to help protect information about you from alteration 
      and destruction, unauthorized access and misuse, disclosure, theft, and loss.
    </div>
    <Footer />
  </>
)

export default Privacy
