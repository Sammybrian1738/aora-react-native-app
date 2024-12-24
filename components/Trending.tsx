import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { VideoPost } from "@/constants/VideoPost";
import { Models } from "react-native-appwrite";
import Icons from "@/constants/Icons";
import { ResizeMode, Video } from "expo-av";

type TrendingItemProps<T = Record<string, any>> = {
  activeItem: string;
  item: VideoPost;
} & T;

type TrendingProps<T = Record<string, any>> = {
  posts: Array<Models.Document>;
} & T;

const zoomIn = {
  0: {
    scale: 0.9,
    opacity: 1,
  },
  1: {
    scale: 1.1,
    opacity: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1.1,
    opacity: 1,
  },
  1: {
    scale: 0.9,
    opacity: 1,
  },
};

const TrendingItem: React.FC<TrendingItemProps> = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item?.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item?.video }}
          className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          
        />
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item?.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={Icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending: React.FC<TrendingProps> = ({ posts }) => {
  const [activeItem, setActiveItem] = useState("");

  const viewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: Array<any>;
  }) => {
    if (viewableItems?.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem
          activeItem={activeItem}
          item={{
            $id: item.$id,
            title: item?.title,
            thumbnail: item?.thumbnail,
            prompt: item?.prompt,
            video: item?.video,
            creator: item?.creator,
          }}
        />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentOffset={{ x: 170, y: 0 }}
      horizontal
    />
  );
};

export default Trending;
