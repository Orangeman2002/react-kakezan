import { useEffect, useRef, useState } from 'react'
import WrappedStopwatch, { StopwatchRef } from './Stopwatch'


type Calc = {
    left: number,
    right: number,
    result: number
}



const HomePage = () => {

    const [resultData, setResultData] = useState<Calc[]>([]);

    const [count, setCount] = useState(-1);
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

    const handleIsRunning = (onoff: boolean) => {
        setRunning(onoff)
    }


    useEffect(() => {

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
        //先頭を追加
        list.unshift({
            left: -1,
            right: -1,
            result: -1
        })

        //最後尾を追加
        list.push({
            left: -1,
            right: -1,
            result: -1
        })


        setResultData(list)

    }, [])


    return (
        <div className='w-screen mt-6 container min-h-screen'>

            <div className='mx-12 mb-4 flex justify-between '>

                {/* Start */}
                <button className='bg-green-400 rounded  w-24  whitespace-nowrap px-2 py-4 hover:bg-green-600 hover:text-white duration-300 shadow-lg shadow-gray-400'
                    // Start処理
                    onClick={() => {


                        if (isRunning) {

                            handleIsRunning(false);
                            newRef.current?.handleReset();

                            setCount(-1);
                        }
                        else {
                            handleIsRunning(true);
                            newRef.current?.handleStart();
                            setCount(count + 1);
                        }

                        setEnd(false)

                    }}> {isRunning ? "やりなおし" : "START"}
                </button>

                {isRunning && (<button className='text-sm bg-sky-400 rounded w-24 whitespace-nowrap px-2 py-4 hover:bg-sky-600 hover:text-white duration-300 shadow-lg shadow-gray-400'

                    onClick={() => {

                        if (count >= 80) {
                            newRef.current?.handlePause();
                            setEnd(true)
                        }

                        setCount(count + 1)


                    }}>すすむ！</button>)}
            </div>
            {
                count <= 81 ? (
                    <div>
                        {resultData && resultData.slice(count, count + 2).reverse().map((item, index) => (
                            // 0が上段 1が下段
                            <div className={`${index === 1 ? "text-2xl sm:text-4xl text-orange-400" : "text-6xl sm:text-9xl text-blue-800"}`}
                                key={index}>
                                {item.result < 1 ? (
                                    <></>
                                ) : (
                                    <div className={`flex mx-auto container justify-center`}>
                                        {index === 0 && <div className='text-lg'>{count + 1} 問目</div>}
                                        <div>{item.left}</div>
                                        <div className='mx-2'>×</div>
                                        <div>{item.right}</div>
                                        {index === 1 && <div>=</div>}
                                        {index === 1 && <div>{item.result}</div>}
                                    </div>
                                )}
                            </div>
                        ))}
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