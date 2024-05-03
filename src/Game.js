import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import Board from './Board';

const Game = () => {
  const initialBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  const [board, setBoard] = useState(initialBoard);
  const [player, setPlayer] = useState('X');
  const [winner, setWinner] = useState('');

  useEffect(() => {
    checkWinner();
  }, [board]);

  const handlePress = (rowIndex, cellIndex) => {
    if (board[rowIndex][cellIndex] === '' && !winner) {
      const newBoard = [...board];
      newBoard[rowIndex][cellIndex] = player;
      setBoard(newBoard);
      setPlayer(player === 'X' ? 'O' : 'X');
    }
  };

  const checkWinner = () => {

    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] !== '' &&
        board[i][0] === board[i][1] &&
        board[i][0] === board[i][2]
      ) {
        setWinner(board[i][0]);
        return; 
      }
    }

   
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] !== '' &&
        board[0][i] === board[1][i] &&
        board[0][i] === board[2][i]
      ) {
        setWinner(board[0][i]);
        return; 
      }
    }

    
    if (
      board[0][0] !== '' &&
      board[0][0] === board[1][1] &&
      board[0][0] === board[2][2]
    ) {
      setWinner(board[0][0]);
      return; 
    }

    if (
      board[0][2] !== '' &&
      board[0][2] === board[1][1] &&
      board[0][2] === board[2][0]
    ) {
      setWinner(board[0][2]);
      return; 
    }

    
    const isBoardFull = board.every((row) => row.every((cell) => cell !== ''));
    if (isBoardFull && !winner) {
      setWinner('Tie');
    }
  };

  const resetBoard = () => {
    setBoard(initialBoard);
    setPlayer('X');
    setWinner('');
  };

  useEffect(() => {
    if (winner) {
      Alert.alert(
        winner === 'Tie' ? 'Ничья' : `Игрок ${winner} выиграл!`,
        '',
        [{ text: 'Начать заново', onPress: resetBoard }]
      );
    }
  }, [winner]);

  const renderCell = (rowIndex, cellIndex) => (
    <TouchableOpacity
      key={`${rowIndex}-${cellIndex}`}
      style={styles.cell}
      onPress={() => handlePress(rowIndex, cellIndex)}
    >
      <Text style={styles.cellText}>{board[rowIndex][cellIndex]}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Крестики-нолики</Text>
      <Board board={board} renderCell={renderCell} />
      <TouchableOpacity style={styles.resetButton} onPress={resetBoard}>
        <Text style={styles.resetButtonText}>Заново</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Game;

const styles = StyleSheet.create({

});
