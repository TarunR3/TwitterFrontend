interface RegisterProps {
    handleSwitchView: () => void;
    email: string;
    displayname: string;
    handle: string;
    password: string;
    confirmPassword: string;
    setEmail: (newValue: string) => void;
    setUsername: (newValue: string) => void;
    setHandle: (newValue: string) => void;
    setPassword: (newValue: string) => void;
    setConfirmPassword: (newValue: string) => void;
    handleSubmit: (e: { preventDefault: () => void }) => void;
}

function Register({ handleSwitchView, email, displayname, handle, password, confirmPassword, setEmail, setUsername, setHandle, setPassword, setConfirmPassword, handleSubmit }: RegisterProps) {
    return (
        <section className="">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-neutral-950 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
                            Create and account
                        </h1>
                        <form className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your email</label>
                                <input type="email" name="email" id="email" value = {email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="name@company.com" required={true} />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-white">Username</label>
                                <input value = {displayname} onChange={(e) => setUsername(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="geniusname123" required={true} />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-white">Handle</label>
                                <input value = {handle} onChange={(e) => setHandle(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="geniusname123" required={true} />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" value = {password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" required={true} />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Confirm password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" value = {confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" required={true} />
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" required={true} />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-light text-white">I accept the <a className="font-medium text-blue-600 hover:underline" href="#">Terms and Conditions</a></label>
                                </div>
                            </div>
                            <button type="submit" onClick = {handleSubmit} className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>
                            <p className="text-sm font-light text-white">
                                Already have an account? <button onClick={handleSwitchView} className="font-medium text-blue-600 hover:underline">Login here</button>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
};
export default Register;