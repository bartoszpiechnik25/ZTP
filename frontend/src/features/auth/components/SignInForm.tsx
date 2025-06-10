import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/shared/components/ui/Form";
import { Input } from "@/shared/components/ui/Input";
import { H4 } from "@/shared/components/ui/typography/Headings";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useEffect } from "react";
import { Link, useLocation } from "react-router";
import { SignInRequestSchema } from "@/features/auth/schemas";
import BrandButton from "@/shared/components/BrandButton";
import { CatDocLogo } from "@/shared/components/ui/CatDocLogo";
import { Separator } from "@/shared/components/ui/Separator";
import { Muted } from "@/shared/components/ui/typography/Paragraph";
import { motion } from "motion/react";
import { toast } from "sonner";

type Form = z.infer<typeof SignInRequestSchema>;

const SignInForm = () => {
  const location = useLocation();
  const { signIn, isLoading, isSignInError, signInError } = useAuth();

  const form = useForm<Form>({
    resolver: zodResolver(SignInRequestSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    if (location.state?.status === "signed-up-success") {
      toast.success("Registration successful!", {
        description: "Please sign in with your new account",
      });
    }
  }, [location.state]);

  useEffect(() => {
    if (isSignInError) {
      toast.error("Sign in failed", {
        description: signInError?.message || "An error occurred while signing in. Please try again.",
      });
    }
  }, [isSignInError, signInError]);

  const onSubmit = (data: Form) => {
    signIn(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col justify-center absolute top-0 bottom-0 left-1/10 w-1/2 md:w-1/3 lg:w-1/4"
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-2">
            <Link to={"/"}>
              <CatDocLogo />
            </Link>
            <Separator />
          </div>
          <div className="space-y-2">
            <H4>Sign in</H4>
            <Muted className="text-muted-foreground">Enter your username and password to access your documents.</Muted>
          </div>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <BrandButton label="Sign in" isLoading={isLoading} size={"lg"} className="w-full" type="submit" />
          <div className="space-y-2 flex flex-col">
            <div className="flex items-center space-x-2">
              <Muted>Don't have an account?</Muted>
              <Link to={"/sign-up"}>
                <Muted className="text-primary hover:underline">Sign up</Muted>
              </Link>
            </div>
            <Link to={"/forgot-password"}>
              <Muted className="text-primary hover:underline">Forgot your password?</Muted>
            </Link>
            <Separator className="mt-2" />
            <Muted className="mt-0">© 2025 CatDoc</Muted>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default SignInForm;
