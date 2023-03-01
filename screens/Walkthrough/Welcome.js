import React from 'react';
import { StyleSheet, View, Text, Image, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { IconButton, TextButton } from "../../components";
import { COLORS, FONTS, SIZES, images } from '../../constants';
import axios from 'axios';

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: COLORS.bgMain,
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30,
    },
    appName: {
        color: COLORS.txtMain,
        fontSize: 64,
        marginTop: 130,
        fontFamily: 'HeirofLightOTFRegular'
    },
    subTxt: {
        marginTop: 20,
        fontSize: SIZES.h3,
        color: COLORS.txtGrey,
        fontFamily: 'HeirofLightOTFRegular'
    },
    nonMembers: {
        color: COLORS.txtGrey,
        textDecorationLine: 'underline',
        fontFamily: 'HeirofLightOTFRegular',
        backgroundColor: null
    },
    loginBtn: {
        height: 50,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.bgMain
    },
    socialLoginBtn: {
        width: 300, height: 80,
        marginBottom: 30
    }
});

const Welcome = ({ navigation }) => {

    return (
        <View style={styles.bg}>
            {/* Logo & Title */}
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Text style={styles.appName}>
                    Ex.Pose
                </Text>
                <Text style={styles.subTxt}>
                    새로운 내 모습을 담다
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
                <IconButton
                    icon={images.kakao_login_large_wide}
                    iconStyle={styles.socialLoginBtn}
                    onPress={() => navigation.navigate("Login")}
                />

                <TextButton
                    contentContainerStyle={styles.nonMembers}
                    label="비회원으로 시작하기"
                    labelStyle={styles.nonMembers}
                    onPress={() => navigation.navigate("Walkthrough")}
                />
            </View>
        </View>
    )
}

export default Welcome;