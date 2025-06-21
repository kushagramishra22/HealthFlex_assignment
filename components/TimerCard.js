import React, { useEffect, useState, useContext, useRef } from 'react';
import { View, Text, Button, StyleSheet, Modal } from 'react-native';
import { TimerContext } from '../context/TimerContext';
import * as Progress from 'react-native-progress';

const TimerCard = ({ timer }) => {
  const { dispatch } = useContext(TimerContext);
  const [modalVisible, setModalVisible] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (timer.status === 'Running') {
       const interval = setInterval(() => {
        if (timer.remaining > 0) {
          dispatch({
            type: 'UPDATE_TIMER',
            payload: { ...timer, remaining: timer.remaining - 1 }
          });
        } else {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          dispatch({ type: 'UPDATE_TIMER', payload: { ...timer, status: 'Completed' } });
          dispatch({ type: 'ADD_HISTORY', payload: { name: timer.name, completedAt: new Date().toLocaleString() } });
          setModalVisible(true);
        }
      }, 1000);
       return () => clearInterval(interval);
    }
    // if (timer.status !== 'Running' && intervalRef.current !== null) {
    //   clearInterval(intervalRef.current);
    //   intervalRef.current = null;
    // }
    // return () => clearInterval(intervalRef.current);
  }, [timer.status, timer.remaining]);

  const rawProgress = timer.duration > 0 ? timer.remaining / timer.duration : 0;
  const progress = Math.max(0, Math.min(1, rawProgress));
  const percentageText = (progress * 100).toFixed(0);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{timer.name}</Text>
      <Text>Status: {timer.status}</Text>
      <Text>Remaining: {timer.remaining}s</Text>

      <Progress.Bar
        progress={1 - progress}
        width={null}
        height={10}
        borderRadius={6}
        color="#1e90ff"
        unfilledColor="#e0e0e0"
        borderWidth={0}
        style={{ marginTop: 8 }}
      />
      <Text style={styles.percent}>{percentageText}% Remaining</Text>

      <View style={styles.buttons}>
        <Button title="Start" onPress={() => dispatch({ type: 'UPDATE_TIMER', payload: { ...timer, status: 'Running' } })} />
        <Button title="Pause" onPress={() => dispatch({ type: 'UPDATE_TIMER', payload: { ...timer, status: 'Paused' } })} />
        <Button title="Reset" onPress={() => dispatch({ type: 'UPDATE_TIMER', payload: { ...timer, remaining: timer.duration, status: 'Paused' } })} />
        <Button title="Delete" color="red" onPress={() => dispatch({ type: 'REMOVE_TIMER', payload: timer.id })} />
      </View>

      <Modal visible={modalVisible} transparent>
        <View style={styles.modalView}>
          <Text>🎉 {timer.name} Completed!</Text>
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: 'white', padding: 10, marginVertical: 5, borderRadius: 8 },
  title: { fontSize: 16, fontWeight: 'bold' },
  percent: { fontSize: 12, color: '#555', marginTop: 4 },
  buttons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
  modalView: { backgroundColor: 'white', margin: 50, padding: 20, alignItems: 'center', justifyContent: 'center', borderRadius: 8, elevation: 5 }
});

export default TimerCard;
