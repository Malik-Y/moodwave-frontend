import Orb from './assets/orb.png'
import RandomLyric from "./RandomLyric.jsx";
import MoodSelector from "./MoodSelector.jsx";
import {Link} from "react-router-dom";
function MainOrb () {
    return (
        <>
            {/*<div className='outline-8 glass w-10 h-10 flex content-center'></div>*/}
            <Link to='/Musicplayer'>
                <img className='orb max-w-lg scale-70 mt-30 z-9 logo react mx-auto' src={Orb} alt='Orb'/>
            </Link>
           <figcaption className="text-2xl font-semibold text-shadow: 0 0 10px title  italic text-pink-200">Energized</figcaption>
           <figcaption className="mt-2 mb-75 text-white/50 text-2xl italic font-light">PUMPED & READY</figcaption>
                 <MoodSelector/>
        </>
    )
}
export default MainOrb;