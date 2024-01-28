import { useFileContext } from "@/context";
import { ChangeEvent } from "react";
import { axiosInstance } from "@/api";

const SingleFileUploader = () => {
  const { state: { file } } = useFileContext();
  let fileToUpload: any = null;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    fileToUpload = e.target.files?.[0];
  };

  const handleUpload = async () => {
    // Do your upload logic here. Remember to use the FileContext
    if (fileToUpload) {
      const formData = new FormData();
      formData.append("file", fileToUpload);
      formData.append("fileName", "file");

      const headers = {
        "Content-Type": "multipart/form-data",
      };

      axiosInstance.post("/process-file", formData, {headers: headers})
      .then(response => {
        console.log("Arquivo enviado com sucesso:", response);
      })
      .catch(error => {
        console.error("Erro ao enviar arquivo:", error);
      });
    } else {
      console.error("Nenhum arquivo selecionado.");
    }
  };

  return (
    <div className = "flex flex-col gap-6">
      <div>
        <label htmlFor="file" className="sr-only">
          Choose a file
        </label>
        <input id="file" type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv" onChange={(e) => handleFileChange(e)} />
      </div>
      {file && (
        <section>
          <p className="pb-6">File details:</p>
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )}

      {file && <button className="rounded-lg bg-green-800 text-white px-4 py-2 border-none font-semibold" onClick={handleUpload}>Upload the file</button>}
    </div>
  );
};

export { SingleFileUploader };
