import React, { useEffect, useState } from "react";
import AnimatedPage from "./AnimatedPage";
import Lottie from "lottie-react";
import adhkar from "./Animations/adhkar.json";
import { Box, Text, HStack } from "@chakra-ui/react";
import styles from "../styles/bgStyles.module.css";
import { FaCouch } from "react-icons/fa";
import IZR from "./IZR";

interface props {
  onEnd: () => void;
  focus: boolean;
}

function Adhkar({ onEnd, focus }: props) {
  useEffect(() => {
    focus &&
      setTimeout(() => {
        onEnd();
      }, 80 * 1000);
  }, [focus]);

  // Cleanup the interval on component unmount
  return (
    <AnimatedPage
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2vw",
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        className={styles["animatedBg"]}
        padding={1}
        height={"100vh"}
        width={"100vw"}
        transition={"1s ease"}
      >
        <Lottie
          animationData={adhkar}
          loop={false}
          style={{
            height: "100%",
            transition: "1s ease",
            overflow: "hidden",
          }}
        />
      </Box>
    </AnimatedPage>
  );
}

export default Adhkar;
