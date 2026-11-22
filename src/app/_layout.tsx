import { Tabs } from 'expo-router/js-tabs';
import { SymbolView } from 'expo-symbols';

import TabBar from '@/components/tabBar';

const _layout = () => {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color, size }) => (
            <SymbolView
              name={{ ios: focused ? 'house.fill' : 'house', android: 'home', web: 'home' }}
              tintColor={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="compose"
        options={{
          title: 'New mail',
          tabBarIcon: ({ color, size }) => (
            <SymbolView
              name={{ ios: 'square.and.pencil', android: 'edit_square', web: 'edit_square' }}
              tintColor={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused, color, size }) => (
            <SymbolView
              name={{
                ios: focused ? 'gearshape.fill' : 'gearshape',
                android: 'settings',
                web: 'settings',
              }}
              tintColor={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
