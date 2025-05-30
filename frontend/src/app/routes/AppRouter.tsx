import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "@/features/home/HomePage";
import AboutPage from "@/features/about/AboutPage";
import SignInPage from "@/features/auth/SignInPage";
import SignUpPage from "@/features/auth/SignUpPage";
import AuthLayout from "@/layouts/AuthLayout";
import DocumentsLayout from "@/layouts/DocumentsLayout";
import DocumentsPage from "@/features/documents/DocumentsPage";
import DocumentDetailPage from "@/features/documents/DocumentDetailPage";
import NotFoundPage from "@/features/notFound/NotFoundPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />

        <Route element={<AuthLayout />}>
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
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
