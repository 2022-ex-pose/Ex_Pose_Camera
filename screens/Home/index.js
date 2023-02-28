import React from 'react';

{/*part3영상내용 중 home+scanproduct*/}
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
  PermissionsAndroid,
  StyleSheet,
  ScrollView
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

import { FilterModal } from "..";

import { GalleryModal } from "..";

import { FrameModal } from "..";

import Animated,{
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  set
} from "react-native-reanimated";
import { FlatList } from 'react-native-gesture-handler';
import {useRoute} from "@react-navigation/native";

// import RNFS from 'react-native-fs';
// import IonIcon from 'react-native-vector-icons/Ionicons';
// import { PressableOpacity } from 'react-native-pressable-opacity';
// import { SAFE_AREA_PADDING } from './Constants';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";

// import { Svg, Defs, Mask } from "react-native-svg";

const Home = ({ route, navigation }) => {

  const camera = React.useRef(null);
  const [showCamera, setShowCamera] = React.useState(false);
  const [imageSource, setImageSource] = React.useState('file://','');

  //플래시, 전환 hook
  // const [flash, setFlash] = React.useState<'off' | 'on'>('off');
  // const [cameraPosition, setCameraPosition] = React.useState<'front' | 'back'>('back');
  // const supportsCameraFlipping = React.useMemo(() => devices.back != null && devices.front != null, [devices.back, devices.front]);
  // const supportsFlash = device?.hasFlash ?? false;
  // const {savingState, setSavingState} = React.useState<'none' | 'saving' | 'saved'>('none');

  const devices = useCameraDevices();
  const device = devices.back;
  const [showFilterModal, setShowFilterModal] = React.useState(false)
  const {token} = route.params;
  //토큰 전달 확인
  // console.log(`camera ${token}`)

  const [showGalleryModal, setShowGalleryModal] = React.useState(false)
  const [showFrameModal, setShowFrameModal] = React.useState(false)
  const [selectedFrameId, setSelectedFrameId] = React.useState('')
  const [getFrameUrl, setGetFrameUrl] = React.useState(false)
  // const [frameUrl, setFrameUrl] = React.useState('')


  const loadFrameModal = (selectedFrameId) => {
      setSelectedFrameId(selectedFrameId)
      console.log(selectedFrameId)
       setShowFrameModal(true)
      //  setShowFilterModal(false)
  }

  //Permissions
  React.useEffect(() => {
    if (Platform.OS === 'android') {
    const getAllPermission = async () => {
        try {
          PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          ]).then(result => { 
            if(
              result['android.permission.CAMERA'] &&
              result['android.permission.WRITE_EXTERNAL_STORAGE'] &&
              result['android.permission.READ_EXTERNAL_STORAGE']
              === 'granted'
            ) {
              setShowCamera(true);
            } else {
              alert('Permissions denied', 'You need to give permissions');
            }
          });
        }
        catch (err) {
        alert('Camera permission err');
          console.warn(err);
        }
      };
      getAllPermission();
  }
  },[]); 

  //카메라 플래시, 전환 기능
  // const onFlipCameraPressed = React.useCallback(() => {
  //   setCameraPosition((p) => (p === 'back' ? 'front' : 'back'));
  // }, []);
  // const onFlashPressed = React.useCallback(() => {
  //   setFlash((f) => (f === 'off' ? 'on' : 'off'));
  // }, []);

  const capturePhoto = async () => {
    if (camera.current != null) {
      const photo = await camera.current.takePhoto({});
      setImageSource(photo.path);
      setShowCamera(false);
      console.log(photo.path);
    }
  };

