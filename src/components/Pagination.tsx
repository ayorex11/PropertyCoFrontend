"use client";
import {
  Box,
  Button,
  createListCollection,
  Flex,
  HStack,
  Portal,
  Select,
  Grid,
  Spinner,
  Stack,
  Text,
  GridItem,
} from "@chakra-ui/react";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { Sort } from "../utils/sorter";
import { SortableProperty } from "@/lib/types";
import { MdOutlineSkipNext, MdOutlineSkipPrevious } from "react-icons/md";

interface PaginationProps<T> {
  data: T[];
  perPage?: number;
  render: (item: T) => ReactNode;
  type?: "property" | "blog" | "featured";
  title?: string;
  emptyMessage?: string;
  isLoading?: boolean;
  resetTrigger?: unknown;
}

const SortDir = createListCollection({
  items: [
    { label: "Default", value: "default" },
    { label: "Recently Posted", value: "latest" },
    { label: "Oldest First", value: "oldest" },
    { label: "Agent Rating", value: "" },
    { label: "Sold by PropertyCo", value: "admin" },
    { label: "Lowest-Highest", value: "price_low" },
    { label: "Highest-Lowest", value: "price_high" },
  ],
});

const Pagination = <T extends SortableProperty>({
  data,
  perPage = 10,
  render,
  type,
  title,
  emptyMessage = "No Data available...",
  isLoading,
  resetTrigger,
}: PaginationProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSort, setCurrentSort] = useState<string[]>([""]);

  const totalPages = Math.ceil(data.length / perPage);
  const totalData = data.length;
  const startData = (currentPage - 1) * perPage;
  const endData = currentPage * perPage;

  const startNumber = totalData > 0 ? startData + 1 : 0;
  const endNumber = endData > totalData ? totalData : endData;

  const currentData = Sort(data, currentSort[0]).slice(startData, endData);

  const sortCollection = useMemo(() => {
    const items = SortDir.items.filter((item) => {
      if (type === "blog")
        return !["price_low", "price_high", "admin", ""].includes(item.value);
      return true;
    });
    return createListCollection({ items });
  }, [type]);

  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  useEffect(() => {
    setCurrentPage(1);
    setCurrentSort([""]);
  }, [resetTrigger, data, type]);
  return (
    <Stack gap={5}>
      <Box pl={{md: "40px"}} bg="#ECECEC">
        <HStack justifyContent="space-between" px="1rem" py="10px" gapY={5} alignItems="center" flexDir={{base: "column", md: "row"}}>
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
      {isLoading ? (
        <Flex justify="center" align="center" py={6}>
          <Spinner mr={2} />
          <Text>Loading...</Text>
        </Flex>
      ) : totalData > 0 ? (
        <Grid templateColumns={{base: "repeat(1, 1fr)", md: "repeat(2, 1fr)"}}
          display={type === "featured" ? "grid" : "block"}
          gap={5}
        >
          {currentData.map((item, index) => (
            <GridItem mb="3rem" colSpan={1} key={index}>{render(item)}</GridItem>
          ))}
        </Grid>
      ) : (
        <Box fontWeight={500} fontSize="23px" px="4rem" textAlign="center">
          {emptyMessage}
        </Box>
      )}
      <Box>
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
      </Box>
    </Stack>
  );
};

export default Pagination;
