import { useState } from "react";
import {
  View,
  ScrollView,
  ViewStyle,
  StyleProp,
  TextStyle,
} from "react-native";
import { Button, Modal, Portal, Text, TextInput } from "react-native-paper";

const styles = {
  filterButton: { margin: 10, padding: 5 } as StyleProp<ViewStyle>,
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 8,
  } as StyleProp<ViewStyle>,
  rangeText: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 16,
  } as StyleProp<ViewStyle>,
  button: { marginVertical: 5 } as StyleProp<ViewStyle>,
  buttonContainer: { marginTop: 10 } as StyleProp<ViewStyle>,
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  } as StyleProp<ViewStyle>,
  textInput: { flex: 1, marginHorizontal: 5 } as StyleProp<ViewStyle>,
  titleSmall: { marginTop: 20, marginBottom: 10 } as StyleProp<TextStyle>,
};

type FiltreSalaireProps = {
  boundMin: number;
  boundMax: number;
  setSalaryRange: React.Dispatch<React.SetStateAction<[number, number]>>;
  salaryRange: [number, number];
};

const FiltreSalaire = ({
  boundMin,
  boundMax,
  setSalaryRange,
  salaryRange,
}: FiltreSalaireProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [customMin, setCustomMin] = useState("");
  const [customMax, setCustomMax] = useState("");

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const applyCustomRange = () => {
    const min = customMin ? parseInt(customMin) : 0;
    const max = customMax ? parseInt(customMax) : 100_000;

    if (min <= max) {
      setSalaryRange([min, max]);
      setCustomMin("");
      setCustomMax("");
      closeModal();
    }
  };

  const resetFilters = () => {
    setSalaryRange([boundMin, boundMax]);
    closeModal();
  };

  return (
    <View>
      <Button
        mode="outlined"
        style={styles.filterButton}
        onPress={openModal}
        icon="filter"
      >
        Filtres salaire ({salaryRange[0].toLocaleString()}€ -{" "}
        {salaryRange[1].toLocaleString()}€)
      </Button>

      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={closeModal}
          contentContainerStyle={styles.modalContent}
        >
          <ScrollView>
            <Text variant="titleMedium" style={styles.rangeText}>
              Filtres de salaire annuel
            </Text>

            <Text variant="bodyMedium" style={styles.rangeText}>
              Fourchette actuelle: {salaryRange[0].toLocaleString()}€ -{" "}
              {salaryRange[1].toLocaleString()}€
            </Text>

            <Text variant="titleSmall" style={styles.titleSmall}>
              Fourchette personnalisée
            </Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                label="Min (€)"
                value={customMin}
                onChangeText={setCustomMin}
                keyboardType="numeric"
                mode="outlined"
              />
              <TextInput
                style={styles.textInput}
                label="Max (€)"
                value={customMax}
                onChangeText={setCustomMax}
                keyboardType="numeric"
                mode="outlined"
              />
            </View>

            <Button
              mode="contained"
              onPress={applyCustomRange}
              style={styles.button}
              disabled={!customMin && !customMax}
            >
              Appliquer la fourchette
            </Button>

            <View style={styles.buttonContainer}>
              <Button
                mode="contained-tonal"
                onPress={resetFilters}
                style={styles.button}
              >
                Réinitialiser filtre
              </Button>

              <Button
                mode="outlined"
                onPress={closeModal}
                style={styles.button}
              >
                Fermer
              </Button>
            </View>
          </ScrollView>
        </Modal>
      </Portal>
    </View>
  );
};
export default FiltreSalaire;
