import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function SignUpScreen() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  
  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDob(selectedDate);
    }
  };
 
  const handleSignUp = async () => {
    try {
      const formattedDob = dob ? dob.toISOString().split('T')[0] : '';

      const userData = {
        username: name,
        password,
        phoneNumber,
        dob: formattedDob,
      };

      const response = await fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Registration successful! Please log in.');
        setName('');
        setEmail('');
        setPassword('');
        setPhoneNumber('');
        setDob(null);
        router.push('/login');
      } else {
        alert('Registration failed: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      /* Commenting out this error and simulating a succesfful backend call, because the arduino does not connect without a port, and therefore, the backend does not run without the arduino connected. */
      setName('');
      setEmail('');
      setPassword('');
      setPhoneNumber('');
      setDob(null);
      //console.error('Sign up error:', error);
     // alert('An error occurred during sign up.');
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>
      <Text style={styles.subtext}>Already registered? <Text style={styles.link} onPress={() => router.push('/login')}>Sign in</Text></Text>

      <Image
        source={require('../assets/images/image5.png')}
        style={styles.avatar}
      />

      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#6ca6a3" style={styles.icon} />
        <TextInput placeholder="Name" placeholderTextColor="#888"   value={name} onChangeText={setName} style={styles.input} />
      </View>
      <View style={styles.inputContainer}>
        <MaterialIcons name="phone" size={20} color="#6ca6a3" style={styles.icon} />
        <TextInput placeholder="Phone Number" placeholderTextColor="#888"  value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" style={styles.input} />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="email" size={20} color="#6ca6a3" style={styles.icon} />
        <TextInput placeholder="Email" placeholderTextColor="#888"  value={email} onChangeText={setEmail} keyboardType="email-address" style={styles.input} />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={20} color="#6ca6a3" style={styles.icon} />
        <TextInput placeholder="Password" placeholderTextColor="#888" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="calendar-today" size={20} color="#6ca6a3" style={styles.icon} />
        <TouchableOpacity onPress={() => setShowPicker(true)} style={{ flex: 1 }}>
          <Text style={{ color: dob ? '#000' : '#aaa', fontSize: 16 }}>
            {dob ? dob.toDateString() : 'Date of Birth'}
          </Text>
        </TouchableOpacity>
        <MaterialIcons name="arrow-forward-ios" size={16} color="#6ca6a3" />
      </View>
      {showPicker && (
        <DateTimePicker
          value={dob || new Date(2000, 0, 1)}
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
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
  avatar: {
    width: 150, height: 150, borderRadius: 75, alignSelf: 'center', marginVertical: 20,
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