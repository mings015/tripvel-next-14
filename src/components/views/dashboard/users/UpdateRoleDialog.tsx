import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Edit, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UpdateRoleDialogProps {
  userId: string;
  currentRole: string;
  isLoading: boolean;
  isDialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  onUpdate: (role: string) => Promise<void>;
}

const UpdateRoleDialog: React.FC<UpdateRoleDialogProps> = ({
  userId,
  currentRole,
  isLoading,
  isDialogOpen,
  setDialogOpen,
  onUpdate,
}) => {
  const [selectedRole, setSelectedRole] = useState(currentRole);

  // Update selectedRole when currentRole changes
  useEffect(() => {
    setSelectedRole(currentRole);
  }, [currentRole]);

  const handleUpdate = async () => {
    await onUpdate(selectedRole);
  };

  return (
    <div className="flex justify-end gap-2">
      <Select value={selectedRole} onValueChange={setSelectedRole}>
        <SelectTrigger id={`role-${userId}`} className="w-[120px]">
          <SelectValue placeholder="Select role" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="user">User</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
        </SelectContent>
      </Select>

      <AlertDialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogTrigger asChild>
          <Button
            variant="neutral"
            className="text-black"
            size="icon"
            disabled={selectedRole === currentRole} // Disable if no change
          >
            <Edit className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Update User Role</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to update this user's role from{" "}
              {currentRole} to {selectedRole}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleUpdate}
              disabled={isLoading || selectedRole === currentRole}
              className="bg-blue-500 hover:bg-blue-600"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Updating...
                </>
              ) : (
                "Update Role"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UpdateRoleDialog;
