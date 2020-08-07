import React from "react";
import { View, Image, Text } from "react-native";

import heartOutlineIcon from "../../assets/images/icons/heart-outline.png";
import unfavoriteIcon from "../../assets/images/icons/unfavorite.png";
import whatsappIcon from "../../assets/images/icons/whatsapp.png";

import styles from "./styles";
import { RectButton } from "react-native-gesture-handler";

const TeacherItem: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={{ uri: "https://github.com/edumazzucco.png" }}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>Eduardo M.</Text>
          <Text style={styles.subject}>Desenvolvimento</Text>
        </View>
      </View>

      <Text style={styles.bio}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        {"\n"}
        {"\n"}
        Nesciunt, laboriosam. Fugiat cumque quos hic odio facilis dolorem vitae,
        incidunt voluptatum totam aliquid quasi modi consequatur, molestiae
        repellendus excepturi provident mollitia.
      </Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          $/hora {"   "}
          <Text style={styles.priceValue}>R$ 150,00</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton style={[styles.favoriteButton, styles.isFavorite]}>
            {/* <Image source={heartOutlineIcon} /> */}
            <Image source={unfavoriteIcon} />
          </RectButton>

          <RectButton style={styles.contactButton}>
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};

export default TeacherItem;
