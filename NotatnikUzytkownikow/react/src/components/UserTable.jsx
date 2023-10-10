import axios from "axios";
import { useState } from "react";
import Popup from "./Popup";

export default function UserTable({ users, setUsers }) {
  const [showPopup, setShowPopup] = useState(false);
  const [userToEdit, setUserToEdit] = useState(false);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/${id}`
      );
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Błąd podczas usuwania użytkownika:", error);
    }
  };

  const handleEdit = (user) => {
    setUserToEdit(user);
    setShowPopup((prev) => !prev);
  };

  const togglePopup = () => {
    setShowPopup((prev) => !prev);
  };

  return (
    <div className="user-table">
      <table>
        <thead>
          <tr>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Data Urodzenia</th>
            <th>Płeć</th>
            <th>Numer Telefonu</th>
            <th>Stanowisko</th>
            <th>Numer Buta</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td onClick={() => handleEdit(user)} className="clickable">
                {user.firstName}
              </td>
              <td onClick={() => handleEdit(user)} className="clickable">
                {user.lastName}
              </td>
              <td>{new Date(user.birthDate).toLocaleDateString()}</td>
              <td>{user.gender}</td>
              <td>{user.phoneNumber || "-"}</td>
              <td>{user.position || "-"}</td>
              <td>{user.shoeNumber || "-"}</td>
              <td>
                <button onClick={() => handleDelete(user.id)} className="btn">
                  Usuń
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showPopup && (
        <Popup
          setUsers={setUsers}
          userToEdit={userToEdit}
          onClose={togglePopup}
        />
      )}
    </div>
  );
}
