import { Tabs } from 'expo-router';

export default function ExecTabs() {
  return (
    <Tabs>
      <Tabs.Screen name="exec/listings/index" options={{ title: 'Assigned Vehicles' }} />
      <Tabs.Screen name="shared/test-drives/index" options={{ title: 'Test Drives' }} />
    </Tabs>
  );
}