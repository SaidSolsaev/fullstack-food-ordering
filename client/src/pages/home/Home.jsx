import FeauteredCategories from "../../compnents/FeauteredCategories/FeauteredCategories";
import Footer from "../../compnents/Footer/Footer";
import Header from "../../compnents/Header/Header";
import Navbar from "../../compnents/Navbar/Navbar";
import PopularFoods from "../../compnents/PopularFoods/PopularFoods";
import "./home.css";

const Home = () => {
  return (
    <div className="homeContainer">
      <Navbar />
      <Header />
      <FeauteredCategories />
      <PopularFoods />
      <Footer />
    </div>
  );
};

export default Home;
