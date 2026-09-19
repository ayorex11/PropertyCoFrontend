"use client";

import { changeRatingApi } from "@/lib/api/ratingApi";
import { fetchAgentDetails } from "@/lib/features/members/membersSlice";
import { openNewAdminMessage } from "@/lib/features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ApiErrorResponse } from "@/lib/types";
import { RatingFormPayload, ratingSchema } from "@/schemas/schema";
// import { formatDateToReadable } from '@/utils/converters'
import { errorToast, successToast } from "@/utils/CustomToast";
import {
  Box,
  Text,
  Stack,
  Spinner,
  HStack,
  Avatar,
  Button,
  Grid,
  GridItem,
  Input,
  Field,
  Icon,
  useTooltip,
  Tooltip,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineStar } from "react-icons/md";
import RatingTable from "./RatingTable";
import { unVerifyUserApi, verifyUserApi } from "@/lib/api/authApi";
import { fetchAgentRatingHistory } from "@/lib/features/ratings/ratingsSlice";
import { fetchAgentDocumentsByEmail } from "@/lib/features/documents/documentsSlice";
import { FaFileCircleCheck } from "react-icons/fa6";
import Link from "next/link";

const Agent = () => {
  const [submitting, setSubmitting] = useState(false);
  const { email } = useParams();
  const dispatch = useAppDispatch();
  const agent = useAppSelector((state) => state.members.agentDetail);
  const agentLoading = useAppSelector(
    (state) => state.members.loading.agentDetail
  );
  const { data, loading } = useAppSelector(
    (state) => state.ratings.ratingHistory
  );

  const { data: documentData, loading: documentLoading } = useAppSelector(
    (state) => state.documents.agentDocumentsByEmail
  );

  const tooltip = useTooltip();
  const toggleOpen = () => tooltip.setOpen(!tooltip.open);
  useEffect(() => {
    if (!email) {
      errorToast("Invalid Email");
      return;
    }
    const agentEmail = Array.isArray(email) ? email[0] : email;
    if (agentEmail) {
      dispatch(fetchAgentDetails(agentEmail));
      dispatch(fetchAgentRatingHistory(agentEmail));
      dispatch(fetchAgentDocumentsByEmail(agentEmail));
    }
  }, [email, dispatch]);

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RatingFormPayload>({
    resolver: zodResolver(ratingSchema),
    defaultValues: {
      rating: agent?.rating,
      member_id: agent?.member_id,
    },
  });

  useEffect(() => {
    if (agent) {
      reset({
        member_id: agent?.member_id,
        rating: agent?.rating,
      });
    }
  }, [agent, reset, dispatch]);

  const onSubmit = async (data: RatingFormPayload) => {
    try {
      await changeRatingApi(data);
      if (agent?.email_address) {
        await dispatch(fetchAgentDetails(agent.email_address));
        await dispatch(fetchAgentRatingHistory(agent.email_address));
      }
      successToast("Rating applied successfully");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as ApiErrorResponse;
        // Extract first error message
        let firstError = "Unable to apply";
        if (typeof data === "string") {
          firstError = data;
        } else if (typeof data.detail === "string") {
          firstError = data.detail;
        } else if (Array.isArray(Object.values(data)[0])) {
          firstError = Object.values(data)[0][0];
        } else {
          firstError = String(Object.values(data)[0]);
        }
        errorToast(firstError);
      } else {
        errorToast("Unexpected error occurred");
      }
    }
  };

  const handleVerify = async () => {
    setSubmitting(true);
    try {
      if (agent) {
        await verifyUserApi(agent.member_id);
        await dispatch(fetchAgentDetails(agent.email_address));
        successToast("Agent Verified successfully");
      } else {
        errorToast("Unable to verify");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as ApiErrorResponse;
        // Extract first error message
        let firstError = "Unable to verify";
        if (typeof data === "string") {
          firstError = data;
        } else if (typeof data.detail === "string") {
          firstError = data.detail;
        } else if (Array.isArray(Object.values(data)[0])) {
          firstError = Object.values(data)[0][0];
        } else {
          firstError = String(Object.values(data)[0]);
        }
        errorToast(firstError);
      } else {
        errorToast("Unexpected error occurred");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleUnverify = async () => {
    setSubmitting(true);
    try {
      if (agent) {
        await unVerifyUserApi(agent.member_id);
        await dispatch(fetchAgentDetails(agent.email_address));
        successToast("Agent Unverified successfully");
      } else {
        errorToast("Unable to unverify");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as ApiErrorResponse;
        // Extract first error message
        let firstError = "Unable to unverify";
        if (typeof data === "string") {
          firstError = data;
        } else if (typeof data.detail === "string") {
          firstError = data.detail;
        } else if (Array.isArray(Object.values(data)[0])) {
          firstError = Object.values(data)[0][0];
        } else {
          firstError = String(Object.values(data)[0]);
        }
        errorToast(firstError);
      } else {
        errorToast("Unexpected error occurred");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (agentLoading) return <Spinner size="xl" />;
  if (!agent)
    return (
      <Text
        w={{ base: "100%", md: "1000px" }}
        mx="auto"
        color="#074C98"
        my="2rem"
        fontSize="24px"
        px={{ base: "1rem", md: "2rem" }}
      >
        No Agent Found.
      </Text>
    );
  return (
    <Box pb="2rem">
      <Stack p={{ base: "2rem 1rem", md: "2rem 4rem" }} color="#000048" gap={5}>
        <Text fontWeight={500} fontSize="30px">
          Member
        </Text>
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
          gapY={5}
        >
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Stack alignItems={{ base: "center", md: "flex-start" }}>
              <Text fontWeight={600} color="#6A6A6A" fontSize="24px">
                Agent
              </Text>
              <HStack
                pos="relative"
                flexDir={{ base: "column", md: "row" }}
                gap={5}
              >
                <Avatar.Root w="150px" h="150px">
                  <Avatar.Fallback
                    name={`${agent?.first_name} ${agent?.last_name}`}
                  />
                  <Avatar.Image src={agent?.profile_picture} />
                </Avatar.Root>
                <Stack>
                  <Text fontWeight={500} fontSize="16px" color="#6A6A6A">
                    Member ID: {agent?.member_id}
                  </Text>
                  <Button
                    p="0px"
                    w="180px"
                    h="40px"
                    bg="#258C37"
                    color="#EFF3FA"
                    m="auto"
                    display="block"
                    fontWeight={600}
                    fontSize="16px"
                    onClick={() =>
                      dispatch(openNewAdminMessage(agent?.member_id))
                    }
                  >
                    Send Message
                  </Button>
                </Stack>
              </HStack>
            </Stack>
          </GridItem>
          <GridItem>
            <Stack
              as="form"
              onSubmit={handleSubmit(onSubmit)}
              color="#074C98"
              alignItems={{ base: "center", md: "flex-start" }}
            >
              <Text fontWeight={600} fontSize="20px">
                Rating
              </Text>
              <HStack gap={5} flexDir={{ base: "column", md: "row" }}>
                <HStack>
                  <Text fontWeight={600} fontSize="49px">
                    {Number(watch("rating") || 0).toFixed(2)}
                  </Text>
                  <Icon as={MdOutlineStar} boxSize="50px" />
                </HStack>
                <HStack>
                  <Button
                    bg="#424242"
                    fontSize="39px"
                    fontWeight={600}
                    onClick={() => {
                      const current = Number(watch("rating")) || 0;
                      setValue("rating", String(Math.max(0, current - 0.25))); // prevent going below 0
                    }}
                  >
                    -
                  </Button>
                  <Button
                    bg="#424242"
                    fontSize="39px"
                    fontWeight={600}
                    onClick={() => {
                      const current = Number(watch("rating")) || 0;
                      setValue("rating", String(Math.min(5.0, current + 0.25)));
                    }}
                  >
                    +
                  </Button>
                </HStack>
              </HStack>
              <Field.Root invalid={!!errors.reason} alignItems={{base: "center", md: "flex-start"}}>
                <Input
                  {...register("reason")}
                  placeholder="Reason for Change"
                  w="250px"
                />
                <Field.ErrorText>{errors.reason?.message}</Field.ErrorText>
              </Field.Root>
              <HStack flexDir={{ base: "column", md: "row" }}>
                <Button
                  type="submit"
                  bg="#074C98"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                >
                  {isSubmitting ? "Applying..." : "Apply Rating Change"}
                </Button>
                <Text
                  color={tooltip.open ? "#074C98" : "#706F6F"}
                  onClick={toggleOpen}
                  fontWeight={600}
                  fontSize="16px"
                  cursor="pointer"
                >
                  History
                </Text>
                <Tooltip.RootProvider value={tooltip}>
                  <Tooltip.Trigger asChild>
                    <Button variant="ghost"></Button>
                  </Tooltip.Trigger>
                  <Tooltip.Positioner w="300px" overflowX="scroll">
                    <Tooltip.Content p="0px" minW="full" overflowX="scroll">
                      <RatingTable ratings={data} loading={loading} />
                    </Tooltip.Content>
                  </Tooltip.Positioner>
                </Tooltip.RootProvider>
              </HStack>
            </Stack>
          </GridItem>
        </Grid>
        <Grid
          templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
          gap={10}
        >
          <GridItem>
            <Stack>
              <Text fontSize="16px" color="#6A6A6A">
                First Name
              </Text>
              <Text fontWeight={500} fontSize="16px" color="#6A6A6A">
                {agent?.first_name || "N/A"}
              </Text>
            </Stack>
          </GridItem>
          <GridItem>
            <Stack>
              <Text fontSize="16px" color="#6A6A6A">
                Last Name
              </Text>
              <Text fontWeight={500} fontSize="16px" color="#6A6A6A">
                {agent?.last_name || "N/A"}
              </Text>
            </Stack>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <Stack>
              <Text fontSize="16px" color="#6A6A6A">
                Email Address
              </Text>
              <Text fontWeight={500} fontSize="14px" color="#6A6A6A">
                {agent?.email_address || "N/A"}
              </Text>
            </Stack>
          </GridItem>
          <GridItem>
            <Stack>
              <Text fontSize="16px" color="#6A6A6A">
                Phone Number
              </Text>
              <Text fontWeight={500} fontSize="16px" color="#6A6A6A">
                Nigeria (+234)
              </Text>
            </Stack>
          </GridItem>
          <GridItem>
            <Stack>
              <Text fontSize="16px" color="#6A6A6A">
                &nbsp;
              </Text>
              <Text fontWeight={500} fontSize="16px" color="#6A6A6A">
                {agent?.contact_number || "N/A"}
              </Text>
            </Stack>
          </GridItem>
          <GridItem>
            <Stack>
              <Text fontSize="16px" color="#6A6A6A">
                &nbsp;
              </Text>
              <Text fontWeight={500} fontSize="16px" color="#6A6A6A">
                {agent?.contact_number2 || "N/A"}
              </Text>
            </Stack>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 3 }}>
            <Stack>
              <Text fontSize="16px" color="#6A6A6A">
                Address
              </Text>
              <Text fontWeight={500} fontSize="16px" color="#6A6A6A">
                {agent?.address || "N/A"}
              </Text>
            </Stack>
          </GridItem>
          {/* <GridItem>
            <Stack>
              <Text fontSize="16px" color="#6A6A6A">Date Registered</Text>
              <Text fontWeight={500} fontSize="16px" color="#6A6A6A">{formatDateToReadable(String(agent?.created_at)) || "N/A"}</Text>
            </Stack>
          </GridItem> */}
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Stack>
              <Text fontSize="16px" color="#6A6A6A">
                Agency
              </Text>
              <Text fontWeight={500} fontSize="16px" color="#6A6A6A">
                {agent?.agency || "N/A"}
              </Text>
            </Stack>
          </GridItem>
          <GridItem></GridItem>
          <GridItem colSpan={{ base: 2, md: 3 }}>
            {documentLoading ? (
              <Spinner size="xl" />
            ) : (
              <Stack>
                <Text fontSize="16px" color="#6A6A6A">
                  Identity Card
                </Text>
                <HStack gap={10} alignItems="flex-end">
                  {documentData?.identity_card ?
                    <Link href={documentData.identity_card} target="_blank">
                      <Text fontWeight={500} fontSize="16px" color="#6A6A6A">
                        <Icon as={FaFileCircleCheck} boxSize={6} color="#258C37"/>
                        View Document
                      </Text>
                    </Link>
                  :
                  <Text fontWeight={500} fontSize="16px" color="#6A6A6A">
                    No Document
                  </Text> 
                  }
                  {agent.verified ? (
                    <Button
                      bg="#424242"
                      onClick={handleUnverify}
                      disabled={submitting}
                      loading={submitting}
                    >
                      Unverify
                    </Button>
                  ) : (
                    <Button
                      bg="#258C37"
                      onClick={handleVerify}
                      disabled={submitting}
                      loading={submitting}
                    >
                      Verify
                    </Button>
                  )}
                </HStack>
                <Text fontSize="16px" color="#6A6A6A">
                  CAC
                </Text>
                <HStack gap={10}>
                  {documentData?.CAC ?
                    <Link href={documentData.CAC} target="_blank">
                      <Text fontWeight={500} fontSize="16px" color="#6A6A6A">
                        <Icon as={FaFileCircleCheck} boxSize={6} color="#258C37"/>
                        View Document
                      </Text>
                    </Link>
                  :
                  <Text fontWeight={500} fontSize="16px" color="#6A6A6A">
                    No Document
                  </Text> 
                  }
                  {agent.verified ? (
                    <Button
                      bg="#424242"
                      onClick={handleUnverify}
                      disabled={submitting}
                      loading={submitting}
                    >
                      Unverify
                    </Button>
                  ) : (
                    <Button
                      bg="#258C37"
                      onClick={handleVerify}
                      disabled={submitting}
                      loading={submitting}
                    >
                      Verify
                    </Button>
                  )}
                </HStack>
              </Stack>
            )}
          </GridItem>
        </Grid>
      </Stack>
    </Box>
  );
};

export default Agent;
