import { Image, Text, View } from "react-native";

interface TabsIconProps {
  icon: any;
  color: string;
  name: string;
  focused: boolean;
}

export function TabBarIcon({ icon, color, name, focused }: TabsIconProps) {
  return (
    <View className="justify-center items-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="h-6 w-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{
          color: color,
        }}
      >
        {name}
      </Text>
    </View>
  );
}
