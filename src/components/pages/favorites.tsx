import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { View } from "react-native";
import { Text } from "react-native-paper";
import JobList from "@/components/organism/jobList";

const Favorite = () => {
  const favouriteJobs = useSelector(
    (state: RootState) => state.favourite.value,
  );

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      {favouriteJobs.length === 0 ? (
        <Text>Il n'y a pas de favoris pour le moment</Text>
      ) : (
        <JobList jobs={favouriteJobs} />
      )}
    </View>
  );
};
export default Favorite;
