import AsyncStorage from '@react-native-async-storage/async-storage';

export const removeData = async () => {
    try {
        await AsyncStorage.removeItem('mySurveyData');
    } catch (e) {
        console.log(e); 
    }
};

export const setData = async (value : any) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('mySurveyData', jsonValue);
    } catch (e) {
        console.log(e);
    }
};

export const getData = async () => {
    try {
        await AsyncStorage.getItem('mySurveyData')
        .then((data) => {
            console.log(data);
            if(data) return((JSON.parse(data)));
        });
    } 
    catch (e) {
        console.log(e);
    }
};