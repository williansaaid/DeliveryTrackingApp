import { View, Text, Touchable, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed'
import { useTailwind } from 'tailwind-rn/dist'
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { TabStackParamsList } from '../navigator/TabNavigator'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigator/RootNavigator'
import { SafeAreaView } from 'react-native-safe-area-context'
import useCustomerOrders from '../hooks/useCustomerOrders'
import DeliveryCard from '../components/DeliveryCard'

type ModalScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamsList>,
    NativeStackNavigationProp<RootStackParamList, "MyModal">
>;

type ModalScreenRouteProp = RouteProp<RootStackParamList, 'MyModal'>

const ModalScreen = () => {
    const tw = useTailwind();
    const navigation = useNavigation<ModalScreenNavigationProp>();
    const { params: { name, userId }} = useRoute<ModalScreenRouteProp>();
    const { loading, error, orders } = useCustomerOrders(userId);

    return (
        <SafeAreaView>
            <View>
                <TouchableOpacity
                    style={tw('absolute top-10 right-5 z-10')}
                    onPress={navigation.goBack}
                >
                    <Icon
                        name='closecircle'
                        type='antdesign'
                        size={30}
                        color='#59C1CC'
                    />
                </TouchableOpacity>

                <View style={{ marginTop: 10 }}>
                    <View style={[
                        tw('py-5 border-b'),
                        { borderColor: '#59C1CC' }]}
                    >
                        <Text
                            style={[
                                tw('text-center text-xl font-bold'),
                                { color: '#59C1CC' }
                            ]}
                        >
                            {name}
                        </Text>
                        <Text
                            style={[
                                tw('text-center text-sm italic'),
                                { color: '#59C1CC' }
                            ]}
                        >
                            Deliveries
                        </Text>
                    </View>
                </View>

                <FlatList
                    contentContainerStyle={{ paddingBottom: 200 }}
                    data={orders}
                    renderItem={({item: order}) => <DeliveryCard order={order}/>}
                />
            </View>
        </SafeAreaView>
    )
}

export default ModalScreen