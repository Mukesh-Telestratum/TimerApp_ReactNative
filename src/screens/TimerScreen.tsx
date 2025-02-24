import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  useColorScheme,
} from "react-native";
import Sound from "react-native-sound";
import { ProgressBar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../components/Routes";
import TrackPlayer, { State } from "react-native-track-player";
import { Picker } from "@react-native-picker/picker";


interface Timer {
  id: string;
  name: string;
  duration: number;
  remainingTime: number;
  category: string;
  status: "Running" | "Paused" | "Completed";
}
type TimerScreenProp = StackNavigationProp<RootStackParamList, 'TimerScreen'>;


const TimerScreen = () => {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [completedTimerName, setCompletedTimerName] = useState("");
  const [showFields, setShowFields] = useState(false); 

  const [completedTimers, setCompletedTimers] = useState<{ [key: string]: { name: string;category: string; completionTime: string }[] }>({});
  const [sound, setSound] = useState<Sound | null>(null);


  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState(["Work", "Exercise", "Study"]);
  const [customCategory, setCustomCategory] = useState("");
  

    const navigation = useNavigation<TimerScreenProp>();
    const theme = useColorScheme();
    const isDarkMode = theme === 'dark';


    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,
        backgroundColor: isDarkMode ? '#121212' : '#fff',
      },
      header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: isDarkMode ? '#fff' : '#000',
      },
      input: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: isDarkMode ? '#333' : '#fff',
        color: isDarkMode ? '#fff' : '#000',
        borderColor: isDarkMode ? '#444' : '#ccc',
      },
      addButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
      },
      addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
      },
      categoryContainer: {
        marginBottom: 10,
      },
      categoryHeader: {
        backgroundColor: isDarkMode ? '#444' : '#ddd',
        padding: 10,
        borderRadius: 5,
      },
      categoryText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: isDarkMode ? '#fff' : '#000',
      },
      timerItem: {
        backgroundColor: isDarkMode ? '#222' : '#f9f9f9',
        padding: 10,
        marginTop: 5,
        borderRadius: 5,
        marginBottom: 5,
      },
      timerName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: isDarkMode ? '#fff' : '#000',
      },
      timerNameSub: {
        fontSize: 14,
        color: isDarkMode ? '#fff' : '#000',
      },
      timerButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
      },
      modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContent: {
        backgroundColor: isDarkMode ? '#333' : '#fffae5',
        padding: 30,
        borderRadius: 20,
        alignItems: 'center',
        width: '80%',
      },
      modalText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: isDarkMode ? '#fff' : '#333',
      },
      modalTextS: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: isDarkMode ? '#fff' : '#333',
      },
      modalButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        paddingHorizontal: 35,
        alignItems: 'center',
        borderRadius: 25,
        width: '80%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
      },
      modalButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
      },
      buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10,
      },
      button: {
        flex: 0.45,
        marginHorizontal: 5,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    modalTextLarge: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#333" },
    cancelButton: {
      backgroundColor: 'red',
    },
    addButtonA: {
      backgroundColor: 'green',
    },
    inputText:{
      marginTop:10
    },
    marginB:{
      marginBottom:3
    },
    marginT:{
      marginTop:5
    },
    timerButton: {
      backgroundColor: "#007BFF",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginHorizontal: 5,
    },
    buttonText: { color: "#fff", fontSize: 18,fontWeight:'bold' },
    buttonContainer: { flexDirection: "row", justifyContent: "space-around", marginTop: 10, },



    picker: {
      height: 45,
      fontSize: 16,
    },
    newCategoryContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
      
    },
    newCategoryInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: isDarkMode ? '#444' : '#ccc',
      borderRadius: 8,
      padding: 10,
      fontSize: 16,
      backgroundColor: isDarkMode ? '#333' : '#fff',

    },
    addCategoryButton: {
      backgroundColor: "#27ae60",
      padding: 16,
      borderRadius: 8,
      marginLeft: 5,
    },
    addCategoryButtonText: {
      color: "white",
      fontWeight: "bold",
    },
    pickerContainer: {
      borderWidth: 1,
      borderColor: isDarkMode ? '#444' : '#ccc',
      borderRadius: 5,
      backgroundColor: isDarkMode ? '#333' : '#fff',
      paddingVertical: 2, // Adjust padding to match the TextInput
      paddingHorizontal: 10,
      justifyContent: "center",
      marginBottom: 10,
      color: isDarkMode ? '#fff' : '#000',
    },
    });


  useEffect(() => {
    loadTimers();
  }, []);


  const setupPlayer = async () => {
    const isSetup = await TrackPlayer.isServiceRunning();
    if (!isSetup) {
      try {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.add({
          id: "1",
          url: require("../assets/song.mp3"), 
          title: "Congratulations",
          artist: "App",
        });
      } catch (error) {
        console.error("Error setting up TrackPlayer:", error);
      }
    }
  };


  useEffect(() => {
    setupPlayer();
  
    return () => {
      TrackPlayer.stop(); 
    };
  }, []);

  useEffect(() => {
    const handlePlayback = async () => {
      if (modalVisible) {
        await TrackPlayer.stop(); 
        await TrackPlayer.seekTo(0); 
        await TrackPlayer.play();
      } else {
        const playerState = await TrackPlayer.getState();
        if (playerState === State.Playing) {
          await TrackPlayer.stop(); 
        }
      }
    };
  
    handlePlayback();
  }, [modalVisible]);

