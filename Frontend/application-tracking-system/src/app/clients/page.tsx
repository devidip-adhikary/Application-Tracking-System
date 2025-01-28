"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Loader from "@/components/common/Loader";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableFour from "@/components/Tables/TableFour";
import { ClientsProps } from "@/types/brand";
import { apiAction } from "@/utils/apiAction";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Clients = () => {
  const router = useRouter();
  const [clientList, setClientList] = useState<ClientsProps[] | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(false);
  const headerData: any[] = [
    { id: "Name", value: "name" },
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
      const data: ClientsProps[] = await apiAction({
        url: "http://localhost:8000/api/client",
        method: "GET",
        token: token,
      });
      setClientList([...data]);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
    setLoading(false);
  };

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Breadcrumb pageName="Clients" />
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-12">
          <TableFour
            tableName="Clients"
            data={clientList}
            headerData={headerData}
            // deleteFunc={handleDelete}
          />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Clients;
