import React from "react";
import { View } from "react-native";

import AdminHeader from "@/components/adminHeader";
import { QuizzesScreen } from "@/components/quiz/quizzesScreen";
import { adminDashboardPageStyles } from "@/styles/adminDashboardPageStyles";
import { mainStyles } from "@/styles/mainStyles";

export default function AdminDashboardPage() {
    return (
        <View style={mainStyles.container}>
            <AdminHeader header="Quizzes" />
            <View style={adminDashboardPageStyles.page}>
                <QuizzesScreen />
            </View>
        </View>
    );
}
