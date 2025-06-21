import { useFormik } from "formik";
import { Input } from "./ui/Input";
import * as Yup from "yup";

export const FormSignUp = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
      passwordConfirmation: Yup.string().required(
        "Password confirmation is required"
      ),
    }),
    onSubmit: async (values) => {
      const { password, passwordConfirmation } = values;
      if (password !== passwordConfirmation) {
        formik.setErrors({
          passwordConfirmation: "Password confirmation does not match",
          password: "Password confirmation does not match",
        });
        return;
      }

      // crear un form data con los valores
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        window.location.href = "/";
      }
    },
  });

  return (
    <form className="mt-10" onSubmit={formik.handleSubmit}>
      <Input
        label="Name"
        placeholder="John Doe"
        name="name"
        type="text"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={
          formik.errors.name && formik.touched.name ? formik.errors.name : false
        }
      />

      <Input
        label="Email"
        placeholder="example@example.com"
        name="email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={
          formik.errors.email && formik.touched.email
            ? formik.errors.email
            : false
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
        <Input
          label="Password"
          placeholder="*********"
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

        <Input
          label="Password Confirmation"
          placeholder="*********"
          name="passwordConfirmation"
          type="password"
          value={formik.values.passwordConfirmation}
          onChange={formik.handleChange}
          error={
            formik.errors.passwordConfirmation &&
            formik.touched.passwordConfirmation
              ? formik.errors.passwordConfirmation
              : false
          }
        />

      </div>

      <div className="grid sm:grid-cols-2 gap-x-8 items-center">
        <button className="border-none bg-[#009CFF] py-2 px-4 w-full rounded-md">
          Create an Account
        </button>
        <span className="font-light text-slate-300 text-center mt-5 sm:text-left sm:m-0">
          Already have an account ?{" "}
          <a className="text-white font-medium" href="/auth/login">
            Login
          </a>
        </span>
      </div>
    </form>
  );
};
