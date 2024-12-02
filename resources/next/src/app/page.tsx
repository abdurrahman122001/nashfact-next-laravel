'use client';
import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/common/Loader";


export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get("http://127.0.0.1:8000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200 && response.data) {
          setIsAuthenticated(true);
        } else {
          throw new Error("Invalid response");
        }
      } catch (error) {
        console.error("Authentication error:", error);
        setIsAuthenticated(false);
        router.push("/auth/signin");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <Loader/>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <DefaultLayout>
      <ECommerce />
    </DefaultLayout>
  );
}