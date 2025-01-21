import { useState } from "react";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <div>
                <h1>Welcome to My React App</h1>
                <p>This is the landing page.</p>
                <button onClick={() => setCount((prev) => prev + 1)}>
                    Count: {count}
                </button>
            </div>
        </>
    );
}

export default App;
