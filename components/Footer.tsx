
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer items-center p-2 md:p-4 px-5 bg-neutral text-neutral-content justify-between text-base flex flex-col md:flex-row md:items-center max-w-5xl mx-auto">
            <aside className="md:mr-auto text-center md:text-left">
                <p>©2024 awbibib :3</p>
            </aside>
            <nav className="grid-flow-col gap-6 md:place-self-center mb-2 md:mb-0">
                <a href="https://github.com/marsaariqi" target="_blank" rel="noopener noreferrer" className='fIcon' >
                    <FaGithub size={40} />
                </a>
                <a href="https://www.linkedin.com/in/marsa-ariqi-gustiandza-1023851b7/" target="_blank" rel="noopener noreferrer" className='fIcon'>
                    <FaLinkedin size={40} />
                </a>
            </nav>
        </footer>
    )
}

export default Footer