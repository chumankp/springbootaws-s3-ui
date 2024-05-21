import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table, Button } from 'react-bootstrap';

const API_BASE_URL = 'http://localhost:9095';

function formatFileSize(bytes) {
  if (bytes >= 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  } else if (bytes >= 1024) {
    return (bytes / 1024).toFixed(2) + ' KB';
  } else {
    return bytes + ' bytes';
  }
}

export default function Home() {

  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/files/details`);
        setFiles(response.data);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);


    return (
      <Container>
      <h3 className="my-4"> S3 File Details</h3>
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>File Name</th>
            <th>File Size</th>
            <th>LastModified</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file , index) => (
            <tr key={file.fileName}>
               <td>{index + 1}</td>
              <td>{file.fileName}</td>
              <td>{formatFileSize(file.fileSize)}</td>
              <td>{new Date(file.lastModified).toLocaleString()}</td>
              <td>
                <Button
                  href={`${API_BASE_URL}/files/${file.fileName}`}
                  download
                  variant="primary"
                  size="sm"
                >
                  Download
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
