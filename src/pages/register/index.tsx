import ImageLoginRegis from "@/components/content/imageLoginRegis";
import LogoOptionLogin from "@/components/content/logoOptionLogin";
import OrDevider from "@/components/content/orDevider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UseRegister from "@/hooks/useRegister";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

const RegisterPage = () => {
  const { success, error, isLoading, handleRegister } = UseRegister();

  return (
    <div>
      <div className="flex flex-col h-screen md:flex-row">
        <div className="md:w-1/2">
          <ImageLoginRegis />
        </div>
        <div className="flex flex-col px-10 gap-5 md:p-20 w-full justify-center h-full md:w-1/2">
          <div>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 my-5">
              Register
            </h2>
            {error && (
              <Alert variant="destructive">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert>
                <ExclamationTriangleIcon className="h-4 w-4" />
                <AlertTitle>Succes</AlertTitle>
                <AlertDescription>Register Success</AlertDescription>
              </Alert>
            )}
          </div>
          <div>
            <form onSubmit={handleRegister}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your Name"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    type="password"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="passwordRepeat">Repeat Password</Label>
                  <Input
                    id="passwordRepeat"
                    name="passwordRepeat"
                    placeholder="Enter your password again"
                    type="password"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Enter your Phone Number"
                    type="number"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="role">Role</Label>
                  <Select name="role" required>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="my-3" type="submit" disabled={isLoading}>
                  {isLoading ? "Registerin..." : "Register"}
                </Button>
              </div>
            </form>
          </div>
          <OrDevider />
          <LogoOptionLogin />
          <p className="text-center text-sm md:pt-10 pb-10">
            Already have an account? {}
            <Link className="text-primary" href={"/login"}>
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
