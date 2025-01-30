import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HeaderContext } from "../Layouts/DefaultLayout";
import Loader from "../common/Loader";

const TableFour = ({
  tableName = "",
  data = [],
  headerData = [],
  handleSubmit = () => {},
  removeClient = () => {},
  handleUpdate = () => {},
  deleteFunc = () => {},
}: any) => {
  const [tableData, setTableData] = useState<any[]>();
  const [tableHeader, setTableHeader] = useState<any[]>();
  const [name, setName] = useState<string>("");
  const router = useRouter();
  const contextData = useContext(HeaderContext);
  let currentUser: Record<string, any> = {};

  if (typeof window !== "undefined") {
    currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  }
  const [loading, setLoading] = useState<boolean>(false);
  const [mode, setMode] = useState<number>(-1);

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
    setLoading(true);
    if (contextData.searchItem.length) {
      const searchData: any = data?.filter((el: any) => {
        return Object.values(el).some((value) =>
          String(value)
            .toLocaleLowerCase()
            .includes(contextData.searchItem.toLocaleLowerCase()),
        );
      });
      setTableData(searchData);
    } else {
      setTableData(data);
    }
    setLoading(false);
  }, [contextData]);

  return loading ? (
    <Loader />
  ) : (
    <div className="col-span-12 xl:col-span-7">
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="mb-6 flex justify-between">
          <div>
            <h4 className="text-title-sm2 font-bold text-black dark:text-white">
              {tableName}
            </h4>
          </div>
        </div>

        <div
          className="flex flex-col"
          style={{
            gridTemplateColumns: `repeat(${tableHeader?.length}, minmax(150px, 1fr))`,
            overflow: "auto",
          }}
        >
          <div
            className={`grid border-b border-stroke py-4.5 dark:border-strokedark`}
            style={{
              gridTemplateColumns: `repeat(${tableHeader?.length}, minmax(150px, 1fr))`,
            }}
          >
            {tableHeader?.map((item: any, index: number) => (
              <div
                className={`break-words p-2.5 text-center xl:p-5`}
                key={index}
              >
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  {item.id
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (char: any) => char.toUpperCase())}
                </h5>
              </div>
            ))}
          </div>

          {tableData?.map((client, key) => (
            <div
              className={`grid text-center sm:grid-cols-5 ${
                key === tableData.length - 1
                  ? ""
                  : "border-b border-stroke dark:border-strokedark"
              }`}
              style={{
                gridTemplateColumns: `repeat(${tableHeader?.length}, minmax(150px, 1fr))`,
              }}
              key={key}
            >
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                {client.id === undefined || mode === key ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Enter full name"
                    id="name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                ) : (
                  <p className="text-black dark:text-white">{client.name}</p>
                )}
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className={client.isActive ? "text-meta-5" : "text-meta-1"}>
                  {client.isActive ? "Active" : "Closed"}
                </p>
              </div>

              <div className="flex items-center justify-evenly p-2.5 xl:p-5">
                {client.id === undefined || mode === key ? (
                  <>
                    <button
                      disabled={name.length === 0}
                      className="text-primary"
                      onClick={(e) =>
                        mode === key
                          ? handleUpdate({
                              id: client.id,
                              name: name,
                              isActive: true,
                            })
                          : handleSubmit(e, { name: name })
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="green"
                        className="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                    </button>
                    <button
                      className="text-primary"
                      onClick={() => removeClient(key)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="indianRed"
                        className="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="text-primary"
                      onClick={() => {
                        setMode(key);
                        setName(client.name);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill={client.isActive ? "currentColor" : "grey"}
                        className="size-5"
                      >
                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                        <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                      </svg>
                    </button>
                    <button
                      className="hover:text-primary"
                      onClick={() => deleteFunc(client.id)}
                    >
                      <svg
                        className=""
                        width="20"
                        height="20"
                        viewBox="0 0 18 18"
                        fill={client.isActive ? "indianRed" : "grey"}
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
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableFour;
