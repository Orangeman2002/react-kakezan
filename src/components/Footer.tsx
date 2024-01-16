
const Footer = () => {

    return (
        <footer className="sticky top-[100vh] border-0  w-full border-t bg-blue-800 text-white px-12">
            <div className="">
                <div className="flex justify-between">    
                    <div>contact</div>
                    {/* <div>hello</div> */}
                </div>
                <div className="flex justify-end ">
                    <div>
                        {/* <div className="">Hello</div> */}
                        <div className="text-sm ">Designed by OrangeDev. Icons by <a href="https://icons8.jp/">Icon8</a></div>
                    </div>
                </div>
            </div>

        </footer>
    )
}

export default Footer