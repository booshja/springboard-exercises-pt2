const App = () => {
    return (
        <div>
            <Person
                name="Jacob"
                age="31"
                hobbies={["coding", "hockey", "dogs"]}
            />
            <Person
                name="Krew"
                age="56"
                hobbies={["sleeping", "licking", "watching"]}
            />
            <Person
                name="Ralph"
                age="7"
                hobbies={["barking", "wrestling", "cuddling"]}
            />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
