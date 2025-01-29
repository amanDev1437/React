
import Header from "./components/Header/Header.jsx";
import CoreConcept from "./components/CoreConcept.jsx";
import Example from "./components/Example.jsx";

const App = () => {
  return (
    <div>
      <Header />
      <main>
        <CoreConcept />
        <Example />
        <h2>Time to get started</h2>
      </main>
    </div>
  );
};

export default App;
