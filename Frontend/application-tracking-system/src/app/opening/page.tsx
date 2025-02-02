"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableTwo from "@/components/Tables/TableTwo";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiAction } from "@/utils/apiAction";
import { Openings } from "@/types/opening";
import Loader from "@/components/common/Loader";

const Opening: React.FC = () => {
  const router = useRouter();
  const [openingList, setOpeningList] = useState<Openings[] | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(false);
  const headerData: any[] = [
    { id: "Name", value: "name" },
    { id: "Client", value: "client" },
    { id: "Tech Stack", value: "tech_stack" },
    { id: "Job Description", value: "job_description" },
    { id: "Location", value: "location" },
    { id: "Number of Requirements", value: "number_of_requiremnts" },
    { id: "Work Mode", value: "work_mode" },
    { id: "Status", value: "isActive" },
    { id: "Action", value: "action" },
  ];

  let currentUser: Record<string, any> = {};

  if (typeof window !== "undefined") {
    currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  }

  useEffect(() => {
    setLoading(true);
    fetchUser();
  }, []);

  const fetchUser = async () => {
    let token;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token") || undefined;
    }
    try {
      const data: Openings[] = await apiAction({
        url: "/api/opening",
        method: "GET",
        token: token,
      });
      setOpeningList([...data]);
    } catch (error) {
      console.error("Error fetching opening data:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    let token;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token") || undefined;
    }
    try {
      const data: Openings[] = await apiAction({
        url: `/api/opening/${id}`,
        method: "DELETE",
        token: token,
      });
      fetchUser();
    } catch (error) {
      setLoading(false);
      console.error("Error fetching opening data:", error);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Breadcrumb pageName="Openings" />
      <div>
        {currentUser.userRole !== "viewer" && (
          <span className="sm:ml-3">
            <button
              type="button"
              className="float-right inline-flex w-max items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => router.push("/add/opening")}
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
              Add Openings
            </button>
          </span>
        )}

        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <div className="col-span-12 xl:col-span-12">
            <TableTwo
              tableName="Opening"
              data={openingList}
              headerData={headerData}
              deleteFunc={handleDelete}
            />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Opening;
