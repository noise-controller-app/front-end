import React from 'react';

function Timer(props) {
    return (
        <div>
            Time: {props.minute.toString().padStart(2, '0')}:{props.second.toString().padStart(2, '0')}
            <button onClick={props.toggleButton}>On/Off</button>
        </div>
    )
}

export default Timer;