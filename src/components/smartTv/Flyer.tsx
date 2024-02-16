import { Box, Image } from "@chakra-ui/react";
import React, { useEffect } from "react";

interface props {
  onEnd: () => void;
  focus: boolean;
  pic: string;
}

function Flyer({ onEnd, focus, pic }: props) {
  useEffect(() => {
    focus && console.log("begin");
    focus &&
      setTimeout(() => {
        
        onEnd();
      }, 15 * 1000);
  }, [focus]);

  return (
    <Box display={"flex"} justifyContent={"center"} overflow="hidden">
      <Image objectFit={"contain"} src={pic}></Image>
    </Box>
  );
}

export default Flyer;
