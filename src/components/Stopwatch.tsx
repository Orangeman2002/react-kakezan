import { useState, useRef, forwardRef, useImperativeHandle, Ref, Dispatch } from 'react';

export type StopwatchRef = {

    handleStart: () => void;
    handlePause: () => void;
    handleReset: () => void;
}

type StopwatchProps = {
    text?: string
    className: string
    setRunning: Dispatch<React.SetStateAction<boolean>>
    isRunning: boolean
    isEnd: boolean
}

const Stopwatch = (props: StopwatchProps, ref: Ref<StopwatchRef>) => {

    const [time, setTime] = useState(0);
    const intervalRef = useRef<number | null>(null);

    // 親コンポーネントから参照する
    useImperativeHandle(ref, () => {

        return {

            handleStart() {
                props.setRunning(true);
                intervalRef.current = setInterval(() => {
                    setTime(prevTime => prevTime + 10);
                }, 10);


            },
            handlePause() {
                clearInterval(intervalRef.current!);
                props.setRunning(true);

            },
            handleReset() {
                clearInterval(intervalRef.current!);
                props.setRunning(false);
                setTime(0);
            }
        }
    });



    const milliseconds = `${Math.floor((time % 1000) / 100)}`;
    const seconds = `0${Math.floor(time / 1000) % 60}`.slice(-2);
    const minutes = `${Math.floor(time / 60000) % 60}`.slice(-2);


    return (
        <>
            {props.isEnd && <div className='text-center text-2xl text-red-400'>タイム</div>}
            <div className={`${props.className} ${props.isEnd&&"text-red-500"}`}>
                {/* <h1>Stopwatch</h1> */}
                {/* {hours}:{minutes}:{seconds}:{milliseconds} */}
                {minutes}:{seconds}.{milliseconds}
                {
                    props.isRunning && <div></div>
                }
            </div>
        </>
    );
};

const WrappedStopwatch = forwardRef(Stopwatch);

export default WrappedStopwatch;
