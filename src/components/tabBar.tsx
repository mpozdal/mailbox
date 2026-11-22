import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect';
import { useTheme } from 'expo-router';
import type { BottomTabBarProps } from 'expo-router/js-tabs';
import { Pressable, StyleSheet } from 'react-native';

const ICON_SIZE = 28;
const hasLiquidGlass = isLiquidGlassAvailable();

const TabBar = ({ state, descriptors, emitter, navigateToTab, insets }: BottomTabBarProps) => {
  const { colors, dark } = useTheme();

  return (
    <GlassView
      glassEffectStyle="regular"
      isInteractive
      style={[
        styles.container,
        { bottom: Math.max(insets.bottom, 12) },
        !hasLiquidGlass && [
          styles.fallback,
          {
            backgroundColor: dark ? 'rgba(28, 28, 30, 0.85)' : 'rgba(255, 255, 255, 0.85)',
            borderColor: colors.border,
          },
        ],
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          typeof options.tabBarLabel === 'string'
            ? options.tabBarLabel
            : (options.title ?? route.name);

        const isFocused = state.index === index;
        const color = isFocused ? '#3498db' : '#2c3e50';

        const onPress = () => {
          const event = emitter.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigateToTab(route.key);
          }
        };

        const onLongPress = () => {
          emitter.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Pressable
            key={route.key}
            accessibilityRole="tab"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel ?? label}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}
          >
            {options.tabBarIcon?.({ focused: isFocused, color, size: ICON_SIZE })}
          </Pressable>
        );
      })}
    </GlassView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '80%',
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 32,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  fallback: {
    borderWidth: StyleSheet.hairlineWidth,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
    paddingVertical: 4,
  },
});

export default TabBar;
