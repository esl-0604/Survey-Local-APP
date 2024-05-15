import React, {useState, Dispatch, SetStateAction, useEffect } from "react";
import { Text, View, StyleSheet, Pressable, Dimensions, TouchableOpacity} from "react-native";

interface SubmitModalProps {
    modalOn : boolean,
    setModalOn : Dispatch<SetStateAction<boolean>>
    // setScreen : Dispatch<SetStateAction<string>>
}

const { width, height } = Dimensions.get('window');

export default function SubmitModal({modalOn, setModalOn}: SubmitModalProps) {

    return (
        <>
            <Pressable style={styles.ModalBackgroud} onPress={() => setModalOn(false)}/>
            <View style={styles.modalView}> 
                <View style={styles.modalTextBox}>
                    <Text style={styles.modalText}>Thank you.</Text>
                </View>
                <View style={styles.modalButtonSet}>
                    <TouchableOpacity 
                        activeOpacity={0.5}
                        onPress={() => {setModalOn(false);}}>
                        <View style={styles.modalButton2}><Text style={styles.ButtonText2}>확인</Text></View>
                    </TouchableOpacity>

                </View>

            </View>
        </>
    );
  }


  const styles = StyleSheet.create({
    ModalBackgroud:{
        zIndex: 1,
        opacity: 0.5,
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "black"
    },
    modalView: {
        zIndex: 2,
        position: "absolute",
        top: (height / 2) - 200,
        left: (width / 2) - 200,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 30,
        justifyContent: "space-between",
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        width: 400,
        height: 300
      },
      modalTextBox: {
        width: "100%",
        height: "80%",
        justifyContent: "center",
        alignItems: 'center',
      },
      modalText: {
        fontSize: 20
      },
      modalButtonSet: {
        flexDirection: "row",
        justifyContent: "space-around",

        width: "80%",
        height: "20%",
        // backgroundColor: "red"
      },
      modalButton1:{
        width: 100,
        paddingVertical: 10,
        backgroundColor: "#E3E3E3",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
      },
      modalButton2:{
        width: 100,
        paddingVertical: 10,
        backgroundColor: "#002755",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
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
      }
});