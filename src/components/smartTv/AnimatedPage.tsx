import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface props {
  children: ReactNode;
  style?: React.CSSProperties;
}

const animation = {
  initial: { opacity: 0, x: 200 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 200 },
};
function AnimatedPage({ children, style }: props) {
  return (
    <motion.div
      variants={animation}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 1 }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedPage;
