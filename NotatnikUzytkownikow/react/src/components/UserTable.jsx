import axios from "axios";

export default function UserTable({ users, setUsers }) {
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

  return (
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
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
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
  );
}
