"use client";

import { resendVerifyEmailApi, verifyEmailApi } from "@/lib/api/authApi";
import { ApiErrorResponse } from "@/lib/types";
import { errorToast, successToast } from "@/utils/CustomToast";
import { Button, Input, Spinner, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

interface IConfimEmailProps {
  token: string;
}

const ConfirmEmail = ({ token }: IConfimEmailProps) => {
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    const handleVerify = async () => {
      try {
        setLoading(true);
        await verifyEmailApi(token);
        setVerified(true);
        successToast("Email verified successfully!");
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const data = err.response?.data as ApiErrorResponse;
          // Extract first error message
          let firstError = "Unable to request";
          if (typeof data === "string") {
            firstError = data;
          } else if (typeof data.detail === "string") {
            firstError = data.detail;
          } else if (Array.isArray(Object.values(data)[0])) {
            firstError = Object.values(data)[0][0];
          } else {
            firstError = String(Object.values(data)[0]);
          }
          setVerified(false);
          setError(firstError);
          errorToast(firstError);
        } else {
          errorToast("Unexpected error occurred");
          setError("Unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    if (token) handleVerify();
  }, [token]);

  const handleResend = async () => {
    if (!userEmail) {
      errorToast("No email found to resend link.");
      return;
    }
    try {
      setLoading(true);
      await resendVerifyEmailApi(userEmail);
      successToast("Verification email resent successfully!");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as ApiErrorResponse;
        // Extract first error message
        let firstError = "Unable to request";
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
      setLoading(false);
    }
  };

  return (
    <Stack h="400px" justifyContent="center">
        {loading ? (
          <Spinner size="lg" color="blue.500" />
        ) : verified ? (
          <Text fontSize="28px" color="green.600" fontWeight="500">
            ✅ Your email has been successfully verified!
          </Text>
        ) : (
          <Stack gap={4}>
            <Text fontSize="28px" color="red.600" fontWeight="500">
              ❌ {error}
            </Text>

            <Input
            value={userEmail}
            onChange={(e)=>setUserEmail(e.target.value)}
            placeholder="Input email"
            fontSize="20px"
            />
            <Button
              colorPalette="blue"
              onClick={handleResend}
              loading={loading}
              disabled={loading}
              fontSize="20px"
              p="1.5rem"
            >
              Resend Verification Email
            </Button>
          </Stack>
        )}
    </Stack>
  );
};

export default ConfirmEmail;
