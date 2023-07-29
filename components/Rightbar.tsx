import Searchbar from './Searchbar'
import VerifyInter from './VerifyInter'

function Rightbar() {
    return (
        <div className = "pr-48 w-[32%]">
            <Searchbar/>
            <VerifyInter/>
            <div className="bg-twtgray rounded-lg h-64 p-4">
                <h1 className="text-white text-[20px] font-bold">What's Happening</h1>
            </div>
        </div>
    )
}

export default Rightbar;