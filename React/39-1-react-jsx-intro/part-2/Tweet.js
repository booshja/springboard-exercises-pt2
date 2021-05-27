const Tweet = (props) => {
    return (
        <div>
            <h2>{props.username}</h2>
            <h3>{props.name}</h3>
            <h3>{props.date}</h3>
            <p>{props.message}</p>
        </div>
    );
};
