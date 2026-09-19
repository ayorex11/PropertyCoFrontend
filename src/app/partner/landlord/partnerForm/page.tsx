"use client";
import {
  Box,
  Button,
  Grid,
  GridItem,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { PartnerFormPayload, partnerSchema } from "@/schemas/schema";
import { partnerRequestApi } from "@/lib/api/partnerApi";
import { errorToast, successToast } from "@/utils/CustomToast";
import { ApiErrorResponse } from "@/lib/types";
import { Layout } from "@/components/Layout";

const PartneringForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PartnerFormPayload>({ resolver: zodResolver(partnerSchema) });

  const onSubmit = async (data: PartnerFormPayload) => {
    try {
      await partnerRequestApi(data);
      successToast("Sent successfully");
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
    <Layout>
      <Box w={{ base: "100%", md: "1100px" }} m="auto" mb="5rem">
        <Stack gap={5}>
          <Box p="1rem" bg="#ECECEC" borderRadius="25px">
            <Text
              color="#000048"
              fontSize="32px"
              m="auto"
              pl="40px"
              fontWeight={500}
            >
              Partner With Us!
            </Text>
          </Box>
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
            p={{base: "1rem", md: "0"}}
          >
            <GridItem colSpan={{ base: 1, md: 2 }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <VStack gap={10}>
                  {["first_name", "last_name", "phone_number", "email"].map(
                    (field) => (
                      <Box w="full" key={field}>
                        <Input
                          placeholder={field.replace("_", " ").toUpperCase()}
                          {...register(field as keyof PartnerFormPayload)}
                        />
                        {errors[field as keyof PartnerFormPayload] && (
                          <Text color="red.500" fontSize="sm">
                            {errors[field as keyof PartnerFormPayload]?.message}
                          </Text>
                        )}
                      </Box>
                    )
                  )}
                </VStack>
                  <Button
                    mt="20px"
                    type="submit"
                    fontSize="16px"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    // w="full"
                    colorPalette="blue"
                    loadingText="Submitting..."
                    w={{ base: "15rem", md: "25rem"}}
                  >
                    Submit
                  </Button>
              </form>
            </GridItem>
          </Grid>
        </Stack>
      </Box>
    </Layout>
  );
};

export default PartneringForm;
