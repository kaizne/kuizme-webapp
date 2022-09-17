import Comment from './Comment'

const Comments = (comments) => {
    return (
        <>
        { comments.map((elem, key) => {
            <Comment key={key} />
        })}
        </>
    )
}

export default Comments
