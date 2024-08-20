/** @format */

import AuthContent from "../components/Auth/AuthContent";
import { useContext, useState } from "react";
import { Loginuser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

function LoginScreen() {
  const [IsLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  async function loginhandler({ email, password }) {
    setIsLoading(true);
    try {
      const token = await Loginuser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication Failed",
        "Please check the email or password"
      );
      setIsLoading(false);
    }
  }

  if (IsLoading) {
    return <LoadingOverlay message={"Logging you in"} />;
  }

  return <AuthContent isLogin onAuthenticate={loginhandler} />;
}

export default LoginScreen;
