"use client";

import Pagination from "@/components/Pagination";
import {fetchAgentMessages as fetchUserMessage} from "@/lib/features/messages/messagesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Box, Button, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { MessageCard } from "@/components/Card";
import { openNewAgentMessage as openNewUserMessage } from "@/lib/features/modal/modalSlice";

const UserMessages = () => {
  const { data, loading } = useAppSelector((state) => state.messages.messages);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUserMessage());
  }, [dispatch]);
  return (
    <Box pb="2rem">
      <Text px={{base: "1rem", md: "4rem"}} pt="2rem" pb="1rem" fontWeight={500} fontSize="30px">
        Messages
      </Text>
      <Box px={{base: "1rem", md: "4rem"}} pb="2rem">
        <Button bg="#258C37" onClick={()=>{dispatch(openNewUserMessage())}}>
          New Message
        </Button>
      </Box>
      <Pagination
        data={data}
        resetTrigger={data.length}
        title="Messages"
        emptyMessage="No Message available..."
        isLoading= {loading}
        type="blog"
        render={(message) => (
          <Box p={{base: "2rem 0rem", md: "2rem 4rem"}}>
            <MessageCard messages={message} />
          </Box>
        )}
      />
    </Box>
  );
};

export default UserMessages;
