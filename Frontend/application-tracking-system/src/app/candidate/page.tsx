"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableThree from "@/components/Tables/TableThree";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Candidates } from "@/types/candidate";
import { apiAction } from "@/utils/apiAction";
import Loader from "@/components/common/Loader";

const Candidate: React.FC = () => {
  const router = useRouter();
  const [candidateList, setCandidateList] = useState<Candidates[] | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(false);
  const headerData: any[] = [
    { id: "Action", value: "action" },
    { id: "Candidate", value: "name" },
    { id: "Phone", value: "ph_no" },
    { id: "Email", value: "email" },
    {
      id: "Tech Stack",
      value: "opening_vs_candidates[0].opening.tech_stack.name",
    },
    { id: "Client", value: "opening_vs_candidates[0].opening.client.name" },
    { id: "Vendor", value: "vendor.name" },
    { id: "Status", value: "status_master.name" },
  ];
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    setLoading(true);
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const token = localStorage.getItem("token") || undefined;
    try {
      const data: Candidates[] = await apiAction({
        url: "http://localhost:8000/api/candidate",
        method: "GET",
        token: token,
      });
      setCandidateList([...data]);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    const token = localStorage.getItem("token") || undefined;
    try {
      const data: Candidates[] = await apiAction({
        url: `http://localhost:8000/api/candidate/${id}`,
        method: "DELETE",
        token: token,
      });
      fetchUser();
    } catch (error) {
      setLoading(false);
      console.error("Error fetching candidate data:", error);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Breadcrumb pageName="Candidate" />
      <div>
        {currentUser.userRole !== "viewer" && (
          <span className="sm:ml-3">
            <button
              type="button"
              className="float-right inline-flex w-max items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => router.push("/add/candidate")}
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
              Add Candidate
            </button>
          </span>
        )}
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <div className="col-span-12 xl:col-span-12">
            <TableThree
              tableName="Candidate List"
              data={candidateList}
              headerData={headerData}
              defaultFunc={fetchUser}
              deleteFunc={handleDelete}
            />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Candidate;
