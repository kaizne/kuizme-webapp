import Link from 'next/link'
import Image from 'next/image'

const contact = () => (
  <>
    <div className='flex flex-col flex-wrap min-h-screen py-[25%] content-center space-y-2'>
      <div className='flex basis-full'>
        <div className='font-Poppins text-xl md:text-2xl'>Reach us at&nbsp;</div>
        <div className='font-Poppins text-xl md:text-2xl text-[#E1341E]'>contact@kuizme.com</div> 
      </div>
      <div className='flex basis-full justify-center space-x-20'>
        <div>
          {/*<Link href='https://www.instagram.com/kuiz.me/'>
            <Image src='/instagram.png' width={62} height={62} className='cursor-pointer'></Image>
          </Link>*/}
          <Image src='/instagram.png' width={62} height={62} className='cursor-pointer'></Image>
        </div>
        <div>
          <Link href='https://twitter.com/kuiz_me'>
            <Image src='/twitter.png' width={62} height={51} className='cursor-pointer'></Image> 
          </Link>
        </div>
      </div>
      <div className='flex basis-full justify-center space-x-20 font-Poppins'>
        <div>Instagram</div>
        <div>Twitter</div>
      </div>
    </div>
  </>
)

export default contact
