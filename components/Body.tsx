import Entry from './Entry'

const Body = ({ images, info, score, setScore, setFinish, currentQuestion, setCurrentQuestion }) => { 
    return (
        <div>
            {Object.entries(info).map(([key, value], index) =>
                <Entry key={key} value={value} score={score} setScore={setScore} setFinish={setFinish}
                       imageUrl={findImage(String(value), images)} 
                       info={info} 
                       question={index}
                       size={Object.entries(info).length}
                       currentQuestion={currentQuestion}
                       setCurrentQuestion={setCurrentQuestion} />)}
        </div>
    )
}

const findImage = (name: string, images) => {
    const searchName = name.toLowerCase().replace(/ /g, '-')
    for (let image of images.data) {
        const imageName = image.attributes.name.split('.', 1)[0]
        if (searchName === imageName)
            return image.attributes.url
    }
}

export default Body
