import React, { useRef, useEffect, useState } from "react";
import { Center, Text, Image, Box } from "native-base";
import { Animated, Easing, View } from "react-native";

const WelcomeMessage = ({ username }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const affirmations = [
    "I am a magnet for wealth and abundance.",
    "Money flows to me effortlessly and abundantly.",
    "I deserve to be financially free and prosperous.",
    "I am open to receiving all the wealth that the universe has to offer.",
    "My bank account is constantly increasing.",
    "I release all negative beliefs about money and invite positivity into my life.",
    "Abundance is my birthright, and I claim it now.",
    "I attract opportunities that lead to financial success.",
    "I am grateful for the abundance that is already present in my life.",
    "My income grows higher and higher every day.",
    "I am financially secure and at peace with my money.",
    "I am a money magnet, and prosperity is drawn to me.",
    "I am in alignment with the energy of abundance.",
    "Wealth flows to me from multiple sources.",
    "I am worthy of all the wealth and success that comes my way.",
    "I release all fear and doubt about my financial future.",
    "Money comes to me easily and effortlessly.",
    "I am financially free, and my possibilities are endless.",
    "I attract financial abundance with every thought I think.",
    "My wealth allows me to live a life of purpose and generosity.",
    "I am open to receiving unexpected financial blessings.",
    "I trust that the universe always provides for me.",
    "I am a master at managing my finances wisely.",
    "I create wealth and prosperity with my thoughts and actions.",
    "Every day, I move closer to financial independence.",
  ];

  const [affirmation, setAffirmation] = useState("");

  useEffect(() => {
    const randomAffirmation =
      affirmations[Math.floor(Math.random() * affirmations.length)];
    setAffirmation(randomAffirmation);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Center>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text
          fontSize="2xl"
          fontWeight="bold"
          color="#fff"
          marginTop={2}
          textAlign="center"
        >
          Hello, {username}!
        </Text>
        <Box alignItems="center" marginTop={4}>
          <Animated.View
            style={{
              backgroundColor: "#fff",
              borderRadius: 100,
              padding: 5,
              shadowColor: "#fff",
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 1,
              shadowRadius: 10,
            }}
          >
            <Image
              source={require("../../assets/BBIcon.png")}
              alt="Budget Babe Icon"
              size="200"
              borderRadius="full"
              borderColor="transparent"
            />
          </Animated.View>
        </Box>
        <Text fontSize="2xl" color="#fff" marginTop={2} textAlign="center">
          {affirmation}
        </Text>
      </Animated.View>
    </Center>
  );
};

export default WelcomeMessage;
