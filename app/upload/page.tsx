"use client";

import { CldUploadWidget, CldImage } from "next-cloudinary";
import { useState } from "react";

interface CloudinaryUploadResult {
  public_id: string;
}

const UploadButton = () => {
  const [publicId, setPublicId] = useState("");

  const handleSuccess = (result: any) => {
    const info = result.info as CloudinaryUploadResult;
    if (result.event !== "success") return;

    setPublicId(info.public_id);
  };

  return (
    <>
      <CldUploadWidget
        uploadPreset="t5iqad70"
        onSuccess={(result) => handleSuccess(result)}
        options={{
          sources: ["local", "camera"],
          multiple: true,
          maxFiles: 5,
        }}
      >
        {({ open }) => {
          return (
            <button className="btn btn-primary" onClick={() => open()}>
              Upload an Image
            </button>
          );
        }}
      </CldUploadWidget>

      {publicId && (
        <CldImage
          src={publicId}
          height={270}
          width={180}
          alt="uploaded Image"
        />
      )}
    </>
  );
};

export default UploadButton;
