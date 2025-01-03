"use client";
import React, { ReactNode } from "react";

interface CardDataStatsProps {
  title: string;
  total: string;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  children,
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-6 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-end justify-around">
        <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
          {children}
        </div>
        <div className="">
          <div>
            <h4 className="text-title-xl font-bold text-black dark:text-white">
              {total}
            </h4>
          </div>
        </div>
      </div>
      <div className="ms-3 mt-4">
        <span className={`items-center gap-1 text-xl font-medium `}>
          {title}
        </span>
      </div>
    </div>
  );
};

export default CardDataStats;
