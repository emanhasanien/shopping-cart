import Login from "./Components/Login";
import Register from "./Components/Register";
import { useAuth } from "./context/AuthContext";



export default function AuthWrapper({ children }) {
  const { session, loading } = useAuth();

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  if (!session) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-center mb-6">أهلاً! سجّل دخول أو أنشئ حساب</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <Login/>
          <Register />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}