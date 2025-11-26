//Made with Figma Make
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

const moodConfig = {
  Energized: {
    gradient: "from-orange-400 via-pink-400 to-rose-400",
    glow: "shadow-[0_0_80px_rgba(251,146,60,0.6)]",
    subtitle: "PUMPED & READY",
    lightColor: "bg-orange-300",
  },
  Calm: {
    gradient: "from-blue-300 via-cyan-300 to-teal-300",
    glow: "shadow-[0_0_80px_rgba(103,232,249,0.5)]",
    subtitle: "PEACEFUL & SERENE",
    lightColor: "bg-cyan-300",
  },
  Joyful: {
    gradient: "from-yellow-300 via-pink-300 to-purple-300",
    glow: "shadow-[0_0_80px_rgba(253,224,71,0.5)]",
    subtitle: "HAPPY & BRIGHT",
    lightColor: "bg-yellow-300",
  },
  Focused: {
    gradient: "from-indigo-400 via-purple-400 to-pink-400",
    glow: "shadow-[0_0_80px_rgba(167,139,250,0.5)]",
    subtitle: "LOCKED IN",
    lightColor: "bg-purple-300",
  },
};

export function MoodOrb({ mood, focus = false, onClick }) {
  const config = moodConfig[mood];

  return (
    <div className="relative flex items-center mb-5 justify-center">

      {/* ⭐ OUTER GLOW RINGS */}
      <motion.div
        animate={{
          scale: focus ? [1.1, 1.4, 1.1] : [1, 1.2, 1],
          opacity: focus ? [0.5, 0.3, 0.5] : [0.4, 0.2, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute rounded-full bg-gradient-to-r ${config.gradient} blur-3xl ${config.glow}`}
        style={{
          width: focus ? 550 : 500,
          height: focus ? 550 : 500,
        }}
      />

      <motion.div
        animate={{
          scale: focus ? [1.05, 1.25, 1.05] : [1, 1.15, 1],
          opacity: focus ? [0.4, 0.2, 0.4] : [0.3, 0.1, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute rounded-full bg-gradient-to-r ${config.gradient} blur-3xl`}
        style={{
          width: focus ? 480 : 450,
          height: focus ? 480 : 450,
        }}
      />

      {/* ⭐ ORBITING LIGHT PARTICLES */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ rotate: 360 }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute"
          style={{ width: 300, height: 300 }}
        >
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
            className={`absolute top-0 left-1/2 w-3 h-3 ${config.lightColor} rounded-full blur-sm`}
          />
        </motion.div>
      ))}

      {/* ⭐ MAIN ORB BUTTON */}
      <motion.button
        onClick={onClick}
        whileHover={{ scale: focus ? 1.05 : 1.08 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          scale: focus ? 1.15 : 1,
          filter: focus ? "brightness(1.3)" : "brightness(1)",
        }}
        transition={{ duration: 0.35 }}
        className="relative flex items-center justify-center cursor-pointer group"
        style={{
          width: focus ? 330 : 300,
          height: focus ? 330 : 300,
        }}
      >
        {/* Glass ring 1 */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.08))",
            border: "2px solid rgba(255,255,255,0.4)",
            backdropFilter: "blur(10px)",
          }}
        />

        {/* Glass ring 2 */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 rounded-full"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.05))",
            border: "2px solid rgba(255,255,255,0.3)",
            backdropFilter: "blur(10px)",
          }}
        />

        {/* Gradient orb */}
        <motion.div
          key={mood}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className={`absolute inset-10 rounded-full bg-gradient-to-br ${config.gradient} ${config.glow}`}
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-full h-full rounded-full bg-gradient-to-br from-white/40 via-transparent to-transparent"
          />
        </motion.div>

        {/* ⭐ TEXT */}
        <div className="relative z-10 text-center pointer-events-none">
          <motion.div
            key={mood}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-2"
            >
              <Sparkles className="w-8 h-8 text-white mx-auto" />
            </motion.div>

            <h2 className="text-5xl mb-1 text-white drop-shadow-lg italic">
              {mood}
            </h2>

            <p className="text-sm text-white/90 tracking-wider drop-shadow-md">
              {config.subtitle}
            </p>


              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-xs text-white/80 tracking-widest mt-4 drop-shadow-md"
              >
                ✨ TAP TO PLAY ✨
              </motion.p>
          </motion.div>
        </div>

        {/* Hover glow */}
        <motion.div
          className={`absolute inset-0 rounded-full bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-2xl`}
        />
      </motion.button>
    </div>
  );
}
