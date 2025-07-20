import { Tabs } from 'expo-router';

export default function BuyerTabs() {
  return (
    <Tabs>
      <Tabs.Screen name="buyer/listings/index" options={{ title: 'Listings' }} />
      <Tabs.Screen name="shared/test-drives/index" options={{ title: 'Test Drives' }} />
    </Tabs>
  );
}