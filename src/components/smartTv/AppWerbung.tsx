import React from "react";
import AnimatedPage from "./AnimatedPage";
import { Box, Stack } from "@chakra-ui/react";
import ReactPlayer from "react-player";
import data from "./Animations/data.json";
import Lottie from "lottie-react";
function AppWerbung() {
  
  return (
    <AnimatedPage style={{ height: "100vh" }}>
      <Lottie
        animationData={data}
        loop={true}
        style={{
          height: "90%",
          transition: "1s ease",
        }}
      />
    </AnimatedPage>
  );
}
export default AppWerbung;
