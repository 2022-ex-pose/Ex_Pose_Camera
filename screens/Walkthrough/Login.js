import React from 'react';
import {
  View,
  Text,
  Image,
  Linking
} from 'react-native';
import { WebView } from 'react-native-webview';
import {useRoute} from "@react-navigation/native";

class Login extends React.Component {
  
  constructor(props){
    super(props);
  }

  render() {
  
  return (
    <View style={{flex:1}}>
        <WebView
          ref = {(ref)=> {this.webview = ref;}}
          style = {{width: '100%', height:'100%'}}
          source={{uri: 
            'https://kauth.kakao.com/oauth/authorize?client_id=560569442d62d727bea35653d92e561f&redirect_uri=http://52.79.250.39:8080/oauth/callback/kakao&response_type=code'}}
          onNavigationStateChange={this.handleWebViewNavigationStateChange}
          onLoad={console.log('loaded')}/> 
    </View> 
    );
 }

    handleWebViewNavigationStateChange = (newNavState, props) => {

    const {url} = newNavState;
    var split = url.split("code=");
    const code = split[1];

    const CLIENT_ID = "560569442d62d727bea35653d92e561f";
    const BaseUrl = "http://52.79.250.39:8080";
    const REDIRECT_URI =  `${BaseUrl}/oauth/callback/kakao`;

    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    const userInfoApi = `${BaseUrl}/user/me`;

    if(url.includes('code=')){
      // 확인용 코드, 잘 되는거 확인함
      // console.log(url);
      // console.log(code);

      //전체 데이터 확인 및 access token 저장용 2/11 토큰 불러내기 성공
      
      fetch(`${KAKAO_AUTH_URL}`)
      .then((res) => res.json())
      .then(res => {
      console.log(res)
      const token = res.data.jwtToken
      console.log(token)
      //2/13 토큰 전달 완료
      this.props.navigation.navigate('Walkthrough', {token: token});
      })
      .catch(console.error)

      //webview 안나오게 하는거 위치 옮겨봤는데도 차이 없음, 다른 방법 알아봐야함
      this.webview.stopLoading();
      // this.props.navigation.navigate('Walkthrough');
    }
  }

}

export default Login; 