"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserProfileApi } from "@/lib/api/profileApi";
import { fetchUserProfile } from "@/lib/features/profile/profileSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ApiErrorResponse } from "@/lib/types";
import { userProfilePayload, userProfileSchema } from "@/schemas/schema";
import { errorToast, successToast } from "@/utils/CustomToast";
import {
  Box,
  Button,
  Field,
  HStack,
  Input,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import ImageUploaderWithCrop from "@/components/ImageUploader";
import { urlToFile } from "@/utils/StringToFile";

const UserProfile = () => {
  const { data, loading } = useAppSelector((state) => state.profile.user);
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<userProfilePayload>({
    resolver: zodResolver(userProfileSchema),
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUserProfile());
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
          address: data.address,
          profile_picture: profilePic,
        });
      };
      loadProfilePic();
    }
  }, [data, reset]);
  if (loading) return <Spinner size="xl" />;
  if (!data) return null;
  const onSubmit = async (data: userProfilePayload) => {
    try {
      await updateUserProfileApi(data);
      await dispatch(fetchUserProfile());
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
    <Box bg="#F5F5F5" pb="2rem" as="form" onSubmit={handleSubmit(onSubmit)}>
      <Text
        p={{ base: "2rem 1rem", md: "2rem 4rem" }}
        fontWeight={500}
        fontSize="30px"
      >
        My Profile
      </Text>
      <Stack px={{ base: "1rem", md: "4rem" }} color="#6A6A6A" gap={10}>
        <ImageUploaderWithCrop
          name="profile_picture"
          control={control}
          type="avatar"
          defaultImage={watch("profile_picture")}
          aspect="150/150"
        />
        <HStack gap={5} flexDir={{ base: "column", md: "row" }}>
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
        <Field.Root invalid={!!errors.contact_number}>
          <Field.Label fontSize="20px" mb={2}>
            Phone Number
          </Field.Label>
          <HStack
            flexDir={{ base: "column", md: "row" }}
            w="full"
            alignItems={{ base: "flex-start", md: "center" }}
          >
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
          </HStack>
        </Field.Root>
        <Field.Root invalid={!!errors.address}>
          <Field.Label fontSize="20px" mb={2}>
            {" "}
            Address
          </Field.Label>
          <Input {...register("address")} fontSize="20px" />
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
    </Box>
  );
};

export default UserProfile;
