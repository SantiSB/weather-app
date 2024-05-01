import styles from "./Error.module.scss";

interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className={styles.errorContainer}>
      <p>{message}</p>
    </div>
  );
};

export default Error;
