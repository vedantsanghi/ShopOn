import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { ListItem, Icon } from "react-native-elements";
import firebase from "firebase";
import db from "../config";
import MyHeader from "../components/MyHeader";
import { TextInput } from "react-native-gesture-handler";

export default class MyStockScreen extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      allItems: [],
      stock: 0,
    };
    this.requestRef = null;
  }

  changeStock = (stock, itemName) => {
    db.collection("all_items")
      .where("user_id", "==", this.state.userId)
      .where("item_name", "==", itemName)
      .update({
        stock: stock,
      });
  };

  getAllItems = () => {
    this.requestRef = db
      .collection("all_items")
      .where("user_id", "==", this.state.userId)
      .onSnapshot((snapshot) => {
        var allItems = snapshot.docs.map((doc) => doc.data());
        this.setState({
          allItems: allItems,
        });
      });
  };

  componentDidMount() {
    this.getAllItems();
  }

  componentWillUnmount() {
    this.requestRef;
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    this.setState({
      stock: item.stock,
    });
    return (
      <ListItem
        key={i}
        title={item.item_name}
        subtitle={item.descripton}
        titleStyle={{ color: "black", fontWeight: "bold" }}
        rightElement={
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Icon
              name="PlusOutlined"
              type="font-awesome"
              color="#696969"
              onPress={() => {
                this.setState({
                  stock: stock + 1,
                });
                this.changeStock(this.state.stock, item.item_name);
              }}
            />
            <TextInput
              style={{
                width: 25,
                height: 25,
                alignSelf: "center",
                borderColor: "#ffab91",
                borderRadius: 10,
                borderWidth: 1,
              }}
              keyboardType="numeric"
              onChangeText={(text) => {
                this.setState({
                  stock: text,
                });
                this.changeStock(this.state.stock, item.item_name);
              }}
              value={this.state.stock}
            />
            <Icon
              name="MinusOutlined"
              type="font-awesome"
              color="#696969"
              onPress={() => {
                this.setState({
                  stock: stock - 1,
                });
                this.changeStock(this.state.stock, item.item_name);
              }}
            />
          </View>
        }
        bottomDivider
      />
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader title="My Stock" />
        <View style={{ flex: 1 }}>
          {this.state.allItems.length === 0 ? (
            <View style={styles.subContainer}>
              <Text style={{ fontSize: 20 }}>List Of Your Stock</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.allItems}
              renderItem={this.renderItem}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff5722",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
});
