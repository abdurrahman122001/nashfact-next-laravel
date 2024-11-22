import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import BlogsTable from "@/components/Tables/blogsTable";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";

export const metadata: Metadata = {
  title: "Next.js Tables Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Tables page for NextAdmin Dashboard Kit",
};

const blogPosts = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Blog Posts" />

      <div className="flex flex-col gap-10">
        
        <BlogsTable />
      </div>
    </DefaultLayout>
  );
};

export default blogPosts;