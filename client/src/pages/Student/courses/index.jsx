import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { filterOptions, sortOptions } from "@/config";
import { StudentContext } from "@/context/student-context";
import { studentViewGetAllCourseService } from "@/services";
import { ArrowUpDownIcon } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  return queryParams.join("&");
}

const StudentViewCoursePage = () => {
  const { studentCourseList, setStudentCourseList, loading, setLoading } =
    useContext(StudentContext);
  const [sort, setSort] = useState("price-lowtohigh");
  const [filters, setFilters] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchAllCourses = async (filters, sort) => {
    const query = new URLSearchParams({ ...filters, sortBy: sort });
    const response = await studentViewGetAllCourseService(query);
    if (response?.success) {
      setStudentCourseList(response?.data);
      setLoading(false);
    }
  };

  const handleFilterOnChange = (getSection, getCurrentOption) => {
    let copyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(copyFilters).indexOf(getSection);
    console.log(indexOfCurrentSection, "indez");

    if (indexOfCurrentSection === -1) {
      copyFilters = { ...copyFilters, [getSection]: [getCurrentOption.id] };
    } else {
      const indexOfCurrentOption = copyFilters[getSection].indexOf(
        getCurrentOption.id
      );
      if (indexOfCurrentOption === -1) {
        copyFilters[getSection].push(getCurrentOption.id);
      } else {
        copyFilters[getSection].splice(indexOfCurrentOption, 1);
      }
    }
    setFilters(copyFilters);
    sessionStorage.setItem("filters", JSON.stringify(copyFilters));
  };
  useEffect(() => {
    const buildQueryStringForFilters = createSearchParamsHelper(filters);
    setSearchParams(new URLSearchParams(buildQueryStringForFilters));
  }, [filters]);

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  useEffect(() => {
    if (filters !== null && sort !== null) fetchAllCourses(filters, sort);
  }, [filters, sort]);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem("filters");
    };
  }, []);
  console.log(filters, sort, "filters and sort");
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
                      <Checkbox
                        checked={
                          filters &&
                          Object.keys(filters).length > 0 &&
                          filters[filterItem] &&
                          filters[filterItem].indexOf(option.id) > -1
                        }
                        onCheckedChange={() =>
                          handleFilterOnChange(filterItem, option)
                        }
                      />
                      {option.label}
                    </Label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
        <main className="flex-1">
          <div className="flex justify-end items-center gap-3 mb-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <ArrowUpDownIcon />
                  Sort by
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px]">
                <DropdownMenuRadioGroup
                  value={sort}
                  onValueChange={(value) => setSort(value)}
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
          <div className="grid gap-4">
            {studentCourseList && studentCourseList.length > 0 ? (
              studentCourseList.map((course) => (
                <Card key={course?._id} className="pt-4">
                  <CardContent className="flex gap-4">
                    <div className="w-48 h-32">
                      <img src={course?.image} className="w-full h-full" />
                    </div>
                    <div className="space-y-2">
                      <h1 className="font-bold text-xl">{course?.title}</h1>
                      <p>
                        Created By{" "}
                        <span className="font-bold">
                          {course?.instructorName}
                        </span>
                      </p>
                      <p>
                        {course?.curriculum.length}{" "}
                        {course?.curriculum.length > 1 ? "Lectures" : "Lecture"}{" "}
                        - {course?.level.toUpperCase()} level
                      </p>
                      <p className="font-bold">Rs. {course?.pricing}</p>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : loading ? (
              <Skeleton />
            ) : (
              <h1>No courses found</h1>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentViewCoursePage;
