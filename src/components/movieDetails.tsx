import { View, Text, Image } from "react-native";
import { type MovieDetailsProps } from "./movieDetailsOnList";

export const MovieDetails = ({ route }: MovieDetailsProps) => {
  const movie = route.params.movie;
  return (
    <View>
      <Image
        source={{
          uri:
            `https://image.tmdb.org/t/p/w500${movie.poster_path}` ||
            "https://freesvg.org/img/Image-Not-Found.png",
        }}
      />
      <Text>{movie.title}</Text>
      <Text>{movie.vote_average}</Text>
      <Text>{movie.original_language}</Text>
      <Text>{movie.overview}</Text>
    </View>
  );
};
