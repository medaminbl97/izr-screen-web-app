import React, { useEffect, useState } from "react";
import { Box, Grid, GridItem, Stack, Text } from "@chakra-ui/react";

interface props {
  text: string[];
  adhan: boolean;
  onEnd: () => void;
}

function AdhanIqama({ text, adhan, onEnd }: props) {
  // const [opacity, setOpacity] = useState(0.0);
  // useEffect(() => {
  //   setInterval(() => {
  //     setOpacity(opacity + 0.01);
  //     console.log(opacity);
  //   }, 100);
  // }, []);
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
      if (seconds === 0) {
        onEnd();
        console.log("chrono finished");
      }
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [seconds]); // Empty dependency array means this effect runs once on mount

  return (
    <Stack
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      // opacity={opacity}
    >
      {adhan && (
        <Text fontFamily={"Almarai"} fontSize={"5vw"} textAlign={"center"}>
          حان وقت آذان صلاة {text[1]}
        </Text>
      )}
      {adhan && (
        <Text fontSize={"5vw"} textAlign={"center"} fontFamily={"Poppins"}>
          {text[0]}
        </Text>
      )}
      {!adhan && (
        <Text fontSize={"5vw"} textAlign={"center"} fontFamily={"Almarai"}>
          حان وقت إقامة صلاة {text[1]}
        </Text>
      )}
      {!adhan && (
        <Text fontSize={"5vw"} textAlign={"center"} fontFamily={"Poppins"}>
          Iqama aufrufen
        </Text>
      )}
    </Stack>
  );
}

export default AdhanIqama;
