import profile from './assets/profile.png'

function Header() {
    return (
        <div className="w-full flex flex-col items-center justify-center px-4">

            <h1 className="
                text-center
                italic
                text-purple-300
                font-bold
                title

            ">
                MoodWave
            </h1>

            <h2 className="
                text-center
                italic
                text-white/50
                font-light
            ">
                YOUR SAFE HAVEN
            </h2>

        </div>
    );
}

export default Header;
