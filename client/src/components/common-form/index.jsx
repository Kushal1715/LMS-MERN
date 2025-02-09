import React from "react";
import { Button } from "../ui/button";
import FormControls from "./form-controls";

const CommonForm = ({
  handleSubmit,
  buttonText,
  formControls,
  formData,
  setFormData,
}) => {
  return (
    <form onSubmit={handleSubmit} className="w-full">
      {/* form controls  */}
      <FormControls
        formControls={formControls}
        formData={formData}
        setFormData={setFormData}
      />
      <Button type="submit" className="mt-4 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonForm;
