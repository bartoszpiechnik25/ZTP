import { useParams } from "react-router";

const DocumentDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Document Detail Page</h1>
      <p>Document ID: {id}</p>
    </div>
  );
};

export default DocumentDetailPage;
