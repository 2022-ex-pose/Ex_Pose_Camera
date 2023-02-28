import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Animated,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from 'react-native';

import { COLORS, FONTS, SIZES, constants, icons, dummyData } from "../../constants";

import { FlatList } from 'react-native-gesture-handler';

import { SafeAreaView } from 'react-native-safe-area-context';

import { IconButton } from "../../components";


const FrameModal = ({ isVisible, onClose, selectedFrameId, showFrame }) => {

  const modalAnimatedValue = React.useRef(new Animated.Value(0)).current
  const [showFrameModal, setShowFrameModal] = React.useState(isVisible)

  const frameId = selectedFrameId
    
  console.log(frameId)
  const BaseUrl = "http://52.79.250.39:8080";
  const frameUrl = `${BaseUrl}/frame/{frameId}?frameId=${frameId}`;
  // const [framePath, setFramePath] = React.useState('')
  const [data, setData] = React.useState([]);
  // const [isLoading, setIsLoading] = React.useState(false);
  
React.useEffect(()=> {
  fetch(`${frameUrl}`)
  .then((res) => res.json())
  .then((resJson)=>{setData(resJson.data)}
  // console.log(framePath)
  ) 
  .catch(console.error)
  // .finally(() => setIsLoading(false));
},[])

  

    return (
      <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0}}>

      {/*close*/}
      <IconButton
        icon={icons.close}
        onPress={() => onClose()}
        />
        <Image
          source={{uri: data.framePath}}
          style={{width: 400,
          height: 600}}
          resizeMode= 'contain'
          />
        </View>
    )
}

  // const modalY = modalAnimatedValue.interpolate({
  //   inputRange: [0,1],
  //   outputRange: [SIZES.height, SIZES.height-700]
  // });

  // useEffect(()=> {
  //   if(showFrameModal) {
  //       Animated.timing(modalAnimatedValue,{
  //         toValue:1,
  //         duration: 500,
  //         useNativeDriver: false
  //       }).start();
  //   } else {
  //     Animated.timing(modalAnimatedValue,{
  //       toValue:0,
  //       duration: 500,
  //       useNativeDriver: false
  //     }).start(()=> onClose());
  //   } 
  // }, [showFrameModal])


  // return (
  //   <Modal
  //     animationType="fade"
  //     transparent={true}
  //     visible={isVisible}
  //     >
  //       <View
  //         style={{
  //           flex: 1
  //         }}
  //         >

  //           <Animated.View
  //             style={{
  //               position: 'absolute',
  //               left: 0,
  //               top: modalY,
  //               width: "100%",
  //               height: "80%",
  //               padding: SIZES.padding,
  //               backgroundColor: COLORS.lightGrey20
  //             }}>
  //         <View>
  //         {FrameLoad()}
  //         </View>
  //           </Animated.View>
  //         </View>
  //     </Modal>
  // )
// }

export default FrameModal;