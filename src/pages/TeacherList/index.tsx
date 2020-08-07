import React, { useState } from "react";
import { View, ScrollView, Text, TextInput } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";
import api from "../../services/api";

import styles from "./styles";

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const [subject, setSubject] = useState("");
  const [week_day, setWeekDay] = useState("");
  const [time, setTime] = useState("");

  function loadFavorites() {
    AsyncStorage.getItem("favorites").then((res) => {
      if (res) {
        const favoriteTeachers = JSON.parse(res);
        const favoriteTeachersIds = favoriteTeachers.map((teacher: Teacher) => {
          return teacher.id;
        });

        setFavorites(favoriteTeachersIds);
      }
    });
  }

  function handleToggleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible);
  }

  async function handleFilterSubmit() {
    loadFavorites();

    const res = await api.get("classes", {
      params: {
        subject,
        week_day,
        time,
      },
    });
    setIsFiltersVisible(false);
    setTeachers(res.data);
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather
              name="filter"
              size={20}
              color="#FFF"
              style={styles.filterIcon}
            />
            <Text style={styles.textFilter}>Filtros</Text>
          </BorderlessButton>
        }
      >
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matérias</Text>
            <TextInput
              style={styles.input}
              value={subject}
              onChangeText={(text) => setSubject(text)}
              placeholder="Qual a matéria"
              placeholderTextColor="#c1bccc"
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  style={styles.input}
                  value={week_day}
                  onChangeText={(text) => setWeekDay(text)}
                  placeholder="Que dia?"
                  placeholderTextColor="#c1bccc"
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  value={time}
                  onChangeText={(text) => setTime(text)}
                  placeholder="Qual horário?"
                  placeholderTextColor="#c1bccc"
                />
              </View>
            </View>
            <RectButton
              onPress={handleFilterSubmit}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Pesquisar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 24,
        }}
      >
        {teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem
              key={teacher.id}
              teacher={teacher}
              isFavorite={favorites.includes(teacher.id)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default TeacherList;
