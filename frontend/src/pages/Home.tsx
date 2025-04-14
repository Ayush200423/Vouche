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
        <div className="bg-red-100"></div>
      </div>
    </div>
  );
};

export default Home;
