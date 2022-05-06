import Image from 'next/image'
import { useState, useEffect } from 'react'

const Entry = ({ value=null, 
                 imageUrl=null, 
                 info=null, 
                 score=null, 
                 setScore=null, 
                 setFinish=null, 
                 question=null, 
                 size=null,
                 currentQuestion=null, 
                 setCurrentQuestion=null, 
                 type=null,
                 entry=null,
                 setTally=null,
                 tally=[],
                }) => {  

    const [selection, setSelection] = useState([])
    const [button, setButton] = useState(0)
    const [correct, setCorrect] = useState(0)
    const [disable, setDisable] = useState(false)
    const [index, setIndex] = useState(0)

    useEffect(() => {
        if (type === 0)
            setSelection(generateEntries(value, info, setIndex))
    }, [])

    return (
        <div className={`flex 
            ${currentQuestion >= question ? 'none' : 'invisible'} 
            ${currentQuestion == question ? 'animate-fadeIn' : 'none'} flex-col items-center scroll-smooth mt-16`}>
        { type === 0 ? 
            <>
                <p className='w-80 text-center font-semibold text-lg mb-1'>Who is this character?</p>
                { imageUrl && <Image className='rounded-lg' src={imageUrl} width={120} height={120} /> }
                <div className='flex flex-col w-96 justify-center items-center'>
                    <div className='grid grid-cols-2 gap-2 mt-4'>
                        <button onClick={(elem) => selectAnswerZero((elem.target as HTMLElement).innerHTML, value, setCorrect, 1, setButton, setDisable, 
                                                        score, setScore, question, size, setFinish, currentQuestion, setCurrentQuestion)}
                            disabled={disable}
                            className={`w-40 h-12 font-medium border border-gray-200 
                                ${button === 1 && correct === 1 ? 'bg-emerald-400' : 'none'}
                                ${button === 1 && correct === 2 ? 'bg-red-400' : 'none'}
                                ${disable === true && index === 1 ? 'bg-emerald-400' : 'none'}`}>{selection[0]}</button>
                        <button onClick={(elem) => selectAnswerZero((elem.target as HTMLElement).innerHTML, value, setCorrect, 2, setButton, setDisable, 
                                                        score, setScore, question, size, setFinish, currentQuestion, setCurrentQuestion)}
                            disabled={disable}
                            className={`w-40 h-12 font-medium border border-gray-200
                                ${button === 2 && correct === 1 ? 'bg-emerald-400' : 'none'}
                                ${button === 2 && correct === 2 ? 'bg-red-400' : 'none'}
                                ${disable === true && index === 2 ? 'bg-emerald-400' : 'none'}`}>{selection[1]}</button>
                        <button onClick={(elem) => selectAnswerZero((elem.target as HTMLElement).innerHTML, value, setCorrect, 3, setButton, setDisable, 
                                                        score, setScore, question, size, setFinish, currentQuestion, setCurrentQuestion)}
                            disabled={disable}
                            className={`w-40 h-12 font-medium border border-gray-200
                                ${button === 3 && correct === 1 ? 'bg-emerald-400' : 'none'}
                                ${button === 3 && correct === 2 ? 'bg-red-400' : 'none'}
                                ${disable === true && index === 3 ? 'bg-emerald-400' : 'none'}`}>{selection[2]}</button>
                        <button onClick={(elem) => selectAnswerZero((elem.target as HTMLElement).innerHTML, value, setCorrect, 4, setButton, setDisable, 
                                                        score, setScore, question, size, setFinish, currentQuestion, setCurrentQuestion)}
                            disabled={disable}
                            className={`w-40 h-12 font-medium border border-gray-200
                                ${button === 4 && correct === 1 ? 'bg-emerald-400' : 'none'}
                                ${button === 4 && correct === 2 ? 'bg-red-400' : 'none'}
                                ${disable === true && index === 4 ? 'bg-emerald-400' : 'none'}`}>{selection[3]}</button>
                    </div>
                </div>
            </> : 
            <>
            <p className='w-80 text-center font-semibold text-lg mb-1'>{entry.question}</p>
            { entry.mediaUrl[1] && <Image className='rounded-lg' src={entry.mediaUrl[1]} width={120} height={120} /> }
            <div className='flex flex-col w-96 justify-center items-center'>
                <div className='grid grid-cols-1 gap-2 mt-4'>
                    <button className={`w-80 h-14 font-medium border border-gray-200
                                      ${index === 1 ? 'bg-emerald-400' : 'none'}`}
                        onClick={() => selectAnswerOne(Object.keys(entry.content)[0], setTally, tally, setIndex, 1, size,
                                                       setCurrentQuestion, currentQuestion, 
                                                       setDisable, setFinish)}
                        disabled={disable}>
                        {Object.values(entry.content)[0]}
                    </button>
                    <button className={`w-80 h-14 font-medium border border-gray-200
                                      ${index === 2 ? 'bg-emerald-400' : 'none'}`}
                        onClick={() => selectAnswerOne(Object.keys(entry.content)[1], setTally, tally, setIndex, 2, size,
                                                       setCurrentQuestion, currentQuestion, 
                                                       setDisable, setFinish)}
                        disabled={disable}>
                        {Object.values(entry.content)[1]}
                    </button>
                    <button className={`w-80 h-14 font-medium border border-gray-200
                                      ${index === 3 ? 'bg-emerald-400' : 'none'}`}
                        onClick={() => selectAnswerOne(Object.keys(entry.content)[1], setTally, tally, setIndex, 3, size,
                                                       setCurrentQuestion, currentQuestion, 
                                                       setDisable, setFinish)}
                        disabled={disable}>
                        {Object.values(entry.content)[2]}
                    </button>
                    <button className={`w-80 h-14 font-medium border border-gray-200
                                      ${index === 4 ? 'bg-emerald-400' : 'none'}`}
                        onClick={() => selectAnswerOne(Object.keys(entry.content)[1], setTally, tally, setIndex, 4, size,
                                                       setCurrentQuestion, currentQuestion,
                                                       setDisable, setFinish)}
                        disabled={disable}>
                        {Object.values(entry.content)[3]}
                    </button>
                </div>
            </div>
            </> } 
        </div>
    )
}

