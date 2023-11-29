import Main from "./Main";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { StripeProvider } from "@stripe/stripe-react-native";

const stripeKey =
  "pk_test_51NwPukCYCy3oRHtzXSqSaK7NgCEGw63Y3OUngTH9LNanW8eZYsZwsh8C4isGedoI8RCCkbhiXkIEl4xKzQ2tr0lG00cOnChY9G";

export default function App() {
  return (
    <StripeProvider
      threeDSecureParams={{
        backgroundColor: "#fff",
        timeout: 5,
      }}
      merchantIdentifier="nishan-ecom.com"
      publishableKey={stripeKey}
    >
      <Provider store={store}>
        <Main />
      </Provider>
    </StripeProvider>
  );
}
