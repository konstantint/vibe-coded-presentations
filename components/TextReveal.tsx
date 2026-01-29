import React from 'react';
import { motion, Variants } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  mode?: 'word' | 'char';
}

const TextReveal: React.FC<TextRevealProps> = ({ text, className, delay = 0, mode = 'word' }) => {
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay }
    })
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100
      }
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(10px)',
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100
      }
    }
  };

  if (mode === 'char') {
    return (
      <motion.div
        style={{ display: 'inline-block' }}
        variants={container}
        initial="hidden"
        animate="visible"
        className={className}
      >
        {text.split('').map((char, index) => (
          <motion.span variants={child} key={index} style={{ display: 'inline-block', whiteSpace: 'pre' }}>
            {char}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  // Word mode
  return (
    <motion.div
      style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25em', justifyContent: 'center' }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {text.split(' ').map((word, index) => (
        <motion.span variants={child} key={index} style={{ display: 'inline-block' }}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default TextReveal;