import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import { COLORS, FONTS, SIZES, icons, images } from "../../constants";
import StoryMenu from "./StoryMenu";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

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

const Stories = ({ navigation, user_id }) => {
  const [myBooks, setMyBooks] = React.useState([]);
  const [Ctgys, setCtgys] = React.useState([]);
  const [stop, setStop] = useState(false);
  const url = useSelector((state) => state.url);
  const inprogress = myBooks.filter((i) => i.book_status === "inprogress");
  const finished = myBooks.filter((i) => i.book_status === "finished");
  const categories = [
    {
      id: 1,
      categoryName: "In Progress",
      books: inprogress,
    },
    {
      id: 2,
      categoryName: "Finished",
      books: finished,
    },
  ];
  console.log("inprogress", inprogress);
  console.log("finished", finished);
  const [selectedCategory, setSelectedCategory] = React.useState(1);
  const getStories = () => {
    axios
      .get(`${url}/api/get/books/${user_id}`)
      .then((response) => response.data)
      .then((data) => {
        if (myBooks.length !== data.length) {
          setMyBooks(data);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  const getCtgy = () => {
    if (stop === false) {
      axios
        .get(`${url}/api/get/book/ctgys`)
        .then((response) => response.data)
        .then((data) => {
          if (Ctgys.length !== data.length) {
            setCtgys(data);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  };

  useEffect(() => {
    setInterval(() => {
      getStories();
      getCtgy();
    }, 10000);
    return () => {
      setStop(true);
    };
  }, [getStories, getCtgy]);

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
    console.log("selectedCategoryBooks", selectedCategoryBooks);
    const renderItem = ({ item }) => {
      return (
        <View style={{ marginVertical: SIZES.base }}>
          <TouchableOpacity
            style={{ flex: 1, flexDirection: "row" }}
            onPress={() =>
              navigation.navigate("BookDetail", {
                book: item,
              })
            }
          >
            {/* Book Cover */}
            <Image
              source={{ uri: `${url}/images/stories/${item.bookCover}` }}
              resizeMode="cover"
              style={{ width: 100, height: 150, borderRadius: 10 }}
            />

            <View style={{ flex: 1, marginLeft: SIZES.radius }}>
              {/* Book name and author */}
              <View>
                <Text
                  style={{
                    paddingRight: SIZES.padding,
                    ...FONTS.h2,
                    color: COLORS.white,
                  }}
                >
                  {item.bookName}
                </Text>
                <Text style={{ ...FONTS.h3, color: COLORS.lightGray }}>
                  {item.author}
                </Text>
              </View>

              {/* Book Info */}
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
                {item.genre.includes("Adventure") && (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      padding: SIZES.base,
                      marginRight: SIZES.base,
                      backgroundColor: COLORS.darkGreen,
                      height: 40,
                      borderRadius: SIZES.radius,
                    }}
                  >
                    <Text style={{ ...FONTS.body3, color: COLORS.lightGreen }}>
                      Adventure
                    </Text>
                  </View>
                )}
                {item.genre.includes("Romance") && (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      padding: SIZES.base,
                      marginRight: SIZES.base,
                      backgroundColor: COLORS.darkRed,
                      height: 40,
                      borderRadius: SIZES.radius,
                    }}
                  >
                    <Text style={{ ...FONTS.body3, color: COLORS.lightRed }}>
                      Romance
                    </Text>
                  </View>
                )}
                {item.genre.includes("Drama") && (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      padding: SIZES.base,
                      marginRight: SIZES.base,
                      backgroundColor: COLORS.darkBlue,
                      height: 40,
                      borderRadius: SIZES.radius,
                    }}
                  >
                    <Text style={{ ...FONTS.body3, color: COLORS.lightBlue }}>
                      Drama
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>

          {/* Bookmark Button */}

          <StoryMenu item={item} navigation={navigation} />
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
          keyExtractor={(item) => `${item.story_id}`}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
  function AddStory() {
    return (
      <TouchableOpacity
        style={{
          // tintColor: COLORS.lightBlue,
          // alignSelf: "center",
          height: 25,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          // margin: "40px auto",
          backgroundColor: "rgba(255, 255, 255, 0.097)",
          shadowColor: "rgba(11, 13, 49, 0.37)",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowRadius: 3,
          padding: 20,
          // flexDirection: "row",
          // marginRight: 10,
          marginBottom: SIZES.radius,
        }}
        onPress={() => {
          navigation.navigate("AddStory", {
            user_id: user_id,
          });
        }}
      >
        <Icon
          name="add"
          style={{
            width: 25,
            height: 25,
            // tintColor: COLORS.lightBlue,
            alignSelf: "center",
          }}
          size={25}
          color="#fff"
        />
        <Text style={{ color: "#fff" }}>ADD NEW STORY</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={{ marginTop: SIZES.radius }}>
      <AddStory />
      <View>{renderCategoryHeader()}</View>
      <View>{renderCategoryData()}</View>
    </View>
  );
};

export default Stories;
