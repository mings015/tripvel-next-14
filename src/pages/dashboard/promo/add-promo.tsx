import DashboardLayout from "@/components/dashboard/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useAddPromo from "@/hooks/dashboard/promo/useAddPromo";
import { useRouter } from "next/router";
import React from "react";

const AddPromo = () => {
  const router = useRouter();
  const {
    formData,
    isLoading,
    uploadProgress,
    handleInputChange,
    handleFileChange,
    handleSubmit,
  } = useAddPromo();

  const handleCancel = () => {
    router.push("/dashboard/promo");
  };

  return (
    <DashboardLayout>
      <div className="p-4">
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Add Promo</h1>
          </div>

          <div className="max-w-3xl mx-auto">
            {formData.imageUrl ? (
              <div className="rounded-lg overflow-hidden mb-6">
                <img
                  src={formData.imageUrl}
                  alt="Promo Preview"
                  className="w-full h-[300px] object-cover"
                />
              </div>
            ) : (
              <div className="rounded-lg overflow-hidden mb-6 bg-gray-100 flex items-center justify-center h-[300px]">
                <p className="text-gray-500">Image Preview</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <div className="col-span-3">
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter promo title"
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
                    onChange={handleInputChange}
                    placeholder="Enter promo description"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="terms_condition" className="text-right pt-2">
                  Terms & Conditions
                </Label>
                <div className="col-span-3">
                  <Textarea
                    id="terms_condition"
                    value={formData.terms_condition}
                    onChange={handleInputChange}
                    placeholder="Enter terms and conditions"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="promo_code" className="text-right">
                  Promo Code
                </Label>
                <div className="col-span-3">
                  <Input
                    id="promo_code"
                    value={formData.promo_code}
                    onChange={handleInputChange}
                    placeholder="Enter promo code"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="promo_discount_price" className="text-right">
                  Discount Amount
                </Label>
                <div className="col-span-3">
                  <Input
                    id="promo_discount_price"
                    type="number"
                    value={formData.promo_discount_price}
                    onChange={handleInputChange}
                    placeholder="Enter discount amount"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="minimum_claim_price" className="text-right">
                  Minimum Purchase
                </Label>
                <div className="col-span-3">
                  <Input
                    id="minimum_claim_price"
                    type="number"
                    value={formData.minimum_claim_price}
                    onChange={handleInputChange}
                    placeholder="Enter minimum purchase amount"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="picture" className="text-right">
                  Picture
                </Label>
                <div className="col-span-3">
                  <Input
                    id="picture"
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    required
                  />
                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  )}
                  <p className="text-sm text-gray-500 mt-1">Max size: 5MB</p>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <Button
                  type="button"
                  variant="neutral"
                  className="text-black"
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
                    "Add Promo"
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

export default AddPromo;
