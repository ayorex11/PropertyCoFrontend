"use client";

import {
  Box,
  Button,
  Field,
  Input,
  Spinner,
  Text,
  Stack,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DocumentFormPayload, documentSchema } from "@/schemas/schema";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateDocumentsApi, uploadDocumentsApi } from "@/lib/api/documentsApi";
import { errorToast, successToast } from "@/utils/CustomToast";
import axios from "axios";
import { ApiErrorResponse } from "@/lib/types";
import { useEffect } from "react";
import { fetchAgentDocuments } from "@/lib/features/documents/documentsSlice";
import { FaFileCircleCheck } from "react-icons/fa6";
import Link from "next/link";

const DocumentForm = () => {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector(
    (state) => state.documents.agentDocuments
  );
  useEffect(() => {
    dispatch(fetchAgentDocuments());
  }, [dispatch]);
  const {
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DocumentFormPayload>({
    resolver: zodResolver(documentSchema),
  });

  const onSubmit = async (payload: DocumentFormPayload) => {
    try {
      if (data) {
        await updateDocumentsApi(payload);
        await dispatch(fetchAgentDocuments())
        successToast("Documents Updated successfully");
      } else {
        await uploadDocumentsApi(payload);
        await dispatch(fetchAgentDocuments())
        successToast("Documents Uploaded successfully");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as ApiErrorResponse;
        // Extract first error message
        let firstError = "Unable to post";
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
  if (loading) return <Spinner size="xl" />;
  return (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      bg="#F5F5F5"
      w="full"
      pb="2rem"
      px={{ base: "1rem", md: "4rem" }}
      borderRadius="20px"
      pos="relative"
    >
      <Text fontSize="30px" fontWeight={500} py="2rem">
        My Documents
      </Text>
      <Stack gap={5} color="#6A6A6A">
        <Field.Root invalid={!!errors.identity_card}>
          <Stack>
            <Field.Label fontWeight={600} fontSize="20px">
              Identity Card
            </Field.Label>
            <Input
              type="file"
              accept=".pdf,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setValue("identity_card", file); // Store file in React Hook Form
              }}
              w="full"
            />
            <Field.ErrorText>{errors.identity_card?.message}</Field.ErrorText>
            {data?.identity_card && (
              <HStack>
                <Icon as={FaFileCircleCheck} boxSize={6} color="#258C37" />
                <Link href={data?.identity_card} target="_blank">
                  <Text fontWeight={500} fontSize="18px">
                    View Document
                  </Text>
                </Link>
              </HStack>
            )}
          </Stack>
        </Field.Root>
        <Field.Root invalid={!!errors.CAC}>
          <Stack>
            <Field.Label fontWeight={600} fontSize="20px">
              CAC
            </Field.Label>
            <Input
              type="file"
              accept=".pdf,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setValue("CAC", file); // Store file in React Hook Form
              }}
            />
            <Field.ErrorText>{errors.CAC?.message}</Field.ErrorText>
            {data?.CAC && (
              <HStack>
                <Icon as={FaFileCircleCheck} boxSize={6} color="#258C37" />
                <Link href={data?.CAC} target="_blank">
                  <Text fontWeight={500} fontSize="18px">
                    View Document
                  </Text>
                </Link>
              </HStack>
            )}
          </Stack>
        </Field.Root>
        <Button
          type="submit"
          bg="#258C37"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {data ? "Update Documents" : "Upload Documents"}
        </Button>
      </Stack>
    </Box>
  );
};

export default DocumentForm;
