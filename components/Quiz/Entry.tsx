import Image from 'next/image'
import { useState, useEffect } from 'react'

const Entry = ({ answer=null, 
                 imageUrl=null, 
                 info=null, 
                 setScore=null, 
                 setFinish=null, 
                 question=null, 
                 size=null,
                 currentQuestion=null, 
                 setCurrentQuestion=null, 
                 type=null,
                 entry=null,
                 setTally=null,
                 scroll=null,
                }) => {  

    const [selection, setSelection] = useState([])
    const [disable, setDisable] = useState(false)
    const [correct, setCorrect] = useState(0)
    
    const [colors, setColors] = 
        useState(['bg-white', 'bg-white', 'bg-white', 'bg-white']) 
        
    // Personality
    const [choice, setChoice] = useState(0)

    useEffect(() => {
        if (type === 0)
            setSelection(generateEntries(answer, info, setCorrect))
    }, [])

    return (
        <div className={`flex pt-10 mb-60
            ${currentQuestion >= question ? 'none' : 'hidden'} 
            ${// currentQuestion === question ? 'animate-fadeIn' : 'none'
                 currentQuestion === question ? 'none' : 'none'}
            ${// disable === true ? 'animate-fadeOut' : 'none'
                 disable === true ? 'none' : 'none'}
            flex-col items-center scroll-smooth`}>
            <p className='w-20 text-center font-medium text-xl mb-2 border-b-2 border-gray-300'>
                <span className='text-sky-500'>{question + 1}</span>
                <span className='font-normal'> / </span> 
                {size}
            </p>
        { type === 0 ? 
            <>
            { imageUrl && <Image className='rounded' src={imageUrl} width={150} height={150} /> }
            <div className='flex flex-col w-96 justify-center items-center'>
                <div className='grid grid-cols-2 gap-2 mt-4'>
                    <button onClick={(elem) => 
                        selectCharacter((elem.target as HTMLElement).innerHTML, answer,
                                         colors, setColors, 0, correct, setDisable, 
                                         setScore, size, setFinish,
                                         currentQuestion, setCurrentQuestion, scroll)}
                        disabled={disable}
                        className={`w-40 h-16
                                    text-lg font-medium rounded ${colors[0]}
                                    border border-gray-200`}>{selection[0]}</button>
                    <button onClick={(elem) => 
                        selectCharacter((elem.target as HTMLElement).innerHTML, answer,
                                         colors, setColors, 1, correct, setDisable, 
                                         setScore, size, setFinish,
                                         currentQuestion, setCurrentQuestion, scroll)}
                        disabled={disable}
                        className={`w-40 h-16
                                    text-lg font-medium rounded ${colors[1]}
                                    border border-gray-200`}>{selection[1]}</button>
                    <button onClick={(elem) => 
                        selectCharacter((elem.target as HTMLElement).innerHTML, answer,
                                        colors, setColors, 2, correct, setDisable, 
                                        setScore, size, setFinish,
                                        currentQuestion, setCurrentQuestion, scroll)}
                        disabled={disable}
                        className={`w-40 h-16
                                    text-lg font-medium rounded ${colors[2]}
                                    border border-gray-200`}>{selection[2]}</button>
                    <button onClick={(elem) => 
                        selectCharacter((elem.target as HTMLElement).innerHTML, answer,
                                         colors, setColors, 3, correct, setDisable, 
                                         setScore, size, setFinish,
                                         currentQuestion, setCurrentQuestion, scroll)}
                        disabled={disable}
                        className={`w-40 h-16
                                    text-lg font-medium rounded ${colors[3]}
                                    border border-gray-200`}>{selection[3]}</button>
                </div>
            </div>
            </> : 
            <>
            <p className='w-80 text-center font-semibold text-lg mb-1'>{entry.question}</p>
            { entry.mediaUrl[1] && <Image className='rounded' src={entry.mediaUrl[1]} width={150} height={150} /> }
            <div className='flex flex-col w-96 justify-center items-center'>
                <div className='grid grid-cols-1 gap-2 mt-4'>
                    { Object.keys(entry.content).map((elem, index) => {
                        return (
                            <button className={`w-80 h-16 font-medium border border-gray-200 rounded p-2
                                                ${choice === index && disable ? 'bg-sky-400' : 'bg-white'}`}
                                    onClick={() => 
                                        selectPersonality(elem, setTally, setChoice, index, size,
                                                          setCurrentQuestion, currentQuestion, 
                                                          setDisable, setFinish, scroll)}
                                    disabled={disable}>
                                    {entry.content[elem]}
                            </button>
                        )
                    }) }
                </div>
            </div>
            </> } 
        </div>
    )
}

const generateEntries = (answer: string, info: object, setCorrect: any) => {
    const entries = []
    for (let i = 0; i < 4; ++i) {
        let random = Math.floor(Math.random() * Object.keys(info).length) + 1
        while (info[random] === answer || entries.includes(info[random]))
            random = Math.floor(Math.random() * Object.keys(info).length) + 1    
        entries.push(info[random])
    }
    let random = Math.floor(Math.random() * 4)
    entries[random] = answer
    setCorrect(random)
    return entries
}

const selectCharacter = (selection, answer, color, setColor, button, correct,
                         setDisable, setScore, size, setFinish,
                         currentQuestion, setCurrentQuestion, scroll) => {

    if (selection === answer) {
        color[button] = 'bg-emerald-400'
        setScore(score => score + 1)
    } else {
        color[button] = 'bg-red-400'
        color[correct] = 'bg-emerald-400'
    }
    
    setColor(color)
    setDisable(true)   
    
    setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
        scroll(currentQuestion + 1)
        if (currentQuestion + 1 === size)
            setFinish(true) 
    }, 250)
    
}

const selectPersonality = (selection, setTally, setIndex, index, size, setCurrentQuestion, 
                         currentQuestion, setDisable, setFinish, scroll) => {
    
    setTally(tally => {
        tally[selection]++
        return tally
    })
    setIndex(index)
    
    if (currentQuestion + 1 === size)
        setFinish(true)

    setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
        scroll(currentQuestion + 1)
        if (currentQuestion + 1 === size)
            setFinish(true)
    }, 100)

    setDisable(true)
}  

export default Entry
