import WarningModal from "@/components/WarningModal";
import React, {useContext, useState} from "react";
import { Text, View, StyleSheet, Image,TouchableOpacity, ScrollView } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { SurveyContext } from "../context";


export default function ManagerScreen() {
    const { surveyDataList, setSurveyDataList, surveyPersentage, setSurveyPercentage, reload, setReload }: any = useContext(SurveyContext)

    const [warningModalOn, setWarningModalOn] = useState<boolean>(false);
    
    const colorSet = ['#009FFF', '#BDB2FA', '#93FCF8', '#FFA5BA', '#FFF47C', '#FF6F3C'];
    const gradientCenterColorSet = ['#006DFF', '#8F80F3', '#3BE9DE', '#FF7F97', '#F0BD38', '#FFA07A'];

    const pieData=surveyPersentage.map((item : any) => {
        return(
            {
                value: item.num,
                color: colorSet[Number(item.id)],
                gradientCenterColor: gradientCenterColorSet[Number(item.id)]
            }
        )
    });

    const renderDot = (color : any) => {
        return (
          <View
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: color,
              marginRight: 10,
            }}
          />
        );
      };

    const renderLegendComponent = () => {
        return (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 10,
                marginTop: 30,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: 150,
                  marginRight: 35,
                }}>
                {renderDot('#009FFF')}
                <Text style={{color: '#232B5D'}}>Rolling-stitch: {
                (surveyPersentage.find((item : any) => item.id === "0")?.num)
                ?(surveyPersentage.find((item : any) => item.id === "0")?.num)
                : 0}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: 150,
                  marginRight: 35,
                }}>
                {renderDot('#BDB2FA')}
                <Text style={{color: '#232B5D'}}>TraCloser: {
                (surveyPersentage.find((item : any) => item.id === "1")?.num)
                ?(surveyPersentage.find((item : any) => item.id === "1")?.num)
                : 0}</Text>
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', width: 150}}>
                {renderDot('#93FCF8')}
                <Text style={{color: '#232B5D'}}>Rolling-Channel: {
                (surveyPersentage.find((item : any) => item.id === "2")?.num)
                ?(surveyPersentage.find((item : any) => item.id === "2")?.num)
                : 0}</Text>
              </View>
            </View>
            
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: 150,
                  marginRight: 35,
                }}>
                {renderDot('#FFA5BA')}
                <Text style={{color: '#232B5D'}}>Robopera: {
                (surveyPersentage.find((item : any) => item.id === "3")?.num)
                ?(surveyPersentage.find((item : any) => item.id === "3")?.num)
                : 0}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: 150,
                  marginRight: 35,
                }}>
                {renderDot('#FFF47C')}
                <Text style={{color: '#232B5D'}}>Endo-Cubot: {
                (surveyPersentage.find((item : any) => item.id === "4")?.num)
                ?(surveyPersentage.find((item : any) => item.id === "4")?.num)
                : 0}</Text> 
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', width: 150}}>
                {renderDot('#FF6F3C')}
                <Text style={{color: '#232B5D'}}>Insertrument: {
                (surveyPersentage.find((item : any) => item.id === "5")?.num)
                ?(surveyPersentage.find((item : any) => item.id === "5")?.num)
                : 0}</Text>
              </View>
            </View>
          </>
        );
      };

    return (
      <View style={styles.Container}>
        {warningModalOn ? <WarningModal modalOn={warningModalOn} setModalOn={setWarningModalOn} /> : null}
        <View style={styles.titleContainer}>
            <View>
                <Text style={styles.title}>Result</Text>
            </View>
            <View>
                <Text style={styles.subtitle}>Check the Survey Data.</Text>
            </View>
            <TouchableOpacity 
                onPress={() => setWarningModalOn(true)}
                style={styles.warningContainer}
                activeOpacity={0.7}>
                <Image source={require('../../assets/images/warning.png')} style={styles.warning}/>
                <Text style={styles.warningText}>Data Reset</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.ChartContainer}>
            <View style={styles.ChartBox}>
                <PieChart
                    data={pieData}
                    donut
                    showGradient
                    sectionAutoFocus
                    radius={90}
                    innerRadius={60}
                    innerCircleColor={'white'}
                    centerLabelComponent={() => {
                        return (
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Text
                            style={{fontSize: 30, color: '#232B5D', fontWeight: 'bold'}}>
                            {surveyDataList?.length}
                            </Text>
                            <Text style={{fontSize: 18, color: '#232B5D'}}>Total</Text>
                        </View>
                        );
                    }}
                />
                {renderLegendComponent()}
            </View>

            <View style={styles.DataBox}>
                <View style={styles.header}>
                    <Text style={styles.headerCell1}>Index</Text>
                    <Text style={styles.headerCell}>Name</Text>
                    <Text style={styles.headerCell}>DateTime</Text>

                </View>
                <ScrollView style={styles.content}>
                    {surveyDataList.map((item : any, idx : any) => (
                    <View key={idx} style={styles.row}>
                        <Text style={styles.cell1}>{idx + 1}</Text>
                        <Text style={styles.cell}>{item.name}</Text>
                        <Text style={styles.cell}>{item.DateTime}</Text>

                    </View>
                    ))}
                </ScrollView>
            </View>
        </View>
      </View>
    );
  }


  const styles = StyleSheet.create({
    Container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer:{
        position: "relative",
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '15%',
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
    warningContainer:{
        position: "absolute",
        left: "-30%",
        top: 15,
        width: 140,
        height: 50,
        backgroundColor: "white",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        borderWidth: 2 ,
        borderRadius: 10,
        padding: 5
    },
    warningText:{
        fontSize: 15,
        fontWeight: "bold"
    },
    warning:{
        width: 40,
        height: 40
    },
    ChartContainer:{
        flex: 1,
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 10,
        flexDirection: "row"
    },
    ChartBox: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "#232B5D",
        height: "100%"
    },
    DataBox: {
        flex: 1,
        height: "100%"
    },
    scrollContainer:{
        width: "100%",
        height: "100%",
        backgroundColor: "red",
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#ddd',
        paddingHorizontal: 10,
        paddingVertical: 8,
      },
      headerCell1: {
        flex: 0.2,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      headerCell: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      content: {
        flex: 1,
      },
      row: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      cell: {
        flex: 1,
        textAlign: 'center',
      },
      cell1: {
        flex: 0.2,
        textAlign: 'center',
      }
  });