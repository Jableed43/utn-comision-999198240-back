import { useState } from "react";

export function Edit({userId}) {
  // El estado de form tiene los mismos campos pero vacios
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    age: "",
    password: "",
  });

  const handleEdit = async (e) => {
    e.preventDefault();
    /* Logica de uso del hook */
    console.log(userId)
  };

  return (
    <>
    <h2>Editar Usuario</h2>
      <form onSubmit={handleEdit}>
        <label htmlFor="name">Nombre</label>
        <input
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          value={form.name}
          type="text"
          id="name"
          name="name"
        />
        <label htmlFor="lastName">Apellido</label>
        <input
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          value={form.lastName}
          type="text"
          id="lastName"
          name="lastName"
        />
        <label htmlFor="email">Email</label>
        <input
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          value={form.email}
          type="email"
          id="email"
          name="email"
        />
        <label htmlFor="age">Edad</label>
        <input
          onChange={(e) => setForm({ ...form, age: e.target.value })}
          value={form.age}
          type="number"
          id="age"
          name="number"
        />
        <label htmlFor="password">Password</label>
        <input
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          value={form.password}
          type="password"
          id="password"
          name="password"
        />
        <button type="submit"> Editar usuario </button> <br />
        <button type="reset"> Borrar todo </button>
      </form>
{/* 
      {done ? <p>Usuario editado!</p> : <></>}
      {error ? <p> {`Error: ${error}`} </p> : <></>} */}
    </>
  );
}
