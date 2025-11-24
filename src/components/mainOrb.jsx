import Orb from './assets/orb.png'
function MainOrb () {
    return (
        <>
           <img className='orb max-w-lg scale-70 mt-30 z-9 logo react mx-auto' src={Orb} alt='Orb'/>
           <figcaption className="text-2xl font-semibold text-shadow: 0 0 10px title  italic text-pink-200">Energized</figcaption>
           <figcaption className="mt-2 text-white/50 text-2xl italic font-light">PUMPED & READY</figcaption>

        </>
    )
}
export default MainOrb;