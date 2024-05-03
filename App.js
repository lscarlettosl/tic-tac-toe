import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, Alert, Button } from 'react-native';

const App = () => {
  const initialBoard = [null, null, null, null, null, null, null, null, null];
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [scoreX, setScoreX] = useState(0); // Добавлен счетчик побед для крестика
  const [scoreO, setScoreO] = useState(0); // Добавлен счетчик побед для нолика

  const onCellPress = (index) => {
    if (board[index] !== null) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = currentPlayer;

    const winner = checkWinner(newBoard);
    if (winner) {
      Alert.alert(`Победил ${winner}!`);
      setBoard(initialBoard);
      setCurrentPlayer('X');
      if (winner === 'X') {
        setScoreX(scoreX + 1); // Увеличиваем счетчик побед для крестика
      } else {
        setScoreO(scoreO + 1); // Увеличиваем счетчик побед для нолика
      }
      return;
    }

    setBoard(newBoard);

    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');

    if (!newBoard.includes(null)) {
      Alert.alert('Ничья!');
      setBoard(initialBoard);
      setCurrentPlayer('X');
    }
  };

  function checkWinner(board) {
    // Проверка на выигрыш остается без изменений
    if (board[0] == board[1] && board[1] == board[2] && board[0] !== null) {
        return board[0];
    }

    if (board[3] == board[4] && board[4] == board[5] && board[3] !== null) {
        return board[3];
    }

    if (board[6] == board[7] && board[7] == board[8] && board[6] !== null) {
        return board[6];
    }

    if (board[0] == board[3] && board[3] == board[6] && board[0] !== null) {
        return board[0];
    }

    if (board[1] == board[4] && board[4] == board[7] && board[1] !== null) {
        return board[1];
    }

    if (board[2] == board[5] && board[5] == board[8] && board[2] !== null) {
        return board[2];
    }

    if (board[0] == board[4] && board[4] == board[8] && board[0] !== null) {
        return board[0];
    }

    if (board[2] == board[4] && board[4] == board[6] && board[2] !== null) {
        return board[2];
    }

    if (!board.includes(null)) {
        return "никто";
    }

    return null;
  }

  const handleRestartGame = () => {
    setBoard(initialBoard);
    setCurrentPlayer('X');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.background} source={require('./assets/background.jpg')} />
      <Image style={styles.blocks} source={require('./assets/blocks.png')} />
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Победы X: {scoreX}</Text>
        <Text style={styles.scoreText}>Победы O: {scoreO}</Text>
      </View>
      <View style={styles.board}>
        {board.map((cell, index) => (
          <TouchableOpacity key={index} style={styles.cell} onPress={() => onCellPress(index)}>
            {cell === 'X' && <Text style={styles.x}>X</Text>}
            {cell === 'O' && <Text style={styles.o}>O</Text>}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Начать заново" onPress={handleRestartGame} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blocks: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  background: {
    zIndex: 3,
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',  
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cell: {
    width: '25%',
    height: '25%',
    margin: 15, 
    marginBottom: 40,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  x: {
    fontSize: 40,
    color: 'red',
  },
  o: {
    fontSize: 40,
    color: 'blue',
  },
  buttonContainer: {
    marginTop: 20,
  },
  scoreContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
