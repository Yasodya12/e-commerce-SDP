import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const dispatch = useDispatch();
    const { featureImageList } = useSelector((state) => state.commonFeature);

    console.log(uploadedImageUrl, "uploadedImageUrl");

    function handleUploadFeatureImage() {
        dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
            if (data?.payload?.success) {
                dispatch(getFeatureImages());
                setImageFile(null);
                setUploadedImageUrl("");
            }
        });
    }

    useEffect(() => {
        dispatch(getFeatureImages());
    }, [dispatch]);

    console.log(featureImageList, "featureImageList");

    return (
        <div className="fade-up space-y-6">
            <div className="glass-panel p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-3xl">Homepage Hero Banners</h1>
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                        {featureImageList?.length || 0} items
                    </span>
                </div>
                <ProductImageUpload
                    imageFile={imageFile}
                    setImageFile={setImageFile}
                    uploadedImageUrl={uploadedImageUrl}
                    setUploadedImageUrl={setUploadedImageUrl}
                    setImageLoadingState={setImageLoadingState}
                    imageLoadingState={imageLoadingState}
                    isCustomStyling={true}
                />
                <Button
                    onClick={handleUploadFeatureImage}
                    className="mt-5 h-11 w-full rounded-xl sm:w-40"
                >
                    Upload
                </Button>
            </div>
            <div className="stagger grid gap-4 md:grid-cols-2">
                {featureImageList && featureImageList.length > 0 ? (
                    featureImageList.map((featureImgItem) => (
                        <div
                            className="overflow-hidden rounded-2xl border bg-white shadow-md"
                            key={featureImgItem._id}
                        >
                            <img
                                src={featureImgItem.image}
                                className="h-[240px] w-full object-cover"
                            />
                        </div>
                    ))
                ) : (
                    <p className="text-muted-foreground">
                        No feature images uploaded yet.
                    </p>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;
