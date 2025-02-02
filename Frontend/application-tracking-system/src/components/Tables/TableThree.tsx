"use client";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { HeaderContext } from "../Layouts/DefaultLayout";
import { apiAction } from "@/utils/apiAction";
import Loader from "../common/Loader";

const TableThree = ({
  tableName = "",
  data = [],
  headerData = [],
  deleteFunc = () => {},
  defaultFunc = () => {},
}: any) => {
  const [tableData, setTableData] = useState<[]>();
  const [tableHeader, setTableHeader] = useState<[]>();
  const [status, setStatus] = useState<any[]>();
  const [isMounted, setIsMounted] = useState(false);
  const contextData = useContext(HeaderContext);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<any>(null);
  let currentUser: Record<string, any> = {};

  if (typeof window !== "undefined") {
    currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  }

  const showNotification = (message: string, type: string) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  useEffect(() => {
    if (data.length && headerData.length) {
      setTableData(data);
      setTableHeader(headerData);
    }
  }, [data, headerData]);

  useEffect(() => {
    if (data.length && headerData.length) {
      let tempHeader = headerData;
      if (currentUser.userRole === "viewer") {
        tempHeader.pop();
      }
      setTableData(data);
      setTableHeader(tempHeader);
    }
  }, [data, headerData]);

  useEffect(() => {
    fetchStatus();
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setLoading(true);
    if (contextData.searchItem.length) {
      const searchTerm = contextData.searchItem?.toLowerCase();
      const containsSearchQuery = (value: any) => {
        if (value && typeof value === "object") {
          return Object.values(value).some(containsSearchQuery);
        }
        return String(value)?.toLowerCase().includes(searchTerm);
      };
      const filteredData = data.filter((row: any) => {
        return Object.values(row).some((value) => containsSearchQuery(value));
      });
      console.log("Filtered Data:", filteredData);
      setTableData(filteredData);
    } else {
      setTableData(data);
    }
    setLoading(false);
  }, [contextData]);

  const router = useRouter();
  const handleNavigation = (id: number, mode: string) => {
    router.push(`/candidate/${id}?mode=${mode}`);
  };

  const getNestedValue = (obj: any, path: any) => {
    const element = path
      .split(/\.|\[|\]/)
      .filter(Boolean)
      .reduce((acc: any, part: any) => acc?.[part] || false, obj);

    if (element?.name) return element.name;
    if (typeof element === "boolean") return element ? "Active" : "Closed";
    return element ? element.toString() : "-";
  };

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
    openingId: string,
  ) => {
    let token;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token") || undefined;
    }
    const userObject: any = {};
    userObject["status"] = e.target?.value;
    userObject["id"] = id;
    userObject["opening_id"] = openingId;
    try {
      setLoading(true);
      const formData = new FormData();

      Object.entries(userObject).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      });
      const response = await apiAction({
        url: "/api/candidate",
        method: "PUT",
        token: token,
        body: formData,
        cType: "multipart/form-data",
      });
      if (response) {
        showNotification("Success! The candidate has been added.", "success");
        defaultFunc();
      }
    } catch (error: any) {
      showNotification(error.response.data, "error");
      console.error("Error creating candidate data:", error);
    }
    setLoading(false);
  };

  const fetchStatus = async () => {
    let token;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token") || undefined;
    }
    try {
      const data: any[] = await apiAction({
        url: "/api/data/status",
        method: "GET",
        token: token,
      });
      setStatus([...data]);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  if (!isMounted) return null;

  return loading ? (
    <Loader />
  ) : (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          {tableName}
        </h4>
      </div>
      <div className="max-w-full overflow-x-auto border border-gray-400">
        <table className="w-full table-auto border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              {tableHeader?.map((item: any, index: number) => (
                <th
                  className={`min-w-[180px] border border-gray-300 px-4 py-4 font-medium text-black dark:text-white xl:pl-11 ${
                    index === 0
                      ? "sticky-left" // First column
                      : index === tableHeader.length - 1
                        ? "sticky-right" // Last column
                        : ""
                  }`}
                  key={index}
                >
                  {item.id
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (char: string) => char.toUpperCase())}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData?.map((elem: any, index: number) => (
              <tr key={index}>
                {tableHeader?.map((item: any, ind: number) => (
                  <td
                    className={`border border-b border-[#eee] border-gray-300 px-4 py-5 dark:border-strokedark  ${elem.candidate ? (!elem.candidate.isActive ? "bg-red-300" : "") : !elem.isActive ? "bg-red-300" : ""} ${
                      ind === 0
                        ? "sticky-left" // First column
                        : ind === tableHeader.length - 1
                          ? "sticky-right" // Last column
                          : ""
                    }`}
                    key={index + ind}
                  >
                    {item?.id !== "Action" ? (
                      item?.id !== "Status" ? (
                        <p className="text-sm">
                          {getNestedValue(elem, item.value) || "-"}
                        </p>
                      ) : (
                        <>
                          <div className="relative z-20 bg-white dark:bg-form-input">
                            <select
                              disabled={!elem.isActive}
                              value={elem.status}
                              onChange={(e: any) =>
                                handleChange(
                                  e,
                                  elem.id,
                                  elem.opening_vs_candidates[0].id,
                                )
                              }
                              className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                            >
                              {status?.map((data: any, i: number) => (
                                <option
                                  key={i}
                                  value={data.id}
                                  className="text-body dark:text-bodydark"
                                >
                                  {data.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </>
                      )
                    ) : (
                      <>
                        <div className="flex items-center justify-around">
                          <button
                            className="hover:text-primary"
                            onClick={() => handleNavigation(elem?.id, "view")}
                          >
                            <svg
                              className=""
                              width="20"
                              height="20"
                              viewBox="0 0 18 18"
                              fill="coral"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                                fill=""
                              />
                              <path
                                d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                                fill=""
                              />
                            </svg>
                          </button>
                          {currentUser.userRole !== "viewer" ? (
                            <>
                              <button
                                disabled={!elem.isActive}
                                className="pe-2 hover:text-primary"
                                onClick={() => deleteFunc(elem.id)}
                              >
                                <svg
                                  className=""
                                  width="20"
                                  height="20"
                                  viewBox="0 0 18 18"
                                  fill={elem.isActive ? "indianRed" : "grey"}
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                                    fill=""
                                  />
                                  <path
                                    d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                                    fill=""
                                  />
                                  <path
                                    d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                                    fill=""
                                  />
                                  <path
                                    d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                                    fill=""
                                  />
                                </svg>
                              </button>
                              <button
                                disabled={!elem.isActive}
                                className="text-primary"
                                onClick={() =>
                                  handleNavigation(elem.id, "edit")
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill={elem.isActive ? "currentColor" : "grey"}
                                  className="size-5"
                                >
                                  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                  <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                </svg>
                              </button>
                            </>
                          ) : null}
                        </div>
                      </>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;
