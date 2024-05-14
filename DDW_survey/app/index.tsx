import React from 'react';
import react, { useEffect, useState } from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, StyleSheet, Image,TouchableOpacity } from "react-native";
import ItemSelectScreen from "./screen/ItemSelectScreen";
import ManagerModal from '@/components/ManageModal';
import ManagerScreen from './screen/ManagerScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SurveyContext } from "./context";

export default function Index() {
  const [screen, setScreen] = useState<string>("item");
  const [modalOn, setModalOn] = useState<boolean>(false);

  // useEffect(() => {
  //   console.log(screen);
  // }, [screen])

  const [surveyDataList, setSurveyDataList] = useState<any>([]);
  const [surveyPersentage, setSurveyPercentage] = useState<any>([]);
  const [reload, setReload] = useState(false);

  
  const aggregateData = (items : any) => {
    const result = items.reduce((acc : any, item : any) => {
      // 해당 id로 된 객체가 이미 accumulator에 있는지 찾기
      const existingItem = acc.find((x : any) => x.id === item.id);
      if (existingItem) {
        // 이미 있으면 num을 증가
        existingItem.num += 1;
      } else {
        // 새 항목을 accumulator에 추가
        acc.push({ id: item.id, name: item.name, num: 1 });
      }
      return acc;
    }, [])
    .sort((a : any, b : any) => b.num - a.num);
  
    return result;
  }

const setData = async (value : any) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('mySurveyData', jsonValue);
    } catch (e) {
        console.log(e);
    }
};

const getData = async () => {
    try {
        await AsyncStorage.getItem('mySurveyData')
        .then((data) => {
            if(data){
              const sortedArrayData = JSON.parse(data).sort((a : any, b : any) => new Date(a.DateTime).valueOf() - new Date(b.DateTime).valueOf());
              console.log(sortedArrayData);
              // Data List 그대로 저장
              setSurveyDataList(sortedArrayData);
              
              const percentageData = aggregateData(sortedArrayData);
              console.log(percentageData);
              // Percent Data 따로 저장
              setSurveyPercentage(percentageData);
            }
            else{
              setSurveyDataList([]);
              setSurveyPercentage([]);
            }
        });
    } 
    catch (e) {
        console.log(e);
    }
};
  
  useEffect(() => {
    // removeData();

    // setData([
    //   {id: "0", name: "Robopera", DateTime: "2024-05-09 10:36:22"},
    //   {id: "0", name: "Robopera", DateTime: "2024-05-09 10:36:24"},
    //   {id: "1", name: "Endo Cubot", DateTime: "2024-05-09 10:40:22"},
    //   {id: "1", name: "Endo Cubot", DateTime: "2024-05-09 10:46:22"},
    //   {id: "0", name: "Robopera", DateTime: "2024-05-09 11:36:22"},
    // ]);
    getData();
    // console.log(reload);

  }, [reload])

  return (
    <SurveyContext.Provider value={{surveyDataList, setSurveyDataList, surveyPersentage, setSurveyPercentage, reload, setReload}}>
      <SafeAreaProvider style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/Endo_Logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.iconContainer}>
          <TouchableOpacity
              activeOpacity={0.5}
              style={styles.settingContainer}
              onPress={() => setScreen("item")}>
              <Image
                source={require('../assets/images/home.png')} 
                style={styles.home}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.settingContainer}
              onPress={() => setModalOn(true)}>
              <Image
                source={require('../assets/images/data.png')} 
                style={styles.setting}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
        {modalOn ? <ManagerModal modalOn={modalOn} setModalOn={setModalOn} setScreen={setScreen}/> : null}

        {screen == "item" ? <ItemSelectScreen /> : null}
        {screen == "complete" ? <></> : null}
        {screen == "manager" ? <ManagerScreen /> : null}


      </SafeAreaProvider>
    </SurveyContext.Provider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    width: "100%",
    padding: 10,
    backgroundColor: 'white',
  },
  iconContainer:{
    flexDirection: "row",
    width: 100
  },
  settingContainer:{
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: 'center',  
  },
  logo: {
    width: 200, 
    height: 80, 
  },
  home: {
    width: 30,
    height: 30
  },
  setting: {
    width: 25,
    height: 25
  }
});