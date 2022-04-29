import Entry from './Entry'

const Body = ({ images, info }) => {  
    return (
        <div>
            {Object.entries(info).map(([key, value]) =>
                <Entry key={key} value={value} imageUrl={findImage(String(value), images)} />)}
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
