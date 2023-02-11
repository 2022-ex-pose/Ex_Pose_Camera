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

const frameUrl = 'http://52.79.250.39:8080/frame?category=';

const FilterModal = ({ isVisible, onClose }) => {

  const modalAnimatedValue = React.useRef(new Animated.Value(0)).current
  const [showFilterModal, setShowFilterModal] = React.useState(isVisible)
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  //selected 시도중
  const [selectedFrameId, setSelectedFrameId] = React.useState('half');
  //const selectedframeList = React.useState(null);

  // useEffect(()=> {
  // frameList(selectedFrameId)
  // },[selectedFrameId])
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
      return() => {
        
      }
    },[]);

    const getAllFrames = (selectedCategory) => {
      fetch(`${frameUrl}${selectedCategory}`)
      .then((res) => res.json())
      .then((resJson)=>{setData(resJson.data)})
      .catch(console.error)
      .finally(() => setIsLoading(false));

    }

    const renderFrame = ({item}) => {
      return (
        <View>
          <Image
          source={{uri: item.framePath}}
          style={{width:150,
          height:150}}
          resizeMode= 'contain'
          />
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
            renderItem={renderFrame}
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
        onPress={()=>setSelectedFrameId(item.category)}
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
            {frameList(selectedFrameId)}
          </View>
            </Animated.View>

            

          </View>
      </Modal>
  )
}

export default FilterModal;