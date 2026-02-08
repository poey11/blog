import Navbar from '../components/navbar.tsx'


function About() {
    return(
        <>
            <Navbar />
            <div className="bg-neutral-100 h-screen w-screen flex  justify-center">
                <h1 className="text-4xl font-bold">This is the about page</h1>
            </div>
        </>
    )
}

export default About