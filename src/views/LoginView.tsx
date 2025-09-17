import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function LoginView() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const result = await login(values.email, values.password);

      if (result.success) {
        navigate("/dashboard");
      } else {
        setSubmitError(result.error || "An error occurred");
      }
    } catch (error) {
      setSubmitError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome.</h1>
          <p className="text-gray-500 text-sm">
            Create an account or sign in to continue.
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="flex-1 py-2 px-4 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 transition-colors text-center"
          >
            Sign up
          </button>
          <button
            type="button"
            className="flex-1 py-2 px-4 text-sm font-medium rounded-md bg-blue-600 text-white transition-colors"
          >
            Log in
          </button>
        </div>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-6">
              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                  {submitError}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-900 mb-1"
                  >
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white text-gray-900 placeholder-gray-500 font-medium"
                    placeholder="you@example.com"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-900 mb-1"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Field
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white text-gray-900 placeholder-gray-500 font-medium pr-12"
                      placeholder="Your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? "Signing In..." : "Sign in"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
