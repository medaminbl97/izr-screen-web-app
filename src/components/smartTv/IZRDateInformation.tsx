import { Flex, HStack, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DateObject from "react-date-object";
import arabic from "react-date-object/calendars/arabic";
import arabic_ar from "react-date-object/locales/arabic_ar";
import arabic_en from "react-date-object/locales/arabic_en";
import styles from "../styles/bgStyles.module.css";

export default function IZRDateInformation() {
  const [gDate, setgDate] = useState("");
  const [agDate, setagDate] = useState("");
  const [hDate, sethDate] = useState("");
  const color = "#005C53";

  // const getDate = () => {
  //   const gdate = new DateObject({
  //     date: new Date(),
  //     format: "DD MM YY",
  //   });
  //   const date = new DateObject({
  //     date: new Date(),
  //     calendar: arabic,
  //     locale: arabic_ar,
  //     format: "dddd DD MMMM YYYY",
  //   });
  //   console.log(date.format());

  //   setgDate(gdate.format("dddd DD MMMM YYYY"));
  //   sethDate(date.format("dddd DD MMMM YYYY"));
  // };

  const getDate = () => {
    const currentDate = new Date();

    // Format the date in German
    const germanOptions: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const germanDate = new Intl.DateTimeFormat("de-DE", germanOptions).format(
      currentDate
    );

    // Format the date in Arabic
    const arabicOptions: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      numberingSystem: "latn",
    };
    const arabicDate = new Intl.DateTimeFormat("ar-EG", arabicOptions).format(
      currentDate
    );

    const date = new DateObject({
      date: new Date(),
      calendar: arabic,
      locale: arabic_ar,
      format: "dddd DD MMMM YYYY",
    });

    // console.log(date.day);
    // console.log(date.date);

    const month = date.format("MMMM");
    const day = date.format("dddd");

    sethDate(day + " " + date.day + " " + month + " " + date.year);

    // console.log(arabicDate);
    // console.log(germanDate);

    setgDate(germanDate);
    setagDate(arabicDate);
  };
  useEffect(() => {
    getDate();
    setInterval(() => {
      getDate();
    }, 60 * 60 * 1000);
  }, []);

  return (
    <Stack
      display={"flex"}
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-around"}
      backgroundColor={"white"}
      borderRadius={"0.5vw"}
      padding={1}
      height={"100%"}
    >
      <HStack>
        <Text
          fontWeight={"bold"}
          color={"black"}
          fontFamily={"Poppins"}
          lineHeight={"100%"}
          fontSize={"1.5vw"}
        >
          {gDate}
        </Text>
      </HStack>

      <Text
        lineHeight={"100%"}
        fontSize={"1.5vw"}
        fontFamily={"Almarai"}
        fontWeight={"black"}
        color={"black"}
      >
        {agDate}
      </Text>
      <Text
        lineHeight={"100%"}
        fontSize={"1.5vw"}
        fontFamily={"Almarai"}
        fontWeight={"black"}
        color={"black"}
      >
        {hDate}
      </Text>
    </Stack>
  );
}
