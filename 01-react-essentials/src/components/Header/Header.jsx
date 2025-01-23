import reactImage from "../../assets/react-core-concepts.png";
import "./Header.css";

const reactDescription = ["Fundamental", "Crucial", "Core"];

function getRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

function Header() {
    const description = reactDescription[getRandomInt(2)];
    return (
      <div>
        <header>
          <img src={reactImage} alt="Stylized atom" />
          <h1>React Essentials</h1>
          <p>
            {description} React concepts you will need for almost any app you are
            going to build!
          </p>
        </header>
      </div>
    );
}

export default Header;