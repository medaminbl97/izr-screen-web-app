import { VStack, Heading, Stack, Card, Text, Image } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import izr_server from "../../configs/configfile";

interface event {
  date: string;
  description: string;
  flyer: string;
  id: string;
  subtitle: string;
  title: string;
}

interface resp {
  events: event[];
}

export default function EventsBoard() {
  const [events, setEvents] = React.useState<event[]>([]);
  const [noEvent, setNoEvents] = React.useState(true);

  useEffect(() => {
    axios.get<resp>(izr_server.url + "getEvents/all").then((res) => {
      res.data.events[0].flyer === izr_server.url + "getEvents/No_Events.jpg"
        ? setNoEvents(true)
        : setNoEvents(false);
      setEvents(res.data.events);
      console.log(res);
      console.log(noEvent);
    });
  }, []);
  return (
    <Stack gap={10} height={"70vh"} direction={"column"}>
      {noEvent && (
        <Stack
          spacing={10}
          direction={{ lg: "row", base: "column" }}
          flex={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Card width={{ lg: "50%", base: "60%" }}>
            <Image src={events[0]?.flyer}></Image>
          </Card>
          <Stack>
            <Heading>Aktuelle Veranstaltungen </Heading>
            <Text>
              Wir haben im Moment keine Veranstaltungen. Bitte beachten Sie,
              dass zukünftige Veranstaltungen andgekündigt werden.
            </Text>
          </Stack>
        </Stack>
      )}
      {!noEvent &&
        events.map((event) => (
          <Stack key={event.id} direction={{ lg: "row", base: "column" }}>
            <Card width={{ lg: "50%", base: "60%" }}>
              <Image src={event.flyer}></Image>
            </Card>
            <Stack>
              <Heading>{event.title}</Heading>
              <Heading>{event.subtitle}</Heading>
              <Text>{event.description}</Text>
            </Stack>
          </Stack>
        ))}
    </Stack>
  );
}
