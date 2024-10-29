import ImageLoginRegis from "@/components/content/imageLoginRegis";
import LogoOptionLogin from "@/components/content/logoOptionLogin";
import OrDevider from "@/components/content/orDevider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div>
      <div className="flex flex-col h-screen md:flex-row-reverse">
        <div className="flex md:flex md:w-1/2">
          <ImageLoginRegis />
        </div>
        <div className="flex flex-col px-10 gap-5 md:p-20 w-full justify-center h-full md:w-1/2">
          <div>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 my-5">
              Login Page
            </h2>
          </div>
          <div>
            <form>
              <div className="grid w-full items-center gap-4">
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
                <Button className="my-3">Login</Button>
              </div>
            </form>
          </div>
          <OrDevider />
          <LogoOptionLogin />
          <p className="text-center text-sm pt-10">
            Dont have an account yet? {}
            <Link className="text-primary" href={"/register"}>
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
