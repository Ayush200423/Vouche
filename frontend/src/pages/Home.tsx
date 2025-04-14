import Header from "../components/utils/home/header/Header";
import Landing from "@/components/utils/home/Landing";

const Home = () => {
  return (
    <div>
      <div>
        <Header />
      </div>

      <div className="flex h-max">
        <Landing />
      </div>
    </div>
  );
};

export default Home;
