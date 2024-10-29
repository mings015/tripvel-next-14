import ImageLoginRegis from "@/components/content/imageLoginRegis";
import LogoOptionLogin from "@/components/content/logoOptionLogin";
import OrDevider from "@/components/content/orDevider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UseLogin from "@/hooks/useLogin";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const LoginPage = () => {
  const { formData, success, error, isLoading, handleChange, handleLogin } =
    UseLogin();
  return (
    <div>
      <div className="flex flex-col h-screen md:flex-row-reverse">
        <div className="flex md:flex md:w-1/2">
          <ImageLoginRegis />
        </div>
        <div className="flex flex-col px-10 gap-5 md:p-20 w-full justify-center h-full md:w-1/2">
          <div>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 my-5">
              Login
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
                <AlertDescription>Login Success</AlertDescription>
              </Alert>
            )}
          </div>
          <div>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    placeholder="Enter your password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button
                  className="my-3"
                  onClick={handleLogin}
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </div>
            </form>
          </div>
          <OrDevider />
          <LogoOptionLogin />
          <p className="text-center text-sm md:pt-10 pb-10">
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
