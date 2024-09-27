"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setAdminToken, clearAdminToken } from "@/lib/auth";
import { LoginResponse } from "../types/auth";
import { toast } from "sonner";
import { api_url } from "@/const/url";

const API_URL = `${api_url}/account/login/`;
const API_KEY =
  "ZPuKoTX2CohoPNC8noaiefai4lhLTi5U_PFlNvJraB5bG1mpLbWZqVjuNx6gREUA-f4";

export function useAdmin() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "X-Api-Key": API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestType: "inbound",
          data: { email, password },
        }),
      });

      if (!response.ok) {
        console.log("HERERERERE");
        console.log(response);
      }

      const data: LoginResponse = await response.json();

      if (data.status === true) {
        setAdminToken(data.data.accessToken);
        router.push("/dashboard");
        toast.success("Log in successful", {
          richColors: true,
          position: "top-right",
        });
      } else {
        if (data.message === "Invalid email or password") {
          toast.error("Invalid email or password", {
            richColors: true,
            position: "top-right",
          });
        }
        // throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearAdminToken();
    router.push("/login");
  };

  return { loading, login, logout };
}
