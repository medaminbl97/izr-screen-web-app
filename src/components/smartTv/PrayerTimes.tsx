import { VStack, Text, HStack, Stack } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PrayerTime from "./PrayerTime";
import izr_server from "../../configs/configfile";

interface Props {
  nextPrayer: string;
  countdown: boolean;
}
interface prayers {
  Asr: string;
  Date: string;
  Dhuhr: string;
  Fajr: string;
  Isha: string;
  Maghrib: string;
  Shuruq: string;
  Jumaa: string;
}

interface iqamah_type {
  Asr: number;
  Dhuhr: number;
  Maghrib: number;
  Isha: number;
  Jumaa: number;
  Fajr: number;
  Shuruq: number;
}

interface iqama_resp {
  iqamah: iqamah_type;
}

function PrayerTimes({ nextPrayer, countdown }: Props) {
  const [prayerTimes, setPrayerTimes] = React.useState<prayers>();
  const [iqamahs, setIqamahs] = useState<iqamah_type>();

  const prayers = [
    {
      nameDe: "Fajr",
      nameAr: "الفجر",
      time: prayerTimes?.Fajr,
      iqamah_time: iqamahs?.Fajr,
    },
    {
      nameDe: "Shuruq",
      nameAr: "الشروق",
      time: prayerTimes?.Shuruq,
      iqamah_time: iqamahs?.Shuruq,
    },
    {
      nameDe: "Dhuhr",
      nameAr: "الظهر",
      time: prayerTimes?.Dhuhr,
      iqamah_time: iqamahs?.Dhuhr,
    },
    {
      nameDe: "Asr",
      nameAr: "العصر",
      time: prayerTimes?.Asr,
      iqamah_time: iqamahs?.Asr,
    },
    {
      nameDe: "Maghrib",
      nameAr: "المغرب",
      time: prayerTimes?.Maghrib,
      iqamah_time: iqamahs?.Maghrib,
    },
    {
      nameDe: "Isha",
      nameAr: "العشاء",
      time: prayerTimes?.Isha,
      iqamah_time: iqamahs?.Isha,
    },
    {
      nameDe: "Jumaa",
      nameAr: "الجمعـة",
      time: prayerTimes?.Jumaa,
      iqamah_time: iqamahs?.Jumaa,
    },
  ];

  useEffect(() => {
    const id = setInterval(() => {
      axios
        .get<iqama_resp>(izr_server.url + "/getPrayers/next")
        .then((response) => {
          setIqamahs(response.data.iqamah);
          // console.log(response.data.iqamah);
        });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      axios.get<prayers>(izr_server.url + "/getPrayers").then((res) => {
        setPrayerTimes(res.data);
        console.log("PrayerTimes updated ");
      });
    }, 5000);
    return () => clearInterval(id);
  }, []);
  return (
    <Stack
      padding={5}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      height={"100%"}
    >
      {prayers.map((prayer) => (
        <PrayerTime
          key={prayer.nameDe}
          en={prayer.nameDe}
          ar={prayer.nameAr}
          time={prayer.time!}
          iqamah={prayer.iqamah_time!}
          active={prayer.nameDe === nextPrayer ? true : false}
          countdown={countdown}
        />
      ))}
    </Stack>
  );
}

export default PrayerTimes;
