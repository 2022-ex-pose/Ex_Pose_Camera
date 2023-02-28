import React, { useEffect } from 'react';
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

import { FrameModal } from "..";

const BaseUrl = "http://52.79.250.39:8080";
const userRecListApi = `${BaseUrl}/frame/recommend`;
const userMyListApi = `${BaseUrl}/frame/like`
const categoryUrl = `${BaseUrl}/frame?category=`;

// 토큰 받기 token, loadFrameModal 사용해서 selectedFrameId넘김
const FilterModal = ({ isVisible, onClose, token, loadFrameModal }) => {

  const modalAnimatedValue = React.useRef(new Animated.Value(0)).current
  const [showFilterModal, setShowFilterModal] = React.useState(isVisible)
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  //selected 시도중
  const [selectedCategory, setSelectedCategory] = React.useState('half');
  //const selectedframeList = React.useState(null);

  const [showFrameModal, setShowFrameModal] = React.useState('');

  // const [likeState, setLikeState] = React.useState('');

  // 토큰 전달 확인
  // console.log(`filter ${token}`)

  // useEffect(()=> {
  // frameList(selectedCategory)
  // },[selectedCategory])
  //여기까지

  useEffect(()=> {
    if(showFilterModal) {
        Animated.timing(modalAnimatedValue,{
          toValue:1,
          duration: 500,
          useNativeDriver: false
        }).start();
    } else {
      Animated.timing(modalAnimatedValue,{
        toValue:0,
        duration: 500,
        useNativeDriver: false
      }).start(()=> onClose());
    } 
  }, [showFilterModal])

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0,1],
    outputRange: [SIZES.height, SIZES.height-320]
  })

  const frameList = (category) => {
    
     useEffect(() => {
      setIsLoading(true);
      getAllFrames(category);
    },[selectedCategory]);

    const getAllFrames = (selectedCategory) => {

      //추천 프레임 리스트 호출
      if (selectedCategory=="rec") {
        fetch(`${userRecListApi}`,{
          method : "GET",
          headers : {
              Authorization : `Bearer ${token}`
          }
          })
      .then((res) => res.json())
      .then((resJson)=>{setData(resJson.data)
      //추천api호출 확인
      // console.log(resJson)
    })
      .catch(console.error)
      .finally(() => setIsLoading(false));
      }

      if (selectedCategory=="my") {
        fetch(`${userMyListApi}`,{
          method : "GET",
          headers : {
              Authorization : `Bearer ${token}`
          }
          })
      .then((res) => res.json())
      .then((resJson)=>{setData(resJson.data)
      //좋아요 api 호출 확인
      // console.log(resJson)
    })
      .catch(console.error)
      .finally(() => setIsLoading(false));
      }

      else {
        fetch(`${categoryUrl}${selectedCategory}`)
        .then((res) => res.json())
        .then((resJson)=>{setData(resJson.data)})
        .catch(console.error)
        .finally(() => setIsLoading(false));
      }

    }

    const renderCategory = ({item}) => {

      const userLikeState = `${BaseUrl}/frame/like?frameId=`
      const userUnlikeState = `${BaseUrl}/frame/like/cancel?frameId=`


      const likeUpdate = (likeState, frameId) => {
      // console.log(likeState)
      // console.log(frameId)

       if(likeState===true) {
        console.log("true state load success")
        fetch(`${userUnlikeState}${frameId}`,{
          method : "PATCH",
          headers : {
              Authorization : `Bearer ${token}`
          }
          })
      // .then (console.log("like to unlike"))
       .catch(console.error)
       }

       if(likeState===false) {
        console.log("false state load success")
        fetch(`${userLikeState}${frameId}`,{
          method : "PATCH",
          headers : {
              Authorization : `Bearer ${token}`
          }
          })
       // .then (console.log("unlike to like"))
      .catch(console.error)
       }
      }
       
      return (

        <View>
          <TouchableOpacity
          onPress={()=> loadFrameModal(item.frameId)}>
          <Image
          source={{uri: item.framePath}}
          style={{width:150,
          height:150}}
          resizeMode= 'contain'
          />
          </TouchableOpacity>
          
          <TouchableOpacity
          style={{
            position: 'absolute',
            top: '15%',
            left: 7,
          }}
          onPress={()=> likeUpdate(item.like_state, item.frameId)}>
            
          {/* 아이콘 수정해야함 */}
          <Image
          source={item.like_state ? icons.checkmark : icons.cameraButton}
          resizeMode="contain"
          style={{
            width: 20,
            height: 20,
          }}
          />

            </TouchableOpacity>
          
          <View>
            <Text> {`${item.frameName}`} </Text>
          </View>

        </View>
      )
      
    }
    return (
      <SafeAreaView>
        {
          isLoading ? <ActivityIndicator/> : (
            <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data}
            keyExtractor={item => `key-${item.frameId}`}
            renderItem={renderCategory}
            />
          )
        }
      </SafeAreaView>

    )
  }
    
  function renderFilterOption() {
    return (
      <FlatList
        horizontal
        data={dummyData.FilterOption}
        keyExtractor={item => `${item.id}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 5,
          marginBottom: 20
        }}
        
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              marginLeft: 10,
              marginRight: index == dummyData.FilterOption.length -1 ? SIZES.padding : 10
            }}
            
        > 
        <Text
        style={{
          color: COLORS.white == item.id ? COLORS.primary : COLORS.black,
          ...FONTS.h3
        }}
        onPress={()=>setSelectedCategory(item.category)}
        >
          {item.name}
          
        </Text>
        </TouchableOpacity>
        )}
      />
    )
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      >
        <View
          style={{
            flex: 1
          }}
          >
            
        
            <TouchableWithoutFeedback
              onPress={() => setShowFilterModal(false)}>
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                  }}
                />
            </TouchableWithoutFeedback>

            <Animated.View
              style={{
                position: 'absolute',
                left: 0,
                top: modalY,
                width: "100%",
                height: "100%",
                padding: SIZES.padding,
                backgroundColor: COLORS.grey
              }}>
          <View>
            {renderFilterOption()}
            {frameList(selectedCategory)}
          </View>
            </Animated.View>

            

          </View>
      </Modal>

      
  )
}

export default FilterModal;