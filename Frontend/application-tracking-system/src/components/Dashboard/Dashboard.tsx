"use client";
import React, { useEffect, useState } from "react";
import CardDataStats from "../CardDataStats";
import TableThree from "../Tables/TableThree";
import DefaultLayout from "../Layouts/DefaultLayout";
import withAuth from "@/app/context/AuthContext";
import { redirect } from "next/navigation";
import Loader from "../common/Loader";
import { OpeningVsCandidate } from "@/types/opening_vs_candidate";
import { apiAction } from "@/utils/apiAction";

const Dashboard: React.FC = () => {
  const [openingCandidateList, setOpeningCandidateList] =
    useState<OpeningVsCandidate[]>();
  const [loading, setLoading] = useState(false);
  const [statData, setStatData] = useState<any[]>();
  const headerData: any[] = [
    { id: "Candidate", value: "candidate.name" },
    { id: "Phone", value: "candidate.ph_no" },
    { id: "Email", value: "candidate.email" },
    { id: "Tech Stack", value: "opening.tech_stack.name" },
    { id: "Client", value: "opening.client.name" },
    { id: "Vendor", value: "candidate.vendor.name" },
    { id: "Job Description", value: "opening.job_description" },
    { id: "Location", value: "opening.location" },
    { id: "Number of Requirements", value: "opening.number_of_requiremnts" },
    { id: "Work Mode", value: "opening.work_mode" },
    { id: "Candidate Status", value: "candidate.isActive" },
    { id: "Progress Status", value: "status_master.name" },
    { id: "Opening", value: "opening.name" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      redirect("/auth/signin"); // Redirect to SignIn page if not authenticated
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  useEffect(() => {
    const fetchAllStatsSequentially = async () => {
      if (openingCandidateList && openingCandidateList.length > 0) {
        await fetchStat("Onboarded");
        await fetchStat("Rejected");
        await fetchStat("Declined");
      }
    };

    fetchAllStatsSequentially();
  }, [openingCandidateList?.length]);

  const fetchData = async () => {
    const token = localStorage.getItem("token") || undefined;
    try {
      const data: OpeningVsCandidate[] = await apiAction({
        url: "http://localhost:8000/api/openings-vs-candidate",
        method: "GET",
        token: token,
      });
      let tempArr = [];
      tempArr.push({
        req_status: "Openings",
        count: data.length,
      });
      setStatData(tempArr);
      setOpeningCandidateList([...data]);
    } catch (error) {
      console.error("Error fetching opening data:", error);
    }
    setLoading(false);
  };

  const fetchStat = async (status: string) => {
    console.log("eh", statData, status);
    const token = localStorage.getItem("token") || undefined;
    try {
      const data: any = await apiAction({
        url: `http://localhost:8000/api/openings-vs-candidate/${status}`,
        method: "GET",
        token: token,
      });

      setStatData((prevStatData: any) => [
        ...prevStatData,
        { req_status: data.req_status, count: data?.count },
      ]);
    } catch (error) {
      console.error("Error fetching opening data:", error);
    }
    setLoading(false);
  };

  const findCount = (stat: string) => {
    return statData?.find((el: any) => el.req_status === stat)?.count || 0;
  };

  console.log("dsjbc", statData);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total Openings" total={findCount("Openings")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="fill-primary dark:fill-white"
          >
            <path
              fillRule="evenodd"
              d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 18.375V5.625ZM21 9.375A.375.375 0 0 0 20.625 9h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5ZM10.875 18.75a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5ZM3.375 15h7.5a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375Zm0-3.75h7.5a.375.375 0 0 0 .375-.375v-1.5A.375.375 0 0 0 10.875 9h-7.5A.375.375 0 0 0 3 9.375v1.5c0 .207.168.375.375.375Z"
              clipRule="evenodd"
            />
            <path d="M3 18.4v-2.796a4.3 4.3 0 0 0 .713.31A26.226 26.226 0 0 0 12 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 0 1-6.477-.427C4.047 21.128 3 19.852 3 18.4Z" />
          </svg>
        </CardDataStats>
        <CardDataStats title="Total Onboarded" total={findCount("Onboarded")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="fill-success dark:fill-white"
          >
            <path
              fillRule="evenodd"
              d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"
              clipRule="evenodd"
            />
            <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
          </svg>
        </CardDataStats>
        <CardDataStats title="Total Rejected" total={findCount("Rejected")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="fill-red-700 dark:fill-white"
          >
            <path d="M10.375 2.25a4.125 4.125 0 1 0 0 8.25 4.125 4.125 0 0 0 0-8.25ZM10.375 12a7.125 7.125 0 0 0-7.124 7.247.75.75 0 0 0 .363.63 13.067 13.067 0 0 0 6.761 1.873c2.472 0 4.786-.684 6.76-1.873a.75.75 0 0 0 .364-.63l.001-.12v-.002A7.125 7.125 0 0 0 10.375 12ZM16 9.75a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5h-6Z" />
          </svg>
        </CardDataStats>
        <CardDataStats title="Total Declined" total={findCount("Declined")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="fill-orange-500 dark:fill-white"
          >
            <path
              fillRule="evenodd"
              d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z"
              clipRule="evenodd"
            />
          </svg>
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-12">
          <TableThree
            tableName="Dashboard"
            data={openingCandidateList}
            headerData={headerData}
            defaultFunc={fetchData}
          />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default withAuth(Dashboard);
