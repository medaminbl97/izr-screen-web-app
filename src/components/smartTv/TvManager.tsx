import React, { useEffect, useState } from "react";
import SmartTvScreen from "./SmartTvScreen";
import NoPhone from "./NoPhone";
import IZRDateInformation from "./IZRDateInformation";
import IZRLogoAnimation from "./IZRLogoAnimation";
import Adhkar from "./Adhkar";
import AppWerbung from "./AppWerbung";
import {
  GridItem,
  HStack,
  Image,
  SimpleGrid,
  StackItem,
  VStack,
} from "@chakra-ui/react";
import style from "../styles/gridSlide.module.css";
import Flyer from "./Flyer";
import IZR from "./IZR";
import current_event from "../images/Camp2023T.png";
import app_flyer from "../images/APPFlyer.png";
import axios from "axios";
import izr_server from "../../configs/configfile";

interface nextPData {
  dtm: number;
  dts: number;
  prayer: string[];
  iqamah: {
    Fajr: number;
    Asr: number;
    Dhuhr: number;
    Maghrib: number;
    Isha: number;
  };
}

interface event {
  flyerTV: string;
  flyer: string;
}

interface resp {
  events: event[];
}

function TvManager() {
  const [idx, setIdx] = useState(1);
  const [n, setN] = useState(0);
  const [slide, setSlide] = useState(true);
  const [slideY, setSlideY] = useState("-100vh");
  const [ads, setAds] = useState(false);
  const [currentPrayer, setCurrentPrayer] = useState<nextPData>();
  const [flyers, setFlyers] = useState<event[]>();

  const checkForNextPrayerOnce = () => {
    axios.get<nextPData>(izr_server.url + "/getPrayers/next").then((res) => {
      setCurrentPrayer(res.data);
      // console.log(res.data);
    });
  };

  const updateFlyers = () => {
    axios.get<resp>(izr_server.url + "/getEvents/all").then((res) => {
      flyers &&
        (res.data.events[0].flyer !== flyers[0].flyer ||
          res.data.events.length !== flyers.length) &&
        setN((n + 1) % 5);
      setFlyers(res.data.events);
      setN(res.data.events.length);
    });
  };

  useEffect(() => {
    const id = setInterval(() => {
      checkForNextPrayerOnce();
      updateFlyers();
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    console.log(idx);
    setSlideY("-" + idx + "00vh");
  }, [idx]);

  useEffect(() => {
    console.log("something has changed");
    setTimeout(() => {
      setIdx(2);
    }, 5 * 1000);
  }, [n]);

  useEffect(() => {
    const id = setInterval(() => {
      const d = new Date();
      if (!(d.getDay() === 5 && currentPrayer?.prayer[0] === "Asr")) {
        ads && setIdx(2);
      }
    }, 2 * 60 * 1000);
    return () => clearInterval(id);
  }, [ads]);

  useEffect(() => {
    const id = setInterval(() => {
      !ads && slide && setIdx(2);
    }, 15 * 60 * 1000);
    return () => clearInterval(id);
  }, [ads]);

  return (
    <SimpleGrid
      width={"100vw"}
      columns={1}
      transform={"auto"}
      translateY={slideY}
      transition={"2s ease"}
    >
      <GridItem
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        transition={"1s ease"}
        alignItems={"center"}
        height={"100vh"}
      >
        <NoPhone focus={idx === 0} onEnd={() => setIdx(1)} />
      </GridItem>

      <GridItem height={"100vh"}>
        <SmartTvScreen
          onCount={() => setSlide(false)}
          onNoPhone={() => setIdx(0)}
          onEndCount={() => {
            setSlide(true);
          }}
          setAdhkar={() => console.log("adhkar")}
          onAds={(ads) => setAds(ads)}
        />
      </GridItem>
      {flyers &&
        flyers?.map(
          (flyer, index) =>
            flyer.flyerTV && (
              <GridItem
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                transition={"1s ease"}
                alignItems={"center"}
                height={"100vh"}
              >
                <Flyer
                  pic={flyer.flyerTV}
                  onEnd={() => {
                    setIdx(index + 3);
                    console.log("end flyer index : " + (index + 2));
                  }}
                  focus={idx === index + 2}
                ></Flyer>
              </GridItem>
            )
        )}
      <GridItem
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        transition={"1s ease"}
        alignItems={"center"}
        height={"100vh"}
      >
        <Flyer
          pic={app_flyer}
          onEnd={() => {
            console.log("end App flyer");
            setIdx(1);
          }}
          focus={
            flyers && flyers[0].flyerTV ? idx === flyers.length + 2 : idx === 2
          }
        ></Flyer>
      </GridItem>
    </SimpleGrid>
  );
}

export default TvManager;
