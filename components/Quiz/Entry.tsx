import { useState, useEffect } from 'react'
import Image from 'next/image'

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
                 scrollConclusion=null,
                }) => {  

    const [selection, setSelection] = useState([])
    const [disable, setDisable] = useState(false)
    const [correct, setCorrect] = useState(0)
    const [shuffled, setShuffled] = useState(false)
    
    let colorArray = []
    if (type === 2) {
        for (let i = 0; i < Object.keys(entry.content).length; i++) {
            colorArray.push('bg-white')
        }
    }
    else {
        colorArray = ['bg-white', 'bg-white', 'bg-white', 'bg-white']
    }
    const [colors, setColors] = useState(colorArray)
        
    // Type 1
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
            if (currentQuestion + 1 === size) {
                setFinish(true) 
                scrollConclusion()
            } else {
                scroll(currentQuestion + 1)
            }     
        }, 100)    
    }

    const selectPersonality = (selection, index) => {
        setTally(tally => {
            let selectionArray = selection.split(',')
            for (let value of selectionArray) {
                tally[value - 1]++
            }
            return tally
        })
        setChoice(index)
        setTimeout(() => {
            setCurrentQuestion(currentQuestion + 1)
            if (currentQuestion + 1 === size) {
                setFinish(true)
                scrollConclusion()
            } else {
                scroll(currentQuestion + 1)
            }  
        }, 100)
        setDisable(true)
    }

    const selectTrivia = (selection, index) => {
        const correct = Object.keys(entry.content).indexOf('a')
        if (selection === 'a') {
            setColors(colors => {
                colors[index] = 'bg-emerald-400'
                return colors
            })
        } else {
            setColors(colors => {
                colors[index] = 'bg-red-400'
                colors[correct] = 'bg-emerald-400'
                return colors
            })
        }
        setTally(tally => {
            if (selection === 'a') { tally[0]++ }
            return tally
        })
        setChoice(index)
        setTimeout(() => {
            setCurrentQuestion(currentQuestion + 1)
            if (currentQuestion + 1 === size) {
                setFinish(true)
                scrollConclusion()
            } else {
                scroll(currentQuestion + 1)
            }  
        }, 100)
        setDisable(true)  
    }
    if (!shuffled && type == 2) {
        entry.content = Object.entries(entry.content)
        entry.content = shuffleArray(entry.content)
        entry.content = Object.fromEntries(entry.content)
        setShuffled(true)
    }

    return ( returnEntry( type, currentQuestion, question, size, imageUrl, selection, disable, 
        colors, entry, choice, selectCharacter, selectPersonality, selectTrivia ) )
}

function returnEntry ( type, currentQuestion, question, size, imageUrl, selection, disable, colors,
    entry, choice, selectCharacter, selectPersonality, selectTrivia ) {
    switch (type) {
        case 0:
            return (
            <div className={`min-h-screen flex flex-col items-center scroll-smooth pt-20  mb-60
            ${currentQuestion >= question ? 'none' : 'hidden'} 
            ${currentQuestion === question ? 'animate-fadeIn' : 'none'}`}>
                <p className='w-20 text-center font-medium text-xl mb-2 border-b-2 border-gray-300'>
                    <span className='text-sky-500'>{question + 1}</span>
                    <span className='font-normal'> / </span> 
                    {size}
                </p>
                { imageUrl && <Image className='rounded' src={imageUrl} width={150} height={150} /> }
                <div className='flex flex-col justify-center items-center'>
                    <div className='grid grid-cols-2 gap-2 mt-4'>
                        { selection.map((elem, i) =>
                            <button key={i}
                                    onClick={(val) => selectCharacter((val.target as HTMLElement).innerHTML, i)}
                                    disabled={disable}
                                    className={`w-40 h-16 p-1
                                                text-lg font-medium rounded shadow-sm ${colors[i]}`}>
                                    {elem}
                            </button>
                        )}
                    </div>
                </div>
            </div>
            )
        case 1:
            return (
            <div className={`min-h-screen flex flex-col items-center scroll-smooth pt-20  mb-60
            ${currentQuestion >= question ? 'none' : 'hidden'} 
            ${currentQuestion === question ? 'animate-fadeIn' : 'none'}`}>
                <p className='w-20 text-center font-medium text-xl mb-2 border-b-2 border-gray-300'>
                    <span className='text-sky-500'>{question + 1}</span>
                    <span className='font-normal'> / </span> 
                    {size}
                </p>
                <p className='w-80 text-center font-semibold text-lg mb-1'>{entry.question}</p>
                { entry.mediaUrl[1] && <Image className='rounded' src={entry.mediaUrl[1]} width={150} height={150} /> }
                <div className='flex flex-col w-96 justify-center items-center'>
                    <div className='grid grid-cols-1 gap-y-2 mt-4'>
                        { Object.keys(entry.content).map((elem, index) => {
                            return (
                                <button className={`w-80 h-14 pl-2 pr-2 pt-1 pb-1 rounded shadow-sm
                                                    text-md font-medium
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
            </div>
            )
        case 2:
            return (
            <div className={`min-h-screen flex flex-col items-center scroll-smooth pt-20  mb-60
            ${currentQuestion >= question ? 'none' : 'hidden'} 
            ${currentQuestion === question ? 'animate-fadeIn' : 'none'}`}>
                <p className='w-20 text-center font-medium text-xl mb-2 border-b-2 border-gray-300'>
                    <span className='text-sky-500'>{question + 1}</span>
                    <span className='font-normal'> / </span> 
                    {size}
                </p>
                <p className='w-80 text-center font-semibold text-lg mb-1'>{entry.question}</p>
                { entry.mediaUrl[1] && <Image className='rounded' src={entry.mediaUrl[1]} width={150} height={150} /> }
                <div className='flex flex-col w-96 justify-center items-center'>
                    <div className='grid grid-cols-1 gap-y-2 mt-4'>
                        { Object.keys(entry.content).map((elem, index) => {
                            let color = 'bg-red-400'
                            if (elem === 'a') { color = 'bg-emerald-400' }
                            return (
                                <button className={`w-80 h-14 pl-2 pr-2 pt-1 pb-1 rounded shadow-sm
                                                    text-md font-medium ${colors[index]}`}
                                        onClick={() => 
                                            selectTrivia(elem, index)}
                                        disabled={disable}>
                                        {entry.content[elem]}
                                </button>
                            )
                        }) }
                    </div>
                </div>
            </div>
            )
    }
}
// ${choice === index && disable ? `${color}` : 'bg-white'}`

function shuffleArray (array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}

export default Entry
