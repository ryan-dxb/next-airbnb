"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryBoxProps {
  label: string;
  description?: string;
  icon: IconType;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  label,
  description,
  icon: Icon,
  selected = false,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {}; // empty query
    if (params) {
      currentQuery = qs.parse(params.toString()); // check if there is a query
    }

    const updatedQuery: any = {
      // update the query with the new category
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") === label) {
      // if the category is already selected, remove it from the query
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      // stringify the query
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url); // push the new query to the router
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer
    ${
      selected
        ? "border-b-neutral-800 text-neutral-800"
        : "border-b-transparent text-neutral-500"
    }
  `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
