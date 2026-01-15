import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, Star, Heart } from "lucide-react";
import confetti from "canvas-confetti";

export const BlessingSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-200px" });
  const confettiTriggered = useRef(false);

  useEffect(() => {
    if (isInView && !confettiTriggered.current) {
      confettiTriggered.current = true;
      
      // Elegant confetti burst
      const duration = 4000;
      const end = Date.now() + duration;

      const colors = ['#D4A574', '#E8B4B4', '#F5E6D3', '#FFD700'];

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors: colors,
          ticks: 200,
          gravity: 0.8,
          decay: 0.94,
          startVelocity: 30
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors: colors,
          ticks: 200,
          gravity: 0.8,
          decay: 0.94,
          startVelocity: 30
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      // Delay confetti slightly
      setTimeout(frame, 500);
    }
  }, [isInView]);

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 px-6 bg-blessing-gradient overflow-hidden"
    >
      {/* Decorative stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-gold/30"
            style={{
              left: `${5 + (i * 8)}%`,
              top: `${10 + (i % 4) * 20}%`
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut"
            }}
          >
            <Star size={12 + (i % 3) * 6} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <motion.div 
            className="flex justify-center gap-4 mb-8"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
          >
            <Sparkles className="w-10 h-10 text-gold animate-pulse-soft" />
            <Heart className="w-12 h-12 text-rose animate-heartbeat" fill="currentColor" />
            <Sparkles className="w-10 h-10 text-gold animate-pulse-soft" />
          </motion.div>

          <motion.h2 
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-gold mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Birthday Blessing
          </motion.h2>

          <motion.div
            className="space-y-6 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <p className="font-body text-xl md:text-2xl text-foreground/90 leading-relaxed">
              May God renew your strength,
            </p>
            <p className="font-body text-xl md:text-2xl text-foreground/90 leading-relaxed">
              reward your kindness,
            </p>
            <p className="font-body text-xl md:text-2xl text-foreground/90 leading-relaxed">
              and fill this new year with
            </p>
            <motion.p 
              className="font-display text-3xl md:text-4xl text-gradient-gold font-semibold"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              endless joy and peace.
            </motion.p>
          </motion.div>

          <motion.div
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-gold/10 to-rose/10 border border-gold/30"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-3xl">🎂</span>
            <span className="font-display text-2xl text-foreground">
              Happy Birthday, Dr. Kemmy!
            </span>
            <span className="text-3xl">💝</span>
          </motion.div>
        </motion.div>

        {/* Final decorative element */}
        <motion.div
          className="mt-16 flex justify-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.span
              key={i}
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                delay: i * 0.2 
              }}
              className="text-2xl"
            >
              ✨
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
