import { useIsFocused } from '@react-navigation/native';
import axios, { AxiosError } from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Config from 'react-native-config';

function Habitat() {
  const [locationData, setLocationData] = useState([]);
  const isFocused = useIsFocused();

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
      <Text>서식지도</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default Habitat;
