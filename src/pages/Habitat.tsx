import { useIsFocused } from '@react-navigation/native';
import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform, StyleSheet, View } from 'react-native';
import Config from 'react-native-config';
import NaverMapView, { Marker } from 'react-native-nmap';
import Geolocation from 'react-native-geolocation-service';

async function requestPermission() {
  try {
    if (Platform.OS === 'ios') {
      return await Geolocation.requestAuthorization('always');
    }
    if (Platform.OS === 'android') {
      return await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
  } catch (e) {
    console.log(e);
  }
}

function Habitat() {
  const [myLocation, setMyLocation] = useState({
    latitude: 37.564362,
    longitude: 126.977011,
  });
  const [locationData, setLocationData] = useState([]);
  const isFocused = useIsFocused();

  let markerKey = 0;

  useEffect(() => {
    async function loadMyLocation() {
      await requestPermission().then((result) => {
        console.log({ result });
        if (result === 'granted') {
          Geolocation.getCurrentPosition(
            (pos) => {
              setMyLocation({
                // latitude: pos.coords.latitude,
                // longitude: pos.coords.longitude,
                // 임시로 CAU 위치로 설정, 나중에 아래 좌표 지우고 위의 사용자 gps 데이터 사용
                latitude: 37.5051,
                longitude: 126.9571,
              });
            },
            (error) => {
              console.log(error);
            },
            {
              enableHighAccuracy: true,
              timeout: 3600,
              maximumAge: 3600,
            },
          );
        }
      });
    }
    loadMyLocation();
    console.log(myLocation);
  }, []);

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
      } catch (error) {
        const errorResponse = (error as AxiosError).response;
        console.log(errorResponse);
      }
    }

    loadLocation();
  }, [isFocused]);

  const markerList = locationData.map(
    (location: {
      animal_name: string;
      latitude: number;
      longitude: number;
    }) => (
      <Marker
        key={markerKey++}
        coordinate={location}
        image={require('../../images/map_marker.png')}
        width={20}
        height={20}
        caption={{
          text: location.animal_name,
          minZoom: 16,
          color: '#f04400',
        }}
        isHideCollidedCaptions={true}
      />
    ),
  );

  console.log(myLocation);
  return (
    <View>
      <NaverMapView
        style={styles.mapView}
        showsMyLocationButton={false}
        center={{ ...myLocation }}
      >
        {markerList}
      </NaverMapView>
    </View>
  );
}

const styles = StyleSheet.create({
  mapView: {
    width: '100%',
    height: '100%',
  },
});

export default Habitat;
