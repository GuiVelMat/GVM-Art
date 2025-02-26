
"use client"

import Image from "next/image"
import { X } from "lucide-react"
import { useFileManagement } from "@/hooks/useFileManagement"
import { useToast } from "@/hooks/use-toast"
import React, { useEffect, useRef } from "react"

interface FileUploadProps {
  onFileChange: (file: File) => void;
}

export default function FileUpload({ onFileChange }: FileUploadProps) {
  const { files, setFiles, getRootProps, getInputProps, isDragActive, removeFile } = useFileManagement()
  const { toast } = useToast()
  const prevFileNameRef = useRef<string | null>(null);

  useEffect(() => {
    if (files.length > 0) {
      const file = files[0];
      const fileName = file.name;
      if (fileName !== prevFileNameRef.current) {
        onFileChange(file);
        prevFileNameRef.current = fileName;
      }
    }
  }, [files, onFileChange]);

  return (
    <div className="mt-10">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-8 text-center cursor-pointer ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop image here...</p>
        ) : (
          <p>Drag and drop images here, or click to select images</p>
        )}
      </div>
      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Images selected:</h3>
          <div className="grid grid-cols-3 gap-4">
            {files.map((file) => (
              <div key={file.name} className="relative group">
                <Image
                  src={file.preview || "/placeholder.svg"}
                  alt={file.name}
                  width={200}
                  height={200}
                  className="object-cover rounded"
                  onLoad={() => {
                    URL.revokeObjectURL(file.preview)
                  }}
                />
                <button
                  onClick={() => removeFile(file)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Eliminar imagen"
                >
                  <X size={16} />
                </button>
                <p className="text-sm mt-1 truncate">{file.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

