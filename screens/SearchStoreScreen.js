import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity} from "react-native";
import { ListItem, Icon, SearchBar } from "react-native-elements";
import db from "../config";

export default class SearchStoreScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullData: [],
      query: "",
      loading: false,
      originalData: [],
    };
  }

  searchStores = (data) => {
    var SearchedData = [];
    var query = this.state.query.toLowerCase();
      console.log("searched")
      for (var i = 0; i < data.length; i++) {
        if (data[i].shop_name.includes(query)){
          SearchedData.push(data[i]);
        }
      }
    this.setState({
      fullData: SearchedData,
      loading: false,
    });
  };

  keyExtractor = (item, index) => index.toString();
  
  renderItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        title={item.shop_name}
        titleStyle={{ color: "black", fontWeight: "bold" }}
        subtitle={"Address: " + item.address + "\nStore Type: " + item.store_type}
        rightElement={
          <Icon name="chevron-right" type="font-awesome" color="#696969" />
        }
        bottomDivider
      />
    );
  };

  componentDidMount() {
    var allData = db.collection("stores").onSnapshot((snapshot) => {
      var data = snapshot.docs.map((doc) => doc.data());
      this.setState({
        fullData: data,
        originalData: data,
      });
    });
  }

  render() {
    return (
      <View>
        <View>
          <SearchBar
            placeholder="Search stores..."
            showLoading={this.state.loading}
            onChangeText={(query) => {
              this.setState({ query: query, loading: true });
              this.searchStores(this.state.originalData);
            }}
            value={this.state.query}
          />
        </View>
        <View style={{ flex: 1 }}>
          {this.state.fullData.length === 0 ? (
            <View style={styles.subContainer}>
              <Text style={{ fontSize: 20 }}>No Stores found</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.fullData}
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
    marginTop: 100,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
