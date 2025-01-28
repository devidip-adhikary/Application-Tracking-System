import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { HeaderContext } from "../Layouts/DefaultLayout";

const TableOne = ({
  tableName = "",
  data = [],
  headerData = [],
  deleteFunc = () => {},
}: any) => {
  const [tableData, setTableData] = useState<any[]>();
  const [tableHeader, setTableHeader] = useState<any[]>();
  const router = useRouter();
  const contextData = useContext(HeaderContext);
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

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
  }, [contextData]);

  const handleNavigation = (id: number, mode: string) => {
    router.push(`/user/${id}?mode=${mode}`);
  };
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        {tableName}
      </h4>

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
            <div className={`break-words p-2.5 text-center xl:p-5`} key={index}>
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                {item.id
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (char: any) => char.toUpperCase())}
              </h5>
            </div>
          ))}
        </div>

        {tableData?.map((vendor, key) => (
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
              <p className="text-black dark:text-white">{vendor.name}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{vendor.email}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{vendor.spoc}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{vendor.ph_no}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className={vendor.isActive ? "text-meta-5" : "text-meta-1"}>
                {vendor.isActive ? "Active" : "Closed"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
