import { Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const SafetyTips = () => {
  return (
    <VStack textAlign="center" color="#000048" bg="#ECECEC" p="2rem 1rem" gap={4}>
      <Text textAlign="center" fontWeight={500} fontSize="18px">
        Safety Tips
      </Text>
      <Text fontWeight={500} fontSize="13px">
        All properties listed have been vetted properly by PropertyCo. Always
        engage ONLY PropertyCo when you need clarity about a listed property.
      </Text>
      <Link href="">
        <Text fontWeight={500} fontSize="13px" textDecoration="underline">Report  Property</Text>
      </Link>
    </VStack>
  );
};

export default SafetyTips;
