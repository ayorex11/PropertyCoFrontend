"use client";
import BedIcon from "@/lib/icons/bed.svg";
import FireLogo from "@/lib/icons/fire.svg";
import BathIcon from "@/lib/icons/bath.svg";
import ToiletIcon from "@/lib/icons/toilet.svg";
import BadgeIcon from "@/lib/icons/badge.svg";
import {
  AspectRatio,
  Box,
  Button,
  Float,
  HStack,
  Text,
  Stack,
  Grid,
  GridItem,
  Span,
  SimpleGrid,
  VStack,
  Icon,
  Collapsible,
  Avatar,
  Card,
} from "@chakra-ui/react";
import {
  formatDateAlone,
  formatDateDay,
  formatDateToReadableGB,
  formatTimeAlone,
  formatWithCommas,
} from "../utils/converters";
import Image from "next/image";
import {
  ApiErrorResponse,
  Blog,
  Inspection,
  Message,
  Notification,
  Property,
} from "@/lib/types";
import Location from "@/lib/icons/location_red.svg";
import { RiTimerLine } from "react-icons/ri";
import { FaArrowRightLong, FaRegTrashCan } from "react-icons/fa6";
import Link from "next/link";
import FavoriteEdit from "@/lib/icons/favourite_edit.svg";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import axios from "axios";
import { errorToast, successToast } from "@/utils/CustomToast";
import { createSavedPropertyApi } from "@/lib/api/savedPropertiesApi";
import {
  deleteSavedPropertyThunk,
  fetchSavedProperties,
} from "@/lib/features/savedProperties/savedPropertiesSlice";
import {
  markNotificationAsReadAdminThunk,
  markNotificationAsReadAgentThunk,
} from "@/lib/features/notifications/notificationsSlice";
import { motion } from "framer-motion";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useState } from "react";
import { MdOutlineTimer } from "react-icons/md";
import {
  deleteAdminCatalogueApi,
  repostAdminCatalogueApi,
  underContractAdminCatalogueApi,
} from "@/lib/api/cataloguesApi";
import { fetchCatalogues } from "@/lib/features/catalogues/cataloguesSlice";
import {
  addFeaturedPropertiesApi,
  removeFeaturedPropertiesApi,
} from "@/lib/api/propertiesApi";
import { openBlogModal } from "@/lib/features/modal/modalSlice";
import { deleteBlogApi, makeDraftApi, makeLiveApi } from "@/lib/api/blogsApi";
import { fetchBlogs, fetchDrafts } from "@/lib/features/blogs/blogsSlice";
import { urlToFile } from "@/utils/StringToFile";

type IFeaturedCardProps = {
  props: Property;
};

export const FeaturedCard = ({ props }: IFeaturedCardProps) => {
  return (
    <Stack gap={5}>
      <Box position="relative">
        <AspectRatio ratio={257 / 350}>
          <Image
            src={props.picture1}
            alt="test"
            fill
            style={{ objectFit: "cover", borderRadius: "1.5rem" }}
          />
        </AspectRatio>
        <Float placement="bottom-start" offsetY={10} offsetX={20}>
          <HStack p="5px 20px" bg=" #FFE1E1" borderRadius="full">
            <Image src={FireLogo} alt="fire" objectFit="cover" />
            <Text color="#FF1111" ml="0.5rem">
              Popular
            </Text>
          </HStack>
        </Float>
      </Box>
      <Stack gap={3}>
        <Text fontWeight={600} fontSize="25px">
          <Span fontWeight={400} fontSize="25px">
            ₦
          </Span>{" "}
          {formatWithCommas(props.price)}
        </Text>
        <Text fontWeight={500} fontSize="17px">
          {props.price_options}
        </Text>
        <Text fontWeight={400} fontSize="14px" truncate>
          {props.description}
        </Text>
        <HStack gap={5}>
          {props.beds && (
            <HStack>
              <Image src={BedIcon} alt="fire" objectFit="cover" />
              <Text fontSize="14px">{props.beds} Beds</Text>
            </HStack>
          )}
          {props.bathrooms && (
            <HStack>
              <Image src={BathIcon} alt="fire" objectFit="cover" />
              <Text fontSize="14px">{props.bathrooms} Bath</Text>
            </HStack>
          )}
        </HStack>
        <Link href={`/properties/${props.id}`}>
          <Button bg="#4169E0" color="#EFF3FA" fontWeight={600} w="full">
            View Full Details
          </Button>
        </Link>
      </Stack>
    </Stack>
  );
};

