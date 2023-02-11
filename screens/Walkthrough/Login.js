import React from 'react';
import {
  View,
  Text,
  Image,
  Linking
} from 'react-native';
import { WebView } from 'react-native-webview';

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
      // const [data, setData] = React.useState([]);

      console.log(url);
      console.log(code);

      //전체 데이터 확인 및 access token 저장용 2/11 토큰 불러내기 성공
      fetch(`${KAKAO_AUTH_URL}`)
      .then((res) => res.json())
      .then(res => {
      console.log(res)
      const token = res.data.jwtToken
      console.log(token)

      //사용자 데이터 fetch 정보 호출 완료
      fetch(`${userInfoApi}`, {
          method : "GET",
          headers : {
            Authorization : `Bearer ${token}`
          }
        }) 
        .then((res) => res.json())
        .then(res => {
        const userData = res
        console.log(userData)
        })
        .catch(console.error)
      })
      .catch(console.error)

    

      this.webview.stopLoading();
      this.props.navigation.navigate('Walkthrough');

    }
  }

}

export default Login; 