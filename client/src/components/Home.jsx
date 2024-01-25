import { useState, useEffect } from "react";
import "./style/Home.css";

function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userFetcher = async () => {
      const fetchOptions = {
        method: "GET",
        mode: "cors",
      };
      const res = await fetch("http://localhost:5000/product");
      const data = res.json();
      consol.log(data);
    };
  }, []);

  return (
    <div className="home">
      <h1></h1>
    </div>
  );
}

export default Home;
