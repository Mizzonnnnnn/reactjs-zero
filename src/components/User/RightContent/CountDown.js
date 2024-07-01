import { useEffect, useState } from "react";

const CountDown = (props) => {
    const { onTimeUp, onTimeMust, show } = props;
    const [count, setCount] = useState(300);

    const a = new Date(count * 1000).toISOString().slice(11, 19);

    useEffect(() => {
        if (show === true) {
            onTimeMust();
            return;
        }
        if (count === 0) {
            onTimeUp();
            return;
        }

        const timer = setInterval(() => {
            setCount(count - 1);
        }, 1000);

        return () => {
            clearInterval(timer);
        }
    }, [count]);

    return (
        <div className="countdown-container">
            <div>{a}</div>
        </div>
    );
}

export default CountDown;
