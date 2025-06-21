import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { TimerContext } from '../context/TimerContext';

const HistoryScreen = () => {
  const { state } = useContext(TimerContext);

  return (
    <View style={styles.historyContainer}>
      <FlatList
        data={state.history}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text style={styles.historyTitle}>{item.name}</Text>
            <Text style={styles.historyTime}>{item.completedAt}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  historyContainer: { flex: 1, padding: 10 },
  historyItem: { marginBottom: 10 },
  historyTitle: { fontSize: 16, fontWeight: 'bold' },
  historyTime: { fontSize: 14, color: 'gray' }
});

export default HistoryScreen;