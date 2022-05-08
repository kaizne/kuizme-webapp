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
            setSelection(generateEntries())
    }, [])

    const generateEntries = () => {
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

    const selectCharacter = (choice, button) => {
        if (choice === answer) {
            setColors(colors => {
                colors[button] = 'bg-emerald-400'
                return colors
            })
            setScore(score => score + 1)
        } else {
            setColors(colors => {
                colors[button] = 'bg-red-400'
                colors[correct] = 'bg-emerald-400'
                return colors
            })
        }
        setDisable(true)   
        setTimeout(() => {
            setCurrentQuestion(currentQuestion + 1)
            scroll(currentQuestion + 1)
            if (currentQuestion + 1 === size)
                setFinish(true) 
        }, 100)    
    }

    const selectPersonality = (selection, index) => {
        setTally(tally => {
            tally[selection]++
            return tally
        })
        setChoice(index)
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

    return (
        <div className={`min-h-screen flex flex-col items-center scroll-smooth pt-24 mb-60
            ${currentQuestion >= question ? 'none' : 'hidden'} 
            ${currentQuestion === question ? 'animate-fadeIn' : 'none'}`}>
            <p className='w-20 text-center font-medium text-xl mb-2 border-b-2 border-gray-300'>
                <span className='text-sky-500'>{question + 1}</span>
                <span className='font-normal'> / </span> 
                {size}
            </p>
        { type === 0 ? 
            <>
            { imageUrl && <Image className='rounded' src={imageUrl} width={150} height={150} /> }
            <div className='flex flex-col justify-center items-center'>
                <div className='grid grid-cols-2 gap-2 mt-4'>
                    { selection.map((elem, i) =>
                        <button key={i}
                                onClick={(val) => selectCharacter((val.target as HTMLElement).innerHTML, i)}
                                disabled={disable}
                                className={`w-40 h-16 pl-1 pr-1
                                            text-lg font-medium rounded shadow-sm ${colors[i]}`}>
                                {elem}
                        </button>
                    )}
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
                            <button className={`w-80 h-16 p-2 rounded shadow-sm
                                                font-medium
                                                ${choice === index && disable ? 'bg-sky-400' : 'bg-white'}`}
                                    onClick={() => 
                                        selectPersonality(elem, index)}
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

export default Entry
