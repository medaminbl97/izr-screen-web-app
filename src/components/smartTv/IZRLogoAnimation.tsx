import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";

import { Box, Image } from "@chakra-ui/react";
import styles from "../styles/bgStyles.module.css";
import logoan from "./Animations/izrn.json";
import logo from "../../images/izr_logo.png";
import AnimatedPage from "./AnimatedPage";

function IZRLogoAnimation() {
  return (
    <AnimatedPage>
      <Box
        height={"100vh"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        transition={"1s ease"}
      >
        <Lottie
          animationData={logoan}
          loop={true}
          style={{
            height: "100%",
            transition: "1s ease",
          }}
        />
      </Box>
    </AnimatedPage>
  );
}

export default IZRLogoAnimation;
