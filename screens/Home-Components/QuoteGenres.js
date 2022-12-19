import React, { useState } from "react";
import { View, Text } from "react-native";
import { FONTS, SIZES } from "../../constants";

const QuoteGenres = (props) => {
  const { Ctgys, genreData } = props;

  const toArray = (prop) => {
    var dataArr = prop;
    let fs = "";
    for (let index = 0; index < dataArr.length; index++) {
      if (
        dataArr.charAt(index) != '"' &&
        dataArr.charAt(index) != "[" &&
        dataArr.charAt(index) != "]" &&
        dataArr.charAt(index) != " "
      ) {
        fs += dataArr.charAt(index);
      }
    }
    const result = fs.split(",");
    // console.log(fs);
    return result;
  };
  const dataArr = toArray(genreData);
  const strtoLowercase = (prop) => prop.toLowerCase();
  const genres = dataArr.map((value) => strtoLowercase(value));
  const newCtgys = Ctgys.filter(
    (item) => genres.indexOf(item.ctgy_slug) !== -1
  );

  console.log("newCtgys", newCtgys);
  const content = newCtgys.map((ctgy, index) => (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: SIZES.base,
        marginRight: SIZES.base,
        backgroundColor: ctgy.ctgy_background,
        height: 40,
        borderRadius: SIZES.radius,
      }}
      key={`ctgy-${index}`}
    >
      <Text style={{ ...FONTS.body3, color: ctgy.ctgy_color }}>
        {ctgy.category}
      </Text>
    </View>
  ));
  return content;
};

export default QuoteGenres;
