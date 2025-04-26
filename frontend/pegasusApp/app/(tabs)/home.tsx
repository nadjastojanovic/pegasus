import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Platform,
  Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Mock patterns for levels
const levelPatterns = {
  1: [1, 2, 3, 4, 5, 6],
  2: [3, 2,1,6, 5,4],
  3:[1,5,3,2,4,6],
  4: [6,1, 3,4, 2,5],
};

const pins = [1, 2, 3, 4, 5,6];

export default function HomeScreen() {
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [currentHighlight, setCurrentHighlight] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const scale = useSharedValue(1);

  useEffect(() => {
    let index = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setCurrentHighlight(levelPatterns[selectedLevel][index]);
      index++;
      if (index >= levelPatterns[selectedLevel].length) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
      }
    }, 980);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [selectedLevel]);

  const handleStart = async () => {
    // Animate button with bounce and glow
    scale.value = withSpring(1.2, { damping: 3 }, () => {
      scale.value = withSpring(1);
    });

    try {
      const host = 'http://localhost:3000';

      const res = await fetch(`${host}/setLevel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level: selectedLevel }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error('Backend error:', err);
        Alert.alert('Error', 'Could not start sequence');
        return;
      }

      const { pattern } = await res.json();
      console.log('Pattern sent to Arduino:', pattern);

      // 3) optionally, clear the preview or navigate to a “running” screen here

    } catch (e: any) {
      console.error('Network error:', e);
      Alert.alert('Network Error', e.message);
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      shadowColor: '#6ca6a3',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.4,
      shadowRadius: scale.value * 10,
    };
  });

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/image5.png')}
        style={styles.avatar}
      />
      <Text style={styles.welcome}>Welcome, Barbara!</Text>

      <Text style={styles.label}>Choose a Level:</Text>
      <View style={styles.dropdown}>
        <Picker
          selectedValue={selectedLevel}
          onValueChange={(value) => setSelectedLevel(value)}
          style={styles.picker}
        >
          <Picker.Item label="Pattern 1" value={1} />
          <Picker.Item label="Pattern 2" value={2} />
          <Picker.Item label="Pattern 3" value={3} />
          <Picker.Item label="Pattern 4" value={4} />

        </Picker>
      </View>

      <Text style={styles.label}>Pattern Preview:</Text>
      <View style={styles.board}>
        {pins.map((pin) => {
          const isActive = pin === currentHighlight;
          return (
            <View
              key={pin}
              style={[styles.pin, isActive && styles.activePin]}
            />
          );
        })}
      </View>

      <Animated.View style={[styles.startButton, animatedStyle]}>
        <TouchableOpacity onPress={handleStart}>
          <Text style={styles.startText}>Start</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 60,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 5,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    width: 200,
  },
  picker: {
    width: '100%',
    height: 44,
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 180,
    justifyContent: 'center',
    marginVertical: 20,
  },
  pin: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
    margin: 10,
  },
  activePin: {
    backgroundColor: '#6ca6a3',
  },
  startButton: {
    backgroundColor: '#6ca6a3',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 10,
  },
  startText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});