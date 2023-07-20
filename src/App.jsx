import { useEffect, useState } from "react"
import useFetch from "./hook/useFetch"
import './App.css'
import UserCard from "./components/UserCard"
import FormUsers from "./components/FormUsers"

function App() {

  const [updateInfo, setUpdateInfo] = useState()



  const baseUrl = 'https://users-crud.academlo.tech'
  //1.Importamos el useFetch que devuelve un arreglo con las funciones que creamos en nuestro custom hook
  const [closeForm, setCloseForm] = useState(true)

  const [users,
    getAllUsers,
    createNewUser,
    deleteUserById,
    updateUsers
  ] = useFetch(baseUrl , setCloseForm)

const handleOpen= ()=>{
  setCloseForm(false)
}
  //2.Creamos un useEffect para obetener la informacion en el primer renderizado
  useEffect(() => {
    getAllUsers('/users')
  }, [])


  console.log(users);
  return (
    <div>
      <h1>Users</h1>
      <button onClick={handleOpen} className="formuser__btn">Open Form</button>
      <FormUsers 
      createNewUser={createNewUser}
      updateInfo={updateInfo}
      updateUsers={updateUsers}
      setUpdateInfo={setUpdateInfo}
      closeForm={closeForm}
      setCloseForm={setCloseForm}
      />
      <div>
        {
          users?.map(user=>(

            <UserCard 
            key={user.id}
            user={user}
            deleteUserById={deleteUserById}
            setUpdateInfo={setUpdateInfo}
            handleOpen={handleOpen}
            />
          ))

        }
      </div>
    </div>
  )
}

export default App
