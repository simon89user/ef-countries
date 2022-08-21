import { useRouter } from "next/router";
import { FaLongArrowAltLeft } from "react-icons/fa";
import styles from "../../styles/BackNavigation.module.scss";

const BackNavigation = () => {
  const router = useRouter();
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className={styles.btnWrapper}>
            <button
              className={styles.btnBack + " btn btn-outline-dark"}
              onClick={() => router.back()}
            >
              <FaLongArrowAltLeft /> Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackNavigation;
