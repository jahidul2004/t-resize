import { useRef, useState } from "react";
import { CgSize } from "react-icons/cg";
import {
    RiDownloadCloud2Line,
    RiExpandHeightLine,
    RiExpandWidthLine,
    RiImage2Line,
    RiImageCircleAiLine,
    RiLockLine,
    RiLockUnlockLine,
} from "react-icons/ri";
import Swal from "sweetalert2";

const Resizer = () => {
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [lockAspect, setLockAspect] = useState(true);
    const [originalAspect, setOriginalAspect] = useState(1);
    const [resizedImageUrl, setResizedImageUrl] = useState("");
    const [targetSize, setTargetSize] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const [fileName, setFileName] = useState("");
    const [fileSize, setFileSize] = useState(""); // in KB

    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            processImageFile(file);
        }
    };

    const processImageFile = (file) => {
        setImage(file);
        setFileName(file.name);
        setFileSize((file.size / 1024).toFixed(1));
        const img = new Image();
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        setResizedImageUrl("");
        img.onload = () => {
            setOriginalAspect(img.width / img.height);
            if (lockAspect) {
                setWidth(img.width);
                setHeight(img.height);
            }
        };
        img.src = url;
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            processImageFile(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const openFileDialog = () => {
        fileInputRef.current.click();
    };

    const handleWidthChange = (e) => {
        const value = e.target.value;
        setWidth(value);
        if (lockAspect && value) {
            setHeight(Math.round(value / originalAspect));
        }
    };

    const handleHeightChange = (e) => {
        const value = e.target.value;
        setHeight(value);
        if (lockAspect && value) {
            setWidth(Math.round(value * originalAspect));
        }
    };

    const compressImage = (canvas, targetKB) => {
        let quality = 0.9;
        let dataUrl = canvas.toDataURL("image/jpeg", quality);
        while (dataUrl.length / 1024 > targetKB && quality > 0.1) {
            quality -= 0.05;
            dataUrl = canvas.toDataURL("image/jpeg", quality);
        }
        return dataUrl;
    };

    const handleResize = () => {
        if (!image || !width || !height) return alert("Please fill all fields");

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = () => {
            ctx.drawImage(img, 0, 0, width, height);
            let resized;
            if (targetSize) {
                resized = compressImage(canvas, Number(targetSize));
            } else {
                resized = canvas.toDataURL("image/jpeg", 0.9);
            }
            setResizedImageUrl(resized);
        };
        img.crossOrigin = image?.type === "image/jpeg" ? "anonymous" : "";
        img.src = URL.createObjectURL(image);
    };

    const handleDownload = () => {
        const link = document.createElement("a");
        link.download = `resized-${width}x${height}.jpg`;
        link.href = resizedImageUrl;
        link.click();

        Swal.fire({
            title: "Download Started 🎉",
            text: "Your resized image is downloading now. Thank you for using our Image Resizer!",
            icon: "success",
            confirmButtonText: "Close",
            confirmButtonColor: "#00b795",
        });
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="card bg-base-200 shadow-2xl p-6 space-y-6">
                {/* Upload Area */}
                <div
                    className={`border-2 border-dashed rounded-lg flex flex-col justify-center items-center cursor-pointer transition-all duration-300 ${
                        isDragging
                            ? "border-[#00b795] bg-base-300 scale-[1.01]"
                            : "border-[#00b795]/50 hover:border-[#00b795]"
                    } ${previewUrl ? "h-auto p-4" : "h-40 md:h-50 lg:h-60"}`}
                    onClick={openFileDialog}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                >
                    {!previewUrl ? (
                        <div className="text-center p-6">
                            <div className="flex justify-center">
                                <div className="p-4 rounded-full bg-[#00b795]/10 text-[#00b795]">
                                    <RiImageCircleAiLine className="w-8 h-8" />
                                </div>
                            </div>
                            <p className="mt-4 font-medium text-gray-600">
                                {isDragging
                                    ? "Drop your image here"
                                    : "Click to browse or drag & drop"}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                Supports JPG, PNG, WEBP
                            </p>
                        </div>
                    ) : (
                        <div className="relative group">
                            <img
                                src={previewUrl}
                                alt="preview"
                                className="max-w-full max-h-60 rounded-lg shadow-sm"
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 rounded-lg flex items-center justify-center transition-opacity duration-300">
                                <span className="bg-white/90 text-[#00b795] px-3 py-1 rounded-full text-sm font-medium">
                                    Change Image
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                    className="hidden"
                />

                {/* Resize Controls */}
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">
                                    Width (px)
                                </span>
                            </label>
                            <input
                                type="number"
                                className="input input-bordered w-full"
                                value={width}
                                onChange={handleWidthChange}
                                min="1"
                                placeholder="Enter width"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">
                                    Height (px)
                                </span>
                            </label>
                            <input
                                type="number"
                                className="input input-bordered w-full"
                                value={height}
                                onChange={handleHeightChange}
                                min="1"
                                placeholder="Enter height"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 md:flex-row items-center justify-between">
                        <div className="w-full md:w-max order-2 md:order-1 form-control">
                            <label className="btn py-3 cursor-pointer label flex items-center gap-2">
                                <button
                                    type="button"
                                    className={`btn btn-sm btn-ghost ${
                                        lockAspect ? "text-[#00b795]" : ""
                                    }`}
                                    onClick={() => setLockAspect(!lockAspect)}
                                >
                                    {lockAspect ? (
                                        <RiLockLine className="w-5 h-5" />
                                    ) : (
                                        <RiLockUnlockLine className="w-5 h-5" />
                                    )}
                                </button>
                                <span className="label-text font-medium">
                                    Lock Aspect Ratio
                                </span>
                            </label>
                        </div>

                        <div className="w-full md:w-max order-1 md:order-2 form-control">
                            <label className="label p-0">
                                <span className="label-text font-medium">
                                    Target Size (KB)
                                </span>
                            </label>
                            <input
                                type="number"
                                className="input input-bordered w-full"
                                placeholder="Optional"
                                value={targetSize}
                                onChange={(e) => setTargetSize(e.target.value)}
                                min="10"
                            />
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <div className="pt-2">
                    <button
                        onClick={handleResize}
                        disabled={!previewUrl}
                        className={`btn w-full text-white text-lg ${
                            !previewUrl ? "btn-disabled" : ""
                        }`}
                        style={{ backgroundColor: "#00b795" }}
                    >
                        Resize Image <RiImageCircleAiLine className="ml-2" />
                    </button>
                </div>
            </div>

            {/* Results Section */}
            {resizedImageUrl && (
                <div className="mt-10 bg-base-200 rounded-xl p-6 shadow-sm">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 border p-4 rounded border-[#00b795]">
                            <h3 className="text-xl font-bold text-[#00b795] mb-4">
                                Resized Result
                            </h3>
                            <div className="bg-base-100 p-4 rounded-lg border border-base-300">
                                <img
                                    src={resizedImageUrl}
                                    alt="resized"
                                    className="max-w-full max-h-60 mx-auto rounded"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col justify-between border border-[#00b795] rounded p-4">
                            <div className="flex flex-col gap-2">
                                <h4 className="font-bold text-[#00b795] mb-2 text-xl">
                                    Information
                                </h4>
                                <p className="font-semibold flex items-center gap-2">
                                    <RiExpandWidthLine className="text-[#00b795]" />
                                    {width} px
                                </p>
                                <p className="font-semibold flex items-center gap-2">
                                    <RiExpandHeightLine className="text-[#00b795]" />
                                    {height} px
                                </p>
                                <p className="font-semibold flex items-center gap-2">
                                    <RiImage2Line className="text-[#00b795]" />
                                    resized-{width}x{height}.jpg
                                </p>
                                <p className="font-semibold flex items-center gap-2">
                                    <CgSize className="text-[#00b795]" />≈{" "}
                                    {resizedImageUrl
                                        ? (
                                              resizedImageUrl.length / 1024
                                          ).toFixed(1)
                                        : "0"}{" "}
                                    KB
                                </p>
                            </div>

                            <button
                                onClick={handleDownload}
                                className="btn bg-[#00b795] text-white mt-4"
                            >
                                <RiDownloadCloud2Line className="mr-2" />{" "}
                                Download Image
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Resizer;
