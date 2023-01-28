import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { TabStackParamsList } from '../navigator/TabNavigator';
import { RootStackParamList } from '../navigator/RootNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useTailwind } from 'tailwind-rn/dist';
import useOrders from '../hooks/useOrders';
import { Image, Button } from '@rneui/themed';
import OrderCard from '../components/OrderCard';

export type OrdersScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamsList, 'Orders'>,
    NativeStackNavigationProp<RootStackParamList>
>

const OrdersScreen = () => {
    const tw = useTailwind();
    const navigation = useNavigation<OrdersScreenNavigationProp>();
    const { loading, error, orders } = useOrders();
    const [ asc, setAsc ] = useState<boolean>(false);
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            tabBarLabel: (({focused, color}) => (
                <Text style={{color: focused ? '#EB6A7C' : color, fontSize: 10}}>Orders</Text>
            ))
        })
    },[])

    return (
        <ScrollView style={{backgroundColor: "#EB6A7C"}}>
            <Image
                source={{uri: 'https://links.papareact.com/m51'}}
                PlaceholderContent={<ActivityIndicator/>}
                containerStyle={tw('w-full h-60')}
            />

            <View style={tw('pb-5')}>
                <View
                    style={tw('py-2 px-5')}
                >
                    <Button
                        titleStyle={{color: 'gray', fontWeight: '400'}}
                        color={'pink'}
                        onPress={() => setAsc(!asc)}
                    >
                        {asc ? "Oldest First" : "Most Recent First"}
                    </Button>
                </View>
                {
                    orders?.sort((a, b) => {
                        if(asc){
                            return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
                        } else {
                            return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
                        }
                    }).map((order) => (
                        <OrderCard key={order.trackingId} item={order}/>
                    ))
                }
            </View>
        </ScrollView>
    )
}

export default OrdersScreen