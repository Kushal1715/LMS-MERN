import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { filterOptions, sortOptions } from "@/config";
import { ArrowUpDownIcon } from "lucide-react";
import React from "react";

const StudentViewCoursePage = () => {
  return (
    <div className="mx-auto p-6">
      <h1 className="font-extrabold text-3xl mb-4">All Courses</h1>
      <div className="flex flex-col lg:flex-row">
        <aside className="w-full lg:w-72 space-y-4">
          <div className="space-y-4">
            {Object.keys(filterOptions).map((filterItem) => (
              <div className="space-y-4" key={filterItem}>
                <h1 className="font-bold">{filterItem.toUpperCase()}</h1>
                <div className="grid gap-2 mt-2">
                  {filterOptions[filterItem].map((option) => (
                    <Label
                      className="flex items-center gap-3"
                      key={option.label}
                    >
                      <Checkbox />
                      {option.label}
                    </Label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
        <main className="flex-1">
          <div className="flex justify-end items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <ArrowUpDownIcon />
                  Sort by
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px]">
                <DropdownMenuRadioGroup
                //   value={sort}
                //   onValueChange={(value) => setSort(value)}
                >
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="font-bold">10 Results</span>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentViewCoursePage;
