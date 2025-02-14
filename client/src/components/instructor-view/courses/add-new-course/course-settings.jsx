import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const CourseSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Label>Upload Course Image</Label>
          <Input type="file" accept="image/*" className="mt-4 cursor-pointer" />
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseSettings;
