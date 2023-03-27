import axios from "axios";
import {useEffect, useState} from "react";

export default function OpenAPIWithUseEffectPage() {
  const [dogsUrl, setDogUrl] = useState("");

  useEffect(() => {
    const fetchDog = async () => {
      const result = await axios.get("https://dog.ceo/api/breeds/image/random");
      console.log(result.data.message);
      setDogUrl(result.data.message);
    };
    void fetchDog();
  }, []);

  return (
    <>
      <img src={dogsUrl} />
    </>
  );
}
