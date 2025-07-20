import { Tabs } from 'expo-router';

export default function SellerTabs() {
  return (
    <Tabs>
      <Tabs.Screen name="seller/listings/index" options={{ title: 'My Vehicles' }} />
      <Tabs.Screen name="shared/test-drives/index" options={{ title: 'Test Drives' }} />
      <Tabs.Screen name="shared/chat/[chatId]" options={{ title: 'Chat' }} />
    </Tabs>
  );
}