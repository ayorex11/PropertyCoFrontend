import { sendAdminMessageApi } from "@/lib/api/messagesApi";
import { fetchMembers } from "@/lib/features/members/membersSlice";
import { fetchAdminMessages } from "@/lib/features/messages/messagesSlice";
import { closeModals } from "@/lib/features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ApiErrorResponse, OptionType } from "@/lib/types";
import { adminMessagePayload, adminMessageSchema } from "@/schemas/schema";
import { errorToast, successToast } from "@/utils/CustomToast";
import {
  Box,
  Button,
  CloseButton,
  Field,
  Float,
  Grid,
  GridItem,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

const AdminSendMessage = ({receiver = "0"}: {receiver?: string}) => {
  const members = useAppSelector((state) => state.members.members);
  const membersLoading = useAppSelector((state) => state.members.loading.members);
  const dispatch = useAppDispatch();
  const receiverOptions: OptionType[] = members.map((member) => ({
    id: member.member_id,
    name: `${member.first_name} ${member.last_name}`,
  }));
  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch]);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<adminMessagePayload>({
    resolver: zodResolver(adminMessageSchema),
    defaultValues: {
      receiver: receiver
    }
  });

  const onSubmit = async (data: adminMessagePayload) => {
    try {
      await sendAdminMessageApi(data);
      await dispatch(fetchAdminMessages());
      dispatch(closeModals());
      successToast("Message Sent successfully");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as ApiErrorResponse;
        // Extract first error message
        let firstError = "Unable to send";
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
  return (
    <VStack
      position="fixed"
      w="100%"
      h="100vh"
      justifyContent="center"
      zIndex={30}
      bg="#FFFFFFA2"
      backdropFilter="blur(5px)"
    >
      <Box
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        bg="#F5F5F5"
        maxW="2xl"
        w="full"
        pb="2rem"
        px="2rem"
        borderRadius="20px"
        pos="relative"
        maxH="100vh"
        overflowY="auto"
      >
        <Float offset={10} zIndex={10}>
            <CloseButton onClick={() => dispatch(closeModals())} />
        </Float>
        <Text fontSize="30px" fontWeight={700} py="2rem">
          New Message
        </Text>
        <VStack gap={5} color="#000048">
          {/* Receiver */}
          <Field.Root invalid={!!errors.receiver}>
            <Controller
              name="receiver"
              control={control}
              rules={{ required: "Receiver is required" }}
              render={({ field }) => (
                <Grid templateColumns={{base: "repeat(1, 1fr)", md: "repeat(6, 1fr)"}} gap={2} w="full">
                  <GridItem colSpan={1}>
                    <Text fontWeight={600} fontSize="20px">
                      To
                    </Text>
                  </GridItem>
                  <GridItem colSpan={{base: 1, md: 5}}>
                    <Select
                      placeholder="Select Member"
                      options={receiverOptions}
                      isLoading={membersLoading}
                      getOptionLabel={(option: OptionType) => option.name}
                      getOptionValue={(option: OptionType) => option.id}
                      onChange={(selectedOption) =>
                        field.onChange((selectedOption as OptionType)?.id)
                      }
                      value={receiverOptions.find(
                        (option) => option.id === field.value
                      )}
                      className="w-full"
                    />
                  </GridItem>
                </Grid>
              )}
            />
            <Field.ErrorText>{errors.receiver?.message}</Field.ErrorText>
          </Field.Root>

          {/* Subject */}
          <Field.Root invalid={!!errors.subject}>
            <Grid templateColumns={{base: "repeat(1, 1fr)", md: "repeat(6, 1fr)"}} gap={2} w="full">
              <GridItem colSpan={1}>
                <Field.Label fontWeight={600} fontSize="20px">
                  Subject:
                </Field.Label>
              </GridItem>
              <GridItem colSpan={{base: 1, md: 5}}>
                <Input {...register("subject")} bg="#FFFFFF" border="1px solid #1944B4" borderRadius="10px" />
              </GridItem>
            </Grid>
            <Field.ErrorText>{errors.subject?.message}</Field.ErrorText>
          </Field.Root>

          {/* Body */}
          <Field.Root invalid={!!errors.body}>
            <Grid templateColumns={{base: "repeat(1, 1fr)", md: "repeat(6, 1fr)"}} gap={2} w="full">
              <GridItem colSpan={1}>
                <Field.Label fontWeight={600} fontSize="20px">
                  Message
                </Field.Label>
              </GridItem>
              <GridItem colSpan={{base: 1, md: 5}}>
                <Textarea {...register("body")} bg="#FFFFFF" border="1px solid #1944B4" rows={10} borderRadius="10px" />
              </GridItem>
            </Grid>
            <Field.ErrorText>{errors.body?.message}</Field.ErrorText>
          </Field.Root>
          <Button
            type="submit"
            colorScheme="blue"
            w="full"
            bg="#258C37"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            Send Message
          </Button>
        </VStack>
      </Box>
    </VStack>
  );
};

export default AdminSendMessage;
