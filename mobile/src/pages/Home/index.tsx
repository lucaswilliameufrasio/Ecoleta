import React, { useState, useEffect } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { View, ImageBackground, Image, Text, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { useNavigation } from '@react-navigation/native';

import styles from './styles';

import axios from 'axios';

interface IBGEUFResponse {
    sigla: string;
}
interface IBGECityResponse {
    id: number;
    nome: string;
}

const Home: React.FC = () => {
    const [cities, setCities] = useState<string[]>([]);
    const [ufs, setUfs] = useState<string[]>([]);

    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');

    const navigation = useNavigation();

    useEffect(() => {
        axios
            .get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
            .then((response) => {
                const ufInitials = response.data.map((uf) => uf.sigla);

                setUfs(ufInitials);
            });
    }, []);

    useEffect(() => {
        if (selectedUf === '0') {
            setCities([]);
            return;
        }
        axios
            .get<IBGECityResponse[]>(
                `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios?orderBy=nome`,
            )
            .then((response) => {
                const citiesNames = response.data.map((city) => city.nome);

                setCities(citiesNames);
            });
    }, [selectedUf]);

    function handleNavigateToPoints() {
        if (selectedUf === '0' || selectedCity === '0') {
            Alert.alert('Eeeeei', 'Você precisa selecionar a UF e a Cidade.');
            return;
        }

        navigation.navigate('Points', {
            uf: selectedUf,
            city: selectedCity,
        });
    }

    return (
        <ImageBackground
            source={require('../../assets/home-background.png')}
            style={styles.container}
            imageStyle={{ width: 274, height: 368 }}
        >
            <View style={styles.main}>
                <Image source={require('../../assets/logo.png')} />
                <Text style={styles.title}>Seu marketplace de resíduo</Text>
                <Text style={styles.description}>Ajudamos a encontrarem pontos de coleta de forma eficiente.</Text>
            </View>

            <View style={styles.footer}>
                <RNPickerSelect
                    placeholder={{ label: 'Selecione uma UF', value: '0' }}
                    style={{ inputAndroid: styles.input, inputIOS: styles.input }}
                    onValueChange={(value) => setSelectedUf(value)}
                    items={
                        ufs &&
                        ufs.map((uf) => {
                            return { label: uf, value: uf, key: uf };
                        })
                    }
                />

                <RNPickerSelect
                    placeholder={{ label: 'Selecione uma Cidade', value: '0' }}
                    style={{ inputAndroid: styles.input, inputIOS: styles.input }}
                    onValueChange={(value) => setSelectedCity(value)}
                    items={cities.map((city) => {
                        return { label: city, value: city, key: city };
                    })}
                />

                <RectButton style={styles.button} onPress={handleNavigateToPoints}>
                    <View style={styles.buttonIcon}>
                        <Text>
                            <Icon name="arrow-right" color="#FFF" size={24} />
                        </Text>
                    </View>
                    <Text style={styles.buttonText}>Buscar</Text>
                </RectButton>
            </View>
        </ImageBackground>
    );
};

export default Home;
