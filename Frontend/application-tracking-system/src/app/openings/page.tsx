"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableTwo from "@/components/Tables/TableTwo";
import React from "react";

const Openings: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="List of Openings" />
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-12">
          <TableTwo />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Openings;
