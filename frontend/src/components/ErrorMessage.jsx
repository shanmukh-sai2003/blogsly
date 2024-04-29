function ErrorMessage(props) {
    const {message} = props;
    return (
        <>
            <p className="text-xl text-red-700 m-4 p-2">{message}</p>
        </>
    );
}

export default ErrorMessage;