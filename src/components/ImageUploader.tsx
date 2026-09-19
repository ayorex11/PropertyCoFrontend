// components/ImageUploaderWithCrop.tsx
"use client"

import React, { useCallback, useEffect, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { AspectRatio, Box, Button, Input, VStack } from "@chakra-ui/react";
import { useController } from "react-hook-form";
import { getCroppedImg, readFile } from "@/utils/cropImage";
import Image from "next/image";
import { Control, FieldValues, Path } from "react-hook-form";
import AvatarFallback from "@/lib/icons/profile.svg"
import EmptyFallback from "@/lib/icons/empty.svg"
import { parseAspectRatio } from "./RatioToDimension";

interface ImageUploaderWithCropProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  aspect?: string;
  defaultImage?: string | File | null;
  type?: "avatar" | "view"
  width?: number;
  height?: number;
}

export const ImageUploaderWithCrop = <TFieldValues extends FieldValues>({
  control,
  name,
  aspect = "1",
  defaultImage = null,
  type = "view"
}: ImageUploaderWithCropProps<TFieldValues>) => {
  const {
    field: { onChange },
  } = useController({ name, control });
  
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(defaultImage instanceof File ? URL.createObjectURL(defaultImage) : defaultImage);
  const { width, height } = parseAspectRatio(aspect);
  console.info("defaultImage:", defaultImage);
  console.info("croppedImageUrl:", croppedImageUrl);

  useEffect(() => {
  if (!defaultImage) {
    setCroppedImageUrl(null);
    return;
  }

  if (defaultImage instanceof File) {
    const url = URL.createObjectURL(defaultImage);
    setCroppedImageUrl(url);

    // cleanup
    return () => URL.revokeObjectURL(url);
  }

  if (typeof defaultImage === "string") {
    setCroppedImageUrl(defaultImage);
  }
}, [defaultImage]);

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
    }
  };

  const handleCrop = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
    const file = new File([croppedBlob], "cropped.jpg", { type: "image/jpeg" });
    onChange(file); // ✅ send File, not Blob
    setCroppedImageUrl(URL.createObjectURL(file));
  };

  return (
    <VStack align="start" gap={4}>
      <Input type="file" accept="image/*" onChange={handleImageUpload} />

      {imageSrc && !croppedImageUrl && (
        <>
          <Box position="relative" width="300px" height="300px">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={width/height}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </Box>

          <Button colorScheme="blue" onClick={handleCrop}>
            Crop & Save
          </Button>
        </>
      )}

      {croppedImageUrl ? (
        <>
          <Box w={width} h={height}>
            <AspectRatio ratio={width/height}>
              <Image
                src={croppedImageUrl}
                alt="Preview"
                fill
                style={{
                  borderRadius: type === "avatar" ? "100%" :  "10px",
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
              />
            </AspectRatio>
          </Box>
          <Button
            mt={2}
            size="sm"
            onClick={() => {
              if (croppedImageUrl?.startsWith("blob:")) {
                URL.revokeObjectURL(croppedImageUrl); // 👈 cleanup
              }
              setImageSrc(null);
              setCroppedImageUrl(null);
              setCrop({ x: 0, y: 0 });
              setZoom(1);
            }}
          >
            Change Image
          </Button>
        </>

      ): !imageSrc ? (
        <Box w={width} h={height}>
          <AspectRatio ratio={1/1}>
            <Image
              src={type=== "avatar" ? AvatarFallback : EmptyFallback}
              alt="Preview"
              fill
              style={{
                borderRadius: "10px",
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
          </AspectRatio>
        </Box>
      ) : null}
    </VStack>
  );
};

export default ImageUploaderWithCrop;
