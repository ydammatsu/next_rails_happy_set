import { Client, Provider, fetchExchange, gql, useMutation } from "urql";
import React, { useState } from "react";

const UPLOAD_FILE = gql`
  mutation CreateContentFile($file: Upload!, $name: String) {
    createContentFile(content: $file, name: $name) {
      name
    }
  }
`;

const FORM_SUBMIT = gql`
  mutation FormSubmit($name: String!, $age: String!) {
    formSubmit(name: $name, age: $age) {
      name
    }
  }
`;

const NormalForm = () => {
  // name と age の state を初期化
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const [result, submit] = useMutation(FORM_SUBMIT);
  const { data, fetching, error } = result;

  // name が変更されたときのハンドラ
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  // age が変更されたときのハンドラ
  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAge(event.target.value);
  };

  // フォームが送信されたときのハンドラ
  const handleSubmit = () => {
    submit({
      name,
      age,
    });
  };

  return (
    <>
      <h2>Normal Form</h2>
      <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <br />
      <label>
        Age:
        <input type="number" value={age} onChange={handleAgeChange} />
      </label>
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
};

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
    uploadFile({
      file: selectedFile,
      name: "Hello_" + (selectedFile?.name || ""),
    });
  };

  return (
    <div>
      <h2>File Upload</h2>
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
      <NormalForm />
      <FileUpload />
    </Provider>
  );
}
