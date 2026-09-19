"use client";

import { SortableProperty } from "@/lib/types";
import { Sort } from "@/utils/sorter";
import {
  Box,
  Table,
  Spinner,
  Text,
  Flex,
  Button,
  HStack,
  Select,
  Portal,
  createListCollection,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { HiMiniChevronLeft, HiMiniChevronRight } from "react-icons/hi2";
import { MdOutlineSkipNext, MdOutlineSkipPrevious } from "react-icons/md";

type Column<T> = {
  key: keyof T;
  label: string;
  align?: "left" | "center" | "right";
  render?: (row: T, index: number) => React.ReactNode;
};

interface CustomTableProps<T> {
  data: T[];
  columns: Column<T>[];
  showSerialNumber?: boolean;
  isLoading?: boolean;
  title?: string;
  type?: "property" | "blog" | "featured";
  emptyMessage?: string;
  currentPage?: number;
  pageSize?: number;
  rating?: boolean;
  setCurrentPage?: (currentPage: number) => void;
}
const SortDir = createListCollection({
  items: [
    { label: "Default", value: "default" },
    { label: "Recently Posted", value: "latest" },
    { label: "Oldest First", value: "oldest" },
  ],
});

export function CustomTable<T extends SortableProperty>({
  data,
  columns,
  showSerialNumber = true,
  isLoading = false,
  title = "Members",
  type,
  emptyMessage = "No records found",
  rating,
  pageSize = 10,
}: CustomTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSort, setCurrentSort] = useState<string[]>([""]);
   const totalPages = Math.ceil(data.length / pageSize);
  const totalData = data.length;
  const startData = (currentPage - 1) * pageSize;
  const endData = currentPage * pageSize;

  const startNumber = totalData > 0 ? startData + 1 : 0;
  const endNumber = endData > totalData ? totalData : endData;

  const paginatedData = Sort(data, currentSort[0]).slice(startData, endData);
  const sortCollection = useMemo(() => {
    const items = SortDir.items.filter((item) => {
      if (type === "blog")
        return !["price_low", "price_high", "admin", ""].includes(item.value);
      return true;
    });
    return createListCollection({ items });
  }, [type]);
  const goToNextPage = () => {
    if (totalPages > 1 && setCurrentPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const goToPrevPage = () => {
    if (totalPages > 1 && setCurrentPage) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <Box minH="300px">
      {!rating && (
      <Box px={{ base: "1rem", md: "40px" }} bg="#ECECEC" mb="1rem">
        <HStack justifyContent="space-between" px="1rem" py="10px" alignItems="center" flexDir={{ base: "column", md: "row" }}>
          <Text fontSize="15px" fontWeight={500}>
            {title ?? "Results"} {startNumber} - {endNumber} of {totalData}
          </Text>
          <HStack justify="center">
            <Button
              onClick={goToNextPage}
              disabled={currentPage >= totalPages}
              fontSize="12px"
              color="#000048"
              bg="#D9D9D9"
              borderRadius="10px"
            >
              Next <MdOutlineSkipNext />
            </Button>
            <Button
              onClick={goToPrevPage}
              disabled={currentPage <= 1}
              fontSize="12px"
              color="#000048"
              bg="#D9D9D9"
              borderRadius="10px"
            >
              <MdOutlineSkipPrevious /> Previous
            </Button>
          </HStack>
          <HStack w="15rem">
            <Text w="6rem">Sort By: </Text>
            <Select.Root
              collection={sortCollection}
              value={currentSort}
              onValueChange={(e) => setCurrentSort(e.value)}
            >
              <Select.HiddenSelect />
              <Select.Control bg="#B1CFEF" borderRadius="10px">
                <Select.Trigger>
                  <Select.ValueText placeholder="Select" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {sortCollection.items.map((dir, index) => (
                      <Select.Item item={dir} key={index}>
                        {dir.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
          </HStack>
        </HStack>
      </Box>
      )}
      <Box w={{base: "100vw", md: "100%"}} overflowX="scroll">
        <Table.Root size={{ base: "sm", md: "md" }} fontSize={{ base: "12px", md: "14px" }} minW={rating ? "300px" : "600px"}>
          <Table.Header>
            <Table.Row bg="#074C981A">
              {showSerialNumber && <Table.ColumnHeader textAlign="center">S/N</Table.ColumnHeader>}
              {columns.map((col, idx) => (
                <Table.ColumnHeader key={idx} textAlign={col.align || "left"}>
                  {col.label}
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {isLoading ? (
              <Table.Row>
                <Table.Cell colSpan={columns.length + (showSerialNumber ? 1 : 0)}>
                  <Flex justify="center" align="center" py={6}>
                    <Spinner mr={2} />
                    <Text>Loading...</Text>
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ) : paginatedData.length === 0 ? (
              <Table.Row>
                <Table.Cell colSpan={columns.length + (showSerialNumber ? 1 : 0)}>
                  <Flex justify="center" align="center" py={6}>
                    <Text color="gray.500">{emptyMessage}</Text>
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ) : (
              paginatedData.map((row, index) => (
                <Table.Row key={String(index)}>
                  {showSerialNumber && (
                    <Table.Cell textAlign="center">
                      {(currentPage - 1) * pageSize + index + 1}
                    </Table.Cell>
                  )}
                  {columns.map((col, idx) => (
                    <Table.Cell key={idx} textAlign={col.align || "left"}>
                      {col.render
                        ? col.render(row, index)
                        : String(row[col.key] ?? "")}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table.Root>
      </Box>
      {!rating && (
        <>
          {totalPages > 1 && setCurrentPage && (
            <Flex justify="center" align="center" flexDir={{base: "column", md: "row"}} pt={4} gap={2}>
              <Button
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage <= 1}
              >
                <HiMiniChevronLeft /> Prev
              </Button>
    
              <Text>
                Page {currentPage} of {totalPages}
              </Text>
    
              <Button
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
              >
                Next <HiMiniChevronRight />
              </Button>
            </Flex>
          )}
        </>
      )}
    </Box>
  );
}
