
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Text
} from 'react-native';
import IssueList from './IssueList.js';




export default class App extends React.Component
{
  render()
  {
    return(
    <>
            <Text style={{color:"cornflowerblue", padding:8, textAlign:"center",fontWeight:"bold", fontSize:16}}>Issue Tracker</Text>
      <IssueList/>
    </>);

  }
}
