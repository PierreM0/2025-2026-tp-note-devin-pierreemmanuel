import { ReactNode } from "react";
import Personne from "../models/personne";
import { View, Text } from "react-native";

type PersonneListProps = {
    personnes: Array<Personne>;
}

function PersonneList({ personnes }: PersonneListProps): ReactNode {
    let persons = [];
    for (let personne of personnes) {
        persons.push(
            <Text key={personne.id} style={{ fontWeight: "bold" }}>{personne.nom} {personne.prenom}</Text>
        )
    }
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            {persons}
        </View>
    )
}

export default PersonneList
