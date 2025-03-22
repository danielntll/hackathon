import { useContextLanguage } from "../../context/contextLanguage";
import "./Base.module.css";
import { text } from "./text";

interface ContainerProps {}

const Base: React.FC<ContainerProps> = (props) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  //USE STATES -----------------------
  //USE EFFECTS ----------------------
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <div className="container">
      <strong>{text[l].title}</strong>
    </div>
  );
};

export default Base;
