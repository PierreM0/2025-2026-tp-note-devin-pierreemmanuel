import { StyleProp, View, ViewStyle } from "react-native";
import jobsImported from "@/helpers/jobs.json" with { type: "json" };

import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Job } from "@/types";
import { RootStackParamList } from "@/App";
import { Text, Button } from "react-native-paper";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import JobList from "@/components/organism/jobList";
import Search from "@/components/organism/search";
import { useState } from "react";

const styles = {
  button: { maxWidth: 200, margin: 20 } as StyleProp<ViewStyle>,
  view: { flex: 1, alignItems: "center" } as StyleProp<ViewStyle>,
};

const Jobs = () => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, "Details">>();

  const favouriteJobs = useSelector(
    (state: RootState) => state.favourite.value,
  );

  const [filteredJobs, setFilteredJobs] = useState<Job[]>(
    jobsImported as Job[],
  );

  return (
    <View style={styles.view}>
      <Button
        mode="elevated"
        style={styles.button}
        onPressOut={() => navigation.navigate("Favorites")}
      >
        Favoris ({favouriteJobs.length})
      </Button>
      <Search
        jobsImported={jobsImported as Job[]}
        setFilteredJobs={setFilteredJobs}
      />
      <Text>{filteredJobs.length} annonces</Text>
      <JobList jobs={filteredJobs} />
    </View>
  );
};

export default Jobs;
