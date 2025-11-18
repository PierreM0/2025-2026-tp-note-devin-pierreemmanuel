import { RootStackParamList } from "@/App";
import { Job } from "@/types";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { Card, Text } from "react-native-paper";

type JobDetailOnListProps = {
  job: Job;
};

const styles = {
  card: {
    margin: 10,
    borderRadius: 10,
    padding: 20,
    flexDirection: "column",
  } as StyleProp<ViewStyle>,
  text: { fontStyle: "italic" } as StyleProp<TextStyle>,
};

const JobDetailOnList = ({ job }: JobDetailOnListProps) => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, "Details">>();

  return (
    <Card
      key={job.id}
      style={styles.card}
      onPress={() => navigation.navigate("Details", { job: job })}
    >
      <Card.Title title={job.poste} />
      <Card.Content>
        <Text style={styles.text}>Entreprise: {job.entreprise}</Text>
        <Text>
          Date de l'annonce: {new Date(job.date).toLocaleDateString("fr")}
        </Text>
      </Card.Content>
    </Card>
  );
};

export default JobDetailOnList;
