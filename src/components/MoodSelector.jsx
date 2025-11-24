const moods = [
  { label: 'Energized'},
  { label: 'Calm'},
  { label: 'Joyful'},
  { label: 'Focused' },
];

function MoodSelector () {
    return (
        <>
            <h3 className='italic text-4xl mt-70 text-center text-white/60 font-bold opacity-80 mb-5'>How are you feeling today?</h3>
                <p className='text-center font-light text-white/60 capitalize text-sm'>CHOOSE ~ FEEL ~ EXPERIENCE</p>

                {/*Center of this section*/}

                <div className='flex flex-wrap justify-center mt-30 gap-6'>
                    {moods.map((mood) => (
                        <button

                          key={mood.label}
                          className={'rounded-full px-6 py-3 text-lg font-medium shadow-md hover:scale-105 transform transition-all duration-300  animate-bounce    text-white'}
                        >
                          {mood.label}

                        </button>
                    ))}
                </div>
        </>
    )
}
export default MoodSelector;