import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "@/features/home/HomePage";
import ResearchPage from "@/features/research/ResearchPage";
import SignInForm from "@/features/auth/components/SignInForm";
import SignUpForm from "@/features/auth/components/SignUpForm";
import AuthLayout from "@/features/auth/AuthLayout";
import DocumentsLayout from "@/features/documents/DocumentsLayout";
import DocumentsPage from "@/features/documents/DocumentsPage";
import DocumentDetailPage from "@/features/documents/DocumentDetailPage";
import NotFoundPage from "@/features/notFound/NotFoundPage";
import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";
import ForgotPasswordSuccess from "@/features/auth/components/ForgotPasswordSuccess";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="test" element={<ResearchPage />} />

        <Route element={<AuthLayout />}>
          <Route path="sign-in" element={<SignInForm />} />
          <Route path="sign-up" element={<SignUpForm />} />
          <Route path="forgot-password" element={<ForgotPasswordForm />} />
          <Route path="forgot-password/success" element={<ForgotPasswordSuccess />} />
        </Route>

        <Route path="documents" element={<DocumentsLayout />}>
          <Route index element={<DocumentsPage />} />
          <Route path=":id" element={<DocumentDetailPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
