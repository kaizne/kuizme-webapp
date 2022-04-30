import Image from 'next/image'
import { useState, useEffect } from 'react'

const Entry = ({ value, imageUrl, info, 
                score, setScore, setFinish, question, size,
                currentQuestion, setCurrentQuestion }) => {  
    const [selection, setSelection] = useState([])
    const [button, setButton] = useState(0)
    const [correct, setCorrect] = useState(0)
    const [disable, setDisable] = useState(false)
    const [index, setIndex] = useState(0)

    useEffect(() => {
        setSelection(generateEntries(value, info, setIndex))
    }, [])

    return (
        <div className={`flex 
            ${currentQuestion >= question ? 'none' : 'invisible'} 
            ${currentQuestion == question ? 'animate-fadeIn' : 'none'} flex-col items-center scroll-smooth mt-8`}>
            <p className='font-semibold text-lg mb-1'>Who is this character?</p>
            { imageUrl && <Image className='rounded-lg' src={imageUrl} width={90} height={90} /> }
            <div className='flex flex-col w-96 justify-center items-center'>
                <div className='grid grid-cols-2 gap-2 mt-4'>
                    <button onClick={(elem) => selectAnswer((elem.target as HTMLElement).innerHTML, value, setCorrect, 1, setButton, setDisable, 
                                                    score, setScore, question, size, setFinish, currentQuestion, setCurrentQuestion)}
                        disabled={disable}
                        className={`w-40 h-10 font-semibold border border-gray-200 
                            ${button === 1 && correct === 1 ? 'bg-emerald-400' : 'none'}
                            ${button === 1 && correct === 2 ? 'bg-red-400' : 'none'}
                            ${disable === true && index === 1 ? 'bg-emerald-400' : 'none'}`}>{selection[0]}</button>
                    <button onClick={(elem) => selectAnswer((elem.target as HTMLElement).innerHTML, value, setCorrect, 2, setButton, setDisable, 
                                                    score, setScore, question, size, setFinish, currentQuestion, setCurrentQuestion)}
                        disabled={disable}
                        className={`w-40 h-10 font-semibold border border-gray-200
                            ${button === 2 && correct === 1 ? 'bg-emerald-400' : 'none'}
                            ${button === 2 && correct === 2 ? 'bg-red-400' : 'none'}
                            ${disable === true && index === 2 ? 'bg-emerald-400' : 'none'}`}>{selection[1]}</button>
                    <button onClick={(elem) => selectAnswer((elem.target as HTMLElement).innerHTML, value, setCorrect, 3, setButton, setDisable, 
                                                    score, setScore, question, size, setFinish, currentQuestion, setCurrentQuestion)}
                        disabled={disable}
                        className={`w-40 h-10 font-semibold border border-gray-200
                            ${button === 3 && correct === 1 ? 'bg-emerald-400' : 'none'}
                            ${button === 3 && correct === 2 ? 'bg-red-400' : 'none'}
                            ${disable === true && index === 3 ? 'bg-emerald-400' : 'none'}`}>{selection[2]}</button>
                    <button onClick={(elem) => selectAnswer((elem.target as HTMLElement).innerHTML, value, setCorrect, 4, setButton, setDisable, 
                                                    score, setScore, question, size, setFinish, currentQuestion, setCurrentQuestion)}
                        disabled={disable}
                        className={`w-40 h-10 font-semibold border border-gray-200
                            ${button === 4 && correct === 1 ? 'bg-emerald-400' : 'none'}
                            ${button === 4 && correct === 2 ? 'bg-red-400' : 'none'}
                            ${disable === true && index === 4 ? 'bg-emerald-400' : 'none'}`}>{selection[3]}</button>
                </div>
            </div>
        </div>
    )
}

const generateEntries = (value: string, info: object, setIndex) => {
    console.log('Test')
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

const selectAnswer = (selection, value, setCorrect, button, setButton, setDisable, 
                      score, setScore, question, size, setFinish,
                      currentQuestion, setCurrentQuestion) => {
    setDisable(true)
    setButton(button)
    console.log(selection)
    console.log(value)
    if (selection === value) {
        setCorrect(1)
        setScore(score+1)
    } else {
        setCorrect(2)
    }

    if (question + 1 === size)
        setFinish(true)

    setTimeout(() => setCurrentQuestion(currentQuestion + 1), 100)
    window.scrollBy({
        top: 200,
        left: 0,
        behavior: 'smooth',
    })
}

export default Entry
