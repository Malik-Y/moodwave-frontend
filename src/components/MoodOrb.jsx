//Made with Figma Make
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

const moodConfig = {
  "Romantic": {
    gradient: "from-rose-300 via-pink-300 to-purple-300",
    glow: "shadow-[0_0_80px_rgba(244,114,182,0.5)]",
    subtitle: "SOFT • EMOTIVE",
    lightColor: "bg-rose-300",
  },

  "Euphoric": {
    gradient: "from-yellow-300 via-orange-400 to-pink-400",
    glow: "shadow-[0_0_90px_rgba(251,146,60,0.7)]",
    subtitle: "HIGH ENERGY • CELEBRATORY",
    lightColor: "bg-yellow-300",
  },

  "Warm": {
    gradient: "from-amber-200 via-pink-200 to-rose-300",
    glow: "shadow-[0_0_70px_rgba(253,186,116,0.5)]",
    subtitle: "GLOWY • DREAMLIKE",
    lightColor: "bg-amber-200",
  },

  "Hype": {
    gradient: "from-red-400 via-orange-400 to-yellow-400",
    glow: "shadow-[0_0_90px_rgba(251,113,133,0.6)]",
    subtitle: "PUSHING FORWARD",
    lightColor: "bg-red-300",
  },

  "Dark": {
    gradient: "from-purple-900 via-red-900 to-black",
    glow: "shadow-[0_0_120px_rgba(139,0,0,0.6)]",
    subtitle: "HEAVY • PONDERING",
    lightColor: "bg-red-900",
  },

  "Sad": {
    gradient: "from-blue-500 via-indigo-400 to-purple-400",
    glow: "shadow-[0_0_80px_rgba(96,165,250,0.6)]",
    subtitle: "SOFT • SOMBER",
    lightColor: "bg-blue-300",
  },

  "Melancholy": {
    gradient: "from-slate-600 via-slate-500 to-blue-500",
    glow: "shadow-[0_0_80px_rgba(71,85,105,0.6)]",
    subtitle: "FADED • REFLECTIVE",
    lightColor: "bg-slate-400",
  },

  "Calm": {
    gradient: "from-teal-300 via-cyan-300 to-blue-300",
    glow: "shadow-[0_0_80px_rgba(103,232,249,0.5)]",
    subtitle: "QUIET • GENTLE",
    lightColor: "bg-cyan-300",
  },

  "Moody": {
    gradient: "from-indigo-500 via-purple-500 to-blue-500",
    glow: "shadow-[0_0_90px_rgba(129,140,248,0.6)]",
    subtitle: "DEEP • THOUGHTFUL",
    lightColor: "bg-indigo-400",
  },

  "Ambient": {
    gradient: "from-slate-200 via-slate-300 to-slate-400",
    glow: "shadow-[0_0_60px_rgba(148,163,184,0.0)]",
    subtitle: "FLOATING • ABSTRACT",
    lightColor: "bg-slate-300",
  },

  "Neutral": {
    gradient: "from-gray-300 via-gray-200 to-gray-100",
    glow: "shadow-[0_0_40px_rgba(200,200,200,0.4)]",
    subtitle: "UNCLASSIFIED",
    lightColor: "bg-gray-200",
  },

  "Loading": {
    gradient: "from-yellow-200 via-blue to-blue-200",
    glow: "shadow-[0_0_10px_rgba(200,200,255,0.1)]",
    subtitle: "GATHERING VIBES...",
    lightColor: "bg-blue-200",
  },
};

export default function MoodOrb({ mood, focus = false, onClick }) {

  const config = moodConfig[mood] || moodConfig["Neutral"];

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
        whileHover={{ scale: focus ? 1.05 : 0.8}}
        whileTap={{ scale: 0.95 }}
        animate={{
          scale: focus ? 1.05 : 0.8,
          filter: focus ? "brightness(1.1)" : "brightness(1)",
        }}
        transition={{ duration: 0.35 }}
        className="relative flex items-center  justify-center cursor-pointer group"
        style={{
          width: focus ? 380 : 350,
          height: focus ? 330 : 300,
          mt: 15,
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

            <h2 className="text-5xl mb-3 text-white drop-shadow-lg italic">
              {mood}
            </h2>

            <p className="text-sm text-white/90 tracking-wider drop-shadow-md">
              {config.subtitle}
            </p>


              {mood !== "Loading" && (
                  <motion.p
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-xs text-white/80 tracking-widest mt-4 drop-shadow-md"
                  >
                    ✨ TAP TO PLAY ✨
                  </motion.p>
                )}
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
