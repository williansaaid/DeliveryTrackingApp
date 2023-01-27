import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useTailwind } from 'tailwind-rn/dist'
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { TabStackParamsList } from '../navigator/TabNavigator'
import { RootStackParamList } from '../navigator/RootNavigator'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import DeliveryCard from '../components/DeliveryCard'

type OrderScreenRouteProp = RouteProp<RootStackParamList, "Order">;

export type OrderScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamsList, 'Orders'>,
    NativeStackNavigationProp<RootStackParamList>
>

const OrderScreen = () => {
    const tw = useTailwind();
    const navigation = useNavigation<OrderScreenNavigationProp>();
    const {params: {order}} = useRoute<OrderScreenRouteProp>();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: order.trackingItems.customer.name,
            headerTintColor: "#EB6A7C",
            headerBackTitle: "Deliveries",
            headerStyle: { backgroundColor: "#FFFFFF" },
            headerTitleAlign: 'center'
        })
    }, [order])

    return (
        <View
            style={tw('')}
        >
            <DeliveryCard order={order} fullWidth/>
        </View>
    )
}

export default OrderScreen