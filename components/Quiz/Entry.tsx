import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const Entry = ({ answer=null, 
                 setScore=null, 
                 setFinish=null, 
                 imageUrl=null, 
                 imageSize=null,
                 info=null, 
                 question=null, 
                 size=null,
                 currentQuestion=null, 
                 setCurrentQuestion=null, 
                 type=0,
                 entry=null,
                 setTally=null,
                 start=false,
                }) => {  

    const [selection, setSelection] = useState([])
    const [colors, setColors] = useState([])
    const [text, setText] = useState([])
    const [disable, setDisable] = useState(false)
    const [correct, setCorrect] = useState(0)
    const [shuffled, setShuffled] = useState(false)
    const [hide, setHide] = useState(false)
    const [animation, setAnimation] = useState(false)
    const [muted, setMuted] = useState(false)
    const [autoPlay, setAutoPlay] = useState(false)

    const [typeZeroImgWidth, setTypeZeroImgWidth] = useState(150) 
    const [typeZeroImgHeight, setTypeZeroImgHeight] = useState(150)

    const [countdown, setCountdown] = useState(100)
    
    // Type 1
    const [choice, setChoice] = useState(0)

    const ad = useRef(null)
    const [adPlaced, setAdPlaced] = useState(false)

    

    useEffect(() => {
        /*
        const script1 = document.createElement('script')
        script1.type = 'text/javascript'
        script1.innerHTML = `atOptions = {
            'key' : 'ec312eeb9e5de0487dec06ffc5328d5d',
            'format' : 'iframe',
            'height' : 50,
            'width' : 320,
            'params' : {}
        };`

        const script2 = document.createElement('script')
        script2.type = 'text/javascript'
        script2.src = '//www.highperformancedisplayformat.com/ec312eeb9e5de0487dec06ffc5328d5d/invoke.js'

        if (!adPlaced && currentQuestion === question) {
            setAdPlaced(true)
            ad.current.appendChild(script1)
            ad.current.appendChild(script2)
        }
        */
    })


    useEffect(() => {
        if (type === 0) {
            if (imageSize[0] / imageSize[1] > 1.5) setTypeZeroImgWidth(typeZeroImgHeight * 16 / 9)
        }
        playAudio()
        if (type === 0) setSelection(generateEntries())
        if (type === 2 || type === 3) {
            for (let i = 0; i < Object.keys(entry.content).length; i++)
                setColors(colors => [...colors, 'bg-white'])
        }
        else {
            setText(['text-black', 'text-black', 'text-black', 'text-black'])
            setColors(['bg-white', 'bg-white', 'bg-white', 'bg-white'])
        }
        if (!shuffled && (type === 2 || type === 3)) {
            entry.content = Object.entries(entry.content)
            entry.content = shuffleArray(entry.content)
            entry.content = Object.fromEntries(entry.content)
            setShuffled(true)
        }
    }, [])

    useEffect(() => {}, [colors, animation])

    useEffect(() => {
        if (start && !disable && currentQuestion === question && countdown > 0) 
            setTimeout(() => setCountdown(countdown - 1), 100)

        if (countdown <= 0) {
            setDisable(true)
            setColors(colors => {
                colors[correct] = 'bg-emerald-400'
                return [...colors]
            })
            setTimeout(() => setAnimation(true), 500)
            setTimeout(() => {
                setAnimation(false)
                setHide(true)
                setFinish(true)
            }, 900)
        }
    }, [currentQuestion, question, countdown])

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
        setDisable(true)
        setTimeout(() => setAnimation(true), 500)
        if (choice === answer) {
            setColors(colors => {
                colors[button] = 'bg-emerald-400'
                return [...colors]
            })
            setText(text => {
                text[button] = 'text-white'
                return [...text]
            })
            setScore(score => score + 1)
            setTimeout(() => {
                setAnimation(false)
                setHide(true)
                setCurrentQuestion(currentQuestion + 1)
                if (currentQuestion + 1 === size) setFinish(true) 
            }, 900)  
        } else {
            setColors(colors => {
                colors[button] = 'bg-red-400'
                colors[correct] = 'bg-emerald-400'
                return [...colors]
            })
            setText(text => {
                text[button] = 'text-white'
                return [...text]
            })
            setTimeout(() => {
                setAnimation(false)
                setHide(true)
                setCurrentQuestion(currentQuestion + 1)
                if (currentQuestion + 1 === size) setFinish(true) 
            }, 900)
        }         
    }

    const selectPersonality = (selection, index) => {
        setDisable(true)
        setTimeout(() => setAnimation(true), 500)

        setTally(tally => {
            let selectionArray = selection.split(',')
            for (let value of selectionArray) {
                if (value[0] != 'x') {
                    if (selectionArray[selectionArray.length - 1][0] == 'x') {
                        tally[value - 1] += Number(selectionArray[selectionArray.length - 1].slice(1))
                    }
                    else {
                        tally[value - 1]++
                    }
                }
            }
            return tally
        })
        setChoice(index)
        setTimeout(() => {
            setAnimation(false)
            setHide(true)
            setCurrentQuestion(currentQuestion + 1)
            if (currentQuestion + 1 === size) setFinish(true)
        }, 900)
    }

    const selectTrivia = (selection, index) => {
        setDisable(true)
        setTimeout(() => setAnimation(true), 500)

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
            setAnimation(false)
            setHide(true)
            setCurrentQuestion(currentQuestion + 1)
            if (currentQuestion + 1 === size) setFinish(true)
        }, 900)
    }

    const selectAudio = (selection, index) => {
        setMuted(true)
        setDisable(true)
        setTimeout(() => setAnimation(true), 500)
        
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
            setAnimation(false)
            setHide(true)
            setCurrentQuestion(currentQuestion + 1)
            if (currentQuestion + 1 === size) setFinish(true)
        }, 900)
    }

    const playAudio = () => {
        if (start && currentQuestion === question) {
            setTimeout(() => setAutoPlay(true), 500)
        }
    }

    return (
        <>
        <div className={`flex flex-col items-center
            ${currentQuestion >= question ? 'none' : 'hidden'} 
            ${currentQuestion === question ? 'animate-fadeIn' : 'none'}
            ${animation ? 'animate-fadeOut' : 'none'}
            ${hide ? 'hidden' : 'none'}`}>
            <p className={`w-20 text-center font-medium text-xl mb-2 ${type !== 0 && 'border-b-2'}`}>
                <span className='text-indigo-600'>{question + 1}</span>
                <span className='font-normal'> / </span> 
                {size}
            </p>
            { type === 0 && 
                <>
                <div className='w-64 bg-indigo-200 mb-2 rounded'>
                    <div style={{ width: `${countdown}%`, transition: '0.1s linear' }} className='h-2 bg-indigo-500 rounded'></div>
                </div>
                { imageUrl && 
                    <div className='relative w-72 h-40'>
                            <Image className='rounded' src={imageUrl} layout='fill' priority/>
                    </div>
                }
                <div className='flex flex-col justify-center items-center'>
                    <div className='grid grid-cols-2 gap-2 mt-4'>
                        { selection.map((elem, index) =>
                            <button key={index}
                                    onClick={(val) => selectCharacter((val.target as HTMLElement).innerHTML, index)}
                                    disabled={disable}
                                    className={`w-40 h-16 p-1 rounded text-lg font-semibold shadow-sm 
                                        ${colors[index]} ${text[index]}`}>
                                    {elem}
                            </button>
                        )}
                    </div>
                </div>
                </> 
            }
            { type === 1 &&
                <>
                <p className='w-80 text-center font-semibold text-lg mb-1'>{entry.question}</p>
                { entry.media && <Image className='rounded' src={entry.media.data[0].attributes.url} priority 
                                              width={150} height={150} /> }
                <div className='flex flex-col w-96 justify-center items-center'>
                    <div className='grid grid-cols-1 gap-y-2 mt-4'>
                        { Object.keys(entry.content).map((elem, index) => 
                            <button key={index}
                                    className={`w-80 h-14 pl-2 pr-2 pt-1 pb-1 rounded shadow-sm
                                                text-md font-medium
                                                ${choice === index && disable ? 'bg-violet-500 text-white' : 'bg-white'}`}
                                    onClick={() => selectPersonality(elem, index)}
                                    disabled={disable}>
                                    {entry.content[elem]}
                            </button>   
                        )}
                    </div>
                </div>
                </>
            }
            { type === 2 &&
                <>
                <p className='w-80 text-center font-semibold text-lg mb-1'>{entry.question}</p>
                <div className='relative w-80 h-44'>
                { entry.media && <Image className='rounded' src={entry.media.data[0].attributes.url} 
                                              layout='fill' priority /> }
                </div>
                <div className='flex flex-col w-96 justify-center items-center'>
                    <div className='grid grid-cols-1 gap-y-2 mt-4'>
                        { Object.keys(entry.content).map((elem, index) => 
                            <button key={index}
                                    className={`w-80 h-14 pl-2 pr-2 pt-1 pb-1 rounded shadow-sm
                                                text-md font-medium ${colors[index]}`}
                                    onClick={() => selectTrivia(elem, index)}
                                    disabled={disable}>
                                    {entry.content[elem]}
                            </button>
                        )}
                    </div>
                </div>
                </>
            }
            { type === 3 && 
                <>
                {currentQuestion === question && start ? playAudio() : ''}
                <p className='w-80 text-center font-semibold text-lg mb-1'>{entry.question}</p>
                <audio controls src={entry.media.data[0].attributes.url} muted={muted} 
                        autoPlay={autoPlay}></audio>
                <div className='grid grid-cols-1 gap-y-2 mt-4'>
                            { Object.keys(entry.content).map((elem, index) => 
                                <button key={index}
                                        className={`w-80 h-14 pl-2 pr-2 pt-1 pb-1 rounded shadow-sm
                                                    text-md font-medium ${colors[index]}`}
                                        onClick={() => selectAudio(elem, index)}
                                        disabled={disable}>
                                        {entry.content[elem]}
                                </button>
                            )}
                        </div>
                </> 
            }
            { /* <div ref={ad} className='mt-4'></div> */ }
            </div>
        </>
    )
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

export default Entry
