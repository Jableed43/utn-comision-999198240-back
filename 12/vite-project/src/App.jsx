// ok, me estas dando todo el codigo, quiero que ademas del fetchusers veas el app, que es donde se muestra el listado de usuarios:

import { useEffect, useState } from "react";
import "./App.css";
import useFetchUsers from "./hooks/useFetchUsers";
import { Register } from "./components/user/Register";
import { Login } from "./components/user/Login";
import { Edit } from "./components/user/Edit";

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  const [idEditUser, setIdEditUser] = useState("");
  const { fetchUsers, error, loading, done } = useFetchUsers();


  useEffect(() => {
    const loadUser = async () => {
      let usersFetched = null;
      if(!done){
      usersFetched = await fetchUsers();
      }
      if (usersFetched) {
        setUsers(usersFetched);
      }
    };
    loadUser();
  }, [fetchUsers]);

  console.log(users);

  const handleEdit = (id) => {
    setIdEditUser(id);
    setOnEdit(true)
  };

  return (
    <div>
      {error ? <p>error</p> : <></>}
      <h1> Usuarios </h1>
      {loading ? (
        <p> Cargando usuarios </p>
      ) : (
        <div className="user-card-wrapper">
          {users.map((user) => (
            // Donde ponemos el id?
            // El id se coloca en el elemento que se va a repetir por cada registro

            <div className="user-card" key={user._id}>
              <h2> {user.name} </h2>
              <h2> {user.lastName} </h2>
              <h3> {user.email} </h3>
              <h4>{user.age}</h4>
              <button onClick={() => handleEdit(user._id)}>Editar Usuario</button>
            </div>
          ))}
        </div>
      )}
      {onEdit && <Edit userId={idEditUser} />}
      <Register />
      <Login />
    </div>
  );
}

export default App;
