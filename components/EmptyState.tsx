import { View, Text, Image } from "react-native";
import React from "react";
import Images from "@/constants/Images";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

type EmptyStateProps<T = Record<string, any>> = {
  title: string;
  subtitle: string;
} & T;

const EmptyState: React.FC<EmptyStateProps> = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={Images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="text-xl text-center font-psemibold text-white mt-2">
        {title}
      </Text>
      <Text className="text-sm font-pmedium text-gray-100">{subtitle}</Text>
      <CustomButton
        title="Create Video"
        handlePress={() => router.push("/create")}
        containerStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
