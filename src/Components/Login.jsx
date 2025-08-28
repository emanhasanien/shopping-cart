import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const Login = () => {
  const navigate =useNavigate();

  const initialValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("email is required"),
    password: Yup.string()
      .min(6, "password must be more than 5 character")
      .required("password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    setStatus(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      setStatus(error.message);
    } else {
      setStatus("You Are Sign in successfully✅");
      navigate('/home')
      
    }

    setSubmitting(false);
  };
  return (
   <section className="min-h-screen flex items-center justify-center">
     <div className=" bg-blue-600 w-[600px]  p-10 rounded-md">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ isSubmitting, status }) => (
        <Form className="flex flex-col gap-3 border rounded p-4">
          <h2 className="font-semibold text-2xl text-center text-white">Login User</h2>

        
          <Field name="email" type="email" className="border p-2 rounded bg-white" placeholder="Enter User Email..."/>
          <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

          
          <Field name="password" type="password" className="border p-2 rounded bg-white" placeholder="Enter Password"/>
          <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />

          <button type="submit" disabled={isSubmitting} className="font-bold rounded p-2 bg-white">
            {isSubmitting ? 'Sign in Now...' : 'Sign in'}
          </button>

          {status && <div className="text-sm text-center mt-1 text-red-500 font-bold">{status}</div>}
        </Form>
      )}
    </Formik>
         <p className="text-center font-bold mt-2.5 text-gray-700"> Not Have Account ? <Link to={"/register"} className="text-white ml-2.5 font-bold">Register</Link></p>
     </div>
    </section>
  );
};

export default Login;
