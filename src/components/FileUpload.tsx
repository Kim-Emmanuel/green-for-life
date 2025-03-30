"use client";

import { useState, useRef, useCallback, DragEvent } from "react";
import Image from "next/image";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Loader2, Upload, X, File } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "./ui/dialog";
import { DialogTitle } from "./ui/dialog";

interface FileUploadProps {
  label?: string;
  value?: string;
  onChange: (url: string) => void;
  accept?: string;
  maxSize?: number;
  variant?: "image" | "file";
  preview?: boolean;
  className?: string;
}

const supportedFormats = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/svg+xml',
  'application/pdf',
  'text/csv'
];

export function FileUpload({
  label,
  value,
  onChange,
  accept = "image/*",
  maxSize = 5 * 1024 * 1024, // 5MB default
  variant = "image",
  preview = false,
  className = "",
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleFileChange = async (file: File) => {
    if (!file) return;

    // Validate file size
    if (file.size > maxSize) {
      setError(`File size exceeds ${maxSize / 1024 / 1024}MB limit`);
      return;
    }

    // Validate file type
    if (!supportedFormats.some(format => file.type === format)) {
      setError(`Invalid file type. Supported formats: ${supportedFormats.map(f => f.split('/')[1]).join(', ')}`);
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");
      
      const data = await response.json();
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileChange(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileChange(file);
  };

  const handleRemove = () => {
    onChange("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const formatSize = useCallback((bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }, []);

  return (
    <div className="space-y-4">
      {label && <Label className="text-sm font-medium text-gray-700">{label}</Label>}
      
      <div 
        className={cn(
          "group relative border-2 border-dashed rounded-xl transition-all cursor-pointer",
          isDragging ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-green-400",
          error && "border-red-500 bg-red-50",
          className
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <Input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
          disabled={isUploading}
        />

        {!value && (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="p-4 bg-green-100 rounded-full mb-4 transition-all group-hover:bg-green-200">
              <Upload className="w-6 h-6 text-green-600" />
            </div>
            <div className="space-y-1">
              <p className="font-medium text-gray-700">
                Drag and drop or <span className="text-green-600">browse files</span>
              </p>
              <p className="text-sm text-gray-500">
                Supported formats: {supportedFormats.map(f => f.split('/')[1]).join(', ')}
              </p>
              <p className="text-sm text-gray-500">
                Max size: {formatSize(maxSize)}
              </p>
            </div>
          </div>
        )}

        {isUploading && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
            <p className="text-sm text-gray-600">Uploading...</p>
          </div>
        )}

        {value && (
          <div className="relative p-4">
            {preview && variant === "image" ? (
              <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-gray-50 shadow-sm">
                <Image
                  src={value}
                  alt="Preview"
                  fill
                  className="object-cover cursor-zoom-in"
                  onClick={() => setShowPreview(true)}
                  onError={(e) => {
                    e.currentTarget.src = '/fallback-image.png';
                  }}
                />
                <button
                  type="button"
                  onClick={handleRemove}
                  className="absolute -top-2 -right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                >
                  <X className="w-5 h-5 text-red-600" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4 p-4 border rounded-lg bg-gray-50">
                <File className="w-8 h-8 text-gray-400" />
                <div className="flex-1">
                  <p className="font-medium text-gray-700 truncate">{value.split('/').pop()}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-green-600 hover:bg-green-50"
                      onClick={() => setShowPreview(true)}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      View File
                    </Button>
                    <button
                      type="button"
                      onClick={handleRemove}
                      className="text-sm text-red-600 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded-md"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none shadow-none">
          <DialogTitle className="sr-only">File Preview</DialogTitle>
          <div className="relative w-full h-[80vh] flex items-center justify-center">
            <Image
              src={value || ''}
              alt="Fullscreen Preview"
              fill
              className="object-contain"
              unoptimized={true}
              onError={(e) => {
                e.currentTarget.src = '/fallback-image.png';
              }}
            />
            <button
              type="button"
              onClick={() => setShowPreview(false)}
              className="absolute top-4 right-4 p-2 bg-white/80 rounded-full backdrop-blur-sm hover:bg-white transition-colors"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm">
          <X className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}