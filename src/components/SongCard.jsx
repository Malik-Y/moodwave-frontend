export default function SongCard({ title, artists, albumImage }) {
    return (
        <div className='justify-center w-auto items-center gap-y-6 flex-col flex'>

            <div className='songCover w-50 h-50 items-center glass flex-col flex'>
                {albumImage ? (
                    <img src={albumImage} alt={title} className="w-full h-full object-cover rounded-xl" />
                ) : (
                    <div className="w-full h-full flex justify-center items-center text-white/40">
                        No Image
                    </div>
                )}
            </div>

            <div className='justify-center h-25 w-55 overflow-hidden items-center glass flex-col flex'>
                <p className=' mt-5 text-white/80 hover:text-pink-300 px-6 font-bold'>
                    {title}
                </p>
                <p className=' text-white/50 text-sm mb-5 px-6 font-bold'>
                    {artists}
                </p>

            </div>
        </div>
    );
}
