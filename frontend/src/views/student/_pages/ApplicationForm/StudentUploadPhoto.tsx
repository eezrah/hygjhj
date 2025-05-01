import React, { useState } from "react";
import { UserRoundPen, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StudentUploadPhoto: React.FC = () => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const navigate = useNavigate();

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setPhoto(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoURL(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
    setPhotoURL(null);
  };

  return (
    <div className="flex h-screen bg-white">
      <main className="flex-1 overflow-y-auto">
        <ProgressTracker />

        <div className="px-10 pt-4">
          <h2 className="text-xl font-bold text-blue-700 mb-4">
            Application Form
          </h2>

          <div className="mb-6">
            <div className="flex items-center mb-3">
              <div className="flex items-center justify-center w-6 h-6 bg-white border-2 border-blue-600 text-blue-700 text-sm rounded-full">
                <span>2</span>
              </div>
              <span className="ml-2 font-semibold text-blue-700">
                Upload a Photo
              </span>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 border border-gray-300 rounded-md px-6 py-5 bg-white">
                <h3 className="text-md font-semibold text-blue-500 mb-3">
                  Photo Specifications
                </h3>
                <ul className="text-sm text-gray-600 space-y-1 leading-6">
                  <li>
                    <span className="text-blue-600 font-semibold">Size:</span> 2
                    x 2 inches (51 x 51 mm) or 600 x 600 pixels
                  </li>
                  <li>
                    <span className="text-blue-600 font-semibold">Format:</span>{" "}
                    JPEG (.jpg)
                  </li>
                  <li>
                    <span className="text-blue-600 font-semibold">
                      File Size:
                    </span>{" "}
                    Must not exceed 1MB
                  </li>
                  <li>
                    <span className="text-blue-600 font-semibold">Color:</span>{" "}
                    Full color, with a plain light-colored background
                  </li>
                  <li>
                    <span className="text-blue-600 font-semibold">
                      Face View:
                    </span>{" "}
                    Full-face view, directly facing the camera
                  </li>
                  <li>
                    <span className="text-blue-600 font-semibold">
                      Facial Visibility:
                    </span>
                    <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                      <li>No eyeglasses or contact lenses</li>
                      <li>
                        No hats, head coverings, or accessories that obscure the
                        face
                      </li>
                      <li>No filters or photo effects</li>
                    </ul>
                  </li>
                  <li>
                    <span className="text-blue-600 font-semibold">
                      Photo Type:
                    </span>{" "}
                    Individual photo only (no group photos)
                  </li>
                </ul>
              </div>

              <div className="flex flex-col items-center">
                <div className="py-2 px-4 flex flex-col items-center justify-center w-full">
                  <div
                    style={{ width: "2in", height: "2in" }}
                    className="border border-blue-500 rounded-md flex items-center justify-center mb-4 relative overflow-hidden mt-3"
                  >
                    {photoURL ? (
                      <>
                        <img
                          src={photoURL}
                          alt="Uploaded"
                          className="w-full h-full object-contain"
                        />
                        <button
                          onClick={handleRemovePhoto}
                          className="absolute top-0 right-0 bg-white border border-gray-300 rounded-full p-1 text-xs hover:bg-red-500 hover:text-white transition"
                          aria-label="Remove Photo"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </>
                    ) : (
                      <>
                        <UserRoundPen
                          className="h-22 w-22 text-gray-400 -mt-5"
                          style={{ strokeWidth: 1 }}
                        />
                        <label
                          htmlFor="photo-upload"
                          className="absolute text-blue-600 underline cursor-pointer mt-2 mb-2 text-sm"
                          style={{ bottom: "8px" }}
                        >
                          Upload Photo
                        </label>
                      </>
                    )}
                  </div>

                  <input
                    type="file"
                    accept="image/jpeg, image/jpg"
                    className="hidden"
                    id="photo-upload"
                    onChange={handlePhotoChange}
                  />
                </div>

                <div className="w-full mt-12 flex justify-center space-x-5">
                  <button
                    onClick={() => navigate("/student/studentpersonaldata")}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => navigate("/student/studentinformation")}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                  >
                    Next Page
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const ProgressTracker: React.FC = () => {
  const steps = [
    { step: 1, label: "Details and Eligibility", isActive: true },
    { step: 2, label: "Application Form", isActive: true },
    { step: 3, label: "Requirements", isActive: false },
    { step: 4, label: "Application Status", isActive: false },
  ];

  return (
    <div className="flex items-center justify-center space-x-12 mb-4 py-6 px-8">
      {steps.map((step, index) => (
        <div key={step.step} className="flex flex-col items-center relative">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full border-2 font-semibold text-sm ${
              step.isActive
                ? "bg-blue-600 text-white border-blue-600"
                : "text-blue-600 border-blue-600"
            }`}
          >
            {step.step}
          </div>
          <span className="text-xs text-blue-600 mt-2">{step.label}</span>
          {index < steps.length - 1 && (
            <div
              className="absolute top-5 left-full w-28 h-px bg-gray-300"
              style={{ marginLeft: "-10px" }}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StudentUploadPhoto;
