import { ActivityIndicator, ScrollView } from 'react-native';
import { Image, Input } from '@rneui/themed';
import React, { useLayoutEffect, useState } from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TabStackParamsList } from '../navigator/TabNavigator';
import { RootStackParamList } from '../navigator/RootNavigator';

export type CustomerScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamsList, 'Customers'>,
    NativeStackNavigationProp<RootStackParamList>
>

const CustomerScreen = () => {
    const tw = useTailwind();
    const navigation = useNavigation<CustomerScreenNavigationProp>();
    const [input, setInput] = useState<string>('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    })

    return (
        <ScrollView style={{backgroundColor: '#59C1CC'}}>
            <Image
                source={{ uri: 'https://links.papareact.com/3jc'}}
                PlaceholderContent={<ActivityIndicator/>}
                containerStyle={tw('w-full h-60')}
            />
            <Input
                placeholder='Search by Customer'
                value={input}
                onChangeText={setInput}
                containerStyle={tw('bg-white py-5 px-10')}
            />
        </ScrollView>
    )
}

export default CustomerScreen