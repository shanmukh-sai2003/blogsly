function Comment(props) {
    const {username, message} = props;

    return (
        <div className="m-4 p-4 text-left border rounded-lg w-[50vw] shadow-lg">
            <h3 className="font-bold">{username}</h3>
            <p>{message}</p>
        </div>
    );
}

export default Comment;