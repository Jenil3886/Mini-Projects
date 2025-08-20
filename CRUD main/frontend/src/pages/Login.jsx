import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authapi } from "../services/api";


const Login = ({onLogin}) => {
  const [name , setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isRegister, setIsRegister] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("fsdfdfdfsafsd")
      try {

        console.log()
        if (isRegister) {
            await authapi.register({name, email, password})
            setIsRegister(false)
            setError("Registered. Please login.");
            return
        }
        const res = await authapi.login({email, password})
        const {token, user} = res.data;

        console.log(res.data)

         localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
       onLogin(token, user);
        navigate("/dashboard");
      } catch (error) { 
      setError(error.response?.data?.message || "Error");
      }
    }

    return(
        <div style={{ maxWidth: 480, margin: "2rem auto" }}>
      <h2>{isRegister ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <div>
            <label>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
        )}
        <div>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">{isRegister ? "Register" : "Login"}</button>
      </form>
      <button type="button" onClick={() => setIsRegister(!isRegister)} style={{ marginTop: 10 }}>
  {isRegister ? "Switch to Login" : "Switch to Register"}
</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
    )
}

export default Login