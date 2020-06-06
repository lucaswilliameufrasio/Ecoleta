import React, { useEffect, useState } from 'react';
import { SvgUri } from 'react-native-svg';
import MapView, { Marker } from 'react-native-maps';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, TouchableOpacity, Text, ScrollView, Image, SafeAreaView, Alert, Platform } from 'react-native';
import * as Location from 'expo-location';

import axios from 'axios';
import api from '../../services/api';

import styles from './styles';
import { useSafeArea } from 'react-native-safe-area-context';

interface Item {
    id: number;
    title: string;
    image_url: string;
}

interface Points {
    id: number;
    name: string;
    image: string;
    latitude: number;
    longitude: number;
}

interface IRouteParams {
    uf: string;
    city: string;
}

const Points: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [points, setPoints] = useState<Points[]>([]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);

    const navigation = useNavigation();
    const route = useRoute();

    const edgeInsets = useSafeArea();

    const routeParams = route.params as IRouteParams;

    async function getLatitudeAndLongitudeFromAddress(address: string) {
        const geocodedLocation = await Location.geocodeAsync(address);
        const { latitude, longitude } = geocodedLocation[0];

        const latitudeLongitude = {
            latitude,
            longitude,
        };

        return latitudeLongitude;
    }

    useEffect(() => {
        async function loadPosition() {
            const { status } = await Location.requestPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert('Ooops....', 'Precisamos de sua permissão para obter a localização.');
                return;
            }

            // Uncomment the line below and fill with your API Key when use geocoding on devices without Google Play Services
            // Location.setApiKey("Your-API-KEY-Here")

            const userAddress = `${routeParams.city}, ${routeParams.uf}`;
            const geocodedLocation = await getLatitudeAndLongitudeFromAddress(userAddress);

            const { latitude, longitude } = geocodedLocation;

            setInitialPosition([latitude, longitude]);
        }

        loadPosition();
    }, []);

    useEffect(() => {
        api.get('/points', {
            params: {
                city: routeParams.city,
                uf: routeParams.uf,
                items: selectedItems,
            },
        }).then((response) => {
            setPoints(response.data);
        });
    }, [selectedItems]);

    useEffect(() => {
        api.get('items').then((response) => {
            setItems(response.data);
        });
    }, []);

    function handleNavigateBack() {
        navigation.goBack();
    }

    function handleNavigateToDetail(id: number) {
        navigation.navigate('Detail', {
            point_id: id,
        });
    }

    function handleSelectItem(id: number) {
        const alreadySelected = selectedItems.findIndex((item) => item === id);

        if (alreadySelected >= 0) {
            const filteredItems = selectedItems.filter((item) => item !== id);

            setSelectedItems(filteredItems);
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    }

    return (
        <View style={[{ flex: 1 }, Platform.OS === 'ios' && { paddingTop: edgeInsets.top }]}>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Icon name="arrow-left" size={20} color="#34cb79" />
                </TouchableOpacity>

                <Text style={styles.title}>Bem vindo.</Text>
                <Text style={styles.description}>Encontre no mapa um ponto de coleta.</Text>

                <View style={styles.mapContainer}>
                    {initialPosition[0] !== 0 && (
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: initialPosition[0],
                                longitude: initialPosition[1],
                                latitudeDelta: 0.04,
                                longitudeDelta: 0.014,
                            }}
                        >
                            {points.map((point) => (
                                <Marker
                                    key={String(point.id)}
                                    style={styles.mapMarker}
                                    onPress={() => {
                                        handleNavigateToDetail(point.id);
                                    }}
                                    coordinate={{
                                        latitude: point.latitude,
                                        longitude: point.longitude,
                                    }}
                                >
                                    <View style={styles.mapMarkerContainer}>
                                        <Image
                                            style={styles.mapMarkerImage}
                                            source={{
                                                uri: point.image,
                                            }}
                                        />
                                        <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                                    </View>
                                </Marker>
                            ))}
                        </MapView>
                    )}
                </View>
            </View>
            <View style={styles.itemsContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                >
                    {items.map((item) => (
                        <TouchableOpacity
                            key={String(item.id)}
                            style={[styles.item, selectedItems.includes(item.id) ? styles.selectedItem : {}]}
                            onPress={() => handleSelectItem(item.id)}
                            activeOpacity={0.6}
                        >
                            <SvgUri width={42} height={42} uri={item.image_url} />
                            <Text style={styles.itemTitle}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

export default Points;
