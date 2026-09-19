"use client";

import {
  markMessageAsReadAgentThunk,
  readAgentMessageById,
} from "@/lib/features/messages/messagesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Box, Grid, GridItem, Spinner, Stack, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { errorToast } from "@/utils/CustomToast";
import { formatDateAlone, formatTimeAlone } from "@/utils/converters";

const UserMessageDetails = () => {
  const { id } = useParams();
  const { data, loading } = useAppSelector(
    (state) => state.messages.messageDetail
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!id) {
      errorToast("Invalid Message Id");
      return;
    }
    const messageId = Array.isArray(id) ? id[0] : id;
    if (messageId) {
      dispatch(readAgentMessageById(messageId));
      dispatch(markMessageAsReadAgentThunk(messageId));
    }
  }, [id, dispatch]);
  if (loading) return <Spinner size="xl" />;
  if (!data)
    return (
      <Text
        w={{ base: "100%", md: "1000px" }}
        mx="auto"
        p="2rem 4rem"
        color="#074C98"
        my="5rem"
        fontSize="24px"
        px={{base: "1rem", md: "0rem"}}
      >
        No Message Found.
      </Text>
    );
  console.info("info", data);
  return (
    <Stack p={{ base: "2rem 0rem", md: "2rem 4rem" }} gap={2} color="#000048" textAlign="left">
      <Grid
        templateColumns="repeat(6, 1fr)"
        gap={5}
        alignItems="center"
        bg="#ECECEC"
        p={{ base: "1rem", md: "1rem 4rem" }}
      >
        <GridItem colSpan={5}>
          <Stack>
            <Text fontWeight={700} fontSize="22px">
              {data.sender}
            </Text>
            <Text fontWeight={500} color="#4D5E80" fontSize="20px">
              {data.subject}
            </Text>
          </Stack>
        </GridItem>
        <GridItem>
          <Box color="#ADB8CC" fontWeight={700}>
            <Text textAlign="right" fontSize="18px">
              {formatDateAlone(data.date_created)}
            </Text>
            <Text textAlign="right" fontSize="18px">
              {formatTimeAlone(data.date_created)}
            </Text>
          </Box>
        </GridItem>
      </Grid>
      <Stack gap={5} bg="#ECECEC" p={{base: "2rem 1rem", md: "2rem 4rem"}}>
        <Text fontWeight={500} fontSize="16px" textAlign="justify">
          {data.body}
        </Text>
      </Stack>
    </Stack>
  );
};

export default UserMessageDetails;
