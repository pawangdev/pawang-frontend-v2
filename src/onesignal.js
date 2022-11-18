import OneSignal from "react-onesignal";

export default async function runOneSignal() {
  await OneSignal.init({
    appId: "fd224363-1c0a-4ea3-a573-a9c4954c0c63",
    allowLocalhostAsSecureOrigin: true,
    autoResubscribe: true,
  });
}
