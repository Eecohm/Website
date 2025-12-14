import React, { useEffect, useState } from "react";
import { Upload } from "lucide-react";
import styles from "@/features/admin/User/InfoModels/Forms/Components/FormComponents/GlassFileUpload/GlassFileUpload.module.css";

const GlassFileUpload = ({
  label,
  name,
  onChange,
  accept = "image/*",
  required = false,
  onValidate,
  validate,
  existingFileUrl = null, // URL of existing file in edit mode
  ...props
}) => {
  const [fileName, setFileName] = useState("");
  const [hasFile, setHasFile] = useState(false);
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState(existingFileUrl);

  // Update preview when existingFileUrl changes
  useEffect(() => {
    if (existingFileUrl) {
      setPreviewUrl(existingFileUrl);
      setHasFile(true);
      // Extract filename from URL
      const urlFileName = existingFileUrl.split('/').pop();
      setFileName(urlFileName || "Existing file");

      // If there's an existing file, mark as valid
      if (onValidate) {
        onValidate(name, true);
      }
    }
  }, [existingFileUrl, name, onValidate]);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setFileName(file.name);
      setHasFile(true);

      // Create preview URL for the new file
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl); // Clean up old blob URL
      }
      setPreviewUrl(URL.createObjectURL(file));

      // Call parent onChange first
      onChange(e);

      // Perform validation if validate function provided
      if (validate && onValidate) {
        console.log("✅ Running validation with function:", validate);
        try {
          const validationResult = await validate(file);
          console.log("📊 Validation result:", validationResult);
          if (validationResult.valid) {
            console.log("✅ Validation passed - clearing error");
            setError("");
            onValidate(name, true);
          } else {
            console.log(
              "❌ Validation failed - setting error:",
              validationResult.message
            );
            setError(validationResult.message);
            onValidate(name, false);
          }
        } catch (err) {
          console.log("💥 Validation threw error:", err);
          setError("Validation failed");
          onValidate(name, false);
        }
      } else if (onValidate) {
        console.log("❌ No validation function provided, skipping validation");
        // No validation function, just check if file exists
        setError("");
        onValidate(name, true);
      }
    } else {
      // No file selected
      setFileName("");
      setHasFile(false);
      setError("");
      setPreviewUrl(existingFileUrl); // Revert to existing file if any

      if (onValidate) {
        const isValid = !required || !!existingFileUrl; // Valid if not required or has existing file
        onValidate(name, isValid);
      }
    }
  };

  // Initial validation on mount
  useEffect(() => {
    if (onValidate) {
      // Initially invalid if required and no file
      onValidate(name, !required);
    }
  }, [name, required]);

  useEffect(() => {
    console.log("🔧 Error state changed to:", error);
  }, [error]);

  return (
    <div className={styles.uploadContainer}>
      <label className={styles.label}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>
      <div>
        <input
          type="file"
          name={name}
          onChange={handleFileChange}
          accept={accept}
          className={styles.fileInput}
          id={name}
          {...props}
        />
        <label htmlFor={name} className={styles.uploadLabel}>
          <Upload className={styles.icon} size={18} />
          <span className={styles.fileName}>
            {fileName || "Choose file..."}
          </span>
        </label>
        {previewUrl && accept.includes('image') && (
          <div className={styles.previewContainer}>
            <img
              src={previewUrl}
              alt="Preview"
              className={styles.previewImage}
            />
          </div>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default GlassFileUpload;
