import React from 'react';

{/*part3영상내용 중 home+scanproduct*/}
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
  PermissionsAndroid
} from 'react-native';

import {Camera, useCameraDevices} from "react-native-vision-camera";

import { 
  IconButton,
  TextButton } from "../../components";

import {
  COLORS,
  SIZES,
  FONTS,
  icons,
  constants,
  images,
  dummyData
} from "../../constants";

import { FilterModal } from "../";

import Animated,{
  useSharedValue,
  useAnimatedStyle,
  withTiming
} from "react-native-reanimated";
import { FlatList } from 'react-native-gesture-handler';
import {useRoute} from "@react-navigation/native";

const Home = ({ route, navigation }) => {

  //const [selectOption, setSelectOption] = React.useState(constants.scan_product_option.camera)
  const devices = useCameraDevices()
  const device = devices.back
  const [showFilterModal, setShowFilterModal] = React.useState(false)
  const {token} = route.params;

  //토큰 전달 확인
  // console.log(`camera ${token}`)
  
  React.useEffect(() => {
    if (Platform.OS === 'android') {
    const requestCameraPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'App needs permission for camera access',
              buttonPositive: 'OK',
            },
          );
          if(granted === PermissionsAndroid.RESULTS.GRANTED){
		    
	      }else {
		    alert('Please camera permission');
	   }
        } catch (err) {
        alert('Camera permission err');
          console.warn(err);
        }
      };
      requestCameraPermission();
}
},[]); 

  
  function renderHeader() {
    return(
      <View
       style={{
        flexDirection:'row',
        paddingTop: SIZES.padding * 2,
        paddingBottom: SIZES.radius,
        paddingHorizontal: SIZES.padding,
        alignItems: 'center',
        backgroundColor: COLORS.light,
        zIndex: 1
      }}
      >
        
    {/*close*/}
    <IconButton
      icon={icons.close}
      onPress={() => navigation.goBack()}
      />

    <IconButton
      icon={icons.flash}
      iconStyle={{
        width: 25,
        height: 25
      }}
      />

    <IconButton
      icon={icons.cameraFlipIcon}
      />
      </View>
    )
  }

  function renderCamera() {
    if (device == null) {
      return (
        <View
          style={{
            flex: 1
          }}
          />
      )
    } else {
        return (
        <View
         style={{
            flex: 1
        }}
        >
            <Camera
              style={{flex: 1}}
              device={device}
              isActive={true}
              enableZoomGesture
              />
        </View>
      )
    }
  }

  function renderFooter() {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 90,
          paddingTop: SIZES.radius,
          paddingHorizontal: SIZES.radius,
          backgroundColor: COLORS.light,
          zIndex: 1}}
          >

     <IconButton
      icon={icons.cameraButton}
      iconStyle={{
        width: 40,
        height: 40
      }}
      />

    <IconButton
      icon={icons.person2}
      iconStyle={{
        width: 40,
        height: 40
      }}
      onPress={()=> setShowFilterModal(true)}
      />
      </View>
        
    )
  }

  

  return (
    <View
        style={{
          flex:1
        }}
    >
      {/* Filter */}
      {showFilterModal &&
      <FilterModal
      isVisible={showFilterModal}
      onClose={() => setShowFilterModal(false)}
      //자식 FilterModal로 token전달
      token={token}
      />}

      {/*Header*/}
      {renderHeader()}

      {renderCamera()}

      {renderFooter()}
   
    </View>
  )
}

export default Home;