/** @format */

import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

function SignupScreen() {
  const [IsLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signuphandler({ email, password }) {
    setIsLoading(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert("SignUp Failed", "Please check the email or password");
      setIsLoading(false);
    }
  }

  if (IsLoading) {
    return <LoadingOverlay message={"Creating User"} />;
  }

  return <AuthContent onAuthenticate={signuphandler} />;
}

export default SignupScreen;
