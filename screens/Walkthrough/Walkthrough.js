import React from 'react';
import {
    View,
    Text,
    Animated,
    StyleSheet,
    Alert
} from 'react-native';

import { TextButton } from "../../components"; 
import { COLORS, SIZES, constants } from "../../constants";
import Walkthrough1 from './Walkthrough1';
import Walkthrough2 from './Walkthrough2';
import Walkthrough3 from './Walkthrough3';

import ImageCropPicker from 'react-native-image-crop-picker';

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: COLORS.bgMain,
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30,
    },
    userTxt: {
        fontFamily: 'HeirofLightOTFBold',
        color: COLORS.txtMain,
        fontSize: SIZES.h2,
        textAlign: 'center',
        marginTop: 80
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: SIZES.height * 0.2,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.height > 700 ? SIZES.padding : 20
    },
    footerBtn1Container: {
        flex: 1,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGrey,
        marginHorizontal: 10
    },
    footerBtn2Container: {
        flex: 1,
        marginleft: SIZES.radius,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.txtMain,
        marginHorizontal: 10
    },
    footerBtn1Txt: {
        fontFamily: 'HeirofLightOTFRegular',
        fontSize: SIZES.h3,
        color: COLORS.txtGrey,
        // ...FONTS.h3
    },
    footerBtn2Txt: {
        fontFamily: 'HeirofLightOTFRegular',
        fontSize: SIZES.h3,
        color: COLORS.bgMain,
        // ...FONTS.h3
    },
    txt1: {
        fontFamily: 'HeirofLightOTFBold',
        fontSize: SIZES.h1,
        // ...FONTS.h1,
        color: COLORS.txtMain
    },
    txt2: {
        fontFamily: 'HeirofLightOTFBold',
        fontSize: SIZES.body3,
        marginTop: SIZES.radius,
        textAlign: 'center',
        // ...FONTS.body3,
        color: COLORS.txtGrey
    }
    
});


