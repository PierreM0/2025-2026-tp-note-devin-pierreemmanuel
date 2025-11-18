import { StyleProp, ViewStyle, FlatList } from "react-native";
import { Job } from "@/types";
import JobDetailOnList from "@/components/molecule/jobDetailOnList";

type JobListProps = {
  jobs: Array<Job>;
};

const style = { width: "100%" } as StyleProp<ViewStyle>;

const JobList = ({ jobs }: JobListProps) => {
  jobs = Array.from(new Set(jobs));

  return (
    <FlatList
      style={style}
      data={jobs}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <JobDetailOnList job={item} />}
      initialNumToRender={10}
      maxToRenderPerBatch={5}
      windowSize={5}
    ></FlatList>
  );
};

export default JobList;