const onSavePressed = React.useCallback(async () => {
  try {
    // setSavingState('saving');
    // const hasPermission = await requestSavePermission();
    // if (!hasPermission) {
    //   alert('Permission denied!', 'Vision Camera does not have permission to save the media to your camera roll.');
    //   return;
    // }
    await CameraRoll.save(`file://${imageSource}`);
    setShowCamera(true);
    // setSavingState('saved');
  } catch (e) {
    const message = e instanceof Error ? e.message : JSON.stringify(e);
    // setSavingState('none');
    alert('Failed to save!', `An unexpected error occured while trying to save your photo. ${message}`);
  }
}, [imageSource]);



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

    {/* {supportsFlash && (
          <PressableOpacity style={styles.button} onPress={onFlashPressed} disabledOpacity={0.4}>
            <IonIcon name={flash === 'on' ? 'flash' : 'flash-off'} color="black" size={24} />
          </PressableOpacity>
        )}

    {supportsCameraFlipping && (
          <PressableOpacity style={styles.button} onPress={onFlipCameraPressed} disabledOpacity={0.4}>
            <IonIcon name="camera-reverse" color="black" size={24} />
          </PressableOpacity>
        )} */}
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
              ref={camera}
              style={{flex: 1}}
              device={device}
              isActive={showCamera}
              enableZoomGesture
              photo={true}
              />
      
      {showFrameModal &&
      <View
      style= {{
        position:'absolute',
        top: 0 ,
        left: 0,
        right: 0,
        bottom: 0
       }}>
      <FrameModal
        isVisible={showFrameModal}
        onClose={() => setShowFrameModal(false)}
        selectedFrameId={selectedFrameId}
        />
        </View>
      } 
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
      icon={icons.scan}
      iconStyle={{
        width: 40,
        height: 40
      }}
      onPress={()=>setShowGalleryModal(true)}
      />

     <IconButton
      icon={icons.cameraButton}
      iconStyle={{ 
        width: 40,
        height: 40
      }}
      onPress={()=>capturePhoto()}
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
      {showCamera ? (
        <>
      {/* Filter */}
      {showFilterModal &&
        <FilterModal
        isVisible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        //자식 FilterModal로 token전달
        token={token}
        loadFrameModal={loadFrameModal}
        />}
  
      {showGalleryModal &&
        <GalleryModal
        isVisible={showGalleryModal}
        onClose={() => setShowGalleryModal(false)}
        />}

        {/*Header*/}
        {renderHeader()}
  
        {renderCamera()}
  
        {renderFooter()}
        </>
      ) : (
        <>
        {imageSource !== '' ? (
          <Image
            style={styles.image}
            source={{
              uri: `file://${imageSource}`,
            }}
            />
            
        ) : null}
        
        <View style={styles.backButton}>
            <TouchableOpacity
              style={{
                backgroundColor: 'rgba(0,0,0,0.2)',
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                borderWidth: 2,
                borderColor: '#fff',
                width: 100,
              }}
              onPress={() => setShowCamera(true)}>
              <Text style={{color: 'white', fontWeight: '500'}}>Back</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
          <View style={styles.buttons}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#fff',
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: '#77c3ec',
                }}
                onPress={() => setShowCamera(true)}>
                <Text style={{color: '#77c3ec', fontWeight: '500'}}>
                  Retake
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: '#77c3ec',
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: 'white',
                }}
                onPress={onSavePressed}>
                <Text style={{color: 'white', fontWeight: '500'}}>
                  Use Photo
                </Text>
              </TouchableOpacity>

              </View>
        </View>
        </>
      )}
    </View>
  );

  
}

//사진 저장 페이지 style, 추후 정리 필요
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'gray',
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.0)',
    position: 'absolute',
    justifyContent: 'center',
    width: '100%',
    top: 0,
    padding: 20,
  },
  buttonContainer: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    bottom: 0,
    padding: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  camButton: {
    height: 80,
    width: 80,
    borderRadius: 40,
    //ADD backgroundColor COLOR GREY
    backgroundColor: '#B2BEB5',

    alignSelf: 'center',
    borderWidth: 4,
    borderColor: 'white',
  },
  image: {
    width: '100%',
    height: '100%',
    aspectRatio: 9 / 16,
  },
  saveButton: {
    position: 'absolute',
    bottom:35,
    left: 35,
    width: 40,
    height: 40,
  },
  icon: {
    textShadowColor: 'black',
    textShadowOffset: {
      height: 0,
      width: 0,
    },
    textShadowRadius: 1,
  },
});

export default Home;