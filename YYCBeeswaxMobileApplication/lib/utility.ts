import AsyncStorage from "@react-native-async-storage/async-storage";

export function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

export async function setLocalCache(key: string, data: any) {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(data));
        console.log("Data cached successfully");
    } catch (e) {
        console.error("Error caching data: ", e);
    }
}

export async function getLocalCache(key: string) {
    try {
        const cachedData = await AsyncStorage.getItem(key);
        if (cachedData) {
            console.log("Cached data found");
            return JSON.parse(cachedData);
        }
        console.log("No cached data found");
    } catch (e) {
        console.error("Error retrieving cached data: ", e);
    }
}