type PropertyCardProps = {
  property: Property;
  remove?: boolean;
  savePropId?: string | number;
  variant?: "favorites" | "catalogue" | "agentProperties" | "inspection";
};

export const PropertyCard = ({
  property,
  remove,
  savePropId,
  variant,
}: PropertyCardProps) => {
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
        const status = err.status;
        // Extract first error message
        let firstError = "Unable to save";
        if (status === 401) {
          firstError = "You need to be logged in to save properties";
        } else if (typeof data === "string") {
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
  const deleteSavedProperty = async (id: string) => {
    setIsSubmitting(true);
    try {
      await dispatch(deleteSavedPropertyThunk(id));
      dispatch(fetchSavedProperties());
      successToast("Deleted successfully");
      console.info("id", id);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as ApiErrorResponse;
        // Extract first error message
        let firstError = "Unable to delete";
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
  const repostProperty = async (id: string) => {
    try {
      await repostAdminCatalogueApi(id);
      await dispatch(fetchCatalogues());
      successToast("Reposted successfully");
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
  const underContractProperty = async (id: string) => {
    setIsSubmitting(true);
    try {
      await underContractAdminCatalogueApi(id);
      await dispatch(fetchCatalogues());
      successToast("Successful");
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
  const addFeaturedProperty = async (id: string) => {
    setIsSubmitting(true);
    try {
      await addFeaturedPropertiesApi(id);
      await dispatch(fetchCatalogues());
      successToast("Added successfully");
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
  const removeFeaturedProperty = async (id: string) => {
    setIsSubmitting(true);
    try {
      await removeFeaturedPropertiesApi(id);
      await dispatch(fetchCatalogues());
      successToast("Removed successfully");
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
  const deleteProperty = async (id: string) => {
    setIsSubmitting(true);
    try {
      await deleteAdminCatalogueApi(id);
      await dispatch(fetchCatalogues());
      successToast("Deleted successfully");
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
  return (
    <Box
      p="1rem"
      bg="#ECECEC"
      borderRadius={{ md: "50px" }}
      minH="360px"
      w={{ base: "100vw", md: "100%" }}
      textAlign="left"
    >
      <Stack px="40px" py="20px" gap={5} position="relative">
        <Text
          fontWeight={500}
          fontSize="22px"
          textTransform="capitalize"
          truncate
        >
          {property.name}
        </Text>
        {property.agent === "propertycosales@gmail.com" && (
          <Float offset={20} display={{base: "none", md: "block"}} zIndex={10}>
              <Image src={BadgeIcon} alt="fire" objectFit="cover" width={30} height={30}/>
          </Float>
        )}
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(10, 1fr)" }}
          gap={5}
        >
          <GridItem colSpan={{ base: 1, md: 4 }} position="relative">
            {property.agent === "propertycosales@gmail.com" && (
              <Float offset={10} display={{base: "block", md: "none"}} zIndex={10}>
                  <Image src={BadgeIcon} alt="fire" objectFit="cover" width={30} height={30}/>
              </Float>
            )}
            <AspectRatio ratio={257 / 350}>
              <Image
                src={property.picture1}
                alt="Property Image"
                fill
                style={{ objectFit: "cover", borderRadius: "1.5rem" }}
              />
            </AspectRatio>
          </GridItem>
          <GridItem
            colSpan={{
              base: 1,
              md: variant === "catalogue" || variant === "inspection" ? 6 : 5,
            }}
          >
            <Stack gap={1} h="100%">
              <Text fontWeight={500} fontSize="22px" lineClamp={2}>
                {property.prop_type}{" "}
                <Span fontWeight={500} fontSize="14px">
                  for
                </Span>{" "}
                {property.category}
              </Text>
              <HStack truncate>
                <Image src={Location} alt="Location Icon" />
                <Text fontSize="12px">{property.address}</Text>
              </HStack>
              <Text fontWeight={600} fontSize="25px" truncate>
                <Span fontWeight={400} fontSize="25px">
                  ₦
                </Span>{" "}
                {formatWithCommas(property.price)}
              </Text>
              <HStack gap={5}>
                <HStack>
                  <RiTimerLine color="#00CE3A" size="19px" />
                  <Text fontWeight={500} fontSize="13px">
                    Updated:{" "}
                    <Span fontWeight={300} fontStyle="italic" fontSize="13px">
                      {property.updated_at || "Nil"}
                    </Span>
                  </Text>
                </HStack>
                <Text fontWeight={500} fontSize="13px">
                  Uploaded:{" "}
                  <Span fontWeight={300} fontStyle="italic" fontSize="13px">
                    {property.created_at || "Nil"}
                  </Span>
                </Text>
              </HStack>
              <HStack alignItems="flex-start">
                <Text fontSize="14px" lineHeight="16px">
                  Description:{" "}
                </Text>
                <Text
                  lineClamp={variant === "favorites" ? 2 : 5}
                  lineHeight="16px"
                  textAlign="justify"
                >
                  {property.description}
                </Text>
              </HStack>
              <HStack alignItems="flex-start">
                <Text fontSize="14px">PID: {property.property_id}</Text>
                <SimpleGrid
                  columns={{ base: 1, md: 2 }}
                  p="5px"
                  gapX={4}
                  gapY={1}
                >
                  {property.furnished && (
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
                  {property.shared && (
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
                  {property.newly_built && (
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
                  {property.car_park && (
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
              </HStack>
              <HStack>
                <HStack
                  gap={{ base: 2, md: 5 }}
                  flexDir={{ base: "column", md: "row" }}
                >
                  {property.beds && (
                    <HStack gap={3}>
                      <Image src={BedIcon} alt="fire" objectFit="cover" />
                      <Text fontSize="14px">{property.beds} Beds</Text>
                    </HStack>
                  )}
                  {property.bathrooms && (
                    <HStack gap={3}>
                      <Image src={BathIcon} alt="fire" objectFit="cover" />
                      <Text fontSize="14px">{property.bathrooms} Baths</Text>
                    </HStack>
                  )}
                  {property.toilets && (
                    <HStack gap={3}>
                      <Image src={ToiletIcon} alt="fire" objectFit="cover" />
                      <Text fontSize="14px">{property.toilets} Toilets</Text>
                    </HStack>
                  )}
                </HStack>
              </HStack>
              <Stack mt="auto">
                <Link
                  href={
                    variant === "agentProperties"
                      ? `/agentProperties/${property.id}`
                      : `/properties/${property.id}`
                  }
                >
                  <Button
                    bg="#4169E0"
                    color="#EFF3FA"
                    fontWeight={600}
                    w="full"
                  >
                    View Full Details
                  </Button>
                </Link>
                {variant === "favorites" && (
                  <HStack>
                    <Button
                      bg="#258C37"
                      color="#EFF3FA"
                      fontWeight={600}
                      flex={1}
                    >
                      Call Agent
                    </Button>
                    <Button
                      bg="#258C37"
                      color="#EFF3FA"
                      fontWeight={600}
                      flex={1}
                    >
                      Message Agent
                    </Button>
                  </HStack>
                )}
              </Stack>
            </Stack>
          </GridItem>
          {variant !== "catalogue" && variant !== "inspection" && (
            <GridItem>
              <VStack h="100%" justifyContent="center">
                {remove ? (
                  <Button
                    bg="#FF1111"
                    color="white"
                    p="20px 10px"
                    h="30px"
                    onClick={() => deleteSavedProperty(String(savePropId))}
                    loading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    <Box fontSize="14px" fontWeight={600}>
                      <Icon as={FaRegTrashCan} boxSize={8} />
                    </Box>
                  </Button>
                ) : (
                  <Button
                    bg="#4169E0"
                    color="white"
                    p="10px 10px"
                    h="30px"
                    onClick={() => saveProperty(Number(property.id))}
                    loading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    <Box fontSize="14px" fontWeight={600}>
                      <Image
                        src={FavoriteEdit}
                        alt="Favorite Logo"
                        objectFit="fill"
                      />
                    </Box>
                  </Button>
                )}
              </VStack>
            </GridItem>
          )}
        </Grid>
        {variant === "catalogue" && (
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(5, 1fr)" }}
            gapY={2}
            gapX={5}
            pt="1rem"
          >
            <GridItem>
              <Button
                bg="#258C37"
                color="#EFF3FA"
                w={{ base: "100%", md: "100px" }}
                h="30px"
                fontSize="12px"
                fontWeight={600}
                onClick={() => repostProperty(String(property.id))}
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                Repost
              </Button>
            </GridItem>
            <GridItem>
              <Link
                href={`/updateProperty/${property.id}`}
                style={{ width: "100%", textAlign: "center" }}
              >
                <Button
                  bg="#4169E0"
                  color="#EFF3FA"
                  w={{ base: "100%", md: "100%" }}
                  h="30px"
                  fontSize="12px"
                  fontWeight={600}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Edit
                </Button>
              </Link>
            </GridItem>
            <GridItem>
              <Button
                bg="#424242"
                color="#EFF3FA"
                w={{ base: "100%", md: "100px" }}
                h="30px"
                fontSize="12px"
                fontWeight={600}
                onClick={() => underContractProperty(String(property.id))}
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                Under Contract
              </Button>
            </GridItem>
            {property.featured ? (
              <GridItem>
                <Button
                  bg="#424242"
                  color="#EFF3FA"
                  w={{ base: "100%", md: "110px" }}
                  h="30px"
                  fontSize="12px"
                  fontWeight={600}
                  onClick={() => removeFeaturedProperty(String(property.id))}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Remove Featured
                </Button>
              </GridItem>
            ) : (
              <GridItem>
                <Button
                  bg="#424242"
                  color="#EFF3FA"
                  w={{ base: "100%", md: "100px" }}
                  h="30px"
                  fontSize="12px"
                  fontWeight={600}
                  onClick={() => addFeaturedProperty(String(property.id))}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Add to Featured
                </Button>
              </GridItem>
            )}
            <GridItem>
              <Button
                bg="#FF1111"
                color="#EFF3FA"
                w={{ base: "100%", md: "100px" }}
                h="30px"
                fontSize="12px"
                fontWeight={600}
                onClick={() => deleteProperty(String(property.id))}
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                Remove
              </Button>
            </GridItem>
          </Grid>
        )}
      </Stack>
    </Box>
  );
};
type BlogCardProps = {
  blog: Blog;
};

export const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <Box w={{ base: "100vw", md: "100%" }} p={{ base: "1rem", md: "" }}>
      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
        gap={5}
      >
        <GridItem position="relative">
          <AspectRatio ratio={1 / 1}>
            <Image
              src={blog.image}
              alt="Blog image"
              fill
              style={{
                objectFit: "cover",
                borderTopRightRadius: "1.5rem",
                borderBottomRightRadius: "1.5rem",
              }}
            />
          </AspectRatio>
          <Float offsetY={5} offsetX={20} placement="top-end">
            <Box
              bg="white"
              w="3.5rem"
              h="3.5rem"
              borderBottomRadius="0.8rem"
              position="relative"
              overflowY="hidden"
              p="2"
            >
              {formatDateDay(blog.date_created)}
            </Box>
          </Float>
        </GridItem>
        <GridItem>
          <Stack
            color="#074C98"
            justifyContent="space-between"
            h="100%"
            py="3rem"
          >
            <Text lineClamp={3} fontSize="34px" fontWeight={700}>
              {blog.title}
            </Text>
            <Text lineClamp={3} fontSize="21px">
              {blog.body}
            </Text>
            <Link href={`/blog/${blog.id}`}>
              <HStack>
                <Box borderRadius="100%" border="1px solid #074C98" p="1rem">
                  <FaArrowRightLong size={20} />
                </Box>
                <Text fontSize="13px">Read More</Text>
              </HStack>
            </Link>
          </Stack>
        </GridItem>
      </Grid>
    </Box>
  );
};

const MotionBox = motion(Box);

interface NotificationCardProps {
  notifications: Notification;
}

export const NotificationCard = ({ notifications }: NotificationCardProps) => {
  const dispatch = useAppDispatch();
  const account_type = useAppSelector((state) => state.auth.user?.account_type);
  const markAsRead = (id: string) => {
    if (account_type === "Admin") {
      dispatch(markNotificationAsReadAdminThunk(id));
    }
    if (account_type === "Agent") {
      dispatch(markNotificationAsReadAgentThunk(id));
    }
  };

  return (
    <VStack gap={4}>
      <Collapsible.Root w="100%">
        <Collapsible.Trigger
          my="3"
          onClick={() => markAsRead(notifications.id)}
          w="100%"
        >
          <Card.Root transition="background-color 0.2s ease" bg="#ECECEC">
            <Card.Body>
              <Grid
                templateColumns="repeat(6, 1fr)"
                gap={5}
                alignItems="center"
              >
                <GridItem colSpan={5}>
                  <HStack>
                    <VStack>
                      <Avatar.Root size="full" shape="rounded" w="70px" h="70px" bg="none">
                        <Avatar.Fallback name={notifications.title} />
                        <Avatar.Image src="/avatar.png" />
                      </Avatar.Root>
                    </VStack>
                    <Box color={notifications.read ? "#074C98" : "#000048"} w="90%">
                      <Text fontWeight={700} fontSize="23px" truncate>
                        {notifications.title}
                      </Text>
                      <Text
                        color="#4D5E80"
                        fontWeight={500}
                        fontSize="13px"
                        truncate
                      >
                        {notifications.body}
                      </Text>
                    </Box>
                  </HStack>
                </GridItem>
                <GridItem>
                  <Box color="#ADB8CC" fontWeight={700}>
                    <Text textAlign="right" fontSize="13px">
                      {formatDateAlone(notifications.date_created)}
                    </Text>
                    <Text textAlign="right" fontSize="13px">
                      {formatTimeAlone(notifications.date_created)}
                    </Text>
                  </Box>
                </GridItem>
              </Grid>
            </Card.Body>
          </Card.Root>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <MotionBox
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            mt={2}
            mb={4}
            bg="rgba(236, 236, 236, 1)"
            p={4}
            rounded="md"
            shadow="md"
            borderLeft="4px solid"
            borderColor="blue.400"
          >
            <Text fontSize="15px">{notifications.body}</Text>
          </MotionBox>
        </Collapsible.Content>
      </Collapsible.Root>
    </VStack>
  );
};

interface MessageCardProps {
  messages: Message;
}

export const MessageCard = ({ messages }: MessageCardProps) => {
  const account_type = useAppSelector((state) =>
    state.auth.user?.account_type.toLowerCase()
  );
  return (
    <Link href={`/dashboard/${account_type}/messages/${messages.id}`}>
      <Card.Root transition="background-color 0.2s ease" bg="#ECECEC">
        <Card.Body>
          <Grid templateColumns="repeat(6, 1fr)" gap={5} alignItems="center">
            <GridItem>
              <VStack>
                <Avatar.Root size="full" shape="rounded" bg="none">
                  <Avatar.Fallback name="Logo Icon" />
                  <Avatar.Image src="/avatar.png" />
                </Avatar.Root>
              </VStack>
            </GridItem>
            <GridItem colSpan={4}>
              <Box color={messages.read ? "#074C98" : "#000048"}>
                <Text fontWeight={700} fontSize="23px" truncate>
                  {messages.sender}
                </Text>
                <Text fontWeight={500} fontSize="18px" color="#4D5E80" truncate>
                  {messages.subject}
                </Text>
              </Box>
            </GridItem>
            <GridItem>
              <Box color="#ADB8CC" fontWeight={700}>
                <Text textAlign="right" fontSize="13px">
                  {formatDateAlone(messages.date_created)}
                </Text>
                <Text textAlign="right" fontSize="13px">
                  {formatTimeAlone(messages.date_created)}
                </Text>
              </Box>
            </GridItem>
          </Grid>
        </Card.Body>
      </Card.Root>
    </Link>
  );
};

interface InspectionCardProps {
  inspections: Inspection;
}

export const InspectionCard = ({ inspections }: InspectionCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { prop_1, prop_2, prop_3 } = inspections;
  const propCount = [prop_1, prop_2, prop_3].filter(Boolean).length;
  const account_type = useAppSelector((state) =>
    state.auth.user?.account_type.toLowerCase()
  );
  return (
    <VStack gap={4}>
      <Collapsible.Root
        w="100%"
        open={isOpen}
        onOpenChange={(e) => setIsOpen(!!e.open)}
      >
        <Collapsible.Trigger w="100%">
          <Card.Root transition="background-color 0.2s ease" bg="#ECECEC">
            <Card.Body px={0}>
              <Grid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(6, 1fr)",
                }}
                gap={5}
                alignItems="center"
                px="2rem"
              >
                <GridItem colSpan={{ base: 1, md: 5 }}>
                  <Box color="#000048">
                    <Text fontWeight={700} fontSize="23px" truncate>
                      Inspection ID {inspections.inspection_id}
                    </Text>
                    <Text
                      color="#4D5E80"
                      fontWeight={500}
                      fontSize="13px"
                      truncate
                    >
                      {isOpen ? "Hide Details" : "Show Details"}
                    </Text>
                  </Box>
                </GridItem>
                <GridItem>
                  <Box color="#ADB8CC" fontWeight={700}>
                    <Text textAlign={{ md: "right" }} fontSize="13px">
                      {formatDateAlone(inspections.date_created)}
                    </Text>
                    <Text textAlign={{ md: "right" }} fontSize="13px">
                      {formatTimeAlone(inspections.date_created)}
                    </Text>
                  </Box>
                </GridItem>
              </Grid>
            </Card.Body>
          </Card.Root>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <MotionBox
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            mb={4}
            bg="#ECECEC99"
            p={4}
            rounded="md"
            shadow="md"
            borderColor="blue.400"
            px="3.5rem"
          >
            <HStack
              justifyContent="space-between"
              flexDir={{ base: "column", md: "row" }}
            >
              <Link
                href={`/dashboard/${account_type}/inspections/${inspections.id}`}
              >
                <HStack
                  fontWeight={700}
                  fontSize="14px"
                  color="#000048"
                  cursor="pointer"
                >
                  <Image src={Location} alt="Location Icon" color="#258C37" />
                  {propCount}
                  <Span fontWeight={400}>Properties in</Span>{" "}
                  {inspections.district}
                </HStack>
              </Link>
              <HStack
                p="0.5rem 1rem"
                bg="#B1CFEF"
                fontFamily="var(--font-barlow)"
              >
                <Icon as={FaRegCalendarAlt} boxSize={6} color="#258C37" />
                <Text fontSize="12px">
                  {formatDateToReadableGB(inspections.date)}
                </Text>
              </HStack>
              <HStack color="#000048">
                <Icon as={MdOutlineTimer} boxSize={6} color="#258C37" />
                <Text fontSize="15px">{inspections.timeslot}</Text>
              </HStack>
            </HStack>
          </MotionBox>
        </Collapsible.Content>
      </Collapsible.Root>
    </VStack>
  );
};

export const DashBlogCard = ({
  blog,
  draft,
}: {
  blog: Blog;
  draft?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEdit = async () => {
    const imageFile = await urlToFile(blog.image, "blog_image.jpg");
    dispatch(
      openBlogModal({
        isEdit: true,
        id: blog.id,
        data: {
          title: blog.title,
          body: blog.body,
          image: imageFile, // file object
        },
      })
    );
  };

  const handleMakeLive = async (id: string | number) => {
    setIsSubmitting(true);
    try {
      await makeLiveApi(id);
      await dispatch(fetchBlogs());
      await dispatch(fetchDrafts());
      successToast("Posted successfully");
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMakeDraft = async (id: string | number) => {
    setIsSubmitting(true);
    try {
      await makeDraftApi(id);
      await dispatch(fetchBlogs());
      await dispatch(fetchDrafts());
      successToast("Moved to Draft successfully");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as ApiErrorResponse;
        // Extract first error message
        let firstError = "Unable to move";
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

  const handleDelete = async (id: string | number) => {
    setIsSubmitting(true);
    try {
      await deleteBlogApi(id);
      await dispatch(fetchBlogs());
      await dispatch(fetchDrafts());
      successToast("Deleted successfully");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as ApiErrorResponse;
        // Extract first error message
        let firstError = "Unable to delete";
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
  return (
    <VStack gap={4}>
      <Collapsible.Root w="100%">
        <Collapsible.Trigger my="3" w="100%">
          <Card.Root transition="background-color 0.2s ease" bg="#ECECEC">
            <Card.Body>
              <Grid
                templateColumns="repeat(6, 1fr)"
                gap={5}
                alignItems="center"
              >
                <GridItem colSpan={5}>
                  <HStack w="100%">
                    <VStack>
                      <Avatar.Root
                        size="full"
                        shape="full"
                        w="70px"
                        h="70px"
                        bg="none"
                      >
                        <Avatar.Fallback name={blog.title} />
                        <Avatar.Image src={blog.image} />
                      </Avatar.Root>
                    </VStack>
                    <Box color="#000048" w="90%">
                      <Text fontWeight={700} fontSize="23px" truncate>
                        {blog.title}
                      </Text>
                      <Text
                        color="#4D5E80"
                        fontWeight={500}
                        fontSize="18px"
                        truncate
                      >
                        {blog.body}
                      </Text>
                    </Box>
                  </HStack>
                </GridItem>
                <GridItem>
                  <Box color="#ADB8CC" fontWeight={700}>
                    <Text textAlign="right" fontSize="13px">
                      {formatDateAlone(blog.date_created)}
                    </Text>
                    <Text textAlign="right" fontSize="13px">
                      {formatTimeAlone(blog.date_created)}
                    </Text>
                  </Box>
                </GridItem>
              </Grid>
            </Card.Body>
          </Card.Root>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <MotionBox
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            mt={2}
            mb={4}
            bg="rgba(236, 236, 236, 1)"
            p={4}
            rounded="md"
            shadow="md"
          >
            <HStack
              justifyContent="center"
              pt="1rem"
              gap={8}
              flexDir={{ base: "column", md: "row" }}
            >
              <Button
                bg="#258C37"
                color="#EFF3FA"
                w="150px"
                h="30px"
                fontSize="13px"
                fontWeight={600}
                onClick={handleEdit}
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                Edit
              </Button>
              {draft ? (
                <Button
                  bg="#074C98"
                  color="#EFF3FA"
                  w="150px"
                  h="30px"
                  fontSize="13px"
                  fontWeight={600}
                  onClick={() => handleMakeLive(blog.id)}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Post
                </Button>
              ) : (
                <Button
                  bg="#424242"
                  color="#EFF3FA"
                  w="150px"
                  h="30px"
                  fontSize="13px"
                  fontWeight={600}
                  onClick={() => handleMakeDraft(blog.id)}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Move to Drafts
                </Button>
              )}
              <Button
                bg="#FF1111"
                color="#EFF3FA"
                w="150px"
                h="30px"
                fontSize="13px"
                fontWeight={600}
                onClick={() => handleDelete(blog.id)}
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                Delete
              </Button>
            </HStack>
          </MotionBox>
        </Collapsible.Content>
      </Collapsible.Root>
    </VStack>
  );
};
