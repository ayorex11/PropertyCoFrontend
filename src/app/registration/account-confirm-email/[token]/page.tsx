"use client";

import { Layout } from "@/components/Layout";
import VerifyEmail from "@/components/VerifyEmail/page";
import { Box, Stack, Text } from "@chakra-ui/react";
import { useParams } from "next/navigation";

const VerifyUser = () => {
  const params = useParams();
  const token = decodeURIComponent(params.token as string);
  return (
    <Layout>
      <Box w={{ base: "100%", md: "1100px" }} m="auto" mb="5rem">
        <Stack>
          <Box p="1rem" bg="#ECECEC" borderRadius="25px">
            <Text
              color="#000048"
              fontSize="32px"
              m="auto"
              pl="40px"
              fontWeight={500}
            >
              Confirm Email Address
            </Text>
          </Box>
          <VerifyEmail token={token} />
        </Stack>
      </Box>
    </Layout>
  );
};

export default VerifyUser;
