// components/AuthModal.tsx
import AsyncStorage from "@react-native-async-storage/async-storage"; // 👈 added
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db } from "../lib/firebase";

export default function AuthModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");

  // Extra signup fields
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");

  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    setErr(null);
    if (!email || !pass) {
      setErr("Email and password required");
      return;
    }
    if (!isLogin) {
      if (!fullName || !username || !age) {
        setErr("All signup fields are required");
        return;
      }
      if (pass !== confirm) {
        setErr("Passwords do not match");
        return;
      }
    }

    try {
      setLoading(true);
      let userCred;

      if (isLogin) {
        userCred = await signInWithEmailAndPassword(auth, email.trim(), pass);
      } else {
        userCred = await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          pass
        );

        // Update Firebase Auth profile
        await updateProfile(userCred.user, {
          displayName: fullName,
        });

        // Save extra info in Firestore
        await setDoc(doc(db, "users", userCred.user.uid), {
          fullName,
          username,
          age,
          email: userCred.user.email,
          createdAt: new Date(),
        });
      }

      // 👇 Save token in AsyncStorage
      if (userCred?.user) {
        const token = await userCred.user.getIdToken();
        await AsyncStorage.setItem("authToken", token);
      }

      onClose();
    } catch (e: any) {
      setErr(e?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <ScrollView>
            <Text style={styles.title}>{isLogin ? "Login" : "Sign Up"}</Text>

            {!!err && <Text style={styles.error}>{err}</Text>}

            {!isLogin && (
              <>
                <TextInput
                  placeholder="Full Name"
                  value={fullName}
                  onChangeText={setFullName}
                  style={styles.input}
                />
                <TextInput
                  placeholder="Username"
                  value={username}
                  onChangeText={setUsername}
                  style={styles.input}
                />
                <TextInput
                  placeholder="Age"
                  keyboardType="numeric"
                  value={age}
                  onChangeText={setAge}
                  style={styles.input}
                />
              </>
            )}

            <TextInput
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              secureTextEntry
              value={pass}
              onChangeText={setPass}
              style={styles.input}
            />

            {!isLogin && (
              <TextInput
                placeholder="Confirm Password"
                secureTextEntry
                value={confirm}
                onChangeText={setConfirm}
                style={styles.input}
              />
            )}

            <TouchableOpacity
              style={styles.button}
              onPress={handleAuth}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>
                  {isLogin ? "Login" : "Create Account"}
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
              <Text style={styles.toggle}>
                {isLogin
                  ? "Don't have an account? Sign Up"
                  : "Already have an account? Login"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onClose}>
              <Text style={styles.close}>✕ Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#1E90FF",
  },
  error: { color: "red", marginBottom: 10, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#1E90FF",
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  toggle: { textAlign: "center", color: "#1E90FF", marginTop: 8 },
  close: { textAlign: "center", marginTop: 12, color: "red" },
});
