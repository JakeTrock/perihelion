import { useState } from "react";
import {
  Center,
  Text,
  Link,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import Button from "../atoms/button";
import Textarea from "../atoms/textarea";
import BlobUploader from "../molecules/blobUploader";
import Profiles from "../molecules/profiles";

export default function MessageForm({ root, recps, newMesssage }) {
  const [postError, setPostError] = useState("");
  const [textValue, setTextValue] = useState("");
  const [name, setName] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmit = async (e) => {
    e.preventDefault();
    setPostError("");
    const response = await fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        root,
        text: textValue,
        recps,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setPostError(data.error);
    } else {
      setTextValue("");
      root && onClose();
      newMesssage(data);
    }
  };

  const blobUloaded = (data) => {
    const inputvalue = textValue + data.link;
    setTextValue(inputvalue);
  };

  const filterProfiles = (content) => {
    const re = /^(@\w+)| (@\w+)/g;
    const matches = content.match(re);
    if (matches) {
      setName(matches[0].trim().substring(1));
    }
  };

  const insertMention = (original, mention) => {
    setTextValue(textValue.replace("@" + original, mention));
  };

  return (
    <>
      {(isOpen || !root) && (
        <>
          <form onSubmit={onSubmit}>
            <Textarea
              placeholder="Write your message here"
              name="text"
              value={textValue}
              onChange={(e) => {
                setTextValue(e.target.value);
                filterProfiles(e.target.value);
              }}
            />
            {name && <Profiles name={name} onSelect={insertMention} />}

            {postError && (
              <Text color="tomato" mt="2">
                {postError}
              </Text>
            )}
            <Center>
              <Stack direction="row">
                <Center>
                  <Button>Post message</Button>
                </Center>
                <Center>
                  <BlobUploader blobUloaded={blobUloaded} />
                </Center>
              </Stack>
            </Center>
          </form>
        </>
      )}
      {!isOpen && root && (
        <Center>
          <Link
            color={useColorModeValue("frost.700", "frost.500")}
            mt="2"
            onClick={isOpen ? onClose : onOpen}
          >
            Reply to thread
          </Link>
        </Center>
      )}
    </>
  );
}
