import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { TimerContext } from '../context/TimerContext';


const AddTimerForm = () => {
  const { dispatch } = useContext(TimerContext);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const handleAddTimer = () => {
    const h = parseInt(hours) || 0;
    const m = parseInt(minutes) || 0;
    const s = parseInt(seconds) || 0;
    const totalSeconds = h * 3600 + m * 60 + s;

    if (!name || !category || totalSeconds <= 0) {
      alert('Please fill all fields with valid time.');
      return;
    }

    const newTimer = {
      id: Date.now().toString(),
      name,
      category,
      duration: totalSeconds,
      remaining: totalSeconds,
      status: 'Paused',
    };

    dispatch({ type: 'ADD_TIMER', payload: newTimer });

    setName('');
    setCategory('');
    setHours('');
    setMinutes('');
    setSeconds('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Timer Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Category"
        style={styles.input}
        value={category}
        onChangeText={setCategory}
      />
      <View style={styles.durationContainer}>
        <TextInput
          placeholder="HH"
          style={styles.durationInput}
          value={hours}
          keyboardType="numeric"
          onChangeText={setHours}
        />
        <TextInput
          placeholder="MM"
          style={styles.durationInput}
          value={minutes}
          keyboardType="numeric"
          onChangeText={setMinutes}
        />
        <TextInput
          placeholder="SS"
          style={styles.durationInput}
          value={seconds}
          keyboardType="numeric"
          onChangeText={setSeconds}
        />
      </View>
      <Button title="Add Timer" onPress={handleAddTimer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  durationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  durationInput: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 8,
    flex: 1,
    marginRight: 5,
    textAlign: 'center',
  },
});

export default AddTimerForm;
