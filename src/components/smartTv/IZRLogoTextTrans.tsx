import { Heading, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import logow from "../images/SVG/izr_logo_w.svg";
import AnimatedPage from "./AnimatedPage";

function IZRLogoTextTrans() {
  const [current, setCurrent] = useState("en");
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => {
        switch (prev) {
          case "en":
            return "logo";
          case "logo":
            return "ar";
          case "ar":
            return "en";
          default:
            return prev;
        }
      });
    }, 3000);
    return () => clearInterval(id);
  }, []);
  return (
    <AnimatedPage>
      {current === "en" && (
        <AnimatedPage>
          <Heading
            fontFamily={"Poppins"}
            padding={1}
            textAlign={"center"}
            fontSize={"1.2vw"}
            height={"3vw"}
          >
            Islamisches ZentrumRegensburg
          </Heading>
        </AnimatedPage>
      )}
      {current === "ar" && (
        <AnimatedPage>
          <Heading
            fontFamily={"Almarai"}
            padding={1}
            textAlign={"center"}
            fontSize={"1.2vw"}
            height={"3vw"}
          >
            المركز الاسلامي بريغنزبورغ
          </Heading>
        </AnimatedPage>
      )}
      {current === "logo" && (
        <AnimatedPage>
          <Image src={logow} height={"3vw"}></Image>
        </AnimatedPage>
      )}
    </AnimatedPage>
  );
}

export default IZRLogoTextTrans;
