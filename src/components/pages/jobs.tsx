import { ScrollView, StyleProp, View, ViewStyle } from "react-native";
import jobsImported from "@/helpers/jobs.json" with { type: "json" };

import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Job } from "@/types";
import { RootStackParamList } from "@/App";
import { Button, Searchbar } from "react-native-paper";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import JobList from "@/components/organism/jobList";
import { useEffect, useState } from "react";

const styles = {
  button: { maxWidth: 200, margin: 20 } as StyleProp<ViewStyle>,
  view: { flex: 1, alignItems: "center" } as StyleProp<ViewStyle>,
  search: { margin: 10 } as StyleProp<ViewStyle>,
};

const Jobs = () => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, "Details">>();

  const favouriteJobs = useSelector(
    (state: RootState) => state.favourite.value,
  );

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(
    jobsImported as never[] as Job[],
  );

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredJobs(jobsImported as never[] as Job[]);
      return;
    }

    const query = searchQuery.toLowerCase();
    setFilteredJobs(
      (jobsImported as never[] as Job[]).filter((j) =>
        j.poste.toLowerCase().includes(query),
      ),
    );
  }, [searchQuery]);

  return (
    <ScrollView>
      <View style={styles.view}>
        <Button
          mode="elevated"
          style={styles.button}
          onPressOut={() => navigation.navigate("Favorites")}
        >
          Favoris ({favouriteJobs.length})
        </Button>
        <Searchbar
          style={styles.search}
          placeholder="search job name"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
        <JobList jobs={filteredJobs} />
      </View>
    </ScrollView>
  );
};

export default Jobs;
