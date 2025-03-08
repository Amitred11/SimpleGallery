// TopBar.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const TopBar = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePic, setProfilePic] = useState(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setModalVisible(false);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.topBar}>
      <Text style={styles.logo}>📷 MyGallery</Text>
      {isLoggedIn ? (
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image source={profilePic ? { uri: profilePic } : require('../assets/default.jpg')} style={styles.profilePic} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.authButton}>
          <Text style={styles.authText}>Login / Signup</Text>
        </TouchableOpacity>
      )}

      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {isLoggedIn ? (
              <>
                <Text style={styles.modalTitle}>Profile Settings</Text>
                <TouchableOpacity onPress={pickImage}>
                  <Image source={profilePic ? { uri: profilePic } : require('../assets/default.jpg')} style={styles.profilePicLarge} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsLoggedIn(false)} style={styles.logoutButton}>
                  <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.modalTitle}>Welcome Back</Text>
                <TextInput placeholder="Email" style={styles.input} placeholderTextColor="#aaa" />
                <TextInput placeholder="Password" style={styles.input} placeholderTextColor="#aaa" secureTextEntry />
                <TouchableOpacity style={styles.modalButton} onPress={handleLogin}>
                  <Text style={styles.modalButtonText}>Continue</Text>
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#222',
    padding: 15,
    paddingTop: 40,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  logo: { fontSize: 22, fontWeight: 'bold', color: '#fff', fontFamily: 'Arial' },
  authButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#0a84ff',
    borderRadius: 20,
  },
  authText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    width: 320,
    backgroundColor: '#333',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  modalTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 15, fontFamily: 'Arial' },
  input: {
    width: '100%',
    backgroundColor: '#444',
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Arial',
  },
  modalButton: {
    backgroundColor: '#0a84ff',
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  closeButton: {
    marginTop: 10,
    padding: 8,
  },
  closeText: { color: '#fff', fontSize: 14, textDecorationLine: 'underline' },
  profilePicLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#0a84ff',
    marginBottom: 15,
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    marginTop: 15,
    width: '100%',
    alignItems: 'center',
  },
  logoutText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default TopBar;
