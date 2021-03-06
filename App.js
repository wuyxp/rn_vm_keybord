/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet, 
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import './src/Util'
import VMKeybord from './src/component/KeyBord'

type Props = {};
export default class App extends Component<Props> {
  showKeyBord(){
    console.log('1231323');
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.showKeyBord}>
          <Text style={styles.welcome}>点击弹出虚拟键盘</Text>
        </TouchableOpacity>
        <VMKeybord />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
