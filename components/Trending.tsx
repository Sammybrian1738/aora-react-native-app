import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { VideoPost } from "@/constants/VideoPost";
import { Models } from "react-native-appwrite";

type TrendingProps<T = Record<string, any>> = {
  posts: Array<Models.Document>;
} & T;

const Trending = <T extends Record<string, any>>({ posts }: TrendingProps) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <Text className="text-3xl text-white">{item.$id}</Text>
      )}
      horizontal
    />
  );
};

export default Trending;
