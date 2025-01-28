import DropdownDefault from "../Dropdowns/DropdownDefault";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HeaderContext } from "../Layouts/DefaultLayout";

const TableFour = ({
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
                <p className="text-black dark:text-white">{client.name}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className={client.isActive ? "text-meta-5" : "text-meta-1"}>
                  {client.isActive ? "Active" : "Closed"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableFour;
