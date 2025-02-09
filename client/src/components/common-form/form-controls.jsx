import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

const FormControls = ({ formControls, formData, setFormData }) => {
  const handleFormControl = (currentFormControl) => {
    let element = null;
    const value = formData[currentFormControl.name] || "";

    switch (currentFormControl.componentType) {
      case "input":
        element = (
          <Input
            id={currentFormControl.name}
            name={currentFormControl.name}
            placeholder={currentFormControl.placeholder}
            type={currentFormControl.type}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [currentFormControl.name]: e.target.value,
              })
            }
          />
        );
        break;
      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [currentFormControl.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger>
              <SelectValue placeholder={currentFormControl.label} />
            </SelectTrigger>
            <SelectContent>
              {currentFormControl.options &&
              currentFormControl.options.length > 0
                ? currentFormControl.options.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
          <Textarea
            id={currentFormControl.name}
            name={currentFormControl.name}
            placeholder={currentFormControl.placeholder}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [currentFormControl.name]: e.target.value,
              })
            }
          />
        );
        break;

      default:
        break;
    }
    return element;
  };
  return (
    <div className="flex flex-col gap-3">
      {formControls && formControls.length > 0
        ? formControls.map((formControl) => (
            <div className="space-y-2" key={formControl.name}>
              <Label>{formControl.label}</Label>
              {handleFormControl(formControl)}
            </div>
          ))
        : null}
    </div>
  );
};

export default FormControls;
