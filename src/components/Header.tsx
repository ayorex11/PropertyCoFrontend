"use client";
import HouseLogo from "@/lib/icons/house.svg";
import Dashboard from "@/lib/icons/dashboard.svg";
import FavoriteEdit from "@/lib/icons/favourite_edit.svg";
import Logo from "/public/coloured_logo.svg";
import {
  Flex,
  Box,
  Button,
  Text,
  Portal,
  HStack,
  Stack,
  Drawer,
  CloseButton,
} from "@chakra-ui/react";
import Link from "next/link";
import HamburgerIcon from "@/lib/icons/hamburger.svg";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { handleLogout } from "@/utils/logout";
import { openLogin, openSignup } from "@/lib/features/modal/modalSlice";
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false)
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const LogOut = () => {
    handleLogout(dispatch, router);
  };
  const reqProp =
    user?.account_type === "Agent" || user?.account_type === "Admin"
      ? "Post"
      : "Request";
  const reqPropLink =
    user?.account_type === "Agent" || user?.account_type === "Admin"
      ? "/postProperty"
      : "/requestProperty";
  const NavElements = [
    {
      name: "For Rent",
      href: "/rent",
      color: "#4169E0",
    },
    {
      name: "For Sale",
      href: "/sale",
      color: "#4169E0",
    },
    {
      name: "Payment Plans",
      href: "/paymentPlan",
      color: "#4169E0",
    },
    {
      name: "Partner With Us",
      href: "/partner",
      color: "#4169E0",
    },
    {
      name: "Blog",
      href: "/blog",
      color: "#4169E0",
    },
    {
      name: (
        <HStack>
          <Flex display={{ base: "none", md: "flex" }} w="20px">
            <Image src={HouseLogo} alt="House Logo" objectFit="fill" />
            &nbsp;
          </Flex>
          <Stack lineHeight="5px" alignItems="left">
            <Text>{reqProp} a Property</Text>
            <Text fontWeight="normal" textAlign="left" fontSize="10px">
              (Free)
            </Text>
          </Stack>
        </HStack>
      ),
      href: reqPropLink,
      color: "#282828",
    },
    ...(user
      ? [
          {
            name: (
              <HStack>
                <Flex display={{ base: "none", md: "flex" }} w="20px">
                  <Image
                    src={Dashboard}
                    alt="Dashboard Logo"
                    objectFit="fill"
                  />
                </Flex>
                <Stack lineHeight="5px" alignItems="left">
                  <Text fontSize="14px" fontWeight={600}>
                    Dashboard
                  </Text>
                </Stack>
              </HStack>
            ),
            href: `/dashboard/${user?.account_type.toLowerCase()}`,
            color: "#258C3A",
          },
          {
            name: <Image src={FavoriteEdit} alt="Favorite Logo" fill />,
            color: "#258C3A",
            href: `/dashboard/${user?.account_type.toLowerCase()}/savedProperties`,
          },
          {
            name: (
              <HStack>
                <Flex display={{ base: "none", md: "flex" }} w="20px">
                  <FiLogOut />
                </Flex>
                <Stack lineHeight="5px" alignItems="left">
                  <Text fontSize="14px" fontWeight={600}>
                    Log Out
                  </Text>
                </Stack>
              </HStack>
            ),
            href: "",
            color: "#ff0000",
            onClick: LogOut,
          },
        ]
      : [
          {
            name: "Register",
            href: "",
            color: "#258C3A",
            onClick: () => {
              dispatch(openSignup());
            },
          },
          {
            name: "Login",
            href: "",
            color: "#258C3A",
            onClick: () => {
              dispatch(openLogin());
            },
          },
        ]),
  ];
  return (
    <Box pt={{ base: "20px", md:"50px"}} pb={{ base: "20px", md: "2rem"}} m="auto" gap={1} bg="white">
      <HStack
        maxW="1200px"
        m="auto"
        display={{ base: "none", md: "flex" }}
        justifyContent="center"
      >
        <Link href="/">
          <Button variant="plain" mr="0.5rem" w="250px">
            <Image src={Logo} alt="Logo" />
          </Button>
        </Link>
        {NavElements.map((eachElement, index) => (
          <Box key={index}>
            {eachElement.href !== "" ? (
              <Link href={eachElement.href}>
                <Button
                  bg={eachElement.color}
                  color="white"
                  mr="0.5rem"
                  key={index}
                  p="10px 10px"
                  h="30px"
                >
                  <Box fontSize="14px" fontWeight={600}>
                    {eachElement.name}
                  </Box>
                </Button>
              </Link>
            ) : (
              <Button
                bg={eachElement.color}
                color="white"
                mr="0.5rem"
                key={index}
                p="10px 10px"
                h="30px"
                onClick={eachElement.onClick}
              >
                <Box fontSize="14px" fontWeight={600}>
                  {eachElement.name}
                </Box>
              </Button>
            )}
          </Box>
        ))}
      </HStack>
      <HStack
        m="auto"
        w="100%"
        bg="white"
        px="1rem"
        justifyContent="space-between"
        display={{ base: "flex", md: "none" }}
      >
        <Box width="200px">
          <Link href="/">
            <Image src={Logo} alt="Logo" />
          </Link>
        </Box>
        <Drawer.Root size="xs" placement="top" open={open} onOpenChange={(e) => setOpen(e.open)}>
          <Drawer.Trigger asChild>
            <Button variant="ghost" size="lg">
              <Image src={HamburgerIcon} alt="Menu" />
            </Button>
          </Drawer.Trigger>
          <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content bg="#074C98">
                <Drawer.Header>
                  <Drawer.Title></Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                  <Stack gap={5}>
                    {NavElements.map((eachElement, index) => (
                      <Box key={index} onClick={() => setOpen(false)}>
                        {eachElement.href !== "" ? (
                          <Link href={eachElement.href}>
                            <Button
                              bg="none"
                              // color={eachElement.color}
                              mr="0.5rem"
                              key={index}
                              p="10px 10px"
                              h="30px"
                              w="100%"
                              _hover={{ bg: "#FFFFFF" }} transition="background-color 0.2s ease"
                              justifyContent={{base: "left", md: "center"}}
                            >
                              <Box fontSize="14px" fontWeight={600}>
                                {eachElement.name}
                              </Box>
                            </Button>
                          </Link>
                        ) : (
                          <Button
                            bg="none"
                            color={eachElement.color}
                            mr="0.5rem"
                            key={index}
                            p="10px 10px"
                            h="30px"
                            onClick={eachElement.onClick}
                            w="100%"
                            _hover={{ bg: "#FFFFFF" }} transition="background-color 0.2s ease"
                            justifyContent={{base: "left", md: "center"}}
                          >
                            <Box fontSize="14px" fontWeight={600}>
                              {eachElement.name}
                            </Box>
                          </Button>
                        )}
                      </Box>
                    ))}
                  </Stack>
                </Drawer.Body>
                <Drawer.CloseTrigger asChild>
                  <CloseButton size="lg" color="#FFFFFF" />
                </Drawer.CloseTrigger>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>
      </HStack>
    </Box>
  );
};
export default Header;
