"use client";

import {
  Box,
  Button,
  CloseButton,
  Field,
  FileUpload,
  Float,
  Grid,
  GridItem,
  HStack,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BlogFormPayload, blogSchema } from "@/schemas/schema";
import { useAppDispatch } from "@/lib/hooks";
import { closeModals } from "@/lib/features/modal/modalSlice";
import { postBlogApi, postDraftApi, updateBlogApi } from "@/lib/api/blogsApi";
import { fetchBlogs, fetchDrafts } from "@/lib/features/blogs/blogsSlice";
import { errorToast, successToast } from "@/utils/CustomToast";
import axios from "axios";
import { ApiErrorResponse } from "@/lib/types";
import ImageUploaderWithCrop from "@/components/ImageUploader";

type BlogFormProps = {
  defaultValues?: BlogFormPayload;
  id?: string | number;
};

export const BlogForm = ({ defaultValues, id }: BlogFormProps) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BlogFormPayload>({
    resolver: zodResolver(blogSchema),
    defaultValues,
  });

  const onSubmit = async (data: BlogFormPayload) => {
    try {
      if (defaultValues){
        if (id) {
          await updateBlogApi(id, data);
          await dispatch(fetchBlogs());
          await dispatch(fetchDrafts());
          dispatch(closeModals());
          successToast("Article Updated successfully");
        } else {
          errorToast("Unable to update");
        }
      } else {
        await postBlogApi(data);
        await dispatch(fetchBlogs());
        dispatch(closeModals());
        successToast("Article Posted successfully");
      }
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
    }
  };

  const saveAsDraft = async (data: BlogFormPayload) => {
    try {
      await postDraftApi(data);
      await dispatch(fetchDrafts());
      dispatch(closeModals());
      successToast("Draft Saved successfully");
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
    }
  };

  return (
    <VStack
      position="fixed"
      w="100%"
      h="100vh"
      justifyContent="center"
      zIndex={30}
      bg="#FFFFFFA2"
      backdropFilter="blur(5px)"
    >
      <Box
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        bg="#F5F5F5"
        border="2px solid #D9D9D9"
        maxW="2xl"
        w="full"
        pb="2rem"
        px="2rem"
        borderRadius="20px"
        pos="relative"
        maxH="100vh"
        overflowY="auto"
      >
        <Float offset={10} zIndex={10}>
          <CloseButton onClick={() => dispatch(closeModals())} />
        </Float>
        <Text fontSize="30px" fontWeight={700} py="2rem">
          {defaultValues ? "Update"  : "New"} Article
        </Text>
        <VStack gap={5} color="#000048">
          {/* Title */}
          <Field.Root invalid={!!errors.title}>
            <Grid templateColumns={{base: "repeat(1, 1fr)", md: "repeat(6, 1fr)"}} gap={2} w="full">
              <GridItem colSpan={1}>
                <Field.Label fontWeight={600} fontSize="20px">
                  Title
                </Field.Label>
              </GridItem>
              <GridItem colSpan={{base: 1, md: 5}}>
                <Input {...register("title")} bg="#FFFFFF" border="1px solid #1944B4" borderRadius="10px" />
              </GridItem>
            </Grid>
            <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
          </Field.Root>

          {/* Image Upload */}

          <FileUpload.Root
            accept="image/*"
            allowDrop
            onFileChange={(e) => {
              const file = e.acceptedFiles?.[0];
              if (file) {
                setValue("image", file);
              }
            }}
          >
            <FileUpload.HiddenInput />
            <Grid templateColumns={{base: "repeat(1, 1fr)", md: "repeat(6, 1fr)"}} gap={2} w="full">
              <GridItem colSpan={1}>
                <Text fontWeight={600} fontSize="20px">
                  Cover Image
                </Text>
              </GridItem>
              <GridItem colSpan={{base: 1, md: 5}}>
                <ImageUploaderWithCrop name="image" control={control} aspect="150/150" defaultImage={watch("image")}/>
              </GridItem>
            </Grid>
          </FileUpload.Root>

          {/* Body */}
          <Field.Root invalid={!!errors.body}>
            <Grid templateColumns={{base: "repeat(1, 1fr)", md: "repeat(6, 1fr)"}} gap={2} w="full">
              <GridItem colSpan={1}>
                <Field.Label fontWeight={600} fontSize="20px">
                  Body
                </Field.Label>
              </GridItem>
              <GridItem colSpan={{base: 1, md: 5}}>
                <Textarea {...register("body")} bg="#FFFFFF" border="1px solid #1944B4" rows={10} borderRadius="10px" resize="none"/>
              </GridItem>
            </Grid>
            <Field.ErrorText>{errors.body?.message}</Field.ErrorText>
          </Field.Root>


          {/* Submit Button */}
          <HStack w="full" justifyContent="center" flexDir={{base: "column", md: "row"}} gap={10}>
            <Button
              type="submit"
              w="150px"
              h="50px"
              bg="#258C37"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              {defaultValues ? "Update Blog" : "Publish Blog"}
            </Button>
            {!defaultValues && (
              <Button
                type="button"
                bg="#424242"
                w="150px"
                onClick={handleSubmit(saveAsDraft)}
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                Save as Draft
              </Button>
            )}
          </HStack>
        </VStack>
      </Box>
    </VStack>
  );
};
