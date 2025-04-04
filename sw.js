const urlBase64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}

const saveSubscription = async (subscription) => {
    const response = await fetch('https://service-worker-notification.onrender.com/save-subscription', {
        method: 'post',
        headers: { 'Content-type': "application/json" },
        body: JSON.stringify(subscription)
    })

    return response.json()
}

self.addEventListener("activate", async (e) => {
    const subscription = await self.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array("BPcuV_W4ydMltMjJpBXT1lLAVkNkhnD61KQbIUxqWYOeBb6OaB9XEsp7H6zP_TSbjnTF6qdOn0wSeoGBqwiRUWE")
    })

    const response = await saveSubscription(subscription)
    console.log(response)
})

self.addEventListener("push", e => {
    self.registration.showNotification("Only Anime i love", { body: e.data.text(), icon: "https://w7.pngwing.com/pngs/897/606/png-transparent-attack-on-titans-survey-corps-logo-a-o-t-wings-of-freedom-logo-attack-on-titan-corps-freedom-miscellaneous-angle-emblem-thumbnail.png", image: "https://ik.imagekit.io/Eren/Attack_on_Titan_Season_1.jpg?updatedAt=1739714374040" })
})
