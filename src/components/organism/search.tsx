import { Job } from "@/types";
import { useEffect, useState, useMemo } from "react";
import { StyleProp, ViewStyle, View } from "react-native";
import { Searchbar } from "react-native-paper";
import FiltreSalaire from "@/components/atom/salaryFilter";

type SearchProps = {
  setFilteredJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  jobsImported: Job[];
};

const styles = {
  search: { margin: 10 } as StyleProp<ViewStyle>,
};

const Search = ({ setFilteredJobs, jobsImported }: SearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 200000]);

  const filteredResults = useMemo(() => {
    let results = jobsImported;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter((j) => j.poste.toLowerCase().includes(query));
    }

    results = results.filter(
      (j) =>
        j.salaireAnnuel >= salaryRange[0] && j.salaireAnnuel <= salaryRange[1],
    );

    return results;
  }, [searchQuery, salaryRange, jobsImported]);

  useEffect(() => {
    setFilteredJobs(filteredResults);
  }, [filteredResults, setFilteredJobs]);

  const salaryBounds = useMemo(() => {
    const salaries = jobsImported.map(
      (job: { salaireAnnuel: number }) => job.salaireAnnuel,
    );
    return {
      min: Math.min(...salaries),
      max: Math.max(...salaries),
    };
  }, [jobsImported]);

  return (
    <View>
      <Searchbar
        style={styles.search}
        placeholder="Rechercher un poste..."
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <FiltreSalaire
        salaryRange={salaryRange}
        setSalaryRange={setSalaryRange}
        boundMin={salaryBounds.min}
        boundMax={salaryBounds.max}
      />
    </View>
  );
};

export default Search;
