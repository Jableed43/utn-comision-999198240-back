import { useState } from "react";
import useLoginUser from "../../hooks/users/useLoginUser";

export const Login = () => {

    const [form, setForm] = useState({
        email: "",
        password: "",
      });

      const { done, error, loginUser } = useLoginUser()

      const handleLogin = (e) => {
        e.preventDefault()
        /* Logica de login */
        const response = loginUser(form)
        console.log(response)
      }

  return (
    <>
        <h2>Ingresá</h2>
      <form onSubmit={handleLogin}>

        <label htmlFor="email">Email</label>
        <input
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          value={form.email}
          type="email"
          id="email"
          name="email"
        />

        <label htmlFor="password">Password</label>
        <input
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          value={form.password}
          type="password"
          id="password"
          name="password"
        />
        <button type="submit"> Login </button> <br />
        <button type="reset"> Borrar todo </button>
      </form>

      {done ? <p>Usuario loggeado!</p> : <></>}
      {error ? <p> {`Error: ${error}`} </p> : <></>}
    </>
  );
}
