import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { filterOptions } from "@/config";
import React from "react";

const StudentViewCoursePage = () => {
  return (
    <div className="mx-auto p-6">
      <h1 className="font-extrabold text-3xl mb-4">All Courses</h1>
      <div className="flex flex-col lg:flex-row">
        <aside className="w-full lg:w-72 space-y-4">
          <div className="space-y-4">
            {Object.keys(filterOptions).map((filterItem) => (
              <div className="space-y-4">
                <h1 className="font-bold">{filterItem.toUpperCase()}</h1>
                <div className="grid gap-2 mt-2">
                  {filterOptions[filterItem].map((option) => (
                    <Label className="flex items-center gap-3">
                      <Checkbox />
                      {option.label}
                    </Label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default StudentViewCoursePage;
