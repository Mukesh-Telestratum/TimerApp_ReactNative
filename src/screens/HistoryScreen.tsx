import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, useColorScheme, Alert } from "react-native";
import { RootStackParamList } from "../components/Routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNFS from "react-native-fs"; 

export interface CompletedTimer {
  name: string;
  completionTime: string;
  category: string;
}

type HistoryScreenProps = StackScreenProps<RootStackParamList, "HistoryScreen">;

const HistoryScreen = ({ route, navigation }: HistoryScreenProps) => {
    const [completedTimers, setCompletedTimers] = useState<{ name: string; category: string; completionTime: string }[]>([]);
    const colorScheme = useColorScheme();

    useEffect(() => {
        const loadCompletedTimers = async () => {
            try {
                const storedTimers = await AsyncStorage.getItem("completedTimers");
    
                let currentCompletedTimers = []; 
    
                if (storedTimers) {
                    const parsedTimers = JSON.parse(storedTimers);
    
                    currentCompletedTimers = Object.keys(parsedTimers).flatMap((category) => {
                        return parsedTimers[category].map((timer: CompletedTimer) => ({
                            ...timer,
                            category,
                        }));
                    });
                }
    
                setCompletedTimers(currentCompletedTimers);
            } catch (error) {
                console.error("Failed to load completed timers:", error);
            }
        };
    
        loadCompletedTimers();
    }, []);
    

const exportDataAsJson = async () => {
    if (completedTimers.length === 0) {
        Alert.alert("No Data", "There are no completed timers to export.");
        return;
    }

    try {
        const directoryPath = RNFS.ExternalDirectoryPath; 
        const filePath = `${directoryPath}/completed_timers.json`;
        const jsonData = JSON.stringify(completedTimers, null, 2);

        await RNFS.writeFile(filePath, jsonData, "utf8");

        Alert.alert("Success", `File saved at:\n${filePath}`);
    } catch (error) {
        console.error("Error exporting data:", error);
        Alert.alert("Error", "Failed to export data.");
    }
};

    
    const isDarkMode = colorScheme === "dark";

    return (
        <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
            <Text style={[styles.header, isDarkMode ? styles.darkText : styles.lightText]}>Completed Goals</Text>
            <FlatList
                data={completedTimers}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={[styles.historyItem, isDarkMode ? styles.darkItem : styles.lightItem]}>
                        <Text style={[styles.categoryHeader, isDarkMode ? styles.darkCategory : styles.lightCategory]}>{item.category}</Text>
                        <View style={styles.timerDetails}>
                            <Text style={[styles.timerName, isDarkMode ? styles.darkText : styles.lightText]}>{item.name}</Text>
                            <Text style={[styles.completionTime, isDarkMode ? styles.darkSubText : styles.lightSubText]}>Completed At: {item.completionTime}</Text>
                        </View>
                    </View>
                )}
            />
            <TouchableOpacity style={styles.exportButton} onPress={exportDataAsJson}>
                <Text style={styles.exportButtonText}>Export Data as JSON</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 20, 
    },
    lightContainer: {
        backgroundColor: "#f0f0f0",
    },
    darkContainer: {
        backgroundColor: "#121212",
    },
    lightText: {
        color: "#333",
    },
    darkText: {
        color: "#f8f8f8",
    },
    header: { 
        fontSize: 24, 
        fontWeight: "bold", 
        marginBottom: 20, 
        textAlign: "center",
    },
    historyItem: {
        marginBottom: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2, 
        padding: 15,
    },
    lightItem: {
        backgroundColor: "#fff",
    },
    darkItem: {
        backgroundColor: "#1E1E1E",
    },
    categoryHeader: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    lightCategory: {
        color: "#007BFF",
    },
    darkCategory: {
        color: "#4DA8DA",
    },
    timerDetails: {
        paddingLeft: 10,  
    },
    timerName: {
        fontSize: 18,
        fontWeight: "600",
    },
    completionTime: {
        fontSize: 14,
        color: "#666",  
        marginTop: 5,
    },
    lightSubText: {
        color: "#666",
    },
    darkSubText: {
        color: "#A9A9A9",
    },
    exportButton: {
        backgroundColor: "#007BFF",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
    },
    exportButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default HistoryScreen;