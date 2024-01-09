import LandingPage from "./LandingPage";
import HomePage from "./dashboard/HomePage";

import useAuth from "@/firebase/hooks/useAuth";

export default function App() {
    const { user } = useAuth();

    if (!user) {
        return <LandingPage />;
    } else {
        return <HomePage />;
    }
}
