import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/shared/components/ui/Form";
import { Input } from "@/shared/components/ui/Input";
import { H4 } from "@/shared/components/ui/typography/Headings";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useEffect } from "react";
import { Link } from "react-router";
import { ForgotPasswordRequestSchema } from "@/features/auth/schemas";
import BrandButton from "@/shared/components/BrandButton";
import { CatDocLogo } from "@/shared/components/ui/CatDocLogo";
import { Separator } from "@/shared/components/ui/Separator";
import { Muted } from "@/shared/components/ui/typography/Paragraph";
import { motion } from "framer-motion";
import { toast } from "sonner";

type Form = z.infer<typeof ForgotPasswordRequestSchema>;

const ForgotPasswordForm = () => {
  const { forgotPassword, isLoading, isForgotPasswordError, forgotPasswordError } = useAuth();

  const form = useForm<Form>({
    resolver: zodResolver(ForgotPasswordRequestSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    if (isForgotPasswordError) {
      toast.error("Password reset failed", {
        description: forgotPasswordError?.message || "An error occurred while processing your request.",
      });
    }
  }, [isForgotPasswordError, forgotPasswordError]);

  const onSubmit = (data: Form) => {
    forgotPassword(data);
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
            <H4>Reset Password</H4>
            <Muted className="text-muted-foreground">
              Enter your email and we'll send you instructions to reset your password
            </Muted>
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="your@email.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <BrandButton
            label="Send Reset Instructions"
            isLoading={isLoading}
            size={"lg"}
            className="w-full"
            type="submit"
          />

          <div className="space-y-2 flex flex-col">
            <Link to={"/sign-in"}>
              <Muted className="text-primary hover:underline">Back to Sign In</Muted>
            </Link>
            <Separator className="mt-2" />
            <Muted className="mt-0">© 2025 CatDoc</Muted>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default ForgotPasswordForm;
