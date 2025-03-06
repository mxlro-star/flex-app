import { Redirect } from "expo-router";

export default function Welcome() {
  // This acts as a bridge to redirect to the index page
  return <Redirect href="/" />;
}
