import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-picker/picker';

export default function ProgressScreen() {
  const screenWidth = Dimensions.get('window').width;

  const [selectedLevel, setSelectedLevel] = useState('1');
  const levelGraphs = {
    '1': [1, 2, 2],
    '2': [1, 3, 4],
    '3': [2, 3, 3],
    '4': [2, 3, 3],

  };

  const lineData = {
    labels: ['Try 1', 'Try 2', 'Try 3'],
    datasets: [
      {
        data: levelGraphs[selectedLevel],
        color: () => '#6ca6a3',
        strokeWidth: 2,
      },
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.sectionBox}>
        <Text style={styles.sectionSub}>Learning Progress</Text>
      </View>
      <View style={styles.topBoxContainer}>
        <View style={styles.metricBox}>
          <Text style={styles.metricValue}>🔥 6</Text>
          <Text style={styles.metricLabel}>Day streak</Text>
        </View>
        <View style={styles.metricBox}>
          <Text style={styles.metricValue}>10 hours</Text>
          <Text style={styles.metricLabel}>Total Time Played</Text>
        </View>
      </View>

      <View style={{ width: '90%', marginBottom: 10 }}>
        <Text style={{ fontWeight: '600', marginBottom: 6 }}>Select Pattern:</Text>
        <View style={{ borderWidth: 1, borderRadius: 8, borderColor: '#ccc', overflow: 'hidden' }}>
          <Picker
            selectedValue={selectedLevel}
            onValueChange={(itemValue) => setSelectedLevel(itemValue)}
            style={{ height: 40 }}
          >
            <Picker.Item label="Pattern 1" value="1" />
            <Picker.Item label="Pattern 2" value="2" />
            <Picker.Item label="Pattern 3" value="3" />
            <Picker.Item label="Pattern 4" value="4" />

          </Picker>
        </View>
      </View>

      <View style={styles.graphCard}>
        <Image source={require('../../assets/images/image5.png')} style={styles.ponyIcon} />
        <Text style={styles.graphLabel}>Keep up the great work!</Text>

        <LineChart
          data={lineData}
          width={screenWidth - 60}
          height={200}
          withDots={false}
          withShadow={false}
          withInnerLines={false}
          withOuterLines={false}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: () => '#6ca6a3',
            labelColor: () => '#888',
          }}
          style={{ marginVertical: 8, borderRadius: 12 }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#f9f9f9',
  },
  topBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 20,
  },
  metricBox: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6ca6a3',
  },
  metricLabel: {
    fontSize: 14,
    color: '#555',
  },
  graphCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  ponyIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  graphLabel: {
    color: '#f2983c',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  sectionBox: {
    marginTop: 30,
    backgroundColor: '#6ca6a3',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'flex-start',
    borderBottomWidth: 4,
    borderBottomColor: '#f2983c',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  sectionSub: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});