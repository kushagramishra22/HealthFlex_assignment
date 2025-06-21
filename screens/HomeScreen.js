import React, { useContext, useState, useMemo } from 'react';
import {
  View,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  UIManager,
  Platform,
  Pressable
} from 'react-native';
import { TimerContext } from '../context/TimerContext';
import AddTimerForm from '../components/AddTimerForm';
import TimerCard from '../components/TimerCard';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}

const HomeScreen = () => {
  const { state, dispatch } = useContext(TimerContext);
  const [expanded, setExpanded] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    const unique = Array.from(new Set(state.timers.map(t => t.category)));
    return ['All', ...unique];
  }, [state.timers]);

  const grouped = useMemo(() => {
    const filtered = selectedCategory === 'All'
      ? state.timers
      : state.timers.filter(timer => timer.category === selectedCategory);

    return filtered.reduce((acc, timer) => {
      acc[timer.category] = acc[timer.category] || [];
      acc[timer.category].push(timer);
      return acc;
    }, {});
  }, [state.timers, selectedCategory]);

  const handleBulkAction = (category, action) => {
    grouped[category].forEach(timer => {
      if (action === 'reset') {
        dispatch({
          type: 'UPDATE_TIMER',
          payload: { ...timer, remaining: timer.duration, status: 'Paused' }
        });
      } else {
        dispatch({
          type: 'UPDATE_TIMER',
          payload: { ...timer, status: action }
        });
      }
    });
  };

  const toggleCategory = category => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(prev => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <ScrollView style={styles.container}>
      <AddTimerForm />

      <Text style={styles.heading}>Filter by Category:</Text>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        style={styles.picker}
      >
        {categories.map((cat) => (
          <Picker.Item key={cat} label={cat} value={cat} />
        ))}
      </Picker>

      {Object.entries(grouped).map(([category, timers]) => (
        <View key={category} style={styles.categorySection}>
          <TouchableOpacity
            style={styles.categoryHeader}
            onPress={() => toggleCategory(category)}>
            <Ionicons
              name={expanded[category] ? 'chevron-down' : 'chevron-forward'}
              size={20}
              color="#333"
            />
            <Text style={styles.categoryTitle}>{category}</Text>
          </TouchableOpacity>

          {expanded[category] && (
            <>
              <View style={styles.bulkButtons}>
                <Pressable
                  style={({ pressed }) => [styles.bulkButton, pressed && styles.bulkButtonPressed]}
                  onPress={() => handleBulkAction(category, 'Running')}
                >
                  <Ionicons name="play" size={16} color="white" />
                  <Text style={styles.bulkText}>Start All</Text>
                </Pressable>
                <Pressable
                  style={({ pressed }) => [styles.bulkButton, pressed && styles.bulkButtonPressed]}
                  onPress={() => handleBulkAction(category, 'Paused')}
                >
                  <Ionicons name="pause" size={16} color="white" />
                  <Text style={styles.bulkText}>Pause All</Text>
                </Pressable>
                <Pressable
                  style={({ pressed }) => [styles.bulkButton, pressed && styles.bulkButtonPressed]}
                  onPress={() => handleBulkAction(category, 'reset')}
                >
                  <Ionicons name="refresh" size={16} color="white" />
                  <Text style={styles.bulkText}>Reset All</Text>
                </Pressable>
              </View>
              {timers.map(timer => (
                <TimerCard key={timer.id} timer={timer} />
              ))}
            </>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  heading: { fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 6, marginLeft: 10 },
  picker: { marginHorizontal: 10, backgroundColor: '#f0f0f0', borderRadius: 6, marginBottom: 10 },
  categorySection: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#e9f0fb',
    borderRadius: 12,
    marginHorizontal: 10,
    elevation: 2,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 6
  },
  bulkButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 8,
  },
  bulkButton: {
    backgroundColor: '#1e90ff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  bulkButtonPressed: {
    opacity: 0.8
  },
  bulkText: {
    color: 'white',
    fontWeight: '500'
  }
});

export default HomeScreen;