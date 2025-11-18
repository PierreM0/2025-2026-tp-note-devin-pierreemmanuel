import { View } from "react-native";
import { Job } from "@/types";
import JobDetailOnList from "@/components/molecule/jobDetailOnList";

type JobListProps = {
  jobs: Array<Job>;
};

const JobList = ({ jobs }: JobListProps) => {
  jobs = Array.from(new Set(jobs));

  return (
    <View>
      {jobs.map((job) => {
        return <JobDetailOnList key={job.id} job={job} />;
      })}
    </View>
  );
};

export default JobList;
