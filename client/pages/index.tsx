import { Client, Provider, fetchExchange, gql, useMutation } from "urql";
import React, { useState } from "react";

const UPLOAD_FILE = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file) {
      filename
    }
  }
`;

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [result, uploadFile] = useMutation(UPLOAD_FILE);

  const { data, fetching, error } = result;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      const file = event.target.files[0];
      setSelectedFile(file);
    }
  };
  const handleFileUpload = () => {
    uploadFile({ file: selectedFile });
  };

  return (
    <div>
      {fetching && <p>Loading...</p>}

      {error && <p>Oh no... {error.message}</p>}

      {data && data.uploadFile ? (
        <p>File uploaded to {data.uploadFile.filename}</p>
      ) : (
        <div>
          <input type="file" onChange={handleChange} />
          <button onClick={handleFileUpload}>Upload!</button>
        </div>
      )}
    </div>
  );
};

const client = new Client({
  url: "http://localhost:3000/graphql",
  exchanges: [fetchExchange],
});

export default function Home() {
  return (
    <Provider value={client}>
      <FileUpload />
    </Provider>
  );
}
