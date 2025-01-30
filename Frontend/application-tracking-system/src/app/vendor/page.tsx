"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Loader from "@/components/common/Loader";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableOne from "@/components/Tables/TableOne";
import { VendorItemProps } from "@/types/vendor";
import { apiAction } from "@/utils/apiAction";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Vendors: React.FC = () => {
  const router = useRouter();
  const [vendorList, setVendorList] = useState<VendorItemProps[] | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(false);
  const headerData: any[] = [
    { id: "Name", value: "name" },
    { id: "Email", value: "email" },
    { id: "SPOC", value: "spoc" },
    { id: "Phone Number", value: "ph_no" },
    { id: "Status", value: "isActive" },
  ];
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    setLoading(true);
    fetchVendor();
  }, []);

  const fetchVendor = async () => {
    const token = localStorage.getItem("token") || undefined;
    try {
      const data: VendorItemProps[] = await apiAction({
        url: "http://localhost:8000/api/vendor",
        method: "GET",
        token: token,
      });
      setVendorList([...data]);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
    setLoading(false);
  };

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Breadcrumb pageName="Vendors" />
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-12">
          <TableOne
            tableName="Vendors"
            data={vendorList}
            headerData={headerData}
            // deleteFunc={handleDelete}
          />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Vendors;
