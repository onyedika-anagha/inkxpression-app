import React, { useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import axios from "axios";

import { COLORS, FONTS, SIZES, icons, quotes } from "../../constants";
import QuoteGenres from "./QuoteGenres";

const LineDivider = () => {
  return (
    <View style={{ width: 1, paddingVertical: 18 }}>
      <View
        style={{
          flex: 1,
          borderLeftColor: COLORS.lightGray,
          borderLeftWidth: 1,
        }}
      ></View>
    </View>
  );
};

const Quotes = ({ navigation }) => {
  const [allQuotes, setAllQuotes] = React.useState([]);
  const [Ctgys, setCtgys] = React.useState([]);
  console.log(Ctgys);
  const url = useSelector((state) => state.url);
  useEffect(() => {
    const getQuotes = () => {
      axios
        .get(`${url}/api/get/quotes`)
        .then((response) => response.data)
        .then((data) => {
          setAllQuotes(data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    };
    const getCtgy = () => {
      axios
        .get(`${url}/api/get/quote/ctgys`)
        .then((response) => response.data)
        .then((data) => {
          setCtgys(data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    };
    getQuotes();
    getCtgy();
  }, []);
  const myQuotes = [...allQuotes];
  // console.log(myQuotesData);
  const categories = [
    {
      id: 1,
      categoryName: "All",
      books: allQuotes,
    },
    {
      id: 2,
      categoryName: "Top",
      books: allQuotes.filter((prop) => prop.rank > 2),
    },
    {
      id: 3,
      categoryName: "Coming Soon",
      books: allQuotes,
    },
  ];

  // const [myQuotes, setmyQuotes] = React.useState(myQuotesData);
  // const [categories, setCategories] = React.useState(categoriesData);
  const [selectedCategory, setSelectedCategory] = React.useState(1);

  function renderCategoryHeader() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{ flex: 1, marginRight: SIZES.padding }}
          onPress={() => setSelectedCategory(item.id)}
        >
          {selectedCategory == item.id && (
            <Text style={{ ...FONTS.h2, color: COLORS.white }}>
              {item.categoryName}
            </Text>
          )}
          {selectedCategory != item.id && (
            <Text style={{ ...FONTS.h2, color: COLORS.lightGray }}>
              {item.categoryName}
            </Text>
          )}
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ flex: 1, paddingLeft: SIZES.padding }}>
        <FlatList
          data={categories}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
          horizontal
        />
      </View>
    );
  }

  function renderCategoryData() {
    var books = [];

    let selectedCategoryBooks = categories.filter(
      (a) => a.id == selectedCategory
    );

    if (selectedCategoryBooks.length > 0) {
      books = selectedCategoryBooks[0].books;
    }
    const renderItem = ({ item, index }) => {
      const imgSize = Dimensions.get("window").width - 30;

      return (
        <View
          style={{
            marginVertical: SIZES.base,
            // height: Dimensions.get("window").height,
          }}
          key={`quotes-${index}`}
        >
          <View style={{ flex: 1, flexDirection: "row", marginRight: 20 }}>
            {/* Book Cover */}

            <View style={{ flex: 1, marginLeft: SIZES.radius }}>
              {/* Book name and author */}
              <View
                style={{
                  // flex: 1,
                  flexDirection: "row",
                  padding: 10,
                }}
              >
                <Image
                  source={{
                    uri: `${url}/images/profile/${item.profile_image}`,
                  }}
                  style={{
                    width: 40,
                    height: 40,
                    // left: -10,
                    // figure out your image aspect ratio
                    borderRadius: 20,
                  }}
                />
                <Text
                  style={{
                    ...FONTS.h3,
                    color: COLORS.lightGray,
                    marginTop: 10,
                    marginLeft: 10,
                  }}
                >
                  {item.name}
                </Text>
              </View>

              {/* Book Info */}
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  alignContent: "center",
                  width: "100%",
                  height: "100%",
                  paddingRight: 10,
                }}
              >
                <Image
                  source={{
                    uri: `${url}/images/quotes/${item.backgroundImage}`,
                  }}
                  style={{
                    width: imgSize,
                    height: imgSize,
                    // left: -10,
                    // figure out your image aspect ratio
                    aspectRatio: 3 / 3,
                  }}
                />
              </View>
              <View
                style={{
                  boxSizing: "inherit",
                  backgroundRepeat: "no-repeat",
                  padding: 0,
                  margin: 0,
                  marginTop: 0.35714,
                  marginRight: 0.71429,
                  marginLeft: 0.71429,
                  fontSize: 0.85714,
                  wordBreak: "break-word",
                }}
              >
                <Text
                  style={{
                    color: "rgba(255,255,255,.87)",
                  }}
                >
                  {item.caption}
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: SIZES.radius }}>
                <Image
                  source={icons.page_filled_icon}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: COLORS.lightGray,
                  }}
                />
                <Text
                  style={{
                    ...FONTS.body4,
                    color: COLORS.lightGray,
                    paddingHorizontal: SIZES.radius,
                  }}
                >
                  {item.pageNo}
                </Text>

                <Image
                  source={icons.read_icon}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: COLORS.lightGray,
                  }}
                />
                <Text
                  style={{
                    ...FONTS.body4,
                    color: COLORS.lightGray,
                    paddingHorizontal: SIZES.radius,
                  }}
                >
                  {item.readed}
                </Text>
              </View>

              {/* Genre */}
              <View style={{ flexDirection: "row", marginTop: SIZES.base }}>
                <QuoteGenres Ctgys={Ctgys} genreData={item.genre} />
              </View>
            </View>
          </View>

          {/* Bookmark Button */}
          <TouchableOpacity
            style={{ position: "absolute", top: 5, right: 15 }}
            onPress={() => console.log("Bookmark")}
          >
            <Image
              source={icons.bookmark_icon}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: COLORS.lightGray,
              }}
            />
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <View
        style={{ flex: 1, marginTop: SIZES.radius, paddingLeft: SIZES.padding }}
      >
        <FlatList
          data={books}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.quote_id}`}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

  return (
    <ScrollView
      style={{ marginTop: SIZES.radius }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      {/* Categories Section */}
      <View style={{ marginTop: SIZES.padding }}>
        <View>{renderCategoryHeader()}</View>
        <View>{renderCategoryData()}</View>
      </View>
    </ScrollView>
  );
};

export default Quotes;
