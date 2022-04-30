import Entry from './Entry'
import { useEffect, useState } from 'react'

const Body = ({ images, info, score, setScore, setFinish, currentQuestion, setCurrentQuestion }) => {
    const [data, setData] = useState([])
    useEffect(() => {
        const newData = Object.entries(info).map(value => ({ value, sort: Math.random() }))
                                            .sort((a, b) => a.sort - b.sort)
                                            .map(({ value }) => value )
        setData(newData)
    }, [])
     
    return (
        <div>
            {data.map(([key, value], index) =>
                <Entry key={key} value={value} score={score} setScore={setScore} setFinish={setFinish}
                       imageUrl={findImage(String(value), images)} 
                       info={info} 
                       question={index}
                       size={Object.entries(info).length}
                       currentQuestion={currentQuestion}
                       setCurrentQuestion={setCurrentQuestion} />)}
        </div>
    )
}

const findImage = (name: string, images) => {
    const searchName = name.toLowerCase().replace(/ /g, '-')
    for (let image of images.data) {
        const imageName = image.attributes.name.split('.', 1)[0]
        if (searchName === imageName)
            return image.attributes.url
    }
}

export default Body
