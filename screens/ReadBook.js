import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
} from "react-native";
import { FONTS, COLORS, SIZES, icons } from "../constants";
import { WebView } from "react-native-webview";

const LineDivider = () => {
  return (
    <View style={{ width: 1, paddingVertical: 5 }}>
      <View
        style={{
          flex: 1,
          borderLeftColor: COLORS.lightGray2,
          borderLeftWidth: 1,
        }}
      ></View>
    </View>
  );
};

const ReadBook = ({ route, navigation }) => {
  const [book, setBook] = React.useState(null);

  const [scrollViewWholeHeight, setScrollViewWholeHeight] = React.useState(1);
  const [scrollViewVisibleHeight, setScrollViewVisibleHeight] =
    React.useState(0);

  const indicator = new Animated.Value(0);

  React.useEffect(() => {
    let { book } = route.params;
    setBook(book);
  }, [book]);
  const PdfReader = ({ url: uri }) => (
    <WebView style={{ flex: 1 }} source={{ uri: "https://reactnative.dev/" }} />
  );
  function renderBookInfoSection() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={book.bookCover}
          resizeMode="cover"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            height: 34,
          }}
        />

        {/* Color Overlay */}
        <View
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: book.backgroundColor,
          }}
        ></View>

        {/* Navigation header */}
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: SIZES.radius,
            height: 80,
            alignItems: "flex-end",
          }}
        >
          <TouchableOpacity
            style={{ marginLeft: SIZES.base }}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={icons.back_arrow_icon}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: book.navTintColor,
              }}
            />
          </TouchableOpacity>

          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={{ ...FONTS.h3, color: book.navTintColor }}>
              {book.bookName}
            </Text>
          </View>

          <TouchableOpacity
            style={{ marginRigth: SIZES.base }}
            onPress={() => console.log("Click More")}
          >
            <Image
              source={icons.more_icon}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: book.navTintColor,
                alignSelf: "flex-end",
              }}
            />
          </TouchableOpacity>
        </View>

        <LineDivider />
        {/* Book Cover */}
      </View>
    );
  }

  function renderBookDescription() {
    const indicatorSize =
      scrollViewWholeHeight > scrollViewVisibleHeight
        ? (scrollViewVisibleHeight * scrollViewVisibleHeight) /
          scrollViewWholeHeight
        : scrollViewVisibleHeight;

    const difference =
      scrollViewVisibleHeight > indicatorSize
        ? scrollViewVisibleHeight - indicatorSize
        : 1;

    return (
      <View style={{ flex: 1, flexDirection: "row", padding: SIZES.padding }}>
        {/* Custom Scrollbar */}
        <View
          style={{ width: 4, height: "100%", backgroundColor: COLORS.gray1 }}
        >
          <Animated.View
            style={{
              width: 4,
              height: indicatorSize,
              backgroundColor: COLORS.lightGray4,
              transform: [
                {
                  translateY: Animated.multiply(
                    indicator,
                    scrollViewVisibleHeight / scrollViewWholeHeight
                  ).interpolate({
                    inputRange: [0, difference],
                    outputRange: [0, difference],
                    extrapolate: "clamp",
                  }),
                },
              ],
            }}
          />
        </View>

        {/* Description */}
        <ScrollView
          contentContainerStyle={{ paddingLeft: SIZES.padding2 }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onContentSizeChange={(width, height) => {
            setScrollViewWholeHeight(height);
          }}
          onLayout={({
            nativeEvent: {
              layout: { x, y, width, height },
            },
          }) => {
            setScrollViewVisibleHeight(height);
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: indicator } } }],
            { useNativeDriver: false }
          )}
        >
          <Text
            style={{
              ...FONTS.h2,
              color: COLORS.white,
              marginBottom: SIZES.padding,
            }}
          >
            Description
          </Text>
          <Text style={{ ...FONTS.body2, color: COLORS.lightGray }}>
            Monsters By Anagha Onyedika Johnpaul (Quiescent) ‘Somtoochukwu
            Egwuatu’. That’s what his mother would call him mostly when he’d
            pull one of his mischievous pranks but he would argue his name is
            ‘T-boy’ or ‘Terror’ and dare not call him otherwise. He peeked at
            the wrist watch sitting on the wooden table in his room, then back
            to the mirror. He’s definitely going to be late but who cares “They
            should wait for all I care” he whispered to himself. After fastening
            the top button on his shirt, he took one look at himself then he
            unbuttoned it leaving two extra buttons open exposing a little
            amount of his chest hair; makes you wonder how far down they went.
            He dragged his coat from the wardrobe, threw it on the bed and
            reached for the wrist watch “Jenny out did herself on this one” he
            murmured as he put it one. He never really did appreciate any of her
            gifts but he liked the watch, not that he ever mentioned it to her
            hearing. He grabbed the coat from the bed and headed for the door
            but Eminem’s ‘Im not afraid’ ringtone made him realize he had
            forgotten his phone. “Hello, this better be quick” He answered the
            unknown number. He recognized the voice but the message the voice
            brought probably got him upset or maybe it was the fact that he was
            goin’ to take a detour, he rushed out but the voice on the other end
            said “bring your strap” then the call ended. He took a deep breath,
            went back inside, took out a small brown waist bag from the drawer,
            opened it and checked the content, then he checked if the gun was
            loaded, then he went back out. Chapter 1: Monsters :- “Fear not” he
            said; she said. Monster lurks thy path. Fear not her name; its name.
            Caution darkens his path. My fears anew My monsters, they grew:-
            accrue And they wait, to collect what is due The price, I know not;
            but my pains are true. There’re monsters in my room I’m dead scared,
            you might assume Would give anything to dispel the gloom Hope they
            are not of doom. My monsters; they loom free My path; where
            five-score fighting men would flee My pain; which eyes cannot see
            But my monsters; My monsters are me CHAPTER ONE: Mr Paul Handerson:
            Ahanna How did an orphan, immigrant, arrogant but ambitious son of
            Chief and Lolo Aghadinobi Agunnaya of Ubamugi somewhere in Ebonyi
            state Nigeria, get here WHO HE WAS:- Ahanna Agunnaya was the last
            son of the third wife of Chief Aghadinobi, the village head after
            the death his brother. Chief Aghadinobi never liked the idea of
            being limited to a place so he journeyed to neighboring villages
            even countries and on one of his quest he met Chief
            Aguadighiefunamba, Agbagbuagu I of Ugwuagu. Both became the richest
            among all neighboring villages, they made riches from importing
            stock fish(okporoko) from Cameroon, fabrics from Ghana too, and on
            one of their quest Chief Agu killed a lion meant to attack them and
            that was how he got his title. While Chief Agu focused solely on
            trading, Chief Agha was more interested in foreign culture and how
            free minded some have become. He took his first three sons on some
            of his journeys when he could and that was how he first son Onochie
            became a Muslim and all his sons were allowed to choose their paths
            in life. Ugomma was the second daughter of Chief Agu. She became a
            Christian despite her father’s disapproval. She had a habit of
            venturing into the forest looking for what we might never find out
            and that was how she met Ahanna. A young boy was sitting under an
            udara tree writing letters. “Isn’t he too young to be writing
            letter” She murmured but he heard her because he answered “I could
            say the same for you, Mary Aguadighiefunamba” without raising even
            an eyebrow.
            ----------------------------------------------------------------------------------------------------
            “How possible is it the all these flattery of mine is true” Ahanna
            murmured staring with disbelieve in his eyes at what seem to be a
            love letter for someone. “I’m really underpaid for this” He added
            before finally looking up to the surprised female staring down on
            him with something that might not be disdain but fear or maybe a
            little bit of both. “Sorry, I’m not a stalker just happened to know
            and met your father on some occasion” but the expression on her face
            remained the same disregarding his effortless attempt to explain how
            he knew her. “Oh, well the name is Ahanna, Ahanna Aghadinobi Paul”
            “It’s only fair you know my name too” and finally the dumb human now
            walking closer to him spoke but with disbelieve “And I thought knew
            all Chief Agha’s sons”. Ahanna didn’t reply, maybe because he was
            lost in analyzing the creature before him. He couldn’t make out her
            eyes because of the evening sun casting her shadow on him, her hair
            was tied in two huge buns, they surely would reach her waist if
            relaxed but was no such thing at their time but would make a really
            huge afro. She wore a rather old skirt and blouse holding a book
            closely tight to her chest, looking closer it was surely a bible.
            “Well, I think I’m a proof that you don’t and I’m pretty sure you
            don’t know Onochie” He finally answered. At this point she was close
            enough for someone who was scared a while ago so he took it she
            believes him now. “Are you a post office or something?” Mary asked
            taking a place beside him and reaching for one of the letters, she
            then stopped and shot him a look seeking for approval. “some are my
            dad’s while some are just love letters, ordered from above” He took
            a careful look at her, probably because of the next statement he was
            going to make “You know how these goes, I’ve read some of your
            letters and I must say you’re really stingy with compliments”.
            “What?” Mary asked then realized what he meant then she smiled. “OH
            LORD” he literally heard his heart scream, okay maybe that’s an
            exaggeration but now he couldn’t help but stare. “Is something on my
            face or you never seen a fine girl with brains before” she asked
            looking away from his eyes. “Uhmm…. There are ant on your forehead
            my dear” he replied calmly hiding the mischievous smile crawling
            across his face but it disappeared as soon as it came, Mary was up
            screaming and with the scream came a distant cry, a familiar cry, a
            cry no one liked. Someone was dead and a cry with horns simply means
            a chief was dead, so they both ran as fast as their feet could carry
            them towards the cry. Like if they ran hard enough it wouldn’t be
            any of their fathers but who would say it was any of them after all
            he left his father at his obi and Mary’s father had gone for one of
            their business trips since he had to run both his business and Chief
            Agha’s, meeting Onochie who now resides at Kano on his way.
            ----------------------------------------------------------------------------------------------------
            “PAUL HANDERSON” a female voice called out. He knew the voice was
            getting closer so he took the bag from the lanky looking guy looking
            suspiciously scared. He turned to meet a young lady rushing up to
            him. “see you later Jossy” Paul said waving at the lanky guy. “Sorry
            sir, I was asked to call a Paul Handerson there’s been an acc….
            Actually someone was stabbed””Please, we need your bike” the lady
            was panting but he wasn’t actually in the mood for a run but what
            options does he have. “Try to keep up he said” he started racing to
            the other direction. “The person is that way” the lady called out
            chasing after Paul. “We have to get the bike first” he shouted, not
            looking back but he heard the lady increasing her pace. Who on earth
            gets stabbed on a crusade on Pentecost week, Paul thought. He got to
            his bike, searched for his keys in his pocket and finally the bike
            was on and he was driving toward the lady who was now out of breath
            “get in dear, sorry” She got in but he didn’t move till she held on
            tight. On getting the scene there were policemen and ambulance
            already there. Paul pushed his way through the crowd holding the
            lady behind him. Then, lightening struck pass his chest as he stare
            in the face of the victim in awe. “Do you know him” the lady’s voice
            was rather soft now with concern on her face. Excuse me officer
            that’s my brother, thinking he said that out loud as he tried making
            his way pass the two policemen holding him. THAT’S MY BROTHER DAMN
            IT! he shouted at the policemen, then he walked up the patient in a
            body bag being zipped. The health personnel saw him and knew he had
            to stop, when he got there he went on his knees and closed his
            brother’s eyes then stood up and brought out a cell phone from his
            pocket and started striking in numbers on the buttons. The policemen
            also allowed the lady with him through maybe because they thought he
            needed someone. He called someone but couldn’t get himself to say
            anything, then he felt someone pulling the phone from him, he turned
            and it was the lady that came to call him. He let her take the phone
            then he walked to the ambulance then took off running.”Paul wait!”
            the lady cried chasing after him. Paul came to a stop under a tree
            at the end of the field, then sat down. Who was it? who stabbed
            peter? They have to pay. “Please, don’t make me run again I can’t
            take another race” he was interrupted by a female voice. “Sorry, I’m
            fine now” “What your name” he asked reaching out to help her sit.
            “Mary, Mary Agu” Mary said still breathing hard. Paul froze but then
            heard footsteps behind the tree then he saw a flash of the moon
            reflected by a dagger behind Mary immediately he threw himself at
            the attacker and started punching, then stabbed. Then a sound of
            Mary’s scream was heard followed by a gunshot but Paul was still
            stabbing the poor, uhmm… the human who obviously would like to do
            the same to him. You better not be dead Mary, not after all these
            years. He finally stopped then looked up to see a surprised face
            with a gun looking down on him. “Inspector James Howard, Let’s get
            you both cleaned up” the face said smiling.
          </Text>
        </ScrollView>
      </View>
    );
  }

  function renderBottomButton() {
    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        {/* Bookmark */}
        <TouchableOpacity
          style={{
            width: 60,
            backgroundColor: COLORS.secondary,
            marginLeft: SIZES.padding,
            marginVertical: SIZES.base,
            borderRadius: SIZES.radius,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => console.log("Bookmark")}
        >
          <Image
            source={icons.bookmark_icon}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              tintColor: COLORS.lightGray2,
            }}
          />
        </TouchableOpacity>

        {/* Start Reading */}
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: COLORS.primary,
            marginHorizontal: SIZES.base,
            marginVertical: SIZES.base,
            borderRadius: SIZES.radius,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => console.log("Rate")}
        >
          <Text style={{ ...FONTS.h3, color: COLORS.white }}>Rate Book</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (book) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.black }}>
        {/* Book Cover Section */}
        <View>{renderBookInfoSection()}</View>

        {/* Description */}
        <View style={{ flex: 2 }}>
          <PdfReader url="http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf" />
        </View>

        {/* Buttons */}
        <View style={{ height: 70, marginBottom: 30 }}>
          {renderBottomButton()}
        </View>
      </View>
    );
  } else {
    return <></>;
  }
};

export default ReadBook;
