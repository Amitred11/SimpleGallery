import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

const VideoViewScreen = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color="white" />
      </TouchableOpacity>
      <Video
        source={{ uri: route.params.video }}
        useNativeControls
        resizeMode="contain"
        shouldPlay
        style={styles.video}
      />
    </View>
  );
};

export default VideoViewScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center' },
  video: { width: '100%', height: '100%' },
  backButton: { position: 'absolute', top: 40, left: 20, zIndex: 10 },
});
