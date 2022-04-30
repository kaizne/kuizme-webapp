const Intro = ({ title, intro, setStart }) => (
    <div>
        <h1 className='text-center text-xl font-bold'>{title}</h1>
        <p className='text-center'>{intro}</p>
        <div className='text-center mt-1'>
            <button onClick={() => setStart(true)}
            className='w-16 rounded pt-1 pb-1 bg-emerald-400 text-white font-bold'>Play</button>
            <button className='w-16 rounded pt-1 pb-1 bg-emerald-400 text-white font-bold'>Play</button>
        </div>
    </div>
)

export default Intro
