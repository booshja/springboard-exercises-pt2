const App = () => {
    return (
        <div>
            <Tweet
                username="booshja"
                name="Jacob"
                date="27/5/2021"
                message="Hello this is a tweet from me to you!"
            />
            <Tweet
                username="ralph123"
                name="Ralph"
                date="25/5/2021"
                message="Bork! Bork!"
            />
            <Tweet
                username="krewizcool"
                name="Krew"
                date="26/5/2021"
                message="Grr... Bork bork bork. Ruff!"
            />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
