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
    const [choice, setChoice] = useState(0)
    const [hide, setHide] = useState(false)

    useEffect(() => {
        if (type === 0)
            setSelection(generateEntries(value, info, setChoice))
    }, [])

    return (
        <div className={`flex
            ${currentQuestion >= question ? 'none' : 'hidden'} 
            ${currentQuestion === question ? 'animate-fadeIn' : 'none'}
            ${disable === true ? 'animate-fadeOut' : 'none'}
            ${hide === true ? 'hidden' : 'none'} flex-col items-center scroll-smooth`}>
            <p className='w-20 text-center font-medium text-lg mb-2 border-b-2'>
                <span className='text-sky-500'>{question + 1}</span>
                <span className='font-normal'> / </span> 
                {size}
            </p>
        { type === 0 ? 
            <>
            { imageUrl && <Image className='rounded-lg' src={imageUrl} width={120} height={120} /> }
            <div className='flex flex-col w-96 justify-center items-center'>
                <div className='grid grid-cols-2 gap-2 mt-4'>
                    <button onClick={(elem) => selectAnswerZero((elem.target as HTMLElement).innerHTML, value, setCorrect, 1, setButton, setDisable, 
                                                    score, setScore, question, size, setFinish, currentQuestion, setCurrentQuestion, setHide)}
                        disabled={disable}
                        className={`w-40 h-12 font-medium border border-gray-200 rounded 
                            ${button === 1 && correct === 1 ? 'bg-emerald-400' : 'none'}
                            ${button === 1 && correct === 2 ? 'bg-red-400' : 'none'}
                            ${disable === true && choice === 1 ? 'bg-emerald-400' : 'none'}`}>{selection[0]}</button>
                    <button onClick={(elem) => selectAnswerZero((elem.target as HTMLElement).innerHTML, value, setCorrect, 2, setButton, setDisable, 
                                                    score, setScore, question, size, setFinish, currentQuestion, setCurrentQuestion, setHide)}
                        disabled={disable}
                        className={`w-40 h-12 font-medium border border-gray-200 rounded
                            ${button === 2 && correct === 1 ? 'bg-emerald-400' : 'none'}
                            ${button === 2 && correct === 2 ? 'bg-red-400' : 'none'}
                            ${disable === true && choice === 2 ? 'bg-emerald-400' : 'none'}`}>{selection[1]}</button>
                    <button onClick={(elem) => selectAnswerZero((elem.target as HTMLElement).innerHTML, value, setCorrect, 3, setButton, setDisable, 
                                                    score, setScore, question, size, setFinish, currentQuestion, setCurrentQuestion, setHide)}
                        disabled={disable}
                        className={`w-40 h-12 font-medium border border-gray-200 rounded
                            ${button === 3 && correct === 1 ? 'bg-emerald-400' : 'none'}
                            ${button === 3 && correct === 2 ? 'bg-red-400' : 'none'}
                            ${disable === true && choice === 3 ? 'bg-emerald-400' : 'none'}`}>{selection[2]}</button>
                    <button onClick={(elem) => selectAnswerZero((elem.target as HTMLElement).innerHTML, value, setCorrect, 4, setButton, setDisable, 
                                                    score, setScore, question, size, setFinish, currentQuestion, setCurrentQuestion, setHide)}
                        disabled={disable}
                        className={`w-40 h-12 font-medium border border-gray-200 rounded
                            ${button === 4 && correct === 1 ? 'bg-emerald-400' : 'none'}
                            ${button === 4 && correct === 2 ? 'bg-red-400' : 'none'}
                            ${disable === true && choice === 4 ? 'bg-emerald-400' : 'none'}`}>{selection[3]}</button>
                </div>
            </div>
            </> : 
            <>
            <p className='w-80 text-center font-semibold text-lg mb-1'>{entry.question}</p>
            { entry.mediaUrl[1] && <Image className='rounded-lg' src={entry.mediaUrl[1]} width={120} height={120} /> }
            <div className='flex flex-col w-96 justify-center items-center'>
                <div className='grid grid-cols-1 gap-2 mt-4'>
                    { Object.keys(entry.content).map((elem, index) => {
                        return (
                            <button className={`w-80 h-14 font-medium border border-gray-200 rounded
                                                ${choice === index && disable ? 'bg-emerald-400' : 'none'}`}
                                    onClick={() => 
                                        selectAnswerOne(elem, setTally, tally, setChoice, index, size,
                                                        setCurrentQuestion, currentQuestion, 
                                                        setDisable, setFinish, setHide)}
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
                          currentQuestion, setCurrentQuestion, setHide) => {
    setDisable(true)
    setButton(button)
    if (selection === value) {
        setCorrect(1)
        setScore(score+1)
    } else {
        setCorrect(2)
    }

    if (question + 1 === size)
        setFinish(true)

    setTimeout(() => setCurrentQuestion(currentQuestion + 1), 750) 
    setTimeout(() => setHide(true), 750)
}

const selectAnswerOne = (selection, setTally, tally, setIndex, index, size, setCurrentQuestion, 
                         currentQuestion, setDisable, setFinish, setHide) => {
    tally[selection]++
    setTally(tally)
    setIndex(index)

    /*
    window.scrollBy({
        top: 650,
        left: 0,
        behavior: 'smooth',
    })
    */
    
    if (currentQuestion + 1 === size) {
        setFinish(true)
    }
    setTimeout(() => setCurrentQuestion(currentQuestion + 1), 750)
    setTimeout(() => setHide(true), 750)
    setDisable(true)
}  

export default Entry
