import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: THEME.COLORS.OVERLAY,
  },
  content: {
    backgroundColor: THEME.COLORS.SHAPE,
    width: "80%",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    alignSelf: "flex-end",
    margin: 16,
  },
  animation:{
    zIndex: 1,
    
  },
  label: {
    color: THEME.COLORS.TEXT,
    fontSize: THEME.FONT_SIZE.MD,
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
    marginTop: 24,
    marginBottom: 8,
  },
  discordButton: {
    backgroundColor: THEME.COLORS.BACKGROUND_900,
    width: 231,
    height: 56,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  discord: {
    color: THEME.COLORS.TEXT,
    fontSize: THEME.FONT_SIZE.MD,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
  },
});
