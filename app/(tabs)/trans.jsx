import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { icons } from "../../constants"; // Make sure to import your icons

const Trans = () => {
  const [transactions, setTransactions] = useState([
    { id: "1", type: "credit", amount: 100, description: "Salary" },
    { id: "2", type: "debit", amount: 50, description: "Groceries" },
  ]);
  const [newTransaction, setNewTransaction] = useState({
    type: "credit",
    amount: "",
    description: "",
  });

  const totalCredit = transactions
    .filter((transaction) => transaction.type === "credit")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalDebit = transactions
    .filter((transaction) => transaction.type === "debit")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const remaining = totalCredit - totalDebit;

  const addTransaction = () => {
    if (newTransaction.amount && newTransaction.description) {
      setTransactions([
        ...transactions,
        { id: Date.now().toString(), ...newTransaction },
      ]);
      setNewTransaction({ type: "credit", amount: "", description: "" });
    }
  };

  return (
    <SafeAreaView className="px-4 my-6 bg-primary h-full">
      <Text className="text-2xl text-white font-psemibold">Transactions</Text>

      <View className="mt-4 bg-gray-800 p-4 rounded-lg">
        <Text className="text-lg text-white">Remaining: ${remaining}</Text>
      </View>

      <View className="mt-6 flex-row justify-between">
        <View className="flex-1 mr-2">
          <Text className="text-lg text-white font-semibold">Credit</Text>
          <FlatList
            data={transactions.filter((t) => t.type === "credit")}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Text className="text-white">
                +${item.amount} - {item.description}
              </Text>
            )}
          />
        </View>

        <View className="flex-1 ml-2">
          <Text className="text-lg text-white font-semibold">Debit</Text>
          <FlatList
            data={transactions.filter((t) => t.type === "debit")}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Text className="text-white">
                -${item.amount} - {item.description}
              </Text>
            )}
          />
        </View>
      </View>

      <View className="mt-6 bg-gray-800 p-4 rounded-lg">
        <TextInput
          placeholder="Amount"
          value={newTransaction.amount}
          onChangeText={(text) =>
            setNewTransaction({ ...newTransaction, amount: text })
          }
          keyboardType="numeric"
          className="bg-gray-700 text-white p-2 rounded mb-2"
        />
        <TextInput
          placeholder="Description"
          value={newTransaction.description}
          onChangeText={(text) =>
            setNewTransaction({ ...newTransaction, description: text })
          }
          className="bg-gray-700 text-white p-2 rounded mb-2"
        />

        <TouchableOpacity
          onPress={addTransaction}
          className="bg-blue-600 mt-4 rounded-full p-3"
        >
          <Text className="text-white text-center">Add Transaction</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Trans;
