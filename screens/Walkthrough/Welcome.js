import React from 'react';
import {
    View,
    Text,
    Image,
    Linking
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { TextButton } from "../../components";
import { COLORS, FONTS, SIZES, images } from '../../constants';
import axios from 'axios';

const Welcome = ({ navigation }) => {
    
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.light
            }}
        >
            {/* Logo & Title */}
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Image
                    source={images.logo}
                    style={{
                        width: 150,
                        height: 150
                    }}
                />

                <Text style={{ marginTop: SIZES.padding, ...FONTS.h1 }}>
                    새로운 내 모습을 담다
                </Text>
                <Text style={{ marginTop: SIZES.base, ...FONTS.h1 }}>
                    Ex.Pose
                </Text>
            </View>

            {/* Footer Buttons */}
            <View
                style={{
                    paddingHorizontal: SIZES.padding,
                    marginBottom: 30
                }}
            >
            

            {/*소셜로그인으로 이어지기*/}
                <TextButton
                    contentContainerStyle={{
                        height: 50,
                        borderRadius: SIZES.radius
                    }}
                    label="로그인하기"
                    onPress={() => navigation.navigate("Login")}
                />
                
                <TextButton
                    contentContainerStyle={{
                        height: 50,
                        marginTop: SIZES.base,
                        backgroundColor: null
                    }}
                    label="비회원으로 시작하기"
                    labelStyle={{
                        color: COLORS.primary
                    }}
                    onPress={() => navigation.navigate("Home")}
                />
            </View>
        </View>
    )
}

export default Welcome;