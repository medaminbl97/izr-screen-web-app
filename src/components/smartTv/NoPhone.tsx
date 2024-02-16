import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import Lottie from "lottie-react";
import React, { useEffect } from "react";
import { text } from "stream/consumers";
import handy from "./Animations/handy.json";
import error from "./Animations/erroor.json";
import AnimatedPage from "./AnimatedPage";

interface props {
  onEnd: () => void;
  focus: boolean;
}

function NoPhone({ onEnd, focus }: props) {
  useEffect(() => {
    focus &&
      setTimeout(() => {
        onEnd();
      }, 10 * 1000);
  }, [focus]);
  return (
    <AnimatedPage>
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Grid
          templateAreas={`"text text"
                    "phone error"`}
          //   gridTemplateRows={"3fr 1fr"}
          gridTemplateColumns={"5fr 5fr"}
          gap={5}
          padding={5}
        >
          <GridItem
            area={"text"}
            display={"flex"}
            flexDir={"column"}
            alignItems={"center"}
            padding={"2vw"}
            height={"100%"}
          >
            <Text fontSize={"3.5vw"} fontFamily={"Poppins"}>
              Bitte stellen Sie ihr handy auf <strong>Ruhemodus</strong> ein
            </Text>
            <Text fontSize={"3.5vw"} fontFamily={"Almarai"}>
              يرجى تحويل هاتفك الخلوي إلى وضع السكون
            </Text>
          </GridItem>
          <GridItem
            height={"100%"}
            area={"phone"}
            shadow={"0px 0px 5px 1px lightgray"}
            borderRadius={"3vw"}
            style={{ scale: "0.8" }}
          >
            <Lottie
              animationData={handy}
              style={{ height: "100%" }}
              loop={true}
            ></Lottie>
          </GridItem>
          <GridItem
            height={"100%"}
            area={"error"}
            shadow={"0px 0px 5px 1px lightgray"}
            borderRadius={"3vw"}
            style={{ scale: "0.8" }}
          >
            <Lottie
              animationData={error}
              style={{ height: "100%" }}
              loop={true}
            ></Lottie>
          </GridItem>
        </Grid>
      </Box>
    </AnimatedPage>
  );
}

export default NoPhone;
