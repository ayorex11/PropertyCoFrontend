import { ApiErrorResponse, Property } from "@/lib/types";
import BedIcon from "@/lib/icons/bed.svg";
import BathIcon from "@/lib/icons/bath.svg";
import ToiletIcon from "@/lib/icons/bed.svg";
import {
  AspectRatio,
  Box,
  Button,
  HStack,
  Icon,
  SimpleGrid,
  Span,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Location from "@/lib/icons/location_red.svg";
import Image from "next/image";
import { formatWithCommas } from "@/utils/converters";
import { useAppDispatch } from "@/lib/hooks";
import { fetchSavedProperties } from "@/lib/features/savedProperties/savedPropertiesSlice";
import { createSavedPropertyApi } from "@/lib/api/savedPropertiesApi";
import { errorToast, successToast } from "@/utils/CustomToast";
import axios from "axios";
import { CiShare2 } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { IoCall } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { RiTimerLine } from "react-icons/ri";
import { TiArrowBack } from "react-icons/ti";
import Link from "next/link";
import Subscribe from "@/components/subscribe";

interface IProperty {
  prop: Property;
}

const LeftPropertyContainer = ({ prop }: IProperty) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();

  const saveProperty = async (id: number) => {
    setIsSubmitting(true);
    try {
      await createSavedPropertyApi(id);
      await dispatch(fetchSavedProperties());
      successToast("Saved successfully");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as ApiErrorResponse;
        // Extract first error message
        let firstError = "Unable to save";
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
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this property!",
          text: "I found this property interesting:",
          url: window.location.href,
        })
        .catch((err) => {
          console.error("Error sharing:", err);
        });
    } else {
      navigator.clipboard.writeText(window.location.href);
      successToast("Link copied to Clipboard");
    }
  };
  const propImages = [
    prop.picture1,
    prop.picture2,
    prop.picture3,
    prop.picture4,
    prop.picture5,
    prop.picture6,
    prop.picture7,
    prop.picture8,
    prop.picture9,
    prop.picture10,
  ].filter((src) => src && src.trim() !== "");
  return (
    <Stack color="#000048" gap={5}>
      <Box bg="#ECECEC" borderRadius="20px" p={{base: "1rem 20px", md: "1rem 40px"}}>
        <HStack justifyContent="space-between" px={{md: "1rem"}} display={{base: "block", md: "flex"}}>
          <Stack gap={1}>
            <Text fontSize="24px" fontWeight={500}>
              {prop.name || "Nil"}
            </Text>
            <HStack>
              <Image src={Location} alt="Location Icon" />
              <Text fontSize="16px">{prop.address || "Nil"}</Text>
            </HStack>
            <Text fontSize="14px">
              Property ID:{" "}
              <Span fontWeight={600} fontSize="14px">
                {prop.property_id || "Nil"}
              </Span>
            </Text>
          </Stack>
          <HStack justifyContent="space-between">
            <Stack gap={1}>
              <Text fontWeight={500} fontSize="22px" truncate>
                <Span fontWeight={400} fontSize="22px">
                  ₦
                </Span>{" "}
                {formatWithCommas(prop.price) || "Nil"}
              </Text>
              <Text fontSize="18px">{prop.price_options || "Nil"}</Text>
            </Stack>
            <Stack>
              <Button
                fontSize="0.75rem"
                color="white"
                w="7rem"
                h="2.5rem"
                bg="rgba(65, 105, 224, 1)"
                onClick={handleShare}
              >
                <CiShare2 />
                &nbsp; Share
              </Button>
              <Box>
                <Button
                  fontSize="0.75rem"
                  color="white"
                  w="7rem"
                  h="3rem"
                  bg="rgba(65, 105, 224, 1)"
                  onClick={() => saveProperty(prop.id)}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  <FaHeart />
                  &nbsp; Save
                </Button>
              </Box>
            </Stack>
          </HStack>
        </HStack>
      </Box>
      <Box display={{base: "none", md: "block"}}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 10000 }}
          loop
          spaceBetween={20}
          slidesPerView={1}
        >
          {propImages.map((src, index) => (
            <SwiperSlide key={index}>
              <Box m="auto" h="650px" w="500px">
                <AspectRatio ratio={257 / 350} pos="relative">
                  <Image
                    src={src}
                    alt={`Image ${index + 1}`}
                    fill
                    objectFit="fill"
                  />
                </AspectRatio>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <Box px="1rem">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          // autoplay={{ delay: 10000 }}
          loop
          spaceBetween={20}
          slidesPerView={5}
        >
          {propImages.map((src, index) => (
            <SwiperSlide key={index}>
              <Box m="auto" h="190px" w="140px">
                <AspectRatio ratio={257 / 350} pos="relative">
                  <Image
                    src={src}
                    alt={`Image ${index + 1}`}
                    fill
                    objectFit="fill"
                  />
                </AspectRatio>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <VStack gap={10} bg="#ECECEC" p="1rem">
        <HStack gap={{base: 10, md: 20}}>
          {prop.beds && (
            <HStack gap={3}>
              <Image src={BedIcon} alt="fire" objectFit="cover" />
              <Text fontSize="14px">{prop.beds} Beds</Text>
            </HStack>
          )}
          {prop.bathrooms && (
            <HStack gap={3}>
              <Image src={BathIcon} alt="fire" objectFit="cover" />
              <Text fontSize="14px">{prop.bathrooms} Baths</Text>
            </HStack>
          )}
          {prop.toilets && (
            <HStack gap={3}>
              <Image src={ToiletIcon} alt="fire" objectFit="cover" />
              <Text fontSize="14px">{prop.toilets} Toilets</Text>
            </HStack>
          )}
        </HStack>
      </VStack>
      <VStack gap={10} bg="#ECECEC" p="1rem">
        <HStack gap={20} display={{base: "block", md: "flex"}}>
          <HStack
            bg="#DEDEDE"
            p="1rem"
            boxShadow="0px 4px 4px #00000040"
            borderRadius="5px"
            flexDir={{base: "column", md: "row"}}
          >
            <Text fontWeight={700} fontSize="18px">
              080X XXX XXXX
            </Text>
            <Button
              bg="#4169E0"
              color="#EFF3FA"
              fontWeight={600}
              fontSize="16px"
            >
              <IoCall /> Call About Property
            </Button>
          </HStack>
          <VStack
            bg="#DEDEDE"
            p="1rem"
            boxShadow="0px 4px 4px #00000040"
            borderRadius="5px"
          >
            <Button
              bg="#4169E0"
              color="#EFF3FA"
              fontWeight={600}
              fontSize="16px"
            >
              <AiOutlineMessage /> Message About Property
            </Button>
          </VStack>
        </HStack>
      </VStack>
      <Stack p={{base: "1rem 0rem", md: "1rem 40px"}} bg="#ECECEC">
        <Text p="0.5rem 1rem" bg="#D9D9D9" fontWeight={600} fontSize="13px">
          Description
        </Text>
        <Text p="1rem" fontSize="13px">
          {prop.description || "Nil"}
        </Text>
        <Box p="1rem" w="fit">
          <SimpleGrid columns={2} gapX={4} gapY={1}>
            {prop.furnished && (
              <Box>
                <Text
                  border="1px solid #606D93"
                  bg="#EFF3FA"
                  color="#606D93"
                  px="20px"
                  py="0px"
                  borderRadius="5px"
                  fontSize="10px"
                  textAlign="center"
                >
                  Furnished
                </Text>
              </Box>
            )}
            {prop.shared && (
              <Box>
                <Text
                  border="1px solid #606D93"
                  bg="#EFF3FA"
                  color="#606D93"
                  px="20px"
                  py="0px"
                  borderRadius="5px"
                  fontSize="10px"
                  textAlign="center"
                >
                  Shared
                </Text>
              </Box>
            )}
            {prop.newly_built && (
              <Box>
                <Text
                  border="1px solid #606D93"
                  bg="#EFF3FA"
                  color="#606D93"
                  px="20px"
                  py="0px"
                  borderRadius="5px"
                  fontSize="10px"
                  textAlign="center"
                >
                  Newly Built
                </Text>
              </Box>
            )}
            {prop.car_park && (
              <Box>
                <Text
                  border="1px solid #606D93"
                  bg="#EFF3FA"
                  color="#606D93"
                  px="20px"
                  py="0px"
                  borderRadius="5px"
                  fontSize="10px"
                  textAlign="center"
                >
                  Parking Space
                </Text>
              </Box>
            )}
          </SimpleGrid>
        </Box>
        <Box p="1rem">
          <HStack gap={5}>
            <HStack>
              <RiTimerLine color="#00CE3A" size="19px" />
              <Text fontWeight={500} fontSize="13px">
                Updated:{" "}
                <Span fontWeight={300} fontStyle="italic" fontSize="13px">
                  {prop.updated_at || "Nil"}
                </Span>
              </Text>
            </HStack>
            <Text fontWeight={500} fontSize="13px">
              Uploaded:{" "}
              <Span fontWeight={300} fontStyle="italic" fontSize="13px">
                {prop.created_at || "Nil"}
              </Span>
            </Text>
          </HStack>
        </Box>
        <Text fontWeight={700} fontSize="14px" px="1rem">
          Details
        </Text>
        <Text fontSize="13px" p="1rem">{prop.more_details || "Nil"}</Text>
        {prop.video_available_on_request && (
          <Text fontWeight={700} fontSize="14px" px="1rem">
            Video is available upon Request
          </Text>
        )}
      </Stack>
      <VStack>
        <Link href="/properties">
          <Button bg="#D9D9D9" color="#000048" borderRadius="10px">
            <Icon as={TiArrowBack} boxSize={5}/> Back to Properties
          </Button>
        </Link>
      </VStack>
      <Stack p="1rem 40px" bg="#F9F9F9">
        <Box p="1rem">
          <Subscribe type="property"/>
        </Box>
      </Stack>
    </Stack>
  );
};

export default LeftPropertyContainer;
