import profile from './assets/profile.png'

function Header(){
    return (
    <>
        <div className='flex justify-between items-center px-6  gap-x-140'>
            <div className=' w-12 flex justify-end logo'>
                <img src={profile}  alt='Profile' />
            </div>
            <div className='flex flex-col text-center'>
                <h1 className=' text-center  mb-1 italic text-purple-300 min title'>MoodWave</h1>
                <h2 className=' text-center italic text-white/50 text-sm font-light'>YOUR SAFE HAVEN</h2>
            </div>

            <div className=' hover flex w-12 :justify-end logo'>
                <img src={profile} alt='Profile' />
            </div>
        </div>
    </>
    )
}
export default Header;
