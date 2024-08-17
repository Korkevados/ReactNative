/** @format */

import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/Styles";
import { getFormatedDate } from "../../util/date";
import { useNavigation } from "@react-navigation/native";
function RenderExpense({ itemData }) {
  const price = itemData.item.amount;

  const formattedAmount = new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: "ILS",
  }).format(price);

  const navigation = useNavigation();

  function expensePressHandler() {
    navigation.navigate("ManageExpense", {
      expenseId: itemData.item.id,
    });
  }

  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => pressed && styles.pressed}>
      <View style={styles.item}>
        <View style={styles.root}>
          <Text style={[styles.textbase, styles.descriptionText]}>
            {itemData.item.description}
          </Text>
          <Text style={styles.textbase}>
            {getFormatedDate(itemData.item.date)}
          </Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{formattedAmount}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default RenderExpense;

const styles = StyleSheet.create({
  root: { alignItems: "flex-start" },
  item: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textbase: {
    color: GlobalStyles.colors.primary50,
  },
  descriptionText: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 100,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
  pressed: { opacity: 0.75 },
});
