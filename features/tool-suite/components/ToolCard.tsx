import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from "react-native";
import { Link } from "expo-router";
import { useTheme, createThemedStyles } from "../../../hooks";
import { useRouter } from "expo-router";

interface ToolCardProps {
  title: string;
  description: string;
  icon?: ImageSourcePropType;
  route: string;
  disabled?: boolean;
}

const ToolCard: React.FC<ToolCardProps> = ({
  title,
  description,
  icon,
  route,
  disabled = false,
}) => {
  const theme = useTheme();
  const styles = StyleSheet.create(
    createThemedStyles((theme) => ({
      container: {
        borderRadius: theme.borderRadius.md,
        backgroundColor: theme.colors.background.secondary,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
        shadowColor: theme.colors.shadow.light,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        borderWidth: 1,
        borderColor: theme.colors.border.light,
      },
      disabledContainer: {
        opacity: 0.6,
      },
      contentContainer: {
        flexDirection: "row",
        alignItems: "center",
      },
      iconContainer: {
        width: 50,
        height: 50,
        borderRadius: theme.borderRadius.sm,
        backgroundColor: theme.colors.background.tertiary,
        justifyContent: "center",
        alignItems: "center",
        marginRight: theme.spacing.md,
      },
      icon: {
        width: 30,
        height: 30,
        tintColor: theme.colors.primary[500],
      },
      textContainer: {
        flex: 1,
      },
      title: {
        fontFamily: "NotoSans-SemiBold",
        fontSize: theme.typography.fontSizes.lg,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.xs,
      },
      description: {
        fontFamily: "NotoSans-Regular",
        fontSize: theme.typography.fontSizes.sm,
        color: theme.colors.text.secondary,
      },
    }))
  );

  const router = useRouter();

  const CardContent = () => (
    <View style={styles.contentContainer}>
      {icon && (
        <View style={styles.iconContainer}>
          <Image source={icon} style={styles.icon} resizeMode="contain" />
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );

  if (disabled) {
    return (
      <View style={[styles.container, styles.disabledContainer]}>
        <CardContent />
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={() => !disabled && router.push(route as any)}
    >
      <CardContent />
    </TouchableOpacity>
  );
};

export default ToolCard;
