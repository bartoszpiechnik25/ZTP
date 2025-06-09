import { H4 } from "@/shared/components/ui/typography/Headings";
import { Muted } from "@/shared/components/ui/typography/Paragraph";
import { motion } from "framer-motion";
import { Separator } from "@/shared/components/ui/Separator";
import { Link } from "react-router";
import BrandButton from "@/shared/components/BrandButton";
import { CheckCircle } from "lucide-react";

const ForgotPasswordSuccess = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col justify-center absolute top-0 bottom-0 mx-auto w-1/2 md:w-1/3 lg:w-1/4"
    >
      <div className="space-y-10">
        <div className="flex flex-col items-center text-center space-y-4">
          <CheckCircle className="h-12 w-12 text-green-500" />
          <H4>Email Sent Successfully!</H4>
          <Muted className="text-muted-foreground mt-6">
            We've sent password reset instructions to your email. Please check your inbox and follow the instructions.
          </Muted>
        </div>

        <div className="space-y-8">
          <Muted className="text-center">
            Didn't receive the email? Check your spam folder or
            <Link to="/forgot-password" className="text-primary hover:underline ml-1">
              try again
            </Link>
          </Muted>

          <Link to="/sign-in" className="block">
            <BrandButton label="Back to Sign In" size="lg" className="w-full" />
          </Link>
        </div>

        <div className="space-y-2 flex flex-col mt-6">
          <Separator />
          <Muted className="mt-0 text-center">© 2025 CatDoc</Muted>
        </div>
      </div>
    </motion.div>
  );
};

export default ForgotPasswordSuccess;
