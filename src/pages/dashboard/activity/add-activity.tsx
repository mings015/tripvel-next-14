import DashboardLayout from "@/components/dashboard/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAddActivity from "@/hooks/dashboard/activity/useAddActivity";
import { useRouter } from "next/router";
import React from "react";
import useCategory from "@/components/views/Home/hooks/useCategory";

const AddActivity = () => {
  const router = useRouter();
  const { data: categories, isLoading: isCategoryLoading } = useCategory();
  const {
    formData,
    isLoading,
    uploadProgress,
    handleInputChange,
    handleTextAreaChange,
    handleFileChange,
    handleCategoryChange,
    handleRemoveImage,
    handleSubmit,
  } = useAddActivity();

  const handleCancel = () => {
    router.push("/dashboard/activity");
  };

  return (
    <DashboardLayout>
      <div className="p-4">
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Add Activity</h1>
          </div>

          <div className="max-w-3xl mx-auto">
            {formData.imageUrls.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mb-6">
                {formData.imageUrls.map((url, index) => (
                  <div
                    key={index}
                    className="relative rounded-lg overflow-hidden"
                  >
                    <img
                      src={url}
                      alt={`Activity Preview ${index + 1}`}
                      className="w-full h-[200px] object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      aria-label="Remove image"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="categoryId" className="text-right">
                  Category
                </Label>
                <div className="col-span-3">
                  <Select
                    value={formData.categoryId}
                    onValueChange={handleCategoryChange}
                    disabled={isCategoryLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="images" className="text-right">
                  Images
                </Label>
                <div className="col-span-3">
                  <Input
                    id="images"
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    multiple
                    className="mb-2"
                  />
                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  )}
                  <p className="text-sm text-gray-500">
                    Max size: 5MB per image
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <div className="col-span-3">
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter activity title"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="description" className="text-right pt-2">
                  Description
                </Label>
                <div className="col-span-3">
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={handleTextAreaChange}
                    placeholder="Enter activity description"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <div className="col-span-3">
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Enter price"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price_discount" className="text-right">
                  Discount Price
                </Label>
                <div className="col-span-3">
                  <Input
                    id="price_discount"
                    type="number"
                    value={formData.price_discount}
                    onChange={handleInputChange}
                    placeholder="Enter discount price"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rating" className="text-right">
                  Rating
                </Label>
                <div className="col-span-3">
                  <Input
                    id="rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={handleInputChange}
                    placeholder="Enter rating (0-5)"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="total_reviews" className="text-right">
                  Total Reviews
                </Label>
                <div className="col-span-3">
                  <Input
                    id="total_reviews"
                    type="number"
                    min="0"
                    value={formData.total_reviews}
                    onChange={handleInputChange}
                    placeholder="Enter total reviews"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="facilities" className="text-right pt-2">
                  Facilities
                </Label>
                <div className="col-span-3">
                  <Textarea
                    id="facilities"
                    value={formData.facilities}
                    onChange={handleTextAreaChange}
                    placeholder="Enter facilities (HTML format supported)"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="address" className="text-right pt-2">
                  Address
                </Label>
                <div className="col-span-3">
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={handleTextAreaChange}
                    placeholder="Enter complete address"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="province" className="text-right">
                  Province
                </Label>
                <div className="col-span-3">
                  <Input
                    id="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    placeholder="Enter province"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="city" className="text-right">
                  City
                </Label>
                <div className="col-span-3">
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Enter city"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="location_maps" className="text-right pt-2">
                  Location Maps
                </Label>
                <div className="col-span-3">
                  <Textarea
                    id="location_maps"
                    value={formData.location_maps}
                    onChange={handleTextAreaChange}
                    placeholder="Enter Google Maps embed code"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <Button
                  type="button"
                  variant="default"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <span className="animate-spin">⚪</span>
                      Saving...
                    </div>
                  ) : (
                    "Add Activity"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddActivity;
