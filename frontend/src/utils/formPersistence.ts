import { useState, useEffect } from "react";

type FormValue = string | undefined;

type FormData = {
  [key: string]: FormValue;
};

export const useFormPersistence = <T extends FormData>(
  formKey: string,
  initialData: T
) => {
  // Initialize state with data from localStorage or initialData
  const [formData, setFormData] = useState<T>(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem(formKey);
      return savedData ? JSON.parse(savedData) : initialData;
    }
    return initialData;
  });

  // Save to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem(formKey, JSON.stringify(formData));
  }, [formData, formKey]);

  // Function to update form data
  const updateFormData = (newData: Partial<T>) => {
    setFormData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  return {
    formData,
    updateFormData,
  };
};
