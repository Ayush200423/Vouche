import Header from "./components/utils/Header/Header";
import Landing from "./components/utils/Landing";

function App() {
  return (
    <>
      <div>
        <Header />
      </div>

      <div className="flex h-max">
        <Landing />
        <div className="bg-red-100">
          
        </div>
      </div>
    </>
  );
}

export default App;
