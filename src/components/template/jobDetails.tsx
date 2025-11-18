import {
  View,
  ScrollView,
  Image,
  ViewStyle,
  StyleProp,
  TextStyle,
  ImageStyle,
} from "react-native";
import { Text, Button } from "react-native-paper";
import { Job } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { push, remove } from "@/stores/favouriteSlice";
import React from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/App";

export type JobDetailProps = {
  route: {
    params: { job: Job };
  };
};

const JobDetails = ({ route }: JobDetailProps) => {
  const job: Job = route.params.job;

  const dispatch = useDispatch();
  const favouriteJobs = useSelector(
    (state: RootState) => state.favourite.value,
  );

  const isInFavourite = (id: string): boolean => {
    return favouriteJobs.some((job: Job) => job.id === id);
  };

  const styles = {
    buttonStyle: { marginTop: 10 } as StyleProp<ViewStyle>,
    scrollviewMain: { flex: 1 } as StyleProp<ViewStyle>,
    srollviewContentContainer: {
      flexGrow: 1,
      padding: 16,
      paddingBottom: 32,
    } as StyleProp<ViewStyle>,

    marginBottomDouble: {
      marginBottom: 16,
    } as StyleProp<TextStyle>,
    marginBottom: {
      marginBottom: 8,
    } as StyleProp<TextStyle>,
    imageStyle: {
      height: 50, // Hauteur fixe au lieu de pourcentage
      width: "100%",
      borderRadius: 25,
      borderColor: "lavender",
      marginBottom: 16,
      imageRendering: "pixelated",
      flex: 1,
    } as StyleProp<ImageStyle>,
    entreprise: {
      flexDirection: "row",
      display: "flex",
    } as StyleProp<ViewStyle>,
    entrepriseText: {
      marginBottom: 16,
      flex: 4,
    } as StyleProp<ViewStyle>,
  };

  const navigation =
    useNavigation<NavigationProp<RootStackParamList, "Details">>();

  return (
    <ScrollView
      style={styles.scrollviewMain}
      contentContainerStyle={styles.srollviewContentContainer}
    >
      <Text variant="titleLarge" style={styles.marginBottomDouble}>
        {job.poste}
      </Text>

      <Text variant="titleMedium" style={styles.marginBottom}>
        Information
      </Text>
      <Text>Salaire annuel: {job.salaireAnnuel}</Text>
      <Text>Adresse email RH: {job.email}</Text>
      <Text>Numero RH: {job.telephone}</Text>
      <Text>
        Date de l'annonce: {new Date(job.date).toLocaleDateString("fr")}
      </Text>

      <Text variant="titleMedium" style={styles.marginBottom}>
        Entreprise
      </Text>

      <View style={styles.entreprise}>
        <Image
          style={styles.imageStyle}
          source={{ uri: job.entreprisePhoto }}
          resizeMode="cover"
        />

        <View style={styles.entrepriseText}>
          <Text variant="titleSmall">{job.entreprise}</Text>
          <Text style={{ marginBottom: 2 }}>Ville: {job.ville}</Text>
          <Text>
            Adresse: {job.numeroRue} {job.rue}
          </Text>
        </View>
      </View>

      <Text variant="titleSmall">Description</Text>
      <Text>{job.description}</Text>

      {!isInFavourite(job.id) ? (
        <Button
          style={styles.buttonStyle}
          mode="contained"
          onPress={() => {
            dispatch(push(job));
            navigation.navigate("Favorites");
          }}
        >
          Ajouter au favoris
        </Button>
      ) : (
        <Button
          style={styles.buttonStyle}
          mode="outlined"
          onPress={() => dispatch(remove(job.id))}
        >
          Supprimer des favoris
        </Button>
      )}
    </ScrollView>
  );
};

export default JobDetails;
