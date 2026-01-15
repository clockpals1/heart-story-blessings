import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, BookOpen, Star } from "lucide-react";

const verseLines = [
  "The Lord bless you and keep you;",
  "the Lord make His face shine upon you",
  "and be gracious to you;",
  "the Lord turn His face toward you",
  "and give you peace.",
];

const VerseCard = ({ 
  index, 
  icon: Icon, 
  label, 
  isRevealed, 
  onClick 
}: { 
  index: number; 
  icon: React.ElementType; 
  label: string;
  isRevealed: boolean;
  onClick: () => void;
}) => (
  <motion.button
    className={`relative w-full max-w-xs aspect-[3/4] rounded-2xl cursor-pointer transition-all duration-500 ${
      isRevealed 
        ? "bg-gradient-to-br from-gold-light/20 to-rose-soft border-2 border-gold/30" 
        : "bg-gradient-to-br from-card to-cream-warm border-2 border-gold/20 hover:border-gold/50 hover:shadow-glow"
    }`}
    onClick={onClick}
    whileHover={!isRevealed ? { scale: 1.05, y: -5 } : {}}
    whileTap={!isRevealed ? { scale: 0.98 } : {}}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.2 }}
  >
    <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
      <AnimatePresence mode="wait">
        {!isRevealed ? (
          <motion.div
            key="unrevealed"
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <motion.div 
              className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center animate-glow"
            >
              <Icon className="w-8 h-8 text-gold" />
            </motion.div>
            <span className="font-display text-lg text-foreground/70">{label}</span>
            <span className="text-sm text-muted-foreground italic">Tap to reveal</span>
          </motion.div>
        ) : (
          <motion.div
            key="revealed"
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            >
              <Sparkles className="w-8 h-8 text-gold mx-auto mb-4" />
            </motion.div>
            {verseLines.slice(index === 0 ? 0 : index === 1 ? 2 : 3, index === 0 ? 2 : index === 1 ? 3 : 5).map((line, i) => (
              <motion.p
                key={i}
                className="font-body text-base md:text-lg text-foreground/90 italic leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.2 }}
              >
                {line}
              </motion.p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    
    {/* Shimmer effect on hover */}
    {!isRevealed && (
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <div className="absolute inset-0 animate-shimmer" />
      </div>
    )}
  </motion.button>
);

export const BibleVerseSection = () => {
  const [revealedCards, setRevealedCards] = useState<number[]>([]);

  const handleReveal = (index: number) => {
    if (!revealedCards.includes(index)) {
      setRevealedCards([...revealedCards, index]);
    }
  };

  const allRevealed = revealedCards.length === 3;

  return (
    <section className="py-24 px-6 bg-cream-warm">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <BookOpen className="w-12 h-12 text-gold mx-auto mb-4" />
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
            A Blessing For You
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
            Tap each card to reveal a special blessing from Scripture
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center mb-12">
          <VerseCard 
            index={0} 
            icon={Star} 
            label="First Blessing" 
            isRevealed={revealedCards.includes(0)}
            onClick={() => handleReveal(0)}
          />
          <VerseCard 
            index={1} 
            icon={Sparkles} 
            label="Second Blessing" 
            isRevealed={revealedCards.includes(1)}
            onClick={() => handleReveal(1)}
          />
          <VerseCard 
            index={2} 
            icon={Star} 
            label="Third Blessing" 
            isRevealed={revealedCards.includes(2)}
            onClick={() => handleReveal(2)}
          />
        </div>

        <AnimatePresence>
          {allRevealed && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <p className="font-display text-xl md:text-2xl text-gold italic">
                — Numbers 6:24–26
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
