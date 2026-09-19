import { sendAgentMessageApi } from "@/lib/api/messagesApi";
import { fetchAgentMessages } from "@/lib/features/messages/messagesSlice";
import { closeModals } from "@/lib/features/modal/modalSlice";
import { fetchSavedProperties } from "@/lib/features/savedProperties/savedPropertiesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ApiErrorResponse, OptionType } from "@/lib/types";
import { agentMessagePayload, agentMessageSchema } from "@/schemas/schema";
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

const AgentSendMessage = () => {
  const {savedProperties, loading} = useAppSelector((state) => state.savedProperties);
  const dispatch = useAppDispatch();
  const propertyOptions: OptionType[] = savedProperties.map((prop) => ({
    id: String(prop?.id),
    name: prop?.prop?.property_id,
  }));
  useEffect(() => {
    dispatch(fetchSavedProperties())
  }, [dispatch]);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<agentMessagePayload>({
    resolver: zodResolver(agentMessageSchema),
  });

  const onSubmit = async (data: agentMessagePayload) => {
    try {
      await sendAgentMessageApi(data);
      await dispatch(fetchAgentMessages());
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
          <Field.Root invalid={!!errors.property_id}>
            <Controller
              name="property_id"
              control={control}
              render={({ field }) => (
                <Grid templateColumns={{base: "repeat(1, 1fr)", md: "repeat(6, 1fr)"}} gap={2} w="full">
                  <GridItem colSpan={1}>
                    <Text fontWeight={600} fontSize="20px">
                      Prop
                    </Text>
                  </GridItem>
                  <GridItem colSpan={{base: 1, md: 5}}>
                    <Select
                      placeholder="Select Saved Property"
                      options={propertyOptions}
                      isLoading={loading}
                      getOptionLabel={(option: OptionType) => option.name}
                      getOptionValue={(option: OptionType) => option.name}
                      onChange={(selectedOption) =>
                        field.onChange((selectedOption as OptionType)?.name)
                      }
                      value={propertyOptions.find(
                        (option) => option.name === field.value
                      )}
                      className="w-full"
                    />
                  </GridItem>
                </Grid>
              )}
            />
            <Field.ErrorText>{errors.property_id?.message}</Field.ErrorText>
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

export default AgentSendMessage;