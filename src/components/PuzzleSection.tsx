import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Stethoscope, HandHeart, Globe, Puzzle } from "lucide-react";

interface PuzzlePiece {
  id: number;
  icon: React.ElementType;
  message: string;
  color: "rose" | "gold" | "faith" | "accent";
}

const puzzlePieces: PuzzlePiece[] = [
  { id: 1, icon: Heart, message: "For your love for family", color: "rose" },
  { id: 2, icon: Stethoscope, message: "For healing lives every day", color: "gold" },
  { id: 3, icon: HandHeart, message: "For walking in faith", color: "faith" },
  { id: 4, icon: Globe, message: "For making the world better", color: "accent" },
];

const colorClasses = {
  rose: "from-rose/20 to-rose-light/30 border-rose/30 hover:border-rose/60",
  gold: "from-gold/20 to-gold-light/30 border-gold/30 hover:border-gold/60",
  faith: "from-faith-blue/20 to-faith-sky/30 border-faith-blue/30 hover:border-faith-blue/60",
  accent: "from-accent/20 to-secondary/30 border-accent/30 hover:border-accent/60",
};

const iconColorClasses = {
  rose: "text-rose",
  gold: "text-gold",
  faith: "text-faith-blue",
  accent: "text-accent",
};

const PuzzlePieceCard = ({ 
  piece, 
  isUnlocked, 
  onClick,
  index 
}: { 
  piece: PuzzlePiece; 
  isUnlocked: boolean;
  onClick: () => void;
  index: number;
}) => {
  const Icon = piece.icon;
  
  return (
    <motion.button
      className={`relative w-full aspect-square rounded-3xl cursor-pointer transition-all duration-500 border-2 bg-gradient-to-br ${colorClasses[piece.color]} ${
        isUnlocked ? "shadow-card" : "hover:shadow-soft"
      }`}
      onClick={onClick}
      whileHover={!isUnlocked ? { scale: 1.08, rotate: 2 } : { scale: 1.02 }}
      whileTap={!isUnlocked ? { scale: 0.95 } : {}}
      initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        type: "spring",
        stiffness: 150
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 gap-3">
        <motion.div
          animate={isUnlocked ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.5 }}
        >
          <Icon 
            className={`w-10 h-10 md:w-12 md:h-12 ${iconColorClasses[piece.color]} ${
              isUnlocked ? "" : "opacity-60"
            }`} 
            strokeWidth={1.5}
          />
        </motion.div>
        
        <AnimatePresence mode="wait">
          {isUnlocked ? (
            <motion.p
              key="message"
              className="font-body text-sm md:text-base text-foreground/90 text-center leading-snug"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {piece.message}
            </motion.p>
          ) : (
            <motion.span
              key="tap"
              className="text-xs text-muted-foreground italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
            >
              Tap to unlock
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Puzzle piece decoration */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-4 rounded-b-full bg-inherit border-2 border-inherit border-t-0" />
      <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-6 rounded-l-full bg-inherit border-2 border-inherit border-r-0" />
    </motion.button>
  );
};

export const PuzzleSection = () => {
  const [unlockedPieces, setUnlockedPieces] = useState<number[]>([]);

  const handleUnlock = (id: number) => {
    if (!unlockedPieces.includes(id)) {
      setUnlockedPieces([...unlockedPieces, id]);
    }
  };

  const allUnlocked = unlockedPieces.length === 4;

  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Puzzle className="w-12 h-12 text-gold mx-auto mb-4" />
          </motion.div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Puzzle of Gratitude
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
            Each piece holds a reason we're grateful for you
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-6 md:gap-8 max-w-2xl mx-auto mb-12">
          {puzzlePieces.map((piece, index) => (
            <PuzzlePieceCard
              key={piece.id}
              piece={piece}
              isUnlocked={unlockedPieces.includes(piece.id)}
              onClick={() => handleUnlock(piece.id)}
              index={index}
            />
          ))}
        </div>

        <AnimatePresence>
          {allUnlocked && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <motion.p 
                className="font-display text-2xl md:text-3xl text-gradient-gold"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💖 You complete the picture of love! 💖
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
