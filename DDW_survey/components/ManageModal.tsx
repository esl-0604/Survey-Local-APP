import React, {useState, Dispatch, SetStateAction, useEffect, useRef, ReactElement, ReactHTMLElement } from "react";
import { Keyboard, TextInput, Text, View, StyleSheet, Pressable, Dimensions, TouchableOpacity, NativeSyntheticEvent, TextInputChangeEventData} from "react-native";

interface ManagerModalProps {
    modalOn : boolean,
    setModalOn : Dispatch<SetStateAction<boolean>>
    setScreen : Dispatch<SetStateAction<string>>
}

const { width, height } = Dimensions.get('window');

export default function ManagerModal({modalOn, setModalOn, setScreen}: ManagerModalProps) {

    const [pass, setPass] = useState("");
    const passMap = [1,2,3,4];

    const hiddenTextInputRef = useRef<TextInput>(null);

    const handleKeyPress = (e : any) => {
      if (e.nativeEvent.key === 'Backspace') {
        // 백스페이스 키가 눌렸을 때 마지막 문자 제거
        setPass((prevText) => prevText.slice(0, -1));
      } else {
        // 다른 키가 눌렸을 때 텍스트 추가
        if(pass.length < 4) {setPass((prevText) => prevText + e.nativeEvent.key);
          if(pass.length == 3){
            if (hiddenTextInputRef.current) {
              hiddenTextInputRef.current.blur(); // 숨겨진 TextInput에 포커스를 맞추어 키보드 활성화
            }
          }
        }
        else{
          if (hiddenTextInputRef.current) {
            hiddenTextInputRef.current.blur(); // 숨겨진 TextInput에 포커스를 맞추어 키보드 활성화
          }
        }
      }
    };

    // useEffect(() => {
    //     console.log(pass);
    // }, [pass])

    const showKeyboard = () => {
        if (hiddenTextInputRef.current) {
          hiddenTextInputRef.current.blur();
          hiddenTextInputRef.current.focus(); // 숨겨진 TextInput에 포커스를 맞추어 키보드 활성화
        }
      };


    useEffect(() => {    
        const timeout = setTimeout(showKeyboard, 500);
        return () => clearTimeout(timeout);
      }, []);


    const PassCheck = () => {
      if(pass === "1125"){
        setScreen("manager"); 
        setModalOn(false);
      }
      else{
        setPass("");
        showKeyboard();
      }
    }

    return (
        <>
            <Pressable style={styles.ModalBackgroud} onPress={() => setModalOn(false)}/>
            <View style={styles.modalView}> 
                <View style={styles.modalTextBox}>
                    <Text style={styles.modalText}>관리자 모드로 이동하시겠습니까?</Text>
                </View>

                <Pressable style={styles.modalPasswordBox} onPress={() => {
                    showKeyboard();
                }}>
                  {passMap.map((item : number) => {
                    return(
                      <View key={item} style={[styles.passwordBox, {backgroundColor: `${pass.length >= item ? "#6E6E6E" :  "#D9D9D9"}`}]}></View>
                    )
                  })}
                    <TextInput
                        ref={hiddenTextInputRef}
                        style={styles.hiddenInput}
                        autoFocus={true}
                        onKeyPress={handleKeyPress}
                        defaultValue={pass}
                    />
                </Pressable>

                <View style={styles.modalButtonSet}>
                    <TouchableOpacity 
                        activeOpacity={0.5}
                        onPress={() => setModalOn(false)}>
                        <View style={styles.modalButton1}><Text style={styles.ButtonText1}>취소</Text></View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        activeOpacity={0.5}
                        onPress={PassCheck}>
                        <View style={styles.modalButton2}><Text style={styles.ButtonText2}>이동</Text></View>
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
        height: "40%",
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
      },
      modalPasswordBox: {
        width: "100%",
        height: "30%",
        justifyContent: "space-around",
        alignItems: "flex-start",
        // backgroundColor: "black",
        flexDirection: "row"
      },
      passwordBox: {
        width: 30, 
        height: 30,
        borderRadius: 100,
      },
      input: {
        padding: 10,
        borderWidth: 0.5,
        borderRadius: 4,
      },
      status: {
        padding: 10,
        textAlign: 'center',
      },
      hiddenInput: {
        // position: "absolute",
        display: "none",
        height: 0, // 높이를 0으로 설정하여 보이지 않게 함
        width: 0,  // 너비를 0으로 설정하여 보이지 않게 함
        opacity: 0, // 투명하게 설정하여 보이지 않게 함
      },
});