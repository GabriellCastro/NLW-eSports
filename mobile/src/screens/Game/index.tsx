import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GameParams } from "../../@types/@navigation";

import { Background } from "../../components/Background";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";
import { DuoMach } from "../../components/DuoMach";
import { Heading } from "../../components/Heading";

import { Entypo } from "@expo/vector-icons";
import logoImg from "../../assets/logo-nlw-esports.png";
import { THEME } from "../../theme";
import { styles } from "./styles";

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] =
    useState("");

  const route = useRoute();
  const game = route.params as GameParams;

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const getDiscordUser = (adsId: string) => {
    fetch(`http://192.168.0.40:3001/ads/${adsId}/discord`)
      .then((response) => response.json())
      .then((data) => setDiscordDuoSelected(data.discord))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetch(`http://192.168.0.40:3001/games/${game.id}/ads`)
      .then((response) => response.json())
      .then((data) => setDuos(data))
      .catch((error) => console.log(error + " - Error fetching games"));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              size={20}
              color={THEME.COLORS.CAPTION_300}
            />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />

          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />

        <FlatList
          data={duos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard onConnect={() => getDiscordUser(item.id)} data={item} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.containerList}
          contentContainerStyle={[
            duos.length > 0 ? styles.contentList : styles.empytListContent,
          ]}
          ListEmptyComponent={() => (
            <Text style={styles.empytListText}>Nenhum anúncio encontrado.</Text>
          )}
        />

        <DuoMach
          onClose={() => setDiscordDuoSelected("")}
          visible={discordDuoSelected.length > 0 ? true : false}
          discord={discordDuoSelected}
        />
      </SafeAreaView>
    </Background>
  );
}
