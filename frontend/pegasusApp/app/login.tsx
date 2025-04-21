import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    //backend logic placeholder for log in
    //router.push('/(tabs)/home');  // open the home page after a sucessfull backend call 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <Text style={styles.subtext}>New here? <Text style={styles.link} onPress={() => router.push('/')}>Sign Up</Text></Text>

      <View style={styles.inputContainer}>
        <MaterialIcons name="email" size={20} color="#6ca6a3" style={styles.icon} />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={20} color="#6ca6a3" style={styles.icon} />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, padding: 30, paddingTop: 80, backgroundColor: '#fff',
  },
  header: {
    fontSize: 32, fontWeight: 'bold', marginBottom: 5,
  },
  subtext: {
    fontSize: 14, color: '#444', marginBottom: 20,
  },
  link: {
    fontWeight: 'bold', color: '#000',
  },
  inputContainer: {
    flexDirection: 'row', alignItems: 'center',
    borderColor: '#bbb', borderWidth: 1,
    borderRadius: 8, paddingHorizontal: 10, paddingVertical: 12,
    marginBottom: 15, backgroundColor: '#f9f9f9',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1, fontSize: 16,
  },
  button: {
    backgroundColor: '#6ca6a3', padding: 15,
    borderRadius: 8, alignItems: 'center', marginTop: 10,
  },
  buttonText: {
    color: 'white', fontWeight: 'bold', fontSize: 16,
  },
});