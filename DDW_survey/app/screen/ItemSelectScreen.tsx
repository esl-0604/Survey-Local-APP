import React, {useContext, useEffect, useState} from "react";
import { Text, View, StyleSheet, Image,TouchableOpacity, ScrollView } from "react-native";
import { ItemList } from "../data/itemData";
import PercentageBar from "@/components/PercentageBar";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SurveyContext } from "../context";
import SubmitModal from "@/components/SubmitModal";

export default function ItemSelectScreen() {
    const { surveyDataList, setSurveyDataList, surveyPersentage, setSurveyPercentage, reload, setReload }: any = useContext(SurveyContext)

    const [isSelected, setIsSelected] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<any[]>([]);

    const SelectItem = (index : string) => {
        let updateSelectedItem = [...selectedItem];
        if(updateSelectedItem.includes(index)){
            updateSelectedItem = updateSelectedItem.filter((item) => item !== index);
        }
        else {
            updateSelectedItem.push(index);
        }
        setSelectedItem(updateSelectedItem);
    }

    useEffect(() => {
        // console.log(selectedItem);
    }, [selectedItem])
    
    const SelectItemRefresh = () => {
        setSelectedItem([]);
    }

    const SelectItemSubmit = () => {
        if(selectedItem.length > 0) {
            let updateSurveyData = [...surveyDataList];
            selectedItem.forEach((item) => {
                updateSurveyData.push({
                    DateTime: new Date().toLocaleString(),
                    id: item,
                    name: ItemList[item].name
                })
            })
    
            setData(updateSurveyData);
            // console.log(updateSurveyData);
    
            setReload(!reload);
            setIsSelected(true);
    
            SelectItemRefresh();
        }
    }

    const setData = async (value : any) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('mySurveyData', jsonValue);
        } catch (e) {
            console.log(e);
        }
    };

    return (
      <View style={styles.Container}>
          <View style={styles.titleContainer}>
            <View>
            <Text style={styles.title}>Product Preference Survey</Text>
            </View>
            <View>
            <Text style={styles.subtitle}><Text style={styles.subtitle1}>[Multiple Choice]</Text> Please select the products you are interested in.</Text>
            </View>
          </View>
          {isSelected ?<SubmitModal modalOn={isSelected} setModalOn={setIsSelected}/> : null}
        <View style={styles.scrollContainer}>
            <View style={styles.itemContainer}>
                {Object.keys(ItemList).map((key)=> {
                    const totalNum = surveyDataList?.length;
                    const itemPercentage = Number(surveyPersentage?.find((item : any) => item.id === key)?.num);

                    return(
                        <TouchableOpacity 
                        key={key}
                        activeOpacity={0.95}
                        style={[styles.buttonCotainer, { backgroundColor: `${selectedItem.includes(key) ? "#0071DB": "#B5DCFF"}` }]}
                        onPress={() => SelectItem(key)}>
                        <View style={styles.imgContainer}>
                          <Image
                          source={ItemList[key].imgUrl}
                          style={styles.itemImg}
                          resizeMode="contain"
                        />

                        <View style={styles.percentBar}>
                        <PercentageBar percentage={totalNum ? Math.round((((itemPercentage ? itemPercentage : 0) / (totalNum) * 100) * 10)) / 10 : 0} />
                        </View>

                        </View>
                        <View style={styles.buttonTextContainer}>
                          <Text style={styles.buttonText}>{ItemList[key].name}</Text>    
                        </View>
                      </TouchableOpacity>
                    )
                })}
            </View>
            <View style={styles.submitButtonContainer}>
            <TouchableOpacity 
                    activeOpacity={0.5}
                    style={styles.submitButton2}
                    onPress={SelectItemSubmit}
                    >
                    <Text style={styles.ButtonText2}>Submit</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    activeOpacity={0.5}
                    style={styles.submitButton1}
                    onPress={SelectItemRefresh}
                    >
                    <Image
                        source={require('../../assets/images/refresh.png')} 
                        style={styles.setting}
                        resizeMode="contain"
                    />
                    <Text style={styles.ButtonText3}>reset</Text>
                </TouchableOpacity>
            </View>
          </View>

      </View>
    );
  }


  const styles = StyleSheet.create({
    Container:{
        flex: 1,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer:{
      justifyContent: 'flex-start',
      alignItems: 'center',
      height: 85,
      width: "100%",
      backgroundColor: 'white',
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      color: '#666666',
      marginBottom: 20,
    },
    subtitle1: {
        fontSize: 16,
        fontWeight: "bold",
        color: '#666666',
        marginBottom: 20,
      },
    CompleteTextContainer:{
        flex: 1,
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 10
    },
    CompleteText:{
        fontSize: 28,
        fontWeight: "bold",
        color: "#002755",
        marginVertical: 30
    },
    modalButtonSet: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 300,
        height: "15%",
        marginTop: 10
    },
    modalButton1:{
        width: 140,
        height: 50,
        paddingVertical: 10,
        backgroundColor: "#E3E3E3",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
    },
    modalButton2:{
        width: 140,
        height: 50,
        paddingVertical: 10,
        backgroundColor: "#002755",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
    },
    ButtonText1:{
        fontSize: 20,
        color: "black",
        fontWeight: 'bold',
    },
    ButtonText2:{
        fontSize: 20,
        color: "white",
        fontWeight: 'bold',
    },
    scrollContainer: {
      flex: 1,
      width: "80%",
      position: "relative"
    },
    itemContainer:{
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: "center",
      alignItems: 'flex-start',
      width: "100%",
      backgroundColor: 'white',
      gap: 30,
      paddingTop: 10,
      paddingBottom: 50
    },
    buttonCotainer: {
      backgroundColor: '#94CBFF',
      justifyContent: 'space-between',
      alignItems: "center",
      padding: 7,
      width: 250,
      height: 260,
      borderRadius: 10
    },
    imgContainer: {
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      width: 235,
      height: 200,
      borderRadius: 10,
      position: "relative"
    },
    itemImg: {
      width: 235,
      height: 200,
    },
    buttonTextContainer: {
      backgroundColor: "white",
      justifyContent: 'center',
      alignItems: 'center',
      width: 235,
      height: 40,
      borderRadius: 10
    },
    buttonText:{
        fontSize: 20,
        fontWeight: 'bold',
    },
    percentBar:{
        position: "absolute",
        bottom: 0,
        left: 10,
        right: 10,
        height: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    submitButtonContainer: {
        position: "absolute",
        width: 150,
        height: 150,
        right: -85,
        top: 180,
        // backgroundColor: "black",
        justifyContent: "space-around",
        alignItems: "center"
    },
    submitButton1:{
        width: 140,
        height: 50,
        paddingVertical: 10,
        // backgroundColor: "#E3E3E3",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    submitButton2:{
        width: 140,
        height: 50,
        paddingVertical: 10,
        backgroundColor: "#002755",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    ButtonText3:{
        fontSize: 20,
        color: "black",
        fontWeight: 'bold',
    },
    setting: {
        width: 25,
        height: 25,
        marginRight: 13
    }
  });


          //   ?<View style={styles.CompleteTextContainer}>
        //     <Text style={styles.CompleteText}>Thank you.</Text>
        //     <View 
        //         style={styles.buttonCotainer}>
        //         <View style={styles.imgContainer}>
        //             <Image
        //             source={ItemList[selectedItem].imgUrl}
        //             style={styles.itemImg}
        //             resizeMode="contain"
        //         />
        //         </View>
        //         <View style={styles.buttonTextContainer}>
        //             <Text style={styles.buttonText}>{ItemList[selectedItem].name}</Text>    
        //         </View>
        //     </View>
        //     <View style={styles.modalButtonSet}> 
        //         <TouchableOpacity 
        //             activeOpacity={0.5}
        //             style={styles.modalButton1}
        //             onPress={SelectItemCancle}>
        //             <Text style={styles.ButtonText1}>Cancle</Text>
        //         </TouchableOpacity>
        //         <TouchableOpacity 
        //             activeOpacity={0.5}
        //             style={styles.modalButton2}
        //             onPress={SelectItemConfirm}>
        //             <Text style={styles.ButtonText2}>Confirm</Text>
        //         </TouchableOpacity>
        //     </View>
        //   </View>