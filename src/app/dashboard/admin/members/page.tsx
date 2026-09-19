"use client";

import {
  Box,
  Button,
  Group,
  HStack,
  Icon,
  Input,
  Span,
  Spinner,
  Stack,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { HiUsers } from "react-icons/hi2";
import { GrLineChart } from "react-icons/gr";
import { LuSearch } from "react-icons/lu";
import MembersTable from "../components/members/MembersTable";
import AgentsTable from "../components/members/AgentsTable";
import UsersTable from "../components/members/UsersTable";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchAgents, fetchMembers, fetchUsers } from "@/lib/features/members/membersSlice";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Member } from "@/lib/types";

const AdminMembers = () => {
  const { members: MemData, loading: MemLoading } = useAppSelector(
    (state) => state.members
  );
  const { users: UserData, loading: UserLoading } = useAppSelector(
    (state) => state.members
  );
  const { agents: AgentData, loading: AgentLoading } = useAppSelector(
    (state) => state.members
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchMembers());
    dispatch(fetchUsers());
    dispatch(fetchAgents());
  }, [dispatch]);
  const [searchQuery, setSearchQuery] = useState({ memid: "", email: "" });

  const filterByQuery = (data: Member[] = []) =>
    data.filter(
      (m) =>
        (searchQuery.memid
          ? m.member_id.toString().includes(searchQuery.memid)
          : true) &&
        (searchQuery.email
          ? m.email.toLowerCase().includes(searchQuery.email.toLowerCase())
          : true)
    );
  const filteredMembers = filterByQuery(MemData ?? []);
  const filteredUsers = filterByQuery(UserData ?? []);
  const filteredAgents = filterByQuery(AgentData ?? []);
  return (
    <Box pb="2rem">
      <Stack
        p={{ base: "2rem 0rem", md: "2rem 4rem" }}
        alignItems={{ base: "center", md: "flex-start" }}
      >
        <Text fontWeight={500} fontSize="30px">
          Members
        </Text>
        <HStack
          justifyContent="space-between"
          alignItems={{ base: "center", md: "flex-end" }}
          flexDir={{ base: "column", md: "row" }}
          w="full"
        >
          <Stack bg="#FFFFFF" p="1rem" w="300px" borderRadius="15px">
            <HStack justifyContent="space-between">
              <Stack>
                <Text color="#202224" fontSize="18px" fontWeight={600}>
                  All Members
                </Text>
                {MemLoading.members ? (
                  <Spinner size="xl" />
                ) : (
                  <Text color="#202224" fontWeight={700} fontSize="34px">
                    {MemData?.length ?? 0}
                  </Text>
                )}
              </Stack>
              <Box p="1rem" borderRadius="20px" bg="#a5a4faff">
                <Icon as={HiUsers} boxSize={8} color="#074C98" />
              </Box>
            </HStack>
            <Text fontWeight={600} fontSize="18px" color="#606060">
              {MemLoading.members ? (
                <Spinner size="xl" color="#00B69B" />
              ) : (
                <Span color="#00B69B" fontSize="inherit">
                  <Icon as={GrLineChart} boxSize={8} /> +
                  {MemData?.filter((m) =>
                    dayjs(m.date_joined).isAfter(dayjs().subtract(7, "day"))
                  ).length ?? 0}
                </Span>
              )}
              &nbsp;last 7 days
            </Text>
          </Stack>
          <Stack color="#074C98">
            <Stack>
              <Text flex={1} fontWeight={500} fontSize="14px">
                Search by ID
              </Text>
              <Group attached w="sm" maxW="sm" flex={1}>
                <Input
                  flex="1"
                  placeholder="Enter ID"
                  bg="#FFFFFF"
                  border="2px solid #074C98"
                  borderLeftRadius="10px"
                  value={searchQuery.memid}
                  onChange={(e) =>
                    setSearchQuery({ ...searchQuery, memid: e.target.value })
                  }
                />
                <Button
                  bg="#074C98"
                  variant="plain"
                  border="2px solid #074C98"
                  borderRightRadius="10px"
                >
                  <LuSearch color="#FFFFFF" />
                </Button>
              </Group>
            </Stack>
            <Stack>
              <Text flex={1} fontWeight={500} fontSize="14px">
                Search by Email Address
              </Text>
              <Group attached w="sm" maxW="sm" flex={1}>
                <Input
                  flex="1"
                  placeholder="Enter Email Address"
                  bg="#FFFFFF"
                  border="2px solid #074C98"
                  borderLeftRadius="10px"
                  value={searchQuery.email}
                  onChange={(e) =>
                    setSearchQuery({ ...searchQuery, email: e.target.value })
                  }
                />
                <Button
                  bg="#074C98"
                  variant="plain"
                  border="2px solid #074C98"
                  borderRightRadius="10px"
                >
                  <LuSearch color="#FFFFFF" />
                </Button>
              </Group>
            </Stack>
          </Stack>
        </HStack>
      </Stack>
      <Tabs.Root
        defaultValue="all"
        variant="enclosed"
        colorPalette="blue"
        textAlign={{ base: "center", md: "left" }}
      >
        <Tabs.List p={{ base: "2rem 0rem", md: "2rem 4rem" }}>
          <Tabs.Trigger
            fontWeight={600}
            fontSize="18px"
            bg="#FFFFFF"
            p="1.5rem 2rem"
            color="#074C98"
            _selected={{ bg: "#074C98", color: "#FFFFFF" }}
            value="all"
          >
            All
          </Tabs.Trigger>
          <Tabs.Trigger
            fontWeight={600}
            fontSize="18px"
            bg="#FFFFFF"
            p="1.5rem 2rem"
            color="#074C98"
            _selected={{ bg: "#074C98", color: "#FFFFFF" }}
            value="users"
          >
            Users
          </Tabs.Trigger>
          <Tabs.Trigger
            fontWeight={600}
            fontSize="18px"
            bg="#FFFFFF"
            p="1.5rem 2rem"
            color="#074C98"
            _selected={{ bg: "#074C98", color: "#FFFFFF" }}
            value="agents"
          >
            Agents
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="all">
          <MembersTable
            members={filteredMembers}
            loading={MemLoading.members}
          />
        </Tabs.Content>
        <Tabs.Content value="users">
          <UsersTable users={filteredUsers} loading={UserLoading.users} />
        </Tabs.Content>
        <Tabs.Content value="agents">
          <AgentsTable agents={filteredAgents} loading={AgentLoading.agents} />
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
};

export default AdminMembers;
