import s from "./page.module.scss";
import CardContainer from "./components/card-container";
const Page = () => {
  return (
    <div className="container">
      <h1 className={s["header-text"]}>Meet Our Team</h1>
      <CardContainer />
    </div>
  );
};

export default Page;
