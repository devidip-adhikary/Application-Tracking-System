"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Loader from "@/components/common/Loader";
import Notification from "@/components/common/Notification";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableFour from "@/components/Tables/TableFour";
import { ClientsProps } from "@/types/brand";
import { apiAction } from "@/utils/apiAction";
import React, { useEffect, useState } from "react";

const Clients = () => {
  const [clientList, setClientList] = useState<ClientsProps[] | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(false);
  const headerData: any[] = [
    { id: "Name", value: "name" },
    { id: "Status", value: "isActive" },
    { id: "Action", value: "action" },
  ];
  const [notification, setNotification] = useState<any>(null);

  const showNotification = (message: string, type: string) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000); // Dismiss after 3 seconds
  };

  useEffect(() => {
    setLoading(true);
    fetchCLient();
  }, []);

  const fetchCLient = async () => {
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

  const addClient = () => {
    let tempArr = structuredClone(clientList);
    tempArr?.unshift({
      name: "",
      isActive: true,
    });
    setClientList(tempArr);
  };

  const removeClient = (ind: number) => {
    let tempArr = structuredClone(clientList);
    tempArr?.splice(ind, 1);
    setClientList(tempArr);
  };

  const handleSubmit = async (e: React.FormEvent, name: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token") || undefined;
    try {
      setLoading(true);
      const response = await apiAction({
        url: "http://localhost:8000/api/client",
        method: "POST",
        token: token,
        body: JSON.stringify(name),
      });
      if (response) {
        showNotification("Success! The client has been added.", "success");
        fetchCLient();
      }
    } catch (error: any) {
      showNotification(error.response.data, "error");
      console.error("Error fetching client data:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    const token = localStorage.getItem("token") || undefined;
    try {
      const data: any = await apiAction({
        url: `http://localhost:8000/api/client/${id}`,
        method: "DELETE",
        token: token,
      });
      if (data) {
        showNotification("Success! The client has been removed.", "success");
        fetchCLient();
      }
    } catch (error: any) {
      showNotification(error.response.data, "error");
      setLoading(false);
      console.error("Error fetching client data:", error);
    }
  };

  const handleUpdate = async (data: any) => {
    setLoading(true);
    const token = localStorage.getItem("token") || undefined;
    try {
      const response: any = await apiAction({
        url: `http://localhost:8000/api/client`,
        method: "PUT",
        body: JSON.stringify(data),
        token: token,
      });
      if (response) {
        showNotification("Success! The client has been updated.", "success");
        fetchCLient();
      }
    } catch (error: any) {
      showNotification(error.response.data, "error");
      setLoading(false);
      console.error("Error fetching client data:", error);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <Breadcrumb pageName="Clients" />
      <div>
        <span className="sm:ml-3">
          <button
            type="button"
            className="float-right inline-flex w-max items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={addClient}
          >
            <svg
              className="-ml-0.5 mb-1 mr-1.5 size-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
              />
            </svg>
            Add Client
          </button>
        </span>
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-12">
          <TableFour
            tableName="Clients"
            data={clientList}
            headerData={headerData}
            handleSubmit={handleSubmit}
            removeClient={removeClient}
            handleUpdate={handleUpdate}
            deleteFunc={handleDelete}
          />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Clients;
