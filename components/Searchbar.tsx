function Searchbar() {
    return (
        <form className="flex items-center pt-2 pb-4">
            <label htmlFor="simple-search" className="sr-only text-textgray">Search</label>
            <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className = "text-textgray focus:text-twtblue">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                    </span>
                </div>
                <input type="text" id="simple-search" className="bg-twtsearch border border-twtgray placeholder:text-textgray text-white text-sm rounded-2xl focus:bg-black focus:border-twtblue focus:outline-none block w-full pl-10 p-2.5" placeholder="Search Twitter" required />
            </div>
        </form>
    )
}

export default Searchbar;