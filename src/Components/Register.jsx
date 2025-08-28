import { Link, useNavigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { supabase } from "../supabaseClient";


const Register = () => {
  const navigate =useNavigate();

    const initialValues = { email: '', password: '', userName: '' };

  const validationSchema = Yup.object({
    userName: Yup.string()
      .min(3, " name must be more than 3 characters")
      .max(24, " name must be less than 24 character")
      .required("name is required"),
    email: Yup.string().email('Invalid email').required("email is required"),
    password: Yup.string().min(6,"password must be more than 5 character").required("password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setStatus, resetForm }) => {
    setStatus(null);

    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          userName: values.userName, // حفظه في user_metadata
        },
      },
    });

    if (error) {
      setStatus(error.message);
    } else {
      setStatus('Account is created successfully.');
      resetForm();
      navigate('/login')
    }

    setSubmitting(false);
  };

  return (
    <section className="min-h-screen flex items-center justify-center">
     <div className=" bg-blue-600 w-[600px]  p-10 rounded-md">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ isSubmitting, status }) => (
        <Form className="flex flex-col gap-3 border rounded p-4">
          <h2 className="font-semibold text-2xl text-center text-white">Register User</h2>

         
          <Field name="userName" type="text" className="border p-2 rounded bg-white" placeholder="Enter User Name..."/>
          <ErrorMessage name="userName" component="div" className="text-red-500 text-sm" />

        
          <Field name="email" type="email" className="border p-2 rounded bg-white" placeholder="Enter User Email..."/>
          <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

          
          <Field name="password" type="password" className="border p-2 rounded bg-white" placeholder="Enter Password"/>
          <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />

          <button type="submit" disabled={isSubmitting} className="font-bold rounded p-2 bg-white">
            {isSubmitting ? 'Register Now...' : 'Register'}
          </button>

          {status && <div className="text-sm text-center mt-1 text-white">{status}</div>}
        </Form>
      )}
    </Formik>
         <p className="text-center font-bold mt-2.5 text-gray-700"> Have Already Account ? <Link to={"/login"} className="text-white ml-2.5 font-bold">Login</Link></p>
     </div>
    </section>
  )
}

export default Register
