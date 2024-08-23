/** @format */

import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../util/database";

function AllPlaces({ route }) {
  const IsFocused = useIsFocused();
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  useEffect(() => {
    async function LoadPlaces() {
      const currentplaces = await fetchPlaces();
      setLoadedPlaces(currentplaces);
    }
    if (IsFocused) {
      LoadPlaces();
    }
  }, [IsFocused]);

  return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;
