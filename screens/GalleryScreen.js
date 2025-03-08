import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-video'; // Updated from expo-av to expo-video
import TopBar from './TopBar'; // Import

const API_KEY = 'oHY5UJjfXUEZ4Evq95JRimlajsvC7gUdVdrlzcTURNUjW2YynA0X3x0l';
const API_URL = 'https://api.pexels.com/v1/';
const VIDEO_URL = 'https://api.pexels.com/videos/search?query=popular&per_page=20';

const categories = ['Nature', 'Technology', 'People', 'Animals', 'Food', 'Art', 'Cars', 'Sports'];

const GalleryScreen = ({ navigation }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchImages = (query = '') => {
    setLoading(true);
    const url = query ? `${API_URL}search?query=${query}&per_page=20` : `${API_URL}curated?per_page=20`;

    axios.get(url, { headers: { Authorization: API_KEY } })
      .then(response => {
        setImages(response.data.photos);
        setLoading(false);
      })
      .catch(error => console.error(error));
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <View style={styles.container}>
       <TopBar />
      <Text style={styles.header}>Gallery</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search images..."
        placeholderTextColor="#ccc"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={() => fetchImages(searchQuery)}
      />
      <View style={styles.categoryContainer}>
        <FlatList
          data={categories}
          horizontal
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.categoryButton, selectedCategory === item && styles.activeCategory]}
              onPress={() => {
                setSelectedCategory(item);
                fetchImages(item);
              }}
            >
              <Text style={styles.categoryText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      {loading && <ActivityIndicator size="large" color="#fff" style={styles.loading} />}
      {!loading && (
        <FlatList
          data={images}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('ImageView', { image: item.src.large })} style={styles.imageContainer}>
              <Image source={{ uri: item.src.medium }} style={styles.image} />
              <Text style={styles.imageTitle}>{item.photographer}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const VideoScreen = ({ navigation }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(VIDEO_URL, { headers: { Authorization: API_KEY } })
      .then(response => {
        setVideos(response.data.videos);
        setLoading(false);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
       <TopBar />
      <Text style={styles.header}>Videos</Text>
      {loading ? <ActivityIndicator size="large" color="#fff" style={styles.loading} /> : (
        <FlatList
          data={videos}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('VideoView', { video: item.video_files[0]?.link })} style={styles.imageContainer}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.imageTitle}>{item.user.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = route.name === 'GalleryTab' ? 'images' : 'videocam';
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#fff',
      tabBarInactiveTintColor: '#888',
      tabBarStyle: { backgroundColor: '#222', borderTopWidth: 0 },
    })}
  >
    <Tab.Screen name="GalleryTab" component={GalleryScreen} options={{ title: 'Gallery', headerShown: false }} />
    <Tab.Screen name="VideosTab" component={VideoScreen} options={{ title: 'Videos', headerShown: false }} />
  </Tab.Navigator>
);

export default TabNavigator;


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', paddingHorizontal: 10, paddingTop: 30 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 15 },
  searchBar: {
    backgroundColor: '#222',
    color: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15, // More space after search bar
  },
  categoryContainer: {
    height: 50, // FIXED HEIGHT so it doesn’t expand
    marginBottom: 10,
    justifyContent: 'center',
  },
  categoryButton: {
    backgroundColor: '#333',
    paddingVertical: 8,  // Keep it small
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 8,
    marginVertical: 5, // Prevents weird stretching
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  activeCategory: { backgroundColor: '#0a84ff' },
  categoryText: { 
    color: '#fff', 
    fontSize: 14, 
    fontWeight: 'bold',
  },
  
  loading: {
    position: 'absolute', // Prevents shifting elements
    top: '50%',
    left: '50%',
    transform: [{ translateX: -15 }, { translateY: -15 }],
  },
  
  imageContainer: { alignItems: 'center', marginVertical: 20, marginHorizontal: 5 }, // Adjusted margin for spacing
  image: { width: 160, height: 160, borderRadius: 10 },
  imageTitle: { color: '#fff', fontSize: 14, fontWeight: 'bold', marginTop: 5 },
  imageDate: { color: '#ccc', fontSize: 12 },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#0a84ff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
