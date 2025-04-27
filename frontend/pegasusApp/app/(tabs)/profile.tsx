import { View, Text, StyleSheet, Image } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
    
      <Text style={styles.name}>Barbara</Text>
      <Text style={styles.subtitle}>My Profile</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>bam426@lehigh.edu</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Date of Birth:</Text>
        <Text style={styles.value}>January 1, 2000</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Phone Number:</Text>
        <Text style={styles.value}>+1 (646) 705-7205</Text>
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
  },
  infoBox: {
    width: '80%',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
  },
  label: {
    fontWeight: '600',
    color: '#444',
  },
  value: {
    fontSize: 16,
  },
});