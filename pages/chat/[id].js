import Sidebar from "@/components/Sidebar";
import Topbar from "../../components/Topbar";
import Bottombar from "../../components/Bottombar";
import {
  Avatar,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import {
  DocumentReference,
  collection,
  doc,
  orderBy,
  query,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { db, auth } from "@/firebaseconfig";
import { useAuthState } from "react-firebase-hooks/auth";
import getOtherEmail from "@/components/utls/getOtherEmail";
import { useEffect, useRef, useState } from "react";

export default function Chat() {
  const router = useRouter();
  const { id } = router.query;
  const [user] = useAuthState(auth);
  const [chat] = useDocumentData(doc(db, "chats", id));
  const q = query(collection(db, `chats/${id}/messages`), orderBy("timestamp"));
  const [messages] = useCollectionData(q);
  const bottomOfChat = useRef();

  const getMessages = () =>
    messages?.map((msg) => {
      const sender = msg.sender === user.email;
      return (
        <Flex
          key={Math.random()}
          bg={sender ? "blue.100" : "green.100"}
          w="fit-content"
          minWidth="100px"
          borderRadius="lg"
          p={3}
          m={1}
          alignSelf={sender ? "flex-start" : "flex-end"}
        >
          <Text>{msg.text}</Text>
        </Flex>
      );
    });

  // useEffect(
  //   () =>
  //     setTimeout(
  //       bottomOfChat.current.scrollbarWidth({
  //         behavior: "smooth",
  //         block: "start",
  //       }),
  //       100
  //     ),
  //   [messages]
  // );

  return (
    <Flex h="100vh">
      <Head>
        <title>Chat App</title>
      </Head>
      <Sidebar />

      <Flex flex={1} direction="column">
        <Topbar email={getOtherEmail(chat?.users, user)} />

        <Flex
          flex={1}
          direction="column"
          pt={4}
          mx={5}
          overflowX="scroll"
          sx={{ scrollbarWidth: "none" }}
        >
          {getMessages()}
        </Flex>
        <Bottombar id={id} user={user} />
      </Flex>
    </Flex>
  );
}
