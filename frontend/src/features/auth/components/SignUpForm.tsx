import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/shared/components/ui/Form";
import { Input } from "@/shared/components/ui/Input";
import { H4 } from "@/shared/components/ui/typography/Headings";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Link } from "react-router";
import { SignUpRequestSchema } from "@/features/auth/schemas";
import BrandButton from "@/shared/components/BrandButton";
import { CatDocLogo } from "@/shared/components/ui/CatDocLogo";
import { Separator } from "@/shared/components/ui/Separator";
import { Muted } from "@/shared/components/ui/typography/Paragraph";
import { motion } from "framer-motion";

type Form = z.infer<typeof SignUpRequestSchema>;

const SignUpForm = () => {
  const { signUp, isLoading } = useAuth();

  const form = useForm<Form>({
    resolver: zodResolver(SignUpRequestSchema),
    defaultValues: {
      name: "",
      surname: "",
      username: "",
      email: "",
      phone_number: "",
      password: "",
    },
  });

  const onSubmit = (data: Form) => {
    signUp(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col justify-center absolute top-0 bottom-0 left-1/10 w-1/2 lg:w-1/3"
    >
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-2">
            <Link to={"/"}>
              <CatDocLogo />
            </Link>
            <Separator />
          </div>
          <div className="space-y-2">
            <H4>Create Account</H4>
            <Muted className="text-muted-foreground">Enter your details to create a new account</Muted>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe123" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john@example.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+1 (555) 123-4567" {...field} />
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

          <BrandButton label="Create Account" isLoading={isLoading} size={"lg"} className="w-full" type="submit" />

          <div className="space-y-2 flex flex-col">
            <div className="flex items-center space-x-2">
              <Muted>Already have an account?</Muted>
              <Link to={"/sign-in"}>
                <Muted className="text-primary hover:underline">Sign in</Muted>
              </Link>
            </div>
            <Separator className="mt-2" />
            <Muted className="mt-0">© 2025 CatDoc</Muted>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default SignUpForm;
