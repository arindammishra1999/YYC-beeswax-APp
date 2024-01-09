import useAuth from "@/firebase/hooks/useAuth";
import LandingPage from "./LandingPage";
import HomePage from "./dashboard/HomePage";

export default function App() {
    const { user } = useAuth();

    if (!user) {
        return <LandingPage />;
    } else {
        return <HomePage />;
    }
}
