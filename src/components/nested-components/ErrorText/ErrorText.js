import "./ErrorText.css";

export const ErrorText = ({ children, type }) => {
  return <p className={`error-text error-text_${type}`}>{children}</p>;
};
