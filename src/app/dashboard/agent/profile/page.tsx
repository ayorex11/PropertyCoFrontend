"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateAgentProfileApi } from "@/lib/api/profileApi";
import { fetchAgentProfile } from "@/lib/features/profile/profileSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ApiErrorResponse } from "@/lib/types";
import { agentProfilePayload, agentProfileSchema } from "@/schemas/schema";
import { errorToast, successToast } from "@/utils/CustomToast";
import {
  Box,
  Button,
  Field,
  HStack,
  Icon,
  Input,
  Separator,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import ImageUploaderWithCrop from "@/components/ImageUploader";
import { urlToFile } from "@/utils/StringToFile";
import { MdOutlineStar } from "react-icons/md";
import DocumentForm from "../components/DocumentsForm";
import { fetchAgentDocuments } from "@/lib/features/documents/documentsSlice";

const AgentProfile = () => {
  const { data, loading } = useAppSelector((state) => state.profile.agent);
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<agentProfilePayload>({
    resolver: zodResolver(agentProfileSchema),
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAgentProfile());
    dispatch(fetchAgentDocuments());
  }, [dispatch]);
  useEffect(() => {
    if (data) {
      const loadProfilePic = async () => {
      let profilePic: File | null = null;
      profilePic = await urlToFile(data.profile_picture, "AgentPic.jpg");
      
      reset({
        first_name: data.first_name,
        last_name: data.last_name,
        contact_number: data.contact_number,
        contact_number2: data.contact_number2,
        address: data.address,
        agency: data.agency,
        bank_name: data.bank_name,
        name_on_account: data.name_on_account,
        account_number: data.account_number,
        profile_picture: profilePic
      });
    }
    loadProfilePic();

    }
  }, [data, reset]);
  if (loading) return <Spinner size="xl" />;
  if (!data) return null;
  const onSubmit = async (data: agentProfilePayload) => {
    try {
      await updateAgentProfileApi(data);
      await dispatch(fetchAgentProfile());
      successToast("Profile Updated successfully");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as ApiErrorResponse;
        // Extract first error message
        let firstError = "Unable to update";
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
    <Box bg="#F5F5F5" pb="2rem">
      <Text p={{base: "2rem 1rem", md: "2rem 4rem"}} fontWeight={500} fontSize="30px">
        My Profile
      </Text>
      <Stack px={{base: "1rem", md: "4rem"}} color="#6A6A6A" gap={10} as="form" onSubmit={handleSubmit(onSubmit)}>
        <HStack gap={5} flexDir={{base: "column", md: "row"}} justifyContent="space-between">
          <ImageUploaderWithCrop
            name="profile_picture"
            control={control}
            type="avatar"
            defaultImage={watch("profile_picture")}
            aspect="150/150"
          />
          <Stack color="#074C98">
            <Text fontWeight={600} fontSize="20px">
              Rating
            </Text>
            <HStack>
              <Text fontWeight={600} fontSize="49px">
                {Number(data.rating || 0).toFixed(2)}
              </Text>
              <Icon as={MdOutlineStar} boxSize="50px" />
            </HStack>
          </Stack>
        </HStack>
        <HStack gap={5} flexDir={{base: "column", md: "row"}}>
          <Field.Root invalid={!!errors.first_name}>
            <Field.Label fontSize="20px" mb={2}>
              First Name
            </Field.Label>
            <Input {...register("first_name")} fontSize="20px" />
          </Field.Root>
          <Field.Root invalid={!!errors.last_name}>
            <Field.Label fontSize="20px" mb={2}>
              Last Name
            </Field.Label>
            <Input {...register("last_name")} fontSize="20px" />
          </Field.Root>
        </HStack>
        <Field.Root>
          <Field.Label fontSize="20px" mb={2}>
            Email Address
          </Field.Label>
          <Input value={data?.email_address} readOnly fontSize="20px" />
        </Field.Root>
        <Field.Root
          invalid={!!errors.contact_number && !!errors.contact_number2}
        >
          <Field.Label fontSize="20px" mb={2}>
            Phone Number
          </Field.Label>
          <HStack flexDir={{base: "column", md: "row"}} w="full" alignItems={{base: "flex-start", md: "center"}}>
            <Box
              flex={1}
              bg="#B1CFEF40"
              p="5px"
              borderRadius="10px"
              fontSize="20px"
              px={5}
            >
              Nigeria (234)
            </Box>
            <Input {...register("contact_number")} flex={2} fontSize="20px" />
            <Input {...register("contact_number2")} flex={2} fontSize="20px" />
          </HStack>
        </Field.Root>
        <Field.Root invalid={!!errors.address}>
          <Field.Label fontSize="20px" mb={2}>
            Address
          </Field.Label>
          <Input {...register("address")} fontSize="20px" />
        </Field.Root>
        <Field.Root invalid={!!errors.address} mb="3rem">
          <Field.Label fontSize="23px" mb={2} fontWeight={700}>
            Account Details
          </Field.Label>
          <Stack w="full">
            <HStack flexDir={{base: "column", md: "row"}} w="full" alignItems={{base: "flex-start", md: "center"}}>
              <Input {...register("bank_name")} fontSize="20px" placeholder="Bank Name"/>
              <Input {...register("account_number")} fontSize="20px" placeholder="Account Number"/>
            </HStack>
            <Input {...register("name_on_account")} fontSize="20px" placeholder="Account Holder's Full Name"/>
          </Stack>
        </Field.Root>
        <Field.Root invalid={!!errors.address} mb="1rem">
          <Field.Label fontSize="23px" mb={2} fontWeight={700}>
            Agency
          </Field.Label>
          <Input {...register("agency")} fontSize="20px" placeholder="Agency Name"/>
        </Field.Root>
        <Button
          type="submit"
          bg="#4169E0"
          loading={isSubmitting}
          disabled={isSubmitting}
          loadingText="Updating..."
        >
          Update Profile
        </Button>
      </Stack>
      <Separator
        orientation="horizontal"
        borderColor="#074C98"
        variant="solid"
        w="100%"
        my={6}
      />
      <DocumentForm/>
    </Box>
  );
};

export default AgentProfile;
