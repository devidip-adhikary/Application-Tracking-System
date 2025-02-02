"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
import { User } from "@/types/user";
import { apiAction } from "@/utils/apiAction";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";
import Loader from "@/components/common/Loader";

const roleList = [
  {
    id: "admin",
    value: "Admin",
  },
  {
    id: "supervisor",
    value: "Supervisor",
  },
  {
    id: "viewer",
    value: "Viewer",
  },
];

const UserById: React.FC = () => {
  const [user, setUser] = useState<User>({
    id: null,
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [updatedUser, setUpdatedUser] = useState<any>();
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  let currentUser: Record<string, any> = {};

  if (typeof window !== "undefined") {
    currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  }

  useEffect(() => {
    fetchUserById();
  }, [params]);

  useEffect(() => {
    setUpdatedUser((prevState: any) => ({
      ...prevState,
      role: selectedRole,
    }));
  }, [selectedRole]);

  const fetchUserById = async () => {
    const { id } = params;
    let token;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token") || undefined;
    }
    try {
      const response: User = await apiAction({
        url: `/api/users/${id}`,
        method: "GET",
        token: token,
      });
      setUser(response);
      setUpdatedUser({ id: response.id });
      setSelectedRole(response["role"]);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUpdatedUser((prevState: any) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let token;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token") || undefined;
    }
    try {
      const response = await apiAction({
        url: "/api/users",
        method: "PUT",
        token: token,
        body: JSON.stringify(updatedUser),
      });
      if (response) {
        router.push("/user");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
    setLoading(false);
  };

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      {mode === "edit" && currentUser?.userRole === "viewer" ? (
        <>
          <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
            <p className="mt-1 text-center text-xl text-red-500">
              OOPS!! Sorry you do not have the permission
            </p>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  {user.name}
                </h3>
              </div>
              <form action="#">
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
                        defaultValue={user.name}
                        onChange={handleChange}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Email <span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="Enter email id"
                        id="email"
                        defaultValue={user.email}
                        onChange={handleChange}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Password <span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="password"
                        placeholder="Enter password"
                        id="password"
                        defaultValue={user.password}
                        onChange={handleChange}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full xl:w-1/2">
                      <SelectGroupOne
                        title="Role"
                        options={roleList}
                        setSelectedValue={setSelectedRole}
                        selectedValue={selectedRole}
                        required
                      />
                    </div>
                  </div>

                  <span className="float-right">
                    <button
                      onClick={handleSubmit}
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
      )}
    </DefaultLayout>
  );
};

export default UserById;
