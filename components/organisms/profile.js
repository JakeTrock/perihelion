import { Heading, Stack } from "@chakra-ui/react";
import Button from "../atoms/button";
import Avatar from "../atoms/avatar";
import Content from "../atoms/content";
import Container from "../atoms/container";

export default function Profile({ profile }) {
  return (
    <Container>
      <Stack align={"center"}>
        <Avatar image={profile.image} />
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {profile.name}
        </Heading>
        <Content text={profile.description} />

        <Button>Follow</Button>
      </Stack>
    </Container>
  );
}
