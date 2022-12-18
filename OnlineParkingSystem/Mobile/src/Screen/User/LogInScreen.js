import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { BASE_URL } from "../../../Api/Api";
import axios from "axios";

const LogInScreen = (props) => {
  const [email, setEmail] = useState("dhruv@gmail.com");
  const [password, setpassword] = useState("123456");
  return (
    <View style={styles.main}>
      <Text style={{ fontSize: 25, textAlign: "center", fontWeight: "bold" }}>
        Log In
      </Text>
      <TextInput
        placeholder="Enter Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Enter Password"
        value={password}
        onChangeText={(text) => setpassword(text)}
        maxLength={6}
        style={styles.input}
      />

      <TouchableOpacity
        style={{
          margin: 10,
          alignItems: "center",
          justifyContent: "center",
          width: "70%",
          height: 40,
          backgroundColor: "red",
          alignSelf: "center",
          borderRadius: 8,
        }}
        onPress={() => {
          const data = {
            email: email.toLowerCase(),
            password: password,
          };
          axios
            .post(BASE_URL + "/api/user/logIn", data)
            .then((result) => {
              console.log(result.data);
              if (result.data.success) {
                if (result.data.data.type === "USER") {
                  props.navigation.navigate("User", {
                    userId: result.data.data._id,
                    type: result.data.data.type,
                  });
                } else if (result.data.data.type === "OWNER") {
                  props.navigation.navigate("Owner", {
                    userId: result.data.data._id.toString(),
                    type: result.data.data.type,
                  });
                } else {
                  props.navigation.navigate("Home", {
                    userId: result.data.data._id.toString(),
                    type: result.data.data.type,
                  });
                }
              } else {
                alert(result.data.message);
                console.log("User Not Found");
              }
            })
            .catch((err) => console.log(err));
        }}
      >
        <Text style={{ color: "white", fontSize: 17, fontWeight: "600" }}>
          Log In
        </Text>
      </TouchableOpacity>
      <Text style={{ position: "absolute", bottom: 20, alignSelf: "center" }}>
        Don't have an account?{" "}
        <Text
          style={{ color: "red", fontWeight: "500" }}
          onPress={() => props.navigation.navigate("Register")}
        >
          Sign Up
        </Text>
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 0.5,
    margin: 10,
    paddingLeft: 10,
    height: 40,
    borderRadius: 8,
  },
});

export default LogInScreen;
