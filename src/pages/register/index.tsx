import ImageLoginRegis from "@/components/content/imageLoginRegis";
import LogoOptionLogin from "@/components/content/logoOptionLogin";
import OrDevider from "@/components/content/orDevider";
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
import Link from "next/link";
import React from "react";

const RegisterPage = () => {
  return (
    <div>
      <div className="flex flex-col h-screen md:flex-row">
        <div className="md:w-1/2">
          <ImageLoginRegis />
        </div>
        <div className="flex flex-col px-10 gap-5 md:p-20 w-full justify-center h-full md:w-1/2">
          <div>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 my-5">
              Register Page
            </h2>
          </div>
          <div>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter your Name" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="Enter your email" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    placeholder="Enter your password"
                    type="password"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="repeatPassword">Repeat Password</Label>
                  <Input
                    id="repeatPassword"
                    placeholder="Enter your password again"
                    type="password"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="numberPhone">Phone Number</Label>
                  <Input
                    id="numberPhone"
                    placeholder="Enter your Phone Number"
                    type="number"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="role">Role</Label>
                  <Select>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="next">User</SelectItem>
                      <SelectItem value="sveltekit">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="my-3">Login</Button>
              </div>
            </form>
          </div>
          <OrDevider />
          <LogoOptionLogin />
          <p className="text-center text-sm pt-10">
            Already have an account?
            {}
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
