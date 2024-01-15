import LandingPage from "./LandingPage";
import HomePage from "./dashboard/HomePage";

import { useUser } from "@/firebase/userProvider";

export default function App() {
    const { user } = useUser();
    return user ? <HomePage /> : <LandingPage />;
}
