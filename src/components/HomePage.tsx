import { useEffect, useRef, useState } from 'react'
import WrappedStopwatch, { StopwatchRef } from './Stopwatch'


type Calc = {
    left: number,
    right: number,
    result: number
}



const HomePage = () => {

    const [resultData, setResultData] = useState<Calc[]>([]);

    const [count, setCount] = useState(0);
    const [isRunning, setRunning] = useState(false);
    const [isEnd, setEnd] = useState(false);

    const newRef = useRef<StopwatchRef>(null);

    // シャッフルする処理
    const shuffleArray = (array: Calc[]) => {

        const cloneArray = [...array]

        for (let i = cloneArray.length - 1; i >= 0; i--) {

            // 0からiまでのランダムな数値を出してからiの位置のものと入れ替え
            const rand = Math.floor(Math.random() * (i + 1))
            // 配列の要素の順番を入れ替える
            const tmpStorage = cloneArray[i]
            cloneArray[i] = cloneArray[rand]
            cloneArray[rand] = tmpStorage
        }

        return cloneArray
    }

    // 通常スタート
    const handleIsRunning = (onoff: boolean) => {

        setRunning(onoff)

    }

    const createQuestions = () => {

        let list: Calc[] = [];

        for (let i = 1; i <= 9; i++) {

            for (let j = 1; j <= 9; j++) {

                list.push({
                    left: i,
                    right: j,
                    result: i * j
                })
            }
        }

        //シャッフル       
        list = shuffleArray(list)

        setResultData(list)

        console.log(list.length)
    }

    // 数値の初期化
    useEffect(() => {

        createQuestions()

    }, [])

    // 問題を作成
    const getQuestion = () => {

        // 問題
        let q1 = null

        if (resultData.length > count) {
            q1 = resultData[count]
        }

        //前の問題の答え
        const q0 = resultData[count - 1]


        return (
            <>
                {q1 != null && <div className={`"text-6xl sm:text-9xl text-blue-800"}`}>
                    <div className={`flex mx-auto container justify-center`}>
                        <div className='text-lg'>{count + 1} 問目</div>
                        <div>{q1.left}</div>
                        <div className='mx-2'>×</div>
                        <div>{q1.right}</div>

                    </div>
                </div>}
                <div className='text-2xl text-orange-400 sm:text-3xl'>
                    {q0 != null && (<div className={`flex mx-auto container justify-center`}>

                        <div>{q0.left}</div>
                        <div className='mx-2'>×</div>
                        <div>{q0.right}</div>
                        <div className='mx-2'>=</div>
                        <div>{q0.result}</div>
                    </div>)}
                </div>
            </>
        )

    }

    const createQButton = (q_count: number) => {

        // 81問のボタンだけやり直し表示
        const buttondsp = q_count === 81 || !isRunning

        console.log(buttondsp)

        return (

            <div >
                {buttondsp && (<button className='bg-green-400 rounded  w-32  px-2 py-4 hover:bg-green-600 hover:text-white duration-300 shadow-lg shadow-gray-400'
                    // Start処理
                    onClick={() => {

                        if (isRunning) {
                            //停止
                            handleIsRunning(false);
                            newRef.current?.handleReset();

                            //巻き戻し
                            setCount(-1);
                            // 問題を初期化
                            createQuestions()
                        }
                        else {

                            // 問題数を指定
                            setResultData(resultData.slice(81 - q_count))

                            handleIsRunning(true);
                            newRef.current?.handleStart();
                            setCount(count + 1);
                        }

                        setEnd(false)

                    }}> {isRunning ? "やりなおし" : `${q_count} 問 START`}

                </button>)}
            </div>
        )
    }

    return (
        <div className='w-screen mt-6 container min-h-screen'>

            <div className='mx-12 mb-4 flex justify-between '>
                {createQButton(81)}
                {createQButton(10)}
                {createQButton(40)}

                {/* 進むボタン */}
                {isRunning && (<button className='text-sm bg-sky-400 rounded w-24 whitespace-nowrap px-2 py-4 hover:bg-sky-600 hover:text-white duration-300 shadow-lg shadow-gray-400'

                    onClick={() => {

                        if (count >= resultData.length - 1) {
                            newRef.current?.handlePause();
                            setEnd(true)
                        }

                        setCount(count + 1)


                    }}>すすむ！</button>)}
            </div>
            {
                // 問題数を超えたらクリア
                count <= resultData.length ? (
                    <div>
                        {
                            getQuestion()
                        }
                    </div>

                ) : <h2 className='  text-6xl sm:text-8xl py-6 text-center text-yellow-200 bg-fuchsia-500'>CLEAR</h2>
            }

            <WrappedStopwatch {...{
                className: 'container mx-auto text-center text-4xl sm:text-6xl',
                setRunning: setRunning,
                isRunning: isRunning,
                isEnd: isEnd
            }} ref={newRef}></WrappedStopwatch>
        </div >
    )
}

export default HomePage