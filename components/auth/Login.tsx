interface RegisterProps {
    handleSwitchView: () => void;
    email: string;
    password: string;
    setEmail: (newValue: string) => void;
    setPassword: (newValue: string) => void;
    handleLogin: (e: { preventDefault: () => void }) => void;
}

function LoginView({ handleSwitchView, email, password, setEmail, setPassword, handleLogin}: RegisterProps){
    return(
        <section className="">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-neutral-950 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
                        Login
                    </h1>
                    <form className="space-y-4 md:space-y-6">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your email</label>
                            <input type="email" name="email" id="email" value = {email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="name@company.com" required={true} />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" value = {password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" required={true} />
                        </div>
                        <button type = "submit" onClick = {handleLogin} className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login</button>
                        <p className="text-sm font-light text-white">
                            Dont have an account? <button onClick = {handleSwitchView} className="font-medium text-blue-600 hover:underline">Register here</button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
    )
}

export default LoginView;