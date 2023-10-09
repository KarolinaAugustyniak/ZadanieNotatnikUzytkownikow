import { useState } from "react";
import axios from "axios";

export default function Popup({ setUsers, userToEdit, onClose }) {
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [newUser, setNewUser] = useState(
    userToEdit
      ? { ...userToEdit, birthDate: userToEdit.birthDate.split("T")[0] }
      : {
          firstName: "",
          lastName: "",
          birthDate: "",
          gender: "",
          phoneNumber: null,
          position: null,
          shoeNumber: null,
        }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const updatedUser = Object.fromEntries(
      Object.entries(newUser).map(([key, value]) => [
        key,
        value === "" ? null : value,
      ])
    );

    if (
      updatedUser.shoeNumber !== null &&
      (updatedUser.shoeNumber > 50 || updatedUser.shoeNumber < 34)
    ) {
      setError("Numer buta powinien być w zakresie 34-50.");
      return;
    }

    try {
      //edit user
      if (userToEdit) {
        const response = await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/api/users/${userToEdit.id}`,
          updatedUser
        );
        //update users state
        if (response.status === 204) {
          setUsers((prevUsers) => {
            return prevUsers.map((user) =>
              user.id === newUser.id ? newUser : user
            );
          });
        }
      } else {
        // add new user
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/users`,
          updatedUser
        );
        //update users state
        if (response.status === 201) {
          setUsers((prevUsers) => {
            return [...prevUsers, response.data];
          });
        }
      }

      setSuccessMessage("Użytkownik zapisany pomyślnie.");
    } catch (error) {
      console.error("Błąd podczas zapisywania użytkownika:", error);
      setError("Błąd podczas zapisywania użytkownika");
    }
  };

  return (
    <div className="popup">
      <div className="popup__overlay" onClick={onClose}></div>
      <div className="popup__inner">
        <div className="popup__wrapper">
          <div></div>
          <h2 className="popup__title">
            {userToEdit ? "Edytuj użytkownika" : "Dodaj nowego użytkownika"}
          </h2>
          <button onClick={onClose} className="popup__close">
            ✕
          </button>
        </div>
        <form className="popup__form">
          <label>
            Imię *
            <input
              type="text"
              name="firstName"
              value={newUser.firstName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Nazwisko *
            <input
              type="text"
              name="lastName"
              value={newUser.lastName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Data Urodzenia *
            <input
              type="date"
              name="birthDate"
              value={newUser.birthDate}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Płeć *
            <select
              name="gender"
              value={newUser.gender}
              onChange={handleChange}
              required
            >
              <option value="">Wybierz płeć</option>
              <option value="Mężczyzna">Mężczyzna</option>
              <option value="Kobieta">Kobieta</option>
            </select>
          </label>
          <label>
            Numer Telefonu
            <input
              type="text"
              name="phoneNumber"
              value={newUser.phoneNumber || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Stanowisko
            <input
              type="text"
              name="position"
              value={newUser.position || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Numer Buta
            <input
              type="number"
              name="shoeNumber"
              min={34}
              max={50}
              value={newUser.shoeNumber || ""}
              onChange={handleChange}
            />
          </label>
          <button onClick={handleSubmit} className="btn popup__btn">
            Zapisz
          </button>

          {error !== "" && <p className="error">{error}</p>}
          {successMessage !== "" && <p className="success">{successMessage}</p>}
        </form>
      </div>
    </div>
  );
}
