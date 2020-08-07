import React, { useState } from "react";
import { View, ScrollView, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";

import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";

import styles from "./styles";
import TeacherList from "../TeacherList";

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState([]);

  function loadFavorites() {
    AsyncStorage.getItem("favorites").then((res) => {
      if (res) {
        const favoriteTeachers = JSON.parse(res);

        setFavorites(favoriteTeachers);
      }
    });
  }

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  );

  return (
    <View style={styles.container}>
      <PageHeader title="Meus Proffys favoritos" />

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 24,
        }}
      >
        {favorites.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} isFavorite />;
        })}
      </ScrollView>
    </View>
  );
};

export default Favorites;