const generateEntries = (value: string, info: object, setIndex) => {
    const entries = []
    for (let i = 0; i < 4; ++i) {
        let random = Math.floor(Math.random() * Object.keys(info).length) + 1
        while (info[random] === value || entries.includes(info[random]))
            random = Math.floor(Math.random() * Object.keys(info).length) + 1
            
        entries.push(info[random])
    }
    let random = Math.floor(Math.random() * 4)
    entries[random] = value
    setIndex(random + 1)
    return entries
}

const selectAnswerZero = (selection, value, setCorrect, button, setButton, setDisable, 
                      score, setScore, question, size, setFinish,
                      currentQuestion, setCurrentQuestion) => {
    setDisable(true)
    setButton(button)
    if (selection === value) {
        setCorrect(1)
        setScore(score+1)
    } else {
        setCorrect(2)
    }

    if (question + 1 === size) {
        setFinish(true)
        window.scrollBy({
            top: 500,
            left: 0,
            behavior: 'smooth',
        })
    } else {
        window.scrollBy({
            top: 350,
            left: 0,
            behavior: 'smooth',
        })
    }

    setTimeout(() => setCurrentQuestion(currentQuestion + 1), 100) 
}

const selectAnswerOne = (selection, setTally, tally, setIndex, index, size, setCurrentQuestion, 
                         currentQuestion, setDisable, setFinish) => {
    tally[selection]++
    setTally(tally)
    setIndex(index)
    if (currentQuestion + 1 === size) {
        setFinish(true)
        window.scrollBy({
            top: 500,
            left: 0,
            behavior: 'smooth',
        })
    } else {
        window.scrollBy({
            top: 500,
            left: 0,
            behavior: 'smooth',
        })
    }
    setTimeout(() => setCurrentQuestion(currentQuestion + 1), 100)
    setDisable(true)
}  

export default Entry
