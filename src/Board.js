
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'

const Board = ({board, onPress}) => {
  return (
    <View style={StyleSheet.board}>
      {board.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
        {
            row.map((cell, cellIndex) => (
                <TouchableOpacity
                    key={cellIndex}
                    style={styles.cell}
                    onPress={() => onPress(rowIndex, cell)}
                >
                    <Text style={styles.cellIndex}>
                        {cell}
                    </Text>
                </TouchableOpacity>
            ))
        }
        </View>
      ))}
    </View>
  )
}

export default Board

const styles = StyleSheet.create({
    board: {
        marginTop: 20,
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        width: 100,
        height: 100,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cellText: {
        fontSize: 36
    }
})