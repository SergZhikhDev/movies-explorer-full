import "./Attention.css";

export const Attention = ({ isActiveAttention, messageAttention }) => {
  return (
    <div
      className={
        isActiveAttention
          ? "attention__container"
          : "attention__container_hidden"
      }
    >
      <div className='attention'>
        <p className='attention__text'>{messageAttention}</p>
      </div>
    </div>
  );
};
