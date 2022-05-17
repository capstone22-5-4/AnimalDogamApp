import { useIsFocused } from '@react-navigation/native';
import axios, { AxiosError } from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import Config from 'react-native-config';
import NaverMapView, { Marker } from 'react-native-nmap';

function Habitat() {
  const [locationData, setLocationData] = useState([]);
  const isFocused = useIsFocused();

  const P0 = { animalname: '공작', latitude: 37.564362, longitude: 126.977011 };
  const P1 = { animalname: '거북', latitude: 37.565051, longitude: 126.978567 };
  const P2 = { animalname: '토끼', latitude: 37.565383, longitude: 126.976292 };

  useEffect(() => {
    async function loadLocation() {
      try {
        const response = await axios.get(`${Config.API_URL}/gpsData`, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,
        });
        setLocationData(response.data);
        console.log(response.data);
      } catch (error) {
        const errorResponse = (error as AxiosError).response;
        console.log(errorResponse);
      }
    }

    loadLocation();
    console.log(locationData);
  }, [isFocused]);

  return (
    <View>
      <NaverMapView
        style={{ width: '100%', height: '100%' }}
        showsMyLocationButton={true}
        center={{ ...P0, zoom: 16 }}
      >
        <Marker
          coordinate={locationData[0]}
          pinColor="yellow"
          onClick={() => console.warn('onClick! p1')}
        />
        <Marker
          coordinate={P1}
          pinColor="blue"
          onClick={() => console.warn('onClick! p1')}
        />
        <Marker
          coordinate={P2}
          pinColor="red"
          onClick={() => console.warn('onClick! p2')}
        />
      </NaverMapView>
    </View>
  );
}

const styles = StyleSheet.create({});

export default Habitat;
