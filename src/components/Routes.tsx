import { CompletedTimer } from "../screens/HistoryScreen";

export type RootStackParamList = {
    InboxListener:undefined,
    DashboardScreen:undefined,
    BankDetails: {
      bankName: "SBI" | "HDFC" | "ICICI" | "Axis" | "Bandhan" | "BOB" | "IDFC" | "PNB" | "Default";
      identifier: string;
      type: "bank" | "card";
      totalDebited: string;
      totalCredited: string;
    };
    TimerScreen:undefined;
    HistoryScreen: undefined;  // Expect an array of CompletedTimer in HistoryScreen
  };