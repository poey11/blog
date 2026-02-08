import Navbar from '../components/navbar.tsx'


function About() {
    return(
        <>
            <Navbar />
            <div className="bg-neutral-100 h-screen w-screen flex  flex-col items-center">
                <h1 className="text-4xl font-bold c">About Us</h1>
                <p className="text-lg mt-4  max-w-2xl text-justify">
                    Welcome to our blog! We are passionate about sharing insights, stories, and knowledge on a variety of topics. 
                    Our mission is to create a space where readers can find valuable information, engage in meaningful discussions, and 
                    connect with a community of like-minded individuals. Whether you're here for the latest trends, in-depth analysis,
                    or just some inspiration, we hope you find something that resonates with you. Thank you for being part of our journey!
                    <br></br><br></br>
                    Feel free to explore our articles, leave comments, and share your thoughts. We believe in the power of community and look forward to hearing from you!
                    <br></br><br></br>
                    This is a simple blog application built with React, Vite, and Tailwind CSS. It serves as a demonstration of how to create a basic blogging platform with modern web technologies.

                </p>
                

                
            </div>
            
           
            
        </>
    )
}

export default About