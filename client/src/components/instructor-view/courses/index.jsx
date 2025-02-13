import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Delete, Edit } from "lucide-react";
import React from "react";

const InstructorCourses = () => {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between flex-row">
        <CardTitle className="text-3xl font-bold">All Courses</CardTitle>
        <Button>Add New Course</Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  React Js full course 2025
                </TableCell>
                <TableCell>25</TableCell>
                <TableCell>234234</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost">
                    <Edit className="w-6 h-6" />
                  </Button>
                  <Button variant="ghost">
                    <Delete className="w-6 h-6" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default InstructorCourses;
