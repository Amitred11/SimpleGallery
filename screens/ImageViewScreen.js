import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ImageViewScreen = ({ route, navigation }) => {
  return (
    <View style={styles.fullImageContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color="white" />
      </TouchableOpacity>
      <Image source={{ uri: route.params.image }} style={styles.fullImage} />
    </View>
  );
};

export default ImageViewScreen;

const styles = StyleSheet.create({
  fullImageContainer: { flex: 1, backgroundColor: '#000', justifyContent: 'center' },
  fullImage: { width: '100%', height: '100%', resizeMode: 'contain' },
  backButton: { position: 'absolute', top: 40, left: 20, zIndex: 10 },
});
