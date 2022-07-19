import Entry from './Entry'
import { useEffect, useRef, useState } from 'react'

const Body = ({ images, info, infoCopy, setScore, setFinish, size, currentQuestion, setCurrentQuestion, 
                type, entries, sections, setTally=null, scrollConclusion,
                difficulty, setDifficulty }) => {

    const [data, setData] = useState([])
    const questionsRef = useRef([])
    const scroll = (index) => questionsRef.current[index]?.scrollIntoView({behavior: 'smooth'})
    let sectionEntries = []
    if (sections.length > 0 && Number.isFinite(difficulty)) {
        sectionEntries = sections[difficulty].entry
    }

    useEffect(() => {
        let newData
        if (type === 0) {
            newData = infoCopy
                        .map(value => ({ value, sort: Math.random() }))
                        .sort((a, b) => a.sort - b.sort)
                        .map(({ value }) => value )
        } else if (type === 1) {
            newData = entries.map(value => ({ value, sort: Math.random() }))
                             .sort((a, b) => a.sort - b.sort)
                             .map(({ value }) => value )
        } else if (type === 2) {
            sectionEntries.length > 0 ?
            newData = sectionEntries.map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value ) 
            :
            newData = entries.map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value ) 
        }

        setData(newData)
    }, [])

    return (
        <div className=''>
            {type === 0 ? 
                data.map(([key, value], index) =>
                <div key={index} ref={el => questionsRef.current[index] = el}>
                    <Entry key={key}
                           answer={value} setScore={setScore} setFinish={setFinish}
                           imageUrl={findImage(String(value), type, images)} 
                           imageSize={findSize(String(value), type, images)}
                           info={info} 
                           question={index}
                           size={size}
                           currentQuestion={currentQuestion}
                           setCurrentQuestion={setCurrentQuestion}
                           type={type}
                           scroll={scroll}
                           scrollConclusion={scrollConclusion} />
                </div>) :
                type === 1 ? 
                data.map((entry, index) => 
                    <div key={index} ref={el => questionsRef.current[index] = el}>
                        <Entry key={index} 
                            entry={entry} 
                            question={index}
                            type={type} 
                            currentQuestion={currentQuestion}
                            setCurrentQuestion={setCurrentQuestion}
                            size={data.length}
                            setFinish={setFinish}
                            setTally={setTally}
                            scroll={scroll}
                            scrollConclusion={scrollConclusion} />
                    </div>
                )
                :
                data.map((entry, index) => 
                <div key={index} ref={el => questionsRef.current[index] = el}>
                    <Entry key={index} 
                        entry={entry} 
                        question={index} 
                        type={type}
                        currentQuestion={currentQuestion}
                        setCurrentQuestion={setCurrentQuestion}
                        size={data.length}
                        setFinish={setFinish}
                        setTally={setTally}
                        scroll={scroll}
                        scrollConclusion={scrollConclusion} />
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

const findSize= (name: string, type, images) => {
    const searchName = name.toLowerCase().replace(/ /g, '-')
    for (let image of images.data) {
        const imageName = image.attributes.name.split('.', 1)[0]
        if (searchName === imageName)
            return [image.attributes.width,image.attributes.height]
    }
}

export default Body
