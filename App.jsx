import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./screens/Welcome";
import Login from "./screens/Login";
import Home from "./screens/Home";
import PostJob from "./screens/PostJob";
import MyJobs from "./screens/MyJobs";
import Chat from "./screens/Chat";
import ChatList from "./screens/ChatList";
import Payment from "./screens/Payment";
import Rating from "./screens/Rating";
import Profile from "./screens/Profile";
import { UserProvider } from "./context/UserContext";
import { navigationRef } from "./Navigation/RootNavigation";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="PostJob" component={PostJob} />
          <Stack.Screen name="MyJobs" component={MyJobs} />
          <Stack.Screen name="ChatList" component={ChatList} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="Rating" component={Rating} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
