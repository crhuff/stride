import { useParams } from "react-router-dom";

const PatientDetail = () => {
  const patientId = useParams().id || "";

  return <div>{patientId}</div>;
};

export default PatientDetail;
