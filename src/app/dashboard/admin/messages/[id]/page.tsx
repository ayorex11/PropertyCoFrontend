"use client";

import {
  markMessageAsReadAdminThunk,
  readAdminMessageById,
} from "@/lib/features/messages/messagesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Box, Button, Grid, GridItem, Spinner, Stack, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { errorToast } from "@/utils/CustomToast";
import { formatDateAlone, formatTimeAlone } from "@/utils/converters";
import { PropertyCard } from "@/components/Card";
import { openNewAdminMessage } from "@/lib/features/modal/modalSlice";

const AdminMessageDetails = () => {
  const { id } = useParams();
  const { data, loading } = useAppSelector(
    (state) => state.messages.adminMessageDetail
  );
  const message = data?.data;
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!id) {
      errorToast("Invalid Message Id");
      return;
    }
    const messageId = Array.isArray(id) ? id[0] : id;
    if (messageId) {
      dispatch(readAdminMessageById(messageId));
      dispatch(markMessageAsReadAdminThunk(messageId));
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
  return (
    <Stack p={{base: "2rem 0rem", md: "2rem 4rem"}} gap={2} color="#000048" textAlign="left">
      <Grid
        templateColumns="repeat(6, 1fr)"
        gap={5}
        alignItems="center"
        bg="#ECECEC"
        p={{base: "1rem", md: "1rem 4rem"}}
      >
        <GridItem colSpan={5}>
          <Stack>
            <Text fontWeight={700} fontSize="22px" truncate>
              {message?.sender}
            </Text>
            <Text fontWeight={500} color="#4D5E80" fontSize="20px" truncate>
              {message?.subject}
            </Text>
          </Stack>
        </GridItem>
        <GridItem>
          <Box color="#ADB8CC" fontWeight={700}>
            <Text textAlign="right" fontSize="18px">
              {formatDateAlone(String(message?.date_created))}
            </Text>
            <Text textAlign="right" fontSize="18px">
              {formatTimeAlone(String(message?.date_created))}
            </Text>
          </Box>
        </GridItem>
      </Grid>
      <Stack gap={5} bg="#ECECEC" py={{base: "2rem", md: "2rem"}}>
        <Text fontWeight={500} fontSize="16px" px={{base: "1rem", md: "4rem"}} textAlign="justify">
          {message?.body}
        </Text>
        {message?.prop && <PropertyCard property={message?.prop} />}
      </Stack>
      <Button bg="#258C37" w="10rem" m="auto" onClick={()=>{dispatch(openNewAdminMessage(data?.sender_id))}}>
        Reply
      </Button>
    </Stack>
  );
};

export default AdminMessageDetails;
