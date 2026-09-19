"use client";
import React from "react";
import ReferenceSearch from "@/components/ReferenceSearch";
import PropCo from "./PropCo";
import SafetyTips from "./SafetyTips";
import ReqProp from "./ReqProp";
import SimilarProperties from "./SimilarProperties";
import { Stack, VStack } from "@chakra-ui/react";

const RightPropertyContainer = () => {
  return (
    <Stack gap={10}>
        <ReferenceSearch/>
        <PropCo/>
        <SafetyTips/>
        <ReqProp/>
        <VStack>
          <SimilarProperties/>
        </VStack>
    </Stack>
  );
};

export default RightPropertyContainer;