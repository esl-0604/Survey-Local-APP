import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PercentageBarProps {
    percentage : number
}

export default function PercentageBar ({ percentage } : PercentageBarProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.percentageBar, { width: `${percentage}%` }]} />
      <Text style={styles.percentageText}>{`${percentage}%`}</Text>
    </View>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  percentageBar: {
    height: '100%',
    backgroundColor: '#007bff',
    borderRadius: 10,
  },
  percentageText: {
    position: 'absolute',
    right: 10,
    top: 1,
    color: 'black',
    fontSize: 10,
  }
});