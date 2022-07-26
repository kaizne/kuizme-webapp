import { setDefaultResultOrder } from 'dns'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Conclusion = ({ type=0, score=0, triviaScore=0, total=0, character='', characterImageUrl='',
                    conclusion='', category='', subcategory='', title='', 
                    incrementLike, decrementLike, updateLibrary, slug }) => {

    const [profile, setProfile] = useState(false)
    const [like, setLike] = useState(false)
    const [error, setError] = useState(false)
    const [likeText, setLikeText] = useState('Add to library')
    const [likeButton, setLikeButton] = useState(false)
    const animeTitle = getAnimeTitle(subcategory)
    const jsonCharactersPh = {'1':'Light','2':'Near','3':'Mello','4':'L','5':'Rem',
    '6':'Ryuk','7':'Mikami','8':'Matsuda','9':'Soichiro','10':'Misa'}
    const jsonStatsPh = {'1':152,'2':141,'3':100,'4':151,'5':165,'6':71,
    '7':26,'8':137,'9':46,'10':107}

    const jsonStatsArray = []
    for (let i in jsonStatsPh) {
        jsonStatsArray.push(jsonStatsPh[i]);
    }
    const statsTotal = jsonStatsArray.reduce((partialSum, a) => partialSum + a, 0)

    const colourArray = ['bg-indigo-800','bg-indigo-600','bg-sky-700','bg-cyan-600','bg-purple-600',
    'bg-fuchsia-700','bg-pink-700','bg-pink-600','bg-rose-600','bg-red-500','bg-orange-500',
    'bg-amber-500','bg-yellow-400']
    useEffect(() => {
        if (localStorage.getItem('jwt')) setProfile(true)
        else setProfile(false)
        if (localStorage.getItem('user')) {
            const library = JSON.parse(localStorage.getItem('user')).library
            if (library && library.includes(slug)) {
                setLikeText('Remove from library')
                setLike(true)
            }
        }
    }, [])
                        
    let text = 'Nice.'
    if (type === 0) { text = calculatePercentageText(score, total) }
    else if (type === 2) { text = calculatePercentageText(triviaScore, total) }
    let endText = 'You are'
    if (title.includes('Breathing')) { endText = 'You got' }
    else if (title.includes('Kin')) { endText = 'You kin' }
    else if (title.includes('Boyfriend')) { endText = 'Your boyfriend is' }

    const router = useRouter()

    const likeQuiz = () => {
        if (profile) {
            setLikeButton(true)
            setTimeout(() => setLikeButton(false), 2000)
            if (!like) {
                incrementLike() 
                updateLibrary()
                setLikeText('Remove from library')
                setLike(true)
            }
            else if (like) {
                decrementLike() 
                updateLibrary() 
                setLikeText('Add to library')
                setLike(false)
            }  
        } else {
            setError(true)
            setTimeout(() => setError(false), 2000)
        }
    }
    
    switch (type) {
        case 0:
            return (
                <div className='flex flex-col h-screen justify-center items-center'>
                    <div className='text-4xl text-center'>
                        You scored {score}/{total}.
                    </div>
                    <div className='text-3xl text-violet-600'>{text}</div>
                    <div className='flex flex-col items-center mt-4'>
                        <button onClick={() => router.reload()}
                                className='text-xl font-semibold md:hover:text-red-600'>
                            Play Again
                        </button>
                        {/*<div className='flex flex-row mt-2'>
                            <Image src={`${like ? '/red-heart.svg' : '/heart.svg'}`} width={20} height={20} />
                            <button onClick={() => likeQuiz()}
                                    className='ml-1 text-xl font-semibold md:hover:text-red-600'>
                                {likeText}
                            </button>
                        </div>
                        */}
                        {/*<div className={`${error ? 'none' : 'invisible' } mt-1 text-red-500`}>
                            Please sign in to add to library.
                        </div>
                        */}
                    </div>
                    <div className='flex flex-col items-center mt-2'>
                        <Link href={`/anime/${subcategory}`}>
                            <button className='text-xl font-semibold md:hover:text-red-600'>
                            Try Other {animeTitle} Quizzes</button>
                        </Link>
                    </div>
                    <div className='flex flex-col items-center mt-2'>
                        <Link href={`/anime`}>
                            <button className='text-xl font-semibold md:hover:text-red-600'>
                            Browse Anime Quizzes</button>
                        </Link>
                    </div>
                </div>
            )
        case 1:
            return ( 
                <div className='flex flex-col min-h-screen justify-center items-center mt-4 md:mt-0'>
                    <div className='mt-2 text-black text-3xl'>{endText}</div>
                    { characterImageUrl && <Image className='rounded-lg' src={characterImageUrl} width={200} height={200} /> }
                    <div className='text-3xl mt-2 text-violet-600'>{character}</div>
                    <div className='w-80 md:w-96 mt-2 p-2 rounded 
                                    text-lg text-center bg-white shadow'>
                        {conclusion}
                    </div>
                    <div className='flex flex-col items-center mt-4'>
                        <button onClick={() => router.reload()}
                                className='text-xl font-semibold md:hover:text-red-600'>
                            Play Again
                        </button>
                        {/*<div className='flex flex-row mt-2'>
                            <Image src={`${like ? '/red-heart.svg' : '/heart.svg'}`} width={20} height={20} />
                            <button onClick={() => likeQuiz()} disabled={likeButton}
                                    className='ml-1 text-xl font-semibold md:hover:text-red-600'>
                                {likeText}
                            </button>
                        </div>
                        */}
                        {/*<div className={`${error ? 'none' : 'invisible' } mt-1 text-red-500`}>
                            Please sign in to add to library.
                        </div>
                        */}
                    </div>
                    <div className='flex flex-col items-center mt-2'>
                        <Link href={`/anime/${subcategory}`}>
                            <button className='text-xl font-semibold md:hover:text-red-600'>
                            Try Other {animeTitle} Quizzes</button>
                        </Link>
                    </div>
                    <div className='flex flex-col items-center mt-2'>
                        <Link href={`/anime`}>
                            <button className='text-xl font-semibold md:hover:text-red-600'>
                            Browse Anime Quizzes</button>
                        </Link>
                    </div>
                    <div className='flex flex-col w-1/2 items-start space-y-1 mt-4'>
                        {jsonStatsArray.map((element, index) => {
                        const width = (element/statsTotal)*100
                        return (
                            <div key={index} className='flex flex-col w-full'>
                            <div className={`h-[2rem]
                            ${colourArray[index]}`} style={{'width': `${width}%`}}></div>
                            <p className=''>{jsonCharactersPh[index+1]}</p>
                            </div>    
                        )})}
                    </div>
                    
                </div>
            )
        case 2:
            return (
                <div className='flex flex-col h-screen justify-center items-center'>
                    <div className='text-4xl text-center'>
                        You scored {triviaScore}/{total}.</div>
                    <div className='text-3xl text-violet-600'>{text}</div>
                    <div className='flex flex-col items-center mt-4'>
                        <button onClick={() => router.reload()}
                                className='text-xl font-semibold md:hover:text-red-600'>
                            Play Again
                        </button>
                        {/*<div className='flex flex-row items-center mt-2'>
                            <Image src={`${like ? '/red-heart.svg' : '/heart.svg'}`} width={20} height={20} />
                            <button onClick={() => likeQuiz()}
                                    className='ml-1 text-xl font-semibold md:hover:text-red-600'>
                                {likeText}
                            </button>
                        </div>
                        */}
                        {/*<div className={`${error ? 'none' : 'invisible'} mt-1 text-red-500`}>
                            Please sign in to add to library.
                        </div>
                        */}
                    </div>
                    <div className='flex flex-col items-center mt-2'>
                        <Link href={`/anime/${subcategory}`}>
                            <button className='text-xl font-semibold md:hover:text-red-600'>
                            Try Other {animeTitle} Quizzes</button>
                        </Link>
                    </div>
                    <div className='flex flex-col items-center mt-2'>
                        <Link href={`/anime`}>
                            <button className='text-xl font-semibold md:hover:text-red-600'>
                            Browse Anime Quizzes</button>
                        </Link>
                    </div>
                </div>
            )
    }
}

function calculatePercentageText(score=0, total=0) {
    const percentage = 100*score/total
    let text = 'Nice.'
    if (percentage == 0) { text = 'Don\'t worry. We all struggle sometimes.' }
    else if (percentage < 20) { text = 'You just need a little more practice.' }
    else if (percentage < 40) { text = 'You\'re on the right track.' }
    else if (percentage < 60) { text = 'Not bad!' }
    else if (percentage < 80) { text = 'Nice job!' }
    else if (percentage < 100) { text = 'Brilliant! You know just about everything!' }
    else { text = 'Perfect! Your knowledge is impressive.' }
    return text
}

function getAnimeTitle(subcat='') {
    let animeTitleArray = subcat.split('-')
    for (let i = 0; i < animeTitleArray.length; i++) {
        animeTitleArray[i] = animeTitleArray[i][0].toUpperCase() + animeTitleArray[i].substring(1)
    }
    return animeTitleArray.join(' ')
}

export default Conclusion
