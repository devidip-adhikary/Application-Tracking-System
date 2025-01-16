"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Loader from "@/components/common/Loader";
import Notification from "@/components/common/Notification";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
import { Clients } from "@/types/brand";
import { Openings } from "@/types/opening";
import { Techs } from "@/types/tech";
import { apiAction } from "@/utils/apiAction";
import React, { useEffect, useState } from "react";

const workModeList = [
  {
    id: "Work from Protiviti Office",
    value: "Work from Protiviti Office",
  },
  {
    id: "Work from Client Office",
    value: "Work from Client Office",
  },
  {
    id: "Hybrid",
    value: "Hybrid",
  },
  {
    id: "Remote",
    value: "Remote",
  },
];

const AddOpenings: React.FC = () => {
  const [opening, setOpening] = useState<Openings>({
    name: "",
    client: "",
    tech: "",
    job_description: "",
    location: "",
    number_of_requiremnts: 0,
    work_mode: "",
  });
  const [clientList, setClientList] = useState<Clients[]>([]);
  const [techList, setTechList] = useState<Techs[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [selectedTech, setSelectedTech] = useState<string>("");
  const [selectedWorkMode, setSelectedWorkMode] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [notification, setNotification] = useState<any>(null);

  const showNotification = (message: string, type: string) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
      // router.push("/user");
    }, 3000); // Dismiss after 3 seconds
  };

  useEffect(() => {
    setLoading(true);
    fetchClient();
    fetchTech();
  }, []);
  const fetchTech = async () => {
    const token = localStorage.getItem("token") || undefined;
    try {
      const data: Techs[] = await apiAction({
        url: "http://localhost:8000/api/tech",
        method: "GET",
        token: token,
      });
      setTechList([...data]);
    } catch (error) {
      console.error("Error fetching opening data:", error);
    }
    setLoading(false);
  };

  const fetchClient = async () => {
    const token = localStorage.getItem("token") || undefined;
    try {
      const data: Clients[] = await apiAction({
        url: "http://localhost:8000/api/client",
        method: "GET",
        token: token,
      });
      setClientList([...data]);
    } catch (error) {
      console.error("Error fetching opening data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    setOpening((prevState) => ({
      ...prevState,
      work_mode: selectedWorkMode,
    }));
  }, [selectedWorkMode]);

  useEffect(() => {
    setOpening((prevState) => ({
      ...prevState,
      client: selectedClient,
    }));
  }, [selectedClient]);

  useEffect(() => {
    setOpening((prevState) => ({
      ...prevState,
      tech: selectedTech,
    }));
  }, [selectedTech]);

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setOpening((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("opening", opening);
    if (
      opening.client === "" ||
      opening.tech === "" ||
      opening.work_mode === ""
    ) {
      setError(true);
      return;
    }
    const token = localStorage.getItem("token") || undefined;
    try {
      setLoading(true);
      const response = await apiAction({
        url: "http://localhost:8000/api/opening",
        method: "POST",
        token: token,
        body: JSON.stringify(opening),
      });
      if (response) {
        showNotification("Success! The user has been added.", "success");
        // router.push("/user");
      }
    } catch (error: any) {
      showNotification(error.response.data, "error");
      console.error("Error fetching user data:", error);
    }
    setLoading(false);
    // setOpening({
    //   name: "",
    //   client: "",
    //   tech: "",
    //   job_description: "",
    //   location: "",
    //   number_of_requiremnts: 0,
    //   work_mode: "",
    // });
  };

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <Breadcrumb pageName="Add Openings" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                New Openings
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Name <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter name"
                      id="name"
                      onChange={handleChange}
                      required
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Number of requirements{" "}
                      <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="Enter number of requirements"
                      id="number_of_requiremnts"
                      onChange={handleChange}
                      min={1}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <SelectGroupOne
                      title="Client"
                      options={clientList}
                      displayName="name"
                      setSelectedValue={setSelectedClient}
                      required
                    />
                    {error && (
                      <p className="mt-1 text-sm text-red-500">
                        Please select a client
                      </p>
                    )}
                  </div>
                  <div className="w-full xl:w-1/2">
                    <SelectGroupOne
                      title="Tech Stack"
                      options={techList}
                      displayName="name"
                      setSelectedValue={setSelectedTech}
                      required
                    />
                    {error && (
                      <p className="mt-1 text-sm text-red-500">
                        Please select a tech stack
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <SelectGroupOne
                      title="Work Mode"
                      options={workModeList}
                      displayName="value"
                      setSelectedValue={setSelectedWorkMode}
                      required
                    />
                    {error && (
                      <p className="mt-1 text-sm text-red-500">
                        Please select the mode of work
                      </p>
                    )}
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Location <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter location"
                      required
                      id="location"
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Job Description
                  </label>
                  <textarea
                    rows={6}
                    required
                    placeholder="Enter Job Description"
                    id="job_description"
                    onChange={handleChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                </div>

                <span className="float-right">
                  <button
                    type="submit"
                    className="mb-4 flex w-max justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                  >
                    <span className="pe-2">Submit</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                    </svg>
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AddOpenings;
