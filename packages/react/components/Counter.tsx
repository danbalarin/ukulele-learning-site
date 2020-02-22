import React, { ReactElement, useState } from 'react';
import { hot } from 'react-hot-loader/root';

interface Props {}

function Counter({}: Props): ReactElement {
    const [counter, setCounter] = useState(0);

    return (
        <div>
            <h1>Counter valu is: {counter}</h1>
            <br />
            <button onClick={() => setCounter(counter - 1)}>-</button>
            <button onClick={() => setCounter(counter + 1)}>+</button>
        </div>
    );
}

export default hot(Counter);
