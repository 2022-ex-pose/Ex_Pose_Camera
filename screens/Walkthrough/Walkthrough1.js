import React from 'react';
import {
  View,
  Image
} from 'react-native';

import { FlatList } from "react-native-gesture-handler"

import {SIZES, constants} from "../../constants";

const ITEM_WIDTH = 120;

const Walkthrough1 = () => {
  const [row1Images, setRowImages] = React.useState([
    ...constants.walkthrough_01_01_images,
    ...constants.walkthrough_01_01_images
  ])

  const [currentPosition,setCurrentPosition] = React.useState(0)

  const [row2Images, setRow2Images] = React.useState([
    ...constants.walkthrough_01_02_images,
    ...constants.walkthrough_01_02_images
  ])

  const [row2currentPosition,setRow2CurrentPosition] = React.useState(0)

  const row1FlatListRef = React.useRef()
  const row2FlatListRef = React.useRef()

  return (
    <View>
      {/*Slider 1*/}
      <FlatList
        ref={row1FlatListRef}
        delcelerationRate="fast"
        horizontal
        showsHorizontalScrollIndicator={false}
        listKey="Slider1"
        keyExtractor={(_, index)=> `Slider1_${index}`}
        data={row1Images}
        renderItem={({item, index}) => {
      return (
        <View
        style={{
          width: ITEM_WIDTH,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        >
          <Image
            source={item}
            style={{
              width:110,
              height: 110
            }}
          />
          </View>
        )
        }}
      />
    </View>
  )
}

export default Walkthrough1;