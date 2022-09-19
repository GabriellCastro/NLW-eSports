import { MaterialIcons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import LottieView from "lottie-react-native";
import { CheckCircle } from "phosphor-react-native";
import { useState } from "react";
import { Modal, ModalProps, Text, TouchableOpacity, View } from "react-native";

import { THEME } from "../../theme";
import { Heading } from "../Heading";
import { styles } from "./styles";

interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMach({ discord, onClose, ...rest }: Props) {
  const [animation, setAnimation] = useState(false);

  async function handleCopy() {
    await Clipboard.setStringAsync(discord);
    setAnimation(!animation);
  }

  return (
    <Modal transparent statusBarTranslucent animationType="fade" {...rest}>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={() => {
              onClose();
              setAnimation(false);
            }}
          >
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>
          <CheckCircle color={THEME.COLORS.SUCCESS} size={64} weight="bold" />

          <Heading
            title="Duo encontrado!"
            subtitle="Agora é só começar a jogar!"
            style={{ alignItems: "center", marginTop: 24 }}
          />

          <Text style={styles.label}>Adicione no Discord</Text>

          <TouchableOpacity
            style={styles.discordButton}
            onPress={() => handleCopy()}
          >
            {animation ? (
              <LottieView
                source={require("../../../assets/copy.json")}
                autoPlay
                loop
                style={styles.animation}
              />
            ) : (
              <Text style={styles.discord}>{discord}</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
