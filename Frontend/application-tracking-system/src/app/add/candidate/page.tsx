"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Loader from "@/components/common/Loader";
import Notification from "@/components/common/Notification";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
import SwitcherThree from "@/components/Switchers/SwitcherThree";
import { Candidates } from "@/types/candidate";
import { Openings } from "@/types/opening";
import { apiAction } from "@/utils/apiAction";
import React, { useEffect, useState } from "react";

const AddCandidate: React.FC = () => {
  const [candidate, setCandidate] = useState<Candidates>({
    name: "",
    email: "",
    ph_no: "",
    current_company: "",
    YOE: "",
    RYOE: "",
    notice_period: "",
    cur_location: "",
    pref_location: "",
    current_ctc: "",
    expected_ctc: "",
    lwd: null,
    opening: 0,
    vendor_id: 0,
  });
  const [openingList, setOpeningList] = useState<Openings[]>([]);
  const [vendorList, setVendorList] = useState<[]>([]);
  const [resume, setResume] = useState<File | null>(null);
  const [candidateData, setCandidateData] = useState<File | null>(null);
  const [selectedOpening, setSelectedOpening] = useState<string>("");
  const [selectedVendor, setSelectedVendor] = useState<string>("");
  const [selectedLWD, setSelectedLWD] = useState<string>("");
  const [isServedNP, setIsServedNP] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<any>(null);

  const showNotification = (message: string, type: string) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  useEffect(() => {
    setLoading(true);
    fetchVendor();
    fetchOpenings();
  }, []);

  useEffect(() => {
    setCandidate((prevState) => ({
      ...prevState,
      opening: Number(selectedOpening),
    }));
  }, [selectedOpening]);

  useEffect(() => {
    setCandidate((prevState) => ({
      ...prevState,
      vendor_id: Number(selectedVendor),
    }));
  }, [selectedVendor]);

  useEffect(() => {
    setCandidate((prevState) => ({
      ...prevState,
      lwd: new Date(selectedLWD),
    }));
  }, [selectedLWD]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResume(e.target.files[0]);
    } else {
      setResume(null);
    }
  };

  const handleUploadData = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCandidateData(e.target.files[0]);
    } else {
      setCandidateData(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCandidate((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      candidate.opening === 0 ||
      candidate.vendor_id === 0 ||
      (isServedNP && candidate.lwd === null)
    ) {
      alert("Please fill the mandatory fields");
      return;
    }
    const token = localStorage.getItem("token") || undefined;
    try {
      setLoading(true);
      const formData = new FormData();

      Object.entries(candidate).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      });
      if (resume) {
        formData.append("resume", resume);
      }
      const response = await apiAction({
        url: "http://localhost:8000/api/candidate",
        method: "POST",
        token: token,
        body: formData,
        cType: "multipart/form-data",
      });
      if (response) {
        showNotification("Success! The candidate has been added.", "success");
      }
    } catch (error: any) {
      showNotification(error.response.data, "error");
      console.error("Error creating candidate data:", error);
    }
    setLoading(false);
    setCandidate({
      name: "",
      email: "",
      ph_no: "",
      current_company: "",
      YOE: "",
      RYOE: "",
      notice_period: "",
      cur_location: "",
      pref_location: "",
      current_ctc: "",
      expected_ctc: "",
      lwd: new Date(),
      opening: 0,
      vendor_id: 0,
    });
  };

  const fetchVendor = async () => {
    const token = localStorage.getItem("token") || undefined;
    try {
      const data: [] = await apiAction({
        url: "http://localhost:8000/api/vendor",
        method: "GET",
        token: token,
      });
      setVendorList([...data]);
    } catch (error) {
      console.error("Error fetching vendor data:", error);
    }
    setLoading(false);
  };

  const fetchOpenings = async () => {
    const token = localStorage.getItem("token") || undefined;
    try {
      const data: [] = await apiAction({
        url: "http://localhost:8000/api/opening",
        method: "GET",
        token: token,
      });
      let filterderData = data.filter((elem: any) => elem.isActive);
      setOpeningList([...filterderData]);
    } catch (error) {
      console.error("Error fetching vendor data:", error);
    }
    setLoading(false);
  };

  const uploadData = async () => {
    const token = localStorage.getItem("token") || undefined;
    try {
      setLoading(true);
      const formData = new FormData();
      if (candidateData) {
        formData.append("resume", candidateData);
      }
      const response = await apiAction({
        url: "http://localhost:8000/api/upload/candidate",
        method: "POST",
        token: token,
        body: formData,
        cType: "multipart/form-data",
      });
      if (response) {
        showNotification("Success! The candidate has been added.", "success");
      }
    } catch (error: any) {
      showNotification(error.response.data, "error");
      console.error("Error creating candidate data:", error);
    }
    setLoading(false);
  };

  return loading ? (
    <Loader />
  ) : (
    <div>
      <DefaultLayout>
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
          />
        )}
        <Breadcrumb pageName="Add Candidate" />
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  New Candidate
                </h3>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="p-2">
                  <div className="flex flex-col place-items-center gap-6 p-6.5 xl:flex-row">
                    <div className="xl:w-1/9 w-full">
                      <div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                          Upload File
                        </label>
                        <input
                          type="file"
                          onChange={handleUploadData}
                          className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className="w-full self-end xl:w-1/4">
                      <div className="">
                        <button
                          onClick={uploadData}
                          className="mb-1 flex w-max justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                        >
                          <span className="pe-2">Upload</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-b border-t border-stroke px-6.5 py-4 dark:border-strokedark">
                  <h3 className="text-center font-medium text-black dark:text-white">
                    OR
                  </h3>
                </div>

                <div className="p-6.5">
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <SelectGroupOne
                        title="Opening"
                        options={openingList}
                        displayName="name"
                        required
                        setSelectedValue={setSelectedOpening}
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Name <span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="text"
                        onChange={handleChange}
                        required
                        placeholder="Enter full name"
                        id="name"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <div className="mb-4.5">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                          Email <span className="text-meta-1">*</span>
                        </label>
                        <input
                          type="email"
                          onChange={handleChange}
                          required
                          placeholder="Enter email address"
                          id="email"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Phone <span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="text"
                        onChange={handleChange}
                        required
                        placeholder="Enter phone number"
                        id="ph_no"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <SelectGroupOne
                        title="Vendor"
                        options={vendorList}
                        displayName="name"
                        required
                        setSelectedValue={setSelectedVendor}
                      />
                    </div>
                    <div className="w-full xl:w-1/2">
                      <div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                          Upload Resume
                        </label>
                        <input
                          type="file"
                          onChange={handleFileChange}
                          id="resume"
                          className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Current Company <span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="text"
                        onChange={handleChange}
                        required
                        placeholder="Enter Current Company"
                        id="current_company"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Notice Period <span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="text"
                        onChange={handleChange}
                        required
                        placeholder="Enter Notice Period"
                        id="notice_period"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="mt-2 w-full xl:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Served NP? <span className="text-meta-1">*</span>
                      </label>
                      <SwitcherThree setValue={setIsServedNP} />
                    </div>
                    <div className="w-full xl:w-1/2">
                      <DatePickerOne
                        name="LWD"
                        setValue={setSelectedLWD}
                        isDisabled={isServedNP}
                      />
                    </div>
                  </div>
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Years of Experience{" "}
                        <span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="text"
                        onChange={handleChange}
                        required
                        placeholder="Enter Years of Experience"
                        id="YOE"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Relevent Years of Experience{" "}
                        <span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="text"
                        onChange={handleChange}
                        required
                        placeholder="Enter Relevent Years of Experience"
                        id="RYOE"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Current Location <span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="text"
                        onChange={handleChange}
                        required
                        placeholder="Enter Current Location"
                        id="cur_location"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Preferred Location{" "}
                        <span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="text"
                        onChange={handleChange}
                        required
                        placeholder="Enter Relevent Years of Experience"
                        id="pref_location"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        CTC <span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="text"
                        onChange={handleChange}
                        required
                        placeholder="Enter Current Location"
                        id="current_ctc"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        ECTC <span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="text"
                        onChange={handleChange}
                        required
                        placeholder="Enter Relevent Years of Experience"
                        id="expected_ctc"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
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
    </div>
  );
};

export default AddCandidate;
