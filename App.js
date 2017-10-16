import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import GridView from 'react-native-super-grid';
import { Navigator } from 'react-native-deprecated-custom-components'; // 0.1.1
import PopupDialog, {
  DialogTitle,
  DialogButton,
  ScaleAnimation,
} from 'react-native-popup-dialog';
import API from './API/googleFinance.js';

import StockView from './StockView';

const scaleAnimation = new ScaleAnimation();
const items = [
  { name: 'Apple', code: 'NASDAQ:AAPL' },
  { name: 'Google', code: 'NASDAQ:GOOG' },
  { name: 'Facebook', code: 'NASDAQ:FB' },
  { name: 'Microsoft', code: 'NASDAQ:MSFT' },
  { name: 'Alibaba', code: 'NYSE:BABA' },
  { name: 'SET', code: 'INDEXBKK:SET' },
  { name: 'S&P', code: 'INDEXSP:.INX' },
  { name: 'NASDAQ', code: 'INDEXNASDAQ:.IXIC' },
  { name: 'Dow Jones', code: 'INDEXDJX:.DJI' },
  { name: 'Shanghai', code: 'SHA:000001' },
  { name: 'Nikkei', code: 'INDEXNIKKEI:NI225' },
  { name: 'Hang Sang', code: 'INDEXHANGSENG:HSI' },
  { name: 'TSEC', code: 'TPE:TAIEX' },
  { name: 'IPC MEXICO', code: 'INDEXBMV:ME' },
];

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogShow: false,
      name: 'SET',
      code: 'INDEXBKK:SET',
      index: '0.00',
      changeRaw: '+0.00',
      changePercent: '+0.00',
    };

    //this.showScaleAnimationDialog = this.showScaleAnimationDialog.bind(this);
  }

  configureScene() {
    return Navigator.SceneConfigs.FloatFromRight;
  }

  showScaleAnimationDialog(_name, _code) {
    API(_code).then(data => {
      console.log(data);
      this.setState({
        name: _name,
        code: _code,
        index: data.stockIndex,
        changeRaw: data.stockChangeRaw,
        changePercent: data.stockChangePercent,
      });
    });
    this.scaleAnimationDialog.show();
  }
  renderScene = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        style={{
          paddingTop: 75,
          paddingBottom: 25,
          fontSize: 28,
          fontWeight: '600',
        }}>
        USA  Tech Stock Markets
      </Text>
      <GridView
        itemWidth={130}
        items={items}
        style={styles.gridView}
        renderItem={item => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => this.showScaleAnimationDialog(item.name, item.code)}>
            <Text style={styles.itemName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Navigator
          initialRoute={{
            name: 'index',
            title: 'Popup Dialog',
          }}
          ref={navigator => {
            this.navigator = navigator;
          }}
          renderScene={this.renderScene}
          configureScene={this.configureScene}
          style={styles.navigator}
        />

        <PopupDialog
          ref={popupDialog => {
            this.scaleAnimationDialog = popupDialog;
          }}
          dialogAnimation={scaleAnimation}
          dialogTitle={<DialogTitle title="STOCK" />}
          actions={[
            <DialogButton
              text="DISMISS"
              onPress={() => {
                this.scaleAnimationDialog.dismiss();
              }}
              key="button-1"
            />,
          ]}
          height={0.5}
          width={0.9}>
          <StockView
            name={this.state.name}
            code={this.state.code}
            index={this.state.index}
            changeRaw={this.state.changeRaw}
            changePercent={this.state.changePercent}
          />
        </PopupDialog>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gridView: {
    paddingTop: 25,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    padding: 10,
    height: 100,
    backgroundColor: '#fff',
  },
  itemName: {
    fontSize: 22,
    color: '#000',
    fontWeight: '600',
  },
});
