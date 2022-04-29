import Image from 'next/image'

const Entry = ({ value, imageUrl }) => {  
    return (
        <div>
           {value}
           <Image src={imageUrl} width='40' height='40' />
        </div>
    )
}

export default Entry
