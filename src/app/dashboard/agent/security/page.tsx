"use client";

import { PasswordInput } from "@/components/ui/password-input";
import { updatePaswordApi } from "@/lib/api/authApi";
import { ApiErrorResponse } from "@/lib/types";
import {
  UpdatePasswordPayload,
  updatePasswordSchema,
} from "@/schemas/authSchema";
import { errorToast, successToast } from "@/utils/CustomToast";
import { Box, Button, Field, Input, Stack, Text, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React from "react";
import { useAppSelector } from "@/lib/hooks";

const AgentSecurity = () => {
  const email = useAppSelector((state) => state.auth.user?.email);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePasswordPayload>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const onSubmit = async (data: UpdatePasswordPayload) => {
    try {
      await updatePaswordApi(data);
      successToast("Password updated successfully");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as ApiErrorResponse;
        // Extract first error message
        const firstError =
          typeof data === "string"
            ? data
            : Object?.values(data)?.[0]?.[0] ?? "Invalid login details";
        errorToast(firstError);
      } else {
        errorToast("Unexpected error occurred");
      }
    }
  };
  return (
    <Box bg="#F5F5F5" pb="2rem" color="#000048">
      <Text p={{base: "2rem 1rem", md: "2rem 4rem"}} fontWeight={500} fontSize="30px">
        Security
      </Text>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Stack gap={10} textAlign="center" px={{base: "2rem", md: "4rem"}}>
          <Field.Root w={{base: "100%", md: "400px"}}>
            <Field.Label fontSize="23px" color="#6A6A6A" mb={4}>Current Password</Field.Label>
            <Input
              value="*********"
              border="1px solid #1944B4"
              borderRadius="10px"
              fontWeight={500}
              fontSize="23px"
              readOnly
              disabled
            />
          </Field.Root>
          <Field.Root w={{base: "100%", md: "400px"}}>
            <Field.Label fontSize="23px" color="#6A6A6A" mb={4}>New Password</Field.Label>
            <PasswordInput
              {...register("new_password1")}
              border="1px solid #1944B4"
              bg="#FFFFFF"
              borderRadius="10px"
              fontWeight={500}
              fontSize="23px"
            />
          </Field.Root>
          <Field.Root w={{base: "100%", md: "400px"}}>
            <Field.Label fontSize="23px" color="#6A6A6A" mb={4}>Confirm New Password</Field.Label>
            <PasswordInput
              {...register("new_password2")}
              border="1px solid #1944B4"
              bg="#FFFFFF"
              borderRadius="10px"
              fontWeight={500}
              fontSize="23px"
            />
          </Field.Root>
          <Field.Root w={{base: "100%", md: "500px"}}>
            <Field.Label fontSize="23px" color="#6A6A6A" mb={4}>Email Address</Field.Label>
            <Input
              value={email}
              border="1px solid #1944B4"
              borderRadius="10px"
              fontWeight={500}
              fontSize="23px"
              readOnly
            />
          </Field.Root>
          {Object.values(errors).length > 0 && (
            <Box
              mt={4}
              bg="red.50"
              p={3}
              borderRadius="md"
              border="1px solid"
              borderColor="red.200"
            >
              <Text fontWeight="bold" color="red.600" fontSize="xl" mb={2}>
                Please fix the following errors:
              </Text>
              <VStack gap={1} align="start">
                {Object.values(errors).map((error, index) => (
                  <Text key={index} fontSize="lg" color="red.500">
                    • {error.message}
                  </Text>
                ))}
              </VStack>
            </Box>
          )}
          <Button
            type="submit"
            bg="#4169E0"
            borderRadius="10px"
            w="140px"
            disabled={isSubmitting}
            loading={isSubmitting}
            loadingText= "Saving..."
          >
            Save Changes
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AgentSecurity;
