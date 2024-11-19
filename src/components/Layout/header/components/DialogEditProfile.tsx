import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import axios from "axios";
import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import { useToast } from "@/hooks/use-toast";
import UseUploadImage from "@/hooks/useUploadImage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  profilePictureUrl: string | null;
  profilePictureFile: File | null;
}

const DialogEditProfile: React.FC<DialogProps> = ({ isOpen, onOpenChange }) => {
  const { user, refreshUserData } = useUser();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { uploadImage } = UseUploadImage();

  const [formData, setFormData] = useState<FormData>({
    name: user?.name || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    profilePictureUrl: user?.profilePictureUrl || null,
    profilePictureFile: null,
  });

  React.useEffect(() => {
    if (isOpen && user) {
      setFormData({
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        profilePictureUrl: user.profilePictureUrl,
        profilePictureFile: null,
      });
    }
  }, [isOpen, user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (file.size > 5 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "File size should not exceed 5MB",
        });
        e.target.value = "";
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please upload an image file",
        });
        e.target.value = "";
        return;
      }

      setFormData((prev) => ({
        ...prev,
        profilePictureFile: file,
        profilePictureUrl: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setUploadProgress(0);

    try {
      let imageUrl = formData.profilePictureUrl;

      if (formData.profilePictureFile) {
        imageUrl = await uploadImage(formData.profilePictureFile);
      }

      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (!token) {
        throw new Error("Authentication token not found");
      }

      // Update profile dengan imageUrl yang baru
      const updateData = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        profilePictureUrl: imageUrl || user?.profilePictureUrl,
      };

      const response = await axios.post(
        `${BASE_URL.API}${END_POINT.UPDATE_PROFILE}`,
        updateData,
        {
          headers: {
            apiKey: API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data?.code === "200") {
        toast({
          title: "Success",
          description: "Profile updated successfully",
        });
        await refreshUserData();
        onOpenChange(false);
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: err.response?.data?.message || "Failed to update profile",
      });
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {formData.profilePictureUrl && (
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="col-span-4 flex justify-center">
                  <div className="relative">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src={formData.profilePictureUrl} alt="#" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    {uploadProgress > 0 && uploadProgress < 100 && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                        <span className="text-white">{uploadProgress}%</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <div className="col-span-3">
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <div className="col-span-3">
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phoneNumber" className="text-right">
                Nomor Hp
              </Label>
              <div className="col-span-3">
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="profilePicture" className="text-right">
                Picture
              </Label>
              <div className="col-span-3">
                <Input
                  id="profilePicture"
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                />
                <p className="text-sm text-gray-500 mt-1">Max size: 5MB</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="neutral"
                className="text-black"
                disabled={isLoading}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <span>
                    {uploadProgress > 0
                      ? `Uploading... ${uploadProgress}%`
                      : "Saving..."}
                  </span>
                </div>
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogEditProfile;
