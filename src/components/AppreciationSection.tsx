import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart } from "lucide-react";

const appreciationText = "To a doctor who gives strength when people feel weak, hope when they feel lost, and comfort when they need it most. Your hands heal, but your heart transforms lives.";

export const AppreciationSection = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && !isTyping && displayedText === "") {
      setIsTyping(true);
      let index = 0;
      
      const typeInterval = setInterval(() => {
        if (index < appreciationText.length) {
          setDisplayedText(appreciationText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
        }
      }, 35);

      return () => clearInterval(typeInterval);
    }
  }, [isInView, isTyping, displayedText]);

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 sm:py-32 px-4 sm:px-6 bg-cream-warm overflow-hidden"
    >
      {/* Heartbeat background animation */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(350 70% 65% / 0.08) 0%, transparent 70%)"
          }}
          animate={{
            scale: [1, 1.1, 1, 1.15, 1],
            opacity: [0.3, 0.5, 0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Floating hearts in background - fewer on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-rose/20"
            style={{
              left: `${15 + i * 20}%`,
              top: `${25 + (i % 2) * 30}%`
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
          >
            <Heart size={20 + i * 4} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-6 sm:mb-8"
        >
          <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-rose mx-auto animate-heartbeat" fill="currentColor" />
        </motion.div>

        <div className="min-h-[150px] sm:min-h-[180px] flex items-center justify-center px-2">
          <motion.p 
            className="font-body text-lg sm:text-2xl md:text-3xl lg:text-4xl text-foreground/90 leading-relaxed italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            "{displayedText}
            {isTyping && (
              <motion.span
                className="inline-block w-0.5 sm:w-1 h-5 sm:h-8 bg-gold ml-0.5 sm:ml-1"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            )}
            {!isTyping && displayedText.length > 0 && '"'}
          </motion.p>
        </div>

        {displayedText === appreciationText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-6 sm:mt-8"
          >
            <p className="font-display text-base sm:text-xl text-gold">
              With deepest gratitude and love
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};
