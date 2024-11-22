import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";

export const metadata: Metadata = {
  title:
    "Admin Dashboard | Nashfact",
  description: "This is Admin Dashboard for the Nashfact Blogs",
  icons: {
    icon: "/images/logo/icon.png",
  },
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </>
  );
}
