import { useMemo, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, deleteUser, updateUser, fetchUser } from './store/slices/userSlice';
import * as userActions from './store/slices/userSlice';
import { toggle } from './store/slices/themeSlice';

/*
  Ref: https://www.youtube.com/watch?v=bml92jhF4t8&t=2s
  ToFix: username, setUsername
*/
function App() {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.entities.users);
  const theme = useSelector((state) => state.ui.theme);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const themeColor = useMemo(() => {
    if (theme.dark === true) {
      return { color: "#589cfc", background: "#333" };
    } else {
      return { color: "#000", background: "#fff" };
    }
  }, [theme])

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  const handleOnAddUser = () => {
    const lastUserId = userList.length === 0 ? 0 : userList[userList.length - 1].id;
    dispatch(addUser({ id: lastUserId + 1, name, username }));
  }

  return (
    <div className="App" style={themeColor}>
      <h1>User List</h1>
      <button className='btn-theme' onClick={() => dispatch(toggle())}>Change Theme</button>
      <div className='addUser'>
        <input type="text" placeholder='Name...' onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder='UserName...' onChange={(e) => setUsername(e.target.value)} />
        <button onClick={handleOnAddUser}>Add User</button>
      </div>

      <div className='displayUsers'>
        {userList.map(user => {
          return <div key={user.id}>
            <h3>{user.name}</h3>
            <h4>{user.username}</h4>

            <input type="text" placeholder='New UserName...' onChange={(e) => setUsername(e.target.value)} />
            <button onClick={() => dispatch(updateUser({ id: user.id, username }))}>Update</button>
            <button onClick={() => dispatch(deleteUser({ id: user.id }))}>Delete</button>
          </div>
        })}
      </div>
    </div>
  );
}

export default App;
