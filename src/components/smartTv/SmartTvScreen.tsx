import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import styles from "../styles/common.module.css";
import PrayerTimes from "./PrayerTimes";
import axios from "axios";
import Chrono from "./Chrono";
import AdhanIqama from "./AdhanIqama";
import Info from "./Info";

import AnimatedPage from "./AnimatedPage";
import AnimatedBg from "./AnimatedBg";
import styles2 from "../styles/bgStyles.module.css";
import IZRDateInformation from "./IZRDateInformation";
import { FaMosque } from "react-icons/fa";
import IZRLogoTextTrans from "./IZRLogoTextTrans";
import TimerHadithTrans from "./TimerHadithTrans";
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

interface props {
  onCount: () => void;
  onEndCount: () => void;
  onNoPhone: () => void;
  setAdhkar: () => void;
  onAds: (ads: boolean) => void;
}

interface counts {
  dahanC: { min: number; sec: number };
  iqamaC: number;
}

function SmartTvScreen({
  onCount,
  onEndCount,
  setAdhkar,
  onNoPhone,
  onAds,
}: props) {
  const [nextPrayer, setNextPrayer] = useState<nextPData>();
  const [currentPrayer, setCurrentPrayer] = useState<nextPData>();
  const [counting, setCounting] = useState(false);
  const [AdhanChrono, setAdhanChrono] = useState(false);
  const [IqamaChrono, setIqamaChrono] = useState(false);
  const [counts, setCounts] = useState<counts>();
  const [Adhan, setAdhan] = useState(false);
  const [Iqama, setIqama] = useState(false);
  const [Hadith, setHadith] = useState(false);
  let t = 20;
  const checkForNextPrayer = () => {
    // console.log(currentPrayer);
    axios.get<nextPData>(izr_server.url + "/getPrayers/next").then((res) => {
      // console.log("jetzt : ", res.data);
      setCurrentPrayer(res.data);
      if (res.data["dtm"] <= 29 && res.data["dtm"] >= 0) {
        setCounts({
          dahanC: { min: res.data.dtm, sec: res.data.dts },
          iqamaC: (res.data?.iqamah as any)[res.data?.prayer[0]!],
        });
        // test
        // setCounts({
        //   dahanC: { min: 0, sec: t },
        //   iqamaC: 20,
        // });
        setCounting(true);
        currentPrayer?.prayer[0] != "Jumaa" && onAds(true);
        if (res.data["dtm"] <= 2 && res.data["dtm"] >= 0) {
          onAds(false);
        }
        onCount();
      }
    });
  };
  const checkForNextPrayerOnce = () => {
    // console.log("called onece");
    axios.get<nextPData>(izr_server.url + "/getPrayers/next").then((res) => {
      setNextPrayer(res.data);
      setCurrentPrayer(res.data);
      // console.log(currentPrayer);
    });
  };

  useEffect(() => {
    if (counting) {
      setAdhanChrono(true);
    }
  }, [counting]);

  useEffect(() => {
    checkForNextPrayerOnce();
    const id = setInterval(() => {
      checkForNextPrayer();
    }, 500);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatedPage>
      <Grid
        templateAreas={`
        "izr date"
        "prayer time"
        "info info"
        `}
        gridTemplateRows={"1fr 10fr 1fr"}
        gridTemplateColumns={counting || Hadith ? "3fr 3fr" : "5fr 2fr"}
        // gridTemplateColumns={true ? "3fr 3fr" : "5fr 2fr"}
        // gridTemplateColumns={"1fr 5fr"}
        height={"100vh"}
        className={styles["font-formatted"]}
        transition={"ease 2s"}
        backgroundColor={"rgba(0, 0, 0, 0.1)"}
        gap={1}
        padding={1}
      >
        <GridItem
          area={counting || Hadith ? "izr" : "date"}
          backgroundColor={"white"}
          padding={1}
          shadow={"0px 0px 3px 1px lightgray"}
          borderRadius={"0.5vw"}
          className={styles2["animatedBg"]}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <IZRLogoTextTrans />
        </GridItem>
        <GridItem area={counting || Hadith ? "date" : "izr"}>
          <IZRDateInformation />
        </GridItem>
        <GridItem
          gridArea={"prayer"}
          padding={1}
          shadow={"0px 0px 3px 1px lightgray"}
          borderRadius={"0.5vw"}
          area="prayer"
          backgroundColor={"white"}
        >
          {nextPrayer?.prayer[0] && (
            <PrayerTimes
              countdown={counting || Hadith}
              // countdown={true}
              nextPrayer={nextPrayer?.prayer[0]}
            />
          )}
        </GridItem>
        <GridItem
          padding={1}
          shadow={"0px 0px 3px 1px lightgray"}
          borderRadius={"0.5vw"}
          area="time"
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          className={styles2["animatedBg"]}
          // bgGradient={bg}
          // color={bg === morning || bg === afternoon ? "black" : "white"}
        >
          <AnimatedBg />
          {!Hadith && (
            <Box zIndex={"2"} marginBottom={10}>
              <FaMosque size={"6vw"} />
            </Box>
          )}

          {!(Adhan || Iqama) && (
            <TimerHadithTrans
              onHadith={(isHadith) => setHadith(isHadith)}
              counting={counting}
            />
          )}

          {AdhanChrono && counts && (
            <Chrono
              iqama={false}
              time={[counts.dahanC.min, counts.dahanC.sec]}
              data={[
                currentPrayer?.prayer[0] + " in",
                currentPrayer?.prayer[1] + " بعد",
              ]}
              onEnd={() => {
                setAdhanChrono(!AdhanChrono);
                setAdhan(true);
              }}
            />
          )}

          {Adhan && (
            <AdhanIqama
              onEnd={() => {
                setAdhan(false);
                counts?.iqamaC && setIqamaChrono(true);
                !counts?.iqamaC && setCounting(false);
                !counts?.iqamaC &&
                  setTimeout(() => {
                    onEndCount();
                    setNextPrayer(currentPrayer);
                    // console.log("setting next prayer");
                  }, 10 * 60 * 1000);
              }}
              text={nextPrayer?.prayer!}
              adhan
            ></AdhanIqama>
          )}
          {IqamaChrono && counts && (
            <Chrono
              iqama={true}
              time={[counts.iqamaC, 0]}
              // time={[0, 20]}
              data={["Iqama in", " اقامة الصلاة بعد"]}
              onEnd={() => {
                setIqamaChrono(false);
                setIqama(true);
              }}
              onNoPhone={() => onNoPhone()}
            />
          )}
          {Iqama && (
            <AdhanIqama
              onEnd={() => {
                setIqama(false);
                setCounting(false);
                setTimeout(() => {
                  onEndCount();
                  setNextPrayer(currentPrayer);
                  // console.log("setting next prayer");
                }, 10 * 60 * 1000);
              }}
              text={nextPrayer?.prayer!}
              adhan={false}
            ></AdhanIqama>
          )}
        </GridItem>
        <GridItem
          padding={1}
          shadow={"0px 0px 3px 1px lightgray"}
          borderRadius={"0.5vw"}
          area="info"
          backgroundColor={"white"}
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Info />
        </GridItem>
      </Grid>
    </AnimatedPage>
  );
}

export default SmartTvScreen;
