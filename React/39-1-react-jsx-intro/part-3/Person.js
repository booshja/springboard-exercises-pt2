const Person = (props) => {
    return (
        <div>
            <p>Learn some information about this person</p>
            <p>
                Name:{" "}
                {props.name.length > 8 ? props.name.slice(0, 8) : props.name}
            </p>
            <p>Age: {props.age}</p>
            <p>{props.age > 17 ? "please go vote!" : "you must be 18"}</p>
            <p>Hobbies:</p>
            <ul>
                {props.hobbies.map((h) => (
                    <li>{h}</li>
                ))}
            </ul>
        </div>
    );
};
