"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
import { User } from "@/types/user";
import { apiAction } from "@/utils/apiAction";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/common/Loader";
import Notification from "@/components/common/Notification";

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

const AddUser: React.FC = () => {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [selectedRole, setSelectedRole] = useState<string>("");
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

  const router = useRouter();

  useEffect(() => {
    setUser((prevState) => ({
      ...prevState,
      role: selectedRole,
    }));
  }, [selectedRole]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user.role === "") {
      setError(true);
      return;
    }
    const token = localStorage.getItem("token") || undefined;
    try {
      setLoading(true);
      const response = await apiAction({
        url: "http://localhost:8000/api/users",
        method: "POST",
        token: token,
        body: JSON.stringify(user),
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
    setUser({
      name: "",
      email: "",
      password: "",
      role: "",
    });
  };

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <Breadcrumb pageName="Add User" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                New User
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
                      required
                      id="name"
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
                      required
                      id="email"
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
                      required
                      id="password"
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <SelectGroupOne
                      title="Role"
                      options={roleList}
                      setSelectedValue={setSelectedRole}
                      displayName="value"
                      required
                    />
                    {error && (
                      <p className="mt-1 text-sm text-red-500">
                        Please select a role
                      </p>
                    )}
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
  );
};

export default AddUser;
