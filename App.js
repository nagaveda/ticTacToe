import React, {useState}  from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import {
  Text,
  Button,
  Header,
  Title,
  Content,
  Container,
  Card,
  Left,
  Icon,
  Body,
  Right
} from "native-base";

import Icons from './components/Icons';
import Snackbar from "react-native-snackbar";

const itemArray = new Array(9).fill('');

const App = () => {
  
  const [isCross, setIsCross] = useState(false);
  const [winMessage, setWinMessage] = useState('');
  const [drawMessage, setDrawMessage] = useState('');
  const [winner, setWinner] = useState('');

  const didWin = () => {
    if((itemArray[0] && 
      itemArray[0] === itemArray[1] &&      
      itemArray[1] === itemArray[2])
      ||
      ( itemArray[3] && 
        itemArray[3] === itemArray[4] &&      
        itemArray[4] === itemArray[5]
      )
      ||
      (itemArray[6] && 
        itemArray[6] === itemArray[7] &&      
        itemArray[7] === itemArray[8]
      )
      ||
      (
        itemArray[0] && 
        itemArray[0] === itemArray[3] &&      
        itemArray[3] === itemArray[6]
      )
      ||
      (
        itemArray[1] && 
        itemArray[1] === itemArray[4] &&      
        itemArray[4] === itemArray[7]
      )
      ||
      (
        itemArray[2] && 
        itemArray[2] === itemArray[5] &&      
        itemArray[5] === itemArray[8]
      )
      ||
      (
        itemArray[0] && 
        itemArray[0] === itemArray[4] &&      
        itemArray[4] === itemArray[8]
      )
      ||
      (
        itemArray[2] && 
        itemArray[2] === itemArray[4] &&      
        itemArray[4] === itemArray[6]
      )
      ){
          return true;
      }
      return false;
      

  };

  const didDraw = () => {
    if(itemArray[0] &&itemArray[1] && itemArray[2] && itemArray[3] && itemArray[4] &&
      itemArray[5] && itemArray[6] && itemArray[7] && itemArray[8]
      ){
        console.log("test");
        return true;
      }
      console.log("fasak")
      return false;

  }

  const changeItem = (itemNumber) => {
    if(!itemArray[itemNumber]){
      itemArray[itemNumber] = isCross ? 'cross' : 'circle';
      setIsCross(!isCross);
    }
    else{
      Snackbar.show({
        text: "Box already filled!",
      })
    }

    if(didWin()){
      var winner = isCross ? 'cross' : 'circle'
      setWinner(winner);
      setWinMessage(`${winner} wins`);
    } 
    
    if(didDraw()){
      setDrawMessage('Game Draw...');
    }
    
  }

  const reloadGame = () => {
    itemArray.fill('')
    setIsCross(false);
    setWinMessage('');
    setDrawMessage('');
  }

  return(
    <Container style={{backgroundColor: "#30336B"}}>
       <Header style={{backgroundColor:"#333945"}}>
          <Left/>
          <Left/>
          <Left/>
          <Body>
            <Title>
            Tic Tac Toe
            </Title>
          </Body>
          <Right />
        </Header>
      <Content>
        <View style={styles.grid}>
          
          {
            itemArray.map((item, index) => (
              <TouchableOpacity
               style={styles.box}
               key={index}
               onPress = {()=>changeItem(index)}
              >
                <Card
                  style={styles.card}
                >
                  <Icons name={item} />
                </Card>
              </TouchableOpacity>
            ))
          }
        </View>

        <View>
          {
            winMessage || drawMessage ? (
              <View >
                <View>
                  <Text style={styles.message}>{winMessage? winMessage : drawMessage}</Text>
                </View>
                <Button onPress={reloadGame} style={styles.button} rounded primary>
                  <Text>Reset Game</Text>
                </Button>
              </View>
            ) : (
              <View>
                <Text style={styles.message}>
                  {
                    isCross ? 'Cross' : 'Circle'
                  } turn
                </Text>
              </View>
            )
          }
        </View>

      </Content>
    </Container>
  )
};

export default App;

const styles = StyleSheet.create({
  grid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 40
  },
  box: {
    width: '33%',
    marginBottom: 10,
  },
  card: {
    height: 120,
    textAlign: "center",
    justifyContent:"center",
    alignItems:"center"
  },
  message: {
    color: "black",
    backgroundColor : "#2475B0",
    fontSize: 30,
    textAlign:"center",
    marginTop: 20
  },
  button: {
    justifyContent:"center", 
    alignItems:"center", 
    alignSelf:"center", 
    marginTop:10}
});