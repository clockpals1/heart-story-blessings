import { motion } from "framer-motion";
import { Heart, Stethoscope } from "lucide-react";

const FloatingHeart = ({ delay, x, size }: { delay: number; x: string; size: number }) => (
  <motion.div
    className="absolute text-rose"
    style={{ left: x }}
    initial={{ y: "100vh", opacity: 0, rotate: 0 }}
    animate={{ 
      y: "-10vh", 
      opacity: [0, 0.6, 0.8, 0.6, 0],
      rotate: [0, 10, -10, 5, 0]
    }}
    transition={{
      duration: 12,
      delay,
      repeat: Infinity,
      ease: "easeOut"
    }}
  >
    <Heart size={size} fill="currentColor" />
  </motion.div>
);

const LightRay = ({ delay, rotation }: { delay: number; rotation: number }) => (
  <motion.div
    className="absolute top-0 left-1/2 h-[150vh] w-16 md:w-32 origin-top opacity-20"
    style={{ 
      background: "linear-gradient(180deg, hsl(38 75% 55% / 0.3) 0%, transparent 100%)",
      rotate: `${rotation}deg`,
      transformOrigin: "top center"
    }}
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 0.15, 0.2, 0.15, 0] }}
    transition={{
      duration: 8,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
);

export const HeroSection = () => {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-hero-gradient">
      {/* Animated light rays */}
      <div className="absolute inset-0 overflow-hidden">
        <LightRay delay={0} rotation={-30} />
        <LightRay delay={2} rotation={-10} />
        <LightRay delay={4} rotation={10} />
        <LightRay delay={6} rotation={30} />
      </div>

      {/* Floating hearts - fewer on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingHeart delay={0} x="8%" size={16} />
        <FloatingHeart delay={4} x="85%" size={14} />
        <div className="hidden sm:block">
          <FloatingHeart delay={3} x="25%" size={16} />
          <FloatingHeart delay={6} x="75%" size={20} />
          <FloatingHeart delay={2} x="50%" size={12} />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Floating stethoscope and heart */}
        <motion.div 
          className="flex justify-center items-center gap-3 sm:gap-4 mb-6 sm:mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.div
            className="text-gold animate-float"
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Stethoscope className="w-10 h-10 sm:w-12 sm:h-12" strokeWidth={1.5} />
          </motion.div>
          <motion.div
            className="text-rose animate-heartbeat"
          >
            <Heart className="w-8 h-8 sm:w-10 sm:h-10" fill="currentColor" />
          </motion.div>
        </motion.div>

        {/* Main heading */}
        <motion.h1 
          className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 text-gradient-gold leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Happy Birthday,
          <br />
          <span className="block mt-1 sm:mt-2">Doctor Kemmy</span>
          <motion.span 
            className="inline-block ml-2 sm:ml-4 text-3xl sm:text-5xl md:text-6xl"
            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
          >
            🎉
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          className="font-body text-base sm:text-xl md:text-2xl text-foreground/80 italic max-w-xs sm:max-w-xl md:max-w-2xl mx-auto px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          "A healer by profession, a blessing by calling."
        </motion.p>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ 
            opacity: { delay: 2, duration: 1 },
            y: { delay: 2, duration: 2, repeat: Infinity }
          }}
        >
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-gold/50 rounded-full flex justify-center pt-1.5 sm:pt-2">
            <motion.div 
              className="w-1 h-2 sm:w-1.5 sm:h-3 bg-gold rounded-full"
              animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
