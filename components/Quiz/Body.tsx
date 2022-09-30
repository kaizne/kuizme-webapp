import Entry from './Entry'
import { useEffect, useState } from 'react'

const Body = ({ images, info, setScore, setFinish, size, currentQuestion, setCurrentQuestion, 
                type, entries, sections, setTally=null,
                difficulty, setDifficulty, start }) => {

    const [data, setData] = useState([])
    const [media, setMedia] = useState([])

    useEffect(() => {
        let newData
        if (type === 0) {
            if (sections.length > 0) {
                const section = sections[difficulty]
                setMedia(section.media)
                const info = Object.entries(section.info)
                newData = info.slice(0,10)
                            .map(value => ({ value, sort: Math.random() }))
                            .sort((a, b) => a.sort - b.sort)
                            .map(({ value }) => value )
            } else {
                setMedia(images)
                info = Object.entries(info)
                newData = info.slice(0,10)
                            .map(value => ({ value, sort: Math.random() }))
                            .sort((a, b) => a.sort - b.sort)
                            .map(({ value }) => value )
            }
        } else if (type === 1 || type === 3) {
            newData = entries.map(value => ({ value, sort: Math.random() }))
                             .sort((a, b) => a.sort - b.sort)
                             .map(({ value }) => value )
        } else if (type === 2) {
            let sectionEntries = []
            if (sections.length > 0) {
                sectionEntries = sections[difficulty].entry
                newData = sectionEntries.map(value => ({ value, sort: Math.random() }))
                    .sort((a, b) => a.sort - b.sort)
                    .map(({ value }) => value )
                    .slice(0, 10); 
                for (let index in newData) {
                    let shuffledArray = shuffleArray(Object.entries(newData[index].content)).slice(0)
                    newData[index].content = Object.fromEntries(shuffledArray)
                }
            }
            else {
                newData = entries.map(value => ({ value, sort: Math.random() }))
                    .sort((a, b) => a.sort - b.sort)
                    .map(({ value }) => value )
                    .slice(0, 10)
            } 
        }
        setData(newData)
    }, [difficulty])

    return (
        <>
            { type === 0 &&
                data.map(([key, value], index) =>
                    <div key={index}>
                        <Entry key={key}
                            answer={value} setScore={setScore} setFinish={setFinish}
                            imageUrl={findImage(String(value), type, media)} 
                            imageSize={findSize(String(value), type, media)}
                            info={info} 
                            question={index}
                            size={size}
                            currentQuestion={currentQuestion}
                            setCurrentQuestion={setCurrentQuestion}
                            type={type}
                            start={start} />
                    </div>
            )}
            { type === 1 && 
                data.map((entry, index) => 
                    <div key={index}>
                        <Entry key={index} 
                            entry={entry} 
                            question={index}
                            type={type} 
                            currentQuestion={currentQuestion}
                            setCurrentQuestion={setCurrentQuestion}
                            size={data.length}
                            setFinish={setFinish}
                            setTally={setTally} />
                    </div>
            )} 
            { type === 2 && 
                data.map((entry, index) => 
                    <div key={index}>
                        <Entry key={index} 
                            entry={entry} 
                            question={index} 
                            type={type}
                            currentQuestion={currentQuestion}
                            setCurrentQuestion={setCurrentQuestion}
                            size={data.length}
                            setFinish={setFinish}
                            setTally={setTally} />
                    </div>
            )}
            { type === 3 && 
                data.map((entry, index) => 
                    <div key={index}>
                        <Entry key={index} 
                                entry={entry} 
                                question={index}
                                type={type} 
                                currentQuestion={currentQuestion}
                                setCurrentQuestion={setCurrentQuestion}
                                size={data.length}
                                setFinish={setFinish}
                                setTally={setTally}
                                start={start} />
                    </div>
            )}
        </>
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

const findSize = (name: string, type, images) => {
    const searchName = name.toLowerCase().replace(/ /g, '-')
    for (let image of images.data) {
        const imageName = image.attributes.name.split('.', 1)[0]
        if (searchName === imageName)
            return [image.attributes.width, image.attributes.height]
    }
}

function shuffleArray (array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1))
        var temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array
}

export default Body
