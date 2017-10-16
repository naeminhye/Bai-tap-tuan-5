import React, { PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import API from './googleFinance.js';
// let stockIndex = '0.00';
// let stockChangeRaw = '+0.00';
// let stockChangePercent = '+0.00';
export default function StockView({
  name = 'SET',
  code = 'INDEXBKK:SET',
  index = '0.00',
  changeRaw = '+0.00',
  changePercent = '+0.00',
}) {
  let style = styles.red;
  if (changeRaw[0] == '+') {
    style = styles.green;
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.stockName}>{name}</Text>
      <Text style={styles.stockCode}>{code}</Text>
      <Text style={styles.stockIndex}>{index}</Text>
      <Text style={[styles.stockChange, style]}>
        {changeRaw} ({changePercent})
      </Text>
    </View>
  );
}

StockView.propTypes = {
  name: PropTypes.string,
  code: PropTypes.string,
  index: PropTypes.string,
  changeRaw: PropTypes.string,
  changePercent: PropTypes.string,
};

const styles = StyleSheet.create({
  stockName: { fontSize: 40, fontWeight: 'bold', color: 'blue' },
  stockIndex: { fontSize: 60, fontWeight: 'bold' },
  stockChange: { fontSize: 40 },
  stockCode: {fontSize: 18 },
  red: {
    color: 'red',
  },
  green: {
    color: 'green',
  },
});
