import { Box, Heading, Stack, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AnimatedPage from "./AnimatedPage";
import stars from "../images/stars.png";

interface props {
  counting: boolean;
}

function Timer({ counting }: props) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [fontS, setFontS] = useState("");
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();

  useEffect(() => {
    // Create an interval to update the current time every second
    if (counting) {
      const intervalId = setInterval(() => {
        setCurrentTime(new Date());
        fontS === "1" ? setFontS("1.1") : setFontS("1");
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [counting]);
  const updateTime = () => {
    setCurrentTime(new Date());
  };

  useEffect(() => {
    // Set up an interval to update the time every second
    const intervalId = setInterval(updateTime, 1000);

    // Clean up the interval when the component unmounts or counting changes
    return () => clearInterval(intervalId);
  }, []);

  return (
    <AnimatedPage>
      <Stack
        display={"flex"}
        flexDirection={"row"}
        justifyItems={"center"}
        alignItems={"center"}
        style={{ scale: fontS }}
        transition={"ease 1s"}
      >
        <Heading
          zIndex={"2"}
          transition={"ease 1s"}
          fontFamily={"Noto Kufi Arabic"}
          fontSize={"8vw"}
        >
          {hours < 10 ? "0" + hours : hours}
        </Heading>

        <Heading zIndex={"2"} fontFamily={"Poppins"} fontSize={"8vw"}>
          :
        </Heading>
        <Heading
          zIndex={"2"}
          transition={"ease 1s"}
          fontFamily={"Noto Kufi Arabic"}
          fontSize={"8vw"}
        >
          {minutes < 10 ? "0" + minutes : minutes}
        </Heading>
        <Image
          position={"absolute"}
          zIndex={"1"}
          width={"22%"}
          opacity={".1"}
          src={stars}
        ></Image>
      </Stack>
    </AnimatedPage>
  );
}

export default Timer;
