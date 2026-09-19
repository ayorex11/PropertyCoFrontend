import { Layout } from "@/components/Layout";
import { Text, VStack } from "@chakra-ui/react";
import React from "react";

const NotFound = () => {
  return (
    <Layout>
      <VStack h="60vh" justifyContent="center">
        <Text fontSize="40px" fontWeight={700} color="#000048">
          Page Not found
        </Text>
      </VStack>
    </Layout>
  );
};

export default NotFound;
