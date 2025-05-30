import { useState, useEffect } from "react";
import { Button } from "@/shared/components/ui/Button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/shared/components/ui/Card";
import { ArrowLeft, Home } from "lucide-react";
import { useNavigate, Link } from "react-router";
import { H1 } from "@/shared/components/ui/typography/Headings";
import { Large, P } from "@/shared/components/ui/typography/Paragraph";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  // Handle automatic redirection with countdown
  useEffect(() => {
    if (countdown <= 0) {
      navigate("/");
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>
            <H1 className="text-6xl font-bold text-destructive">404</H1>
          </CardTitle>
          <CardDescription>
            <Large>Page Not Found</Large>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <P>
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </P>
          <P className="mt-4">
            You will be automatically redirected to the homepage in <span className="font-bold">{countdown}</span>{" "}
            seconds.
          </P>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button onClick={handleGoBack} variant="outline" className="flex items-center gap-2">
            <ArrowLeft size={16} />
          </Button>

          <Button className="flex items-center gap-2">
            <Home size={16} />
            <Link to="/">Go Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NotFoundPage;
