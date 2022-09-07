import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagic } from '@fortawesome/free-solid-svg-icons';
import { themeColor } from "../data/data";
import { Link } from "react-router-dom";

export default function Header () {
    return (
        <header style={{ backgroundColor: themeColor, color: "#fff" }}>
            <Link to="/" className="flex items-center pl-1 py-1">
                <FontAwesomeIcon icon={faMagic} className="p-1" />
                <span className="p-1">LOGO</span>
            </Link>
        </header>
    )
}