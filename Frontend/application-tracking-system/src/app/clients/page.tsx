"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableOne from "@/components/Tables/TableOne";
import React from "react";

const Clients: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="List of Clients" />
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-12">
          <TableOne />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Clients;
