import { useFormik } from "formik";
import { Input } from "./ui/Input";
import * as Yup from "yup";

export const FormLogin = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      const form = new FormData();
      form.append("email", values.email);
      form.append("password", values.password);

      const reponse = await fetch("/api/auth/login", {
        method: "POST",
        body: form,
      });

      if (reponse.ok) {
        window.location.href = "/";
        return;
      }

      formik.setErrors({
        password: "Invalid email or password",
      });
    },
  });

  return (
    <form className="mt-10" onSubmit={formik.handleSubmit}>
      <Input
        label="Email"
        placeholder="example@email.com"
        name="email"
        type="text"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={
          formik.errors.email && formik.touched.email
            ? formik.errors.email
            : false
        }
      />
      <Input
        label="Password"
        placeholder="*******"
        name="password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={
          formik.errors.password && formik.touched.password
            ? formik.errors.password
            : false
        }
      />

      <div className="w-full flex justify-end font-medium mb-6 text-sm">
        <a href="#" className="text-[#009DFE]">
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        className="border-none bg-[#009CFF] py-2 px-4 w-full rounded-md"
      >
        Sign in
      </button>
      <span className="font-light text-slate-300 flex justify-center mt-6 text-sm gap-x-1">
        No account{" "}
        <a className="text-white font-medium" href="/auth/signup">
          Sign up
        </a>
      </span>
    </form>
  );
};
