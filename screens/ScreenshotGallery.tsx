import React, { useState, useEffect } from 'react';
import { View, Image, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import screenshotButton from '../../images/Camera.png';

const ScreenshotGallery = () => {
  const [screenshots, setScreenshots] = useState<string[]>([]);

  useEffect(() => {
    const fetchScreenshots = async () => {
      const firestore = getFirestore();
      const screenshotCollection = collection(firestore, 'screenshots');
      const snapshot = await getDocs(screenshotCollection);

      const urls: string[] = [];
      snapshot.forEach((doc) => {
        urls.push(doc.data().downloadURL);
      });

      setScreenshots(urls);
    };

    fetchScreenshots();
  }, []);

  const handleImagePress = () => {
    Alert.alert('Image Clicked', 'Local image clicked');
  };

  return (
    <View style={styles.container}>
      {/* Temporarily display the local image directly to check if it works */}
      <TouchableOpacity onPress={handleImagePress}>
        <Image source={screenshotButton} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};

export default ScreenshotGallery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    margin: 10,
  },
});
