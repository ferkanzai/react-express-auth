import { useContext, useEffect } from "react";
import { UserContext } from "../../store";

const Home = () => {
  const { setLoading } = useContext(UserContext)

  useEffect(() => setLoading(true))

  return <h1>Bienvenid@ a The Bridge Auth</h1>;
};

export default Home;
