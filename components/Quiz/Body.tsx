import Entry from './Entry'
import { useEffect, useRef, useState } from 'react'

const Body = ({ images, info, setScore, setFinish, 
                currentQuestion, setCurrentQuestion, type, entries, setTally=null }) => {

    const [data, setData] = useState([])
    const questionsRef = useRef([])
    const scroll = (index) => questionsRef.current[index]?.scrollIntoView({behavior: 'smooth'})
    
    useEffect(() => {
        let newData
        if (type === 0) {
            newData = Object.entries(info)
                            .map(value => ({ value, sort: Math.random() }))
                            .sort((a, b) => a.sort - b.sort)
                            .map(({ value }) => value )
        } else if (type === 1) {
            newData = entries.map(value => ({ value, sort: Math.random() }))
                             .sort((a, b) => a.sort - b.sort)
                             .map(({ value }) => value )
        }
        setData(newData)
    }, [])
     
    return (
        <div className='pb-20'>
            {type === 0 ? 
                data.map(([key, value], index) =>
                <div key={index} ref={el => questionsRef.current[index] = el}>
                    <Entry key={key}
                           answer={value} setScore={setScore} setFinish={setFinish}
                           imageUrl={findImage(String(value), type, images)} 
                           info={info} 
                           question={index}
                           size={Object.entries(info).length}
                           currentQuestion={currentQuestion}
                           setCurrentQuestion={setCurrentQuestion}
                           type={type}
                           scroll={scroll} />
                </div>) : 
                data.map((entry, index) => 
                    <div key={index} ref={el => questionsRef.current[index] = el}>
                        <Entry key={index} 
                            entry={entry} 
                            question={index} 
                            currentQuestion={currentQuestion}
                            setCurrentQuestion={setCurrentQuestion}
                            size={data.length}
                            setFinish={setFinish}
                            setTally={setTally}
                            scroll={scroll} />
                    </div>
                )
            }
        </div>
    )
}

const findImage = (name: string, type, images) => {
    if (type === 0) {
        const searchName = name.toLowerCase().replace(/ /g, '-')
        for (let image of images.data) {
            const imageName = image.attributes.name.split('.', 1)[0]
            if (searchName === imageName)
                return image.attributes.url
        }
    } else if (type === 1) {
        return null
    }
}

export default Body