const Walkthrough = ({route, navigation}) => {

    React.useEffect(() => {userNameInfo()},[])

    //User정보 호출
        const userNameInfo = () => {

            const userInfoApi = `${BaseUrl}/user/me`;
    
            //사용자 데이터 fetch 정보 호출 완료
            fetch(`${userInfoApi}`, {
                    method : "GET",
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                    }) 
                    .then((res) => res.json())
                    .then(res => {
                    setUserName(res.nickname)
                    console.log(userName)
                    })
                    .catch(console.error)
        }
    

    const [chooseState, setChoosestate] = React.useState(false);
    const BaseUrl = "http://52.79.250.39:8080";

    var half=0;
    var many=0;
    var selfie=0;
    var sit=0;
    var two=0;
    var whole=0;
    var count=0;

    const increaseNumber = (result, length) => {
        
            switch(result){
                case 'half' :
                    half=half+1;
                    count=count+1;
                    console.log('update half: ' + half);
                    console.log('count: ' + count);
                    break;
                case 'many' :
                    many=many+1;
                    count=count+1;
                    console.log('update many: ' + many);
                    console.log('count: ' + count);
                    break;
                case 'selfie' :
                    selfie=selfie+1;
                    count=count+1;
                    console.log('update selfie: ' + selfie);
                    console.log('count: ' + count);
                    break;
                case 'sit' :
                    sit=sit+1;
                    count=count+1;
                    console.log('update sit: ' + sit);
                    console.log('count: ' + count);
                    break;
                case 'two' :
                    two=two+1;
                    count=count+1;
                    console.log('update two: ' + two);
                    console.log('count: ' + count);
                    break;
                case 'whole' :
                    whole=whole+1;
                    count=count+1;
                    console.log('update whole: ' + whole);
                    console.log('count: ' + count);
                    break;
                default :  
                count=count+1;
                console.log('count: ' + count);
            }

            var resultList = {
                half: half, 
                many: many, 
                selfie: selfie, 
                sit: sit,
                two: two,
                whole: whole};
    
            const json = JSON.stringify(resultList);
            
            console.log('length: ' + length);
            console.log(json);
            if (count===length*2) {sendResult(json)}
            }

    
    const openImagePicker = () => {

       ImageCropPicker.openPicker({
            multiple: true,
        })
        .then ( image => {
        setChoosestate(true);

        for (let i =0; i < image.length ; i++) {
                const imageData = new FormData()
                const length = image.length;

                imageData.append("file", {
                    uri: image[i].path,
                    name: 'image.png',
                    fileName: 'image',
                    type: 'image/png'
                })

                // 포즈 분석 API
               fetch('http://f381-34-126-171-33.ngrok.io', {
                    method: 'POST',
                    body: imageData
                })
                .then(response => response.json())
                .then(response => {
                    increaseNumber(response.class_name, length);
                })
                .then(
                // 인원분석 API
                fetch('http://58e6-34-125-44-199.ngrok.io', {
                    method: 'POST',
                    body: imageData
                })
                .then(response => response.json())
                .then(response => {
                    increaseNumber(response.class_name, length);
                }) 
                )
            }
        } 
        )
    }

    const sendResult = (json) => {

        setChoosestate(false);

        fetch(`${BaseUrl}/user/update`, {
            method : "PATCH",
            body: json,
            headers : {
                'Content-type': 'application/json; charset=UTF-8',
                Authorization : `Bearer ${token}`,
            }
            })
            .then((res) => res.json())
            .then(res => console.log(res))
            .catch(console.error)

            return(
                navigation.navigate("Home", {token: token})
            )
    }

    //API정보 이용 시
    const [userName, setUserName] = React.useState("Ex.Pose");

    //토큰 전달
    const {token} = route.params;

    const scrollX = React.useRef(new Animated.Value(0)).current;

    const Dots = () => {
        const dotPostition = Animated.divide(scrollX, SIZES.width)

        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItem: 'center',
                    justifyContent: 'center'
                }}
            >
                {
                    constants.walkthrough.map((item, index) => {
                        const dotColor = dotPostition.interpolate({
                            inputRange: [index -1, index, index+1],
                            outputRange: [COLORS.txtGrey, COLORS.txtMain, COLORS.txtGrey],
                            extrapolate: "clamp"
                        })

                        return (
                            <Animated.View
                                key={`dot-${index}`}
                                style={{
                                    borderRadius: 5,
                                    marginHorizontal: 6,
                                    width: 10,
                                    height: 10,
                                    backgroundColor: dotColor
                                }}
                                />
                        )
                    })
                }
            </View>
        )
    }

    function renderFooter() {
        

        const selectAlert = () => {
            Alert.alert('사진 정보 이용 동의',`취향 분석을 위해 좋아하는 인물 사진을 10장 이상 선택해 주세요.

사진은 분석을 위해서만 사용되고 폐기됩니다. 
동의 후 서비스 이용이 가능합니다.`,
                        [{text: '동의합니다', onPress: () => openImagePicker()}],
                        {cancelable: true}
                        )

        }
        return (
            <View
                style={styles.footer}
                >

                <Dots />

                {/*Buttons*/}
                {chooseState ? <View></View>: 
                   <View
                   style={{
                    flexDirection: 'row',
                    height: 55
                }}>
                    <TextButton
                        label="추천없이 사용"
                        contentContainerStyle={styles.footerBtn1Container}
                        labelStyle={styles.footerBtn1Txt}
                        onPress={() => {
                            navigation.navigate("Home", {token: token})
                    }}
                    />
                    
                    <TextButton
                        label="포즈 추천받기" 
                        contentContainerStyle={styles.footerBtn2Container}
                        labelStyle={styles.footerBtn2Txt}
                        onPress= {selectAlert}
                    />
                    </View>
                }  
            </View>
        )
    }
    return (
       
        <View
            style={styles.bg}
        >
            {chooseState ? <Text style={styles.userTxt}>
                {userName}님 의 데이터를 분석중입니다.
            </Text> : 
            <Text style={styles.userTxt}>
                {userName}님 반갑습니다!
            </Text>}
            
            <Animated.FlatList
                data={constants.walkthrough}
                keyExtractor={(item) => item.id}
                horizontal
                snapToInterval={SIZES.width}
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    {
                        useNativeDriver: false
                    }
                )}

                renderItem={({item, index}) => {
                    return (
                        <View
                            style={{
                                width: SIZES.width,
                                justifyContent: 'center'
                            }}
                        >

                            {/* Walkthough Images */}
                            <View
                                style={{
                                    flex:1,
                                    justifyContent: 'center'
                                }}
                            >
                                {index == 0 && <Walkthrough1/>}
                                {index == 1 && <Walkthrough2/>}
                                {index == 2 && <Walkthrough3/>}

                            </View>

                            {/*Title & Descriptions*/}
                            <View
                                style={{
                                    height: SIZES.height * 0.35,
                                    alignItems: 'center',
                                    justifyContent:'flex-start',
                                    paddingHorizontal: SIZES.padding
                                }}
                            >
                                <Text
                                    style={styles.txt1}
                                    >
                                    {item.title}
                                </Text>

                                <Text
                                    style={styles.txt2}
                                >
                                    {item.sub_title}        
                                </Text>
                            </View>
                        </View>
                    )
                }}
            />
            {renderFooter()}
        </View>
    )
}
  
export default Walkthrough;