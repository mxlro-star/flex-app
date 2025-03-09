import { View, Text } from "react-native";
import ToolCard from "@/features/tool-suite/components/ToolCard";

export default function Tools() {
  return (
    <View>
      <Text>Tools</Text>
      <ToolCard
        title="Inspector+"
        description="Complete HHSRS Inspections"
        route="/inspector"
      />
    </View>
  );
}
