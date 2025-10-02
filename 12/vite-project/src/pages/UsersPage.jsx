import { useEffect, useState } from "react";
import "../App.css";
import useFetchUsers from "../hooks/users/useFetchUsers.jsx";
import { Register } from "../components/user/Register.jsx";
import { Login } from "../components/user/Login.jsx";
import { Edit } from "../components/user/Edit.jsx";
import useDeleteUser from "../hooks/users/useDeleteUser.jsx";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  const [editUser, setEditUser] = useState({
    name: "",
    lastName: "",
    email: "",
    age: "",
    password: "",
    _id: "",
  });
  const { fetchUsers, error, loading, done } = useFetchUsers();
  const { deleteUser, error: deleteError, loading: deleteLoading, done: deleteDone } = useDeleteUser()

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

  const handleEdit = (user) => {
    setEditUser(user);
    setOnEdit(true)
  };

    const handleDelete = async (id) => {
    const res = await deleteUser(id)
    console.log(res)
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
              <button onClick={() => handleEdit(user)}>Editar Usuario</button>
              <button onClick={() => handleDelete(user._id)}>Eliminar Usuario</button>
            </div>
          ))}
        </div>
      )}
      {onEdit && <Edit userData={editUser} />}
      <Register />
      <Login />
    </div>
  );
}

export default UsersPage;

