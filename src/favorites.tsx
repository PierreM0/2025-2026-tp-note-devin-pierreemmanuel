import { useSelector } from "react-redux";
import { RootState } from "./stores/store";
import { ScrollView } from "react-native";
import MovieList from "./components/movieList";

const Favorite = () => {
  const favouriteMovies = useSelector(
    (state: RootState) => state.favourite.value,
  );

  return (
    <ScrollView contentContainerStyle={{ flex: 1, alignItems: "center" }}>
      <MovieList movies={favouriteMovies} />
    </ScrollView>
  );
};
export default Favorite;
