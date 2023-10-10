import axios from "axios";

export default function GenerateBtn() {
  const handleGenerate = () => {
    axios({
      url: `${import.meta.env.VITE_API_BASE_URL}/api/pdffile`,
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));

        const currentDate = new Date();

        const day = currentDate.getDate().toString().padStart(2, "0");
        const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
        const year = currentDate.getFullYear();
        const hours = currentDate.getHours().toString().padStart(2, "0");
        const minutes = currentDate.getMinutes().toString().padStart(2, "0");
        const seconds = currentDate.getSeconds().toString().padStart(2, "0");

        const fileName = `${day}-${month}-${year}_${hours}-${minutes}-${seconds}.pdf`;

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("There was a problem with the axios request:", error);
      });
  };
  return (
    <button onClick={handleGenerate} className="btn">
      Generuj raport
    </button>
  );
}
