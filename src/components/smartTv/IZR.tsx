import { HStack, Text } from "@chakra-ui/react";
import React from "react";

function IZR() {
  return (
    <HStack
      transition={"1s ease"}
      padding={"1vw"}
      display={"flex"}
      justifyContent={"center"}
    >
      <Text fontWeight={"bold"} fontFamily={"Poppins"} fontSize={"1.5vw"}>
        Islamisches Zentrum Regensburg ©
      </Text>
      <Text fontWeight={"bold"} fontFamily={"Almarai"} fontSize={"1.5vw"}>
        المركز الاسلامي بريغنزبورغ
      </Text>
    </HStack>
  );
}

export default IZR;