const cancelNewTimer = () => {
    setShowFields(false);
    setName("");
    setDuration("");
    setCategory("");
};

  
  const saveCompletedTimer = async (timer: Timer, completionTime: string) => {
    try {
      // Prepare the new completed timer data
      const newCompletedTimer = { name: timer.name, category: timer.category, completionTime };
  
      // Retrieve the existing completed timers from AsyncStorage
      const storedTimers = await AsyncStorage.getItem("completedTimers");
      let parsedTimers: { [key: string]: { name: string; category: string; completionTime: string }[] } = {};
  
      if (storedTimers) {
        parsedTimers = JSON.parse(storedTimers);
      }
  
      // Add the new completed timer to the correct category
      if (parsedTimers[timer.category]) {
        parsedTimers[timer.category].push(newCompletedTimer);
      } else {
        parsedTimers[timer.category] = [newCompletedTimer];
      }
  
      // Save the updated completed timers back to AsyncStorage
      await AsyncStorage.setItem("completedTimers", JSON.stringify(parsedTimers));
  
      // Update the state with the new completed timer
      setCompletedTimers((prev) => {
        const updatedTimers = { ...prev };
        if (updatedTimers[timer.category]) {
          updatedTimers[timer.category].push(newCompletedTimer);
        } else {
          updatedTimers[timer.category] = [newCompletedTimer];
        }
        return updatedTimers;
      });
  
    } catch (error) {
      console.error("Failed to save completed timer:", error);
    }
  };
  

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) =>
        prevTimers.map((timer) => {
          if (timer.status === "Running" && timer.remainingTime > 0) {
            return { ...timer, remainingTime: timer.remainingTime - 1 };
          }
          if (timer.status === "Running" && timer.remainingTime === 0) {
            setCompletedTimerName(timer.name);
            setModalVisible(true);

            const completionTime = new Date().toLocaleString();
            saveCompletedTimer(timer, completionTime);

            return { ...timer, status: "Completed" };
          }
          return timer;
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    saveTimers(timers);
  }, [timers]);

  const saveTimers = async (timers: Timer[]) => {
    try {
      await AsyncStorage.setItem("timers", JSON.stringify(timers));
    } catch (error) {
      console.error("Failed to save timers:", error);
    }
  };

  const loadTimers = async () => {
    try {
      const storedTimers = await AsyncStorage.getItem("timers");
      if (storedTimers) {
        setTimers(JSON.parse(storedTimers));
      }
    } catch (error) {
      console.error("Failed to load timers:", error);
    }
  };

  const addTimer = () => {
    if (!name || !duration || !category) {
      Alert.alert("Please fill all fields!");
      return;
    }

    const parsedDuration = parseInt(duration, 10);
    if (isNaN(parsedDuration) || parsedDuration <= 0) {
      Alert.alert("Invalid duration value!");
      return;
    }

    const newTimer: Timer = {
      id: Date.now().toString(),
      name,
      duration: parsedDuration,
      remainingTime: parsedDuration,
      category,
      status: "Paused",
    };

    setTimers([...timers, newTimer]);
    setName("");
    setDuration("");
    setCategory("");
    setShowFields(false);
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleCategoryChange = (value: string) => {
    if (value === "create_new") {
      setSelectedCategory("");
      setCustomCategory("");
    } else {
      setSelectedCategory(value);
      setCategory(value)
      setCustomCategory("");
    }
  };

  const addNewCategory = () => {
    if (customCategory.trim() !== "" && !categories.includes(customCategory)) {
      setCategories([...categories, customCategory]);
      setSelectedCategory(customCategory);
      setCustomCategory("");
    }
  };

  const startTimer = (id: string) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id && timer.status !== "Completed" ? { ...timer, status: "Running" } : timer
      )
    );
  };

  const pauseTimer = (id: string) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id ? { ...timer, status: "Paused" } : timer
      )
    );
  };

  const resetTimer = (id: string) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id ? { ...timer, remainingTime: timer.duration, status: "Paused" } : timer
      )
    );
  };

  const groupedTimers = timers.reduce((acc: { [key: string]: Timer[] }, timer) => {
    if (!acc[timer.category]) {
      acc[timer.category] = [];
    }
    acc[timer.category].push(timer);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create a Timer</Text>

      {!showFields && ( 
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowFields(!showFields)} 
      >
        <Ionicons name="add" size={24} color="white" />
        <Text style={styles.addButtonText}>New Timer</Text>
      </TouchableOpacity>
      )}

      {showFields && (
        <View style={styles.inputText}>
          <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
          <TextInput
            style={styles.input}
            placeholder="Duration (seconds)"
            keyboardType="numeric"
            value={duration}
            onChangeText={setDuration}
          />

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedCategory}
              onValueChange={handleCategoryChange}
              style={styles.picker}
              dropdownIconColor="gray"
            >
              {categories.map((cat, index) => (
                <Picker.Item key={index} label={cat} value={cat} />
              ))}
              <Picker.Item label="➕ Create New Category" value="create_new" />
            </Picker>
          </View>

          {selectedCategory === "" && (
            <View style={styles.newCategoryContainer}>
              <TextInput
                style={styles.newCategoryInput}
                placeholder="Enter new category"
                value={customCategory}
                onChangeText={setCustomCategory}
              />
              <TouchableOpacity onPress={addNewCategory} style={styles.addCategoryButton}>
                <Text style={styles.addCategoryButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.cancelButton,styles.button]} onPress={cancelNewTimer}>
              <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.addButtonA,styles.button]} onPress={addTimer}>
            <Text style={styles.addButtonText}>Add Timer</Text>
          </TouchableOpacity>
          </View>
        </View>
      )}
                
      <Text style={[styles.header,styles.marginT]}>Your Goals :</Text>

      <FlatList
        data={Object.keys(groupedTimers)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.categoryContainer}>
            <TouchableOpacity onPress={() => toggleCategory(item)} style={styles.categoryHeader}>
              <Text style={styles.categoryText}>
                {expandedCategories[item] ? "▼" : "▶"} {item}
              </Text>
            </TouchableOpacity>
            {expandedCategories[item] &&
              groupedTimers[item].map((timer) => (
                <View key={timer.id} style={styles.timerItem}>
                  <Text style={styles.timerName}>{timer.name}</Text>
                  <Text style={[styles.marginB,styles.timerNameSub]}>Remaining Time: {timer.remainingTime}s</Text>
                  <Text style={[styles.marginB,styles.timerNameSub]}>Status: {timer.status}</Text>

                  <ProgressBar
                    progress={
                      timer.duration > 0 && timer.remainingTime >= 0
                        ? timer.remainingTime / timer.duration
                        : 0
                    }
                    color="skyblue"
                    style={{ height: 20 ,borderRadius:10,marginTop:10,marginBottom:10}}
                  />

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[styles.timerButton, { backgroundColor: timer.status === "Running" ? "gray" : "green" }]}
                      onPress={() => startTimer(timer.id)}
                      disabled={timer.status === "Running"}
                    >
                      <Text style={styles.timerButtonText}>Start</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.timerButton, { backgroundColor: timer.status !== "Running" ? "gray" : "red" }]}
                      onPress={() => pauseTimer(timer.id)}
                      disabled={timer.status !== "Running"}
                    >
                      <Text style={styles.timerButtonText}>Pause</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.timerButton} onPress={() => resetTimer(timer.id)}>
                      <Text style={styles.timerButtonText}>Reset</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("HistoryScreen")}
      >
        <Ionicons name="timer-outline" size={24} color="white" />
        <Text style={styles.addButtonText}>Timer History</Text>
      </TouchableOpacity>

      <Modal transparent={true} animationType="slide" visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>🎉 Congratulations! 🎉</Text>
            <Text style={[styles.modalTextLarge,styles.modalTextS]}>You completed: {completedTimerName}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default TimerScreen;