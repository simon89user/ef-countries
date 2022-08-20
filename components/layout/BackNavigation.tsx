import { useRouter } from "next/router";
import { FaLongArrowAltLeft } from "react-icons/fa";

const BackNavigation = () => {
  const router = useRouter();
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <button
            className="btn btn-outline-dark"
            onClick={() => router.back()}
          >
            <FaLongArrowAltLeft /> Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default BackNavigation;
