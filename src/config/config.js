import Firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyATy1dg659roOErR-6AMv4lL8-rh4AQXp4",
    authDomain: "appointment-calendar-1d076.firebaseapp.com",
    databaseURL: "https://appointment-calendar-1d076.firebaseio.com",
    projectId: "appointment-calendar-1d076",
    storageBucket: "appointment-calendar-1d076.appspot.com",
    messagingSenderId: "1059857522420",
    appId: "1:1059857522420:web:e7f4ec6b77e5763ee888a1"
};

class FB {
    constructor() {
        Firebase.initializeApp(firebaseConfig)
        this.db = Firebase.firestore();
    }

    addEvent(summary, selectedStartDate, selectedEndDate, location) {
        try {
            return this.db
                .collection("events")
                .add({
                    summary: summary,
                    start: selectedStartDate,
                    end: selectedEndDate,
                    location: location
                })
        }
        catch (err) {
            console.error("Error adding the event document ", err)
        }
    }
}

export default new FB();