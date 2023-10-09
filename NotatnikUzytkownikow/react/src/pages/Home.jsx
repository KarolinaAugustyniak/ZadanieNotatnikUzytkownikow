import { useEffect, useState } from "react";
import UserTable from "../components/UserTable";
import axios from "axios";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/users`
        );
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Błąd podczas pobierania danych:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleGenerate = () => {};

  return (
    <div className="container">
      <h1>Notatnik użytkowników</h1>
      <div className="buttons">
        <button onClick={handleGenerate} className="btn">
          Generuj raport
        </button>
      </div>
      {loading ? (
        <div className="lds-dual-ring"></div>
      ) : (
        <UserTable users={users} setUsers={setUsers} />
      )}
    </div>
  );
}
