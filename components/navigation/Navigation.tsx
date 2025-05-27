import { usePathname, useRouter } from 'expo-router';
import { BookOpen, GraduationCap, Home, Lightbulb, Menu } from 'lucide-react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import logo from '../../assets/images/logo.png';
import Footer from '../Footer';

type NavigationProps = {
  children?: React.ReactNode;
};

const Navigation: React.FC<NavigationProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const isRouteActive = (routePath: string): boolean => {
    return pathname === routePath;
  };

  const navItems: { name: string; path: '/' | '/RecipeScreen' | '/EducationHubScreen' | '/FindHelpScreen'; icon: (color: string) => React.ReactNode }[] = [
    { name: 'Home', path: '/', icon: (color: string) => <Home size={20} color={color} /> },
    { name: 'Recipes', path: '/RecipeScreen', icon: (color: string) => <BookOpen size={20} color={color} /> },
    { name: 'Savings Guide', path: '/EducationHubScreen', icon: (color: string) => <GraduationCap size={20} color={color} /> },
    { name: 'Find Help', path: '/FindHelpScreen', icon: (color: string) => <Lightbulb size={20} color={color} /> },
  ];

  const handleNavigation = (path: '/' | '/RecipeScreen' | '/EducationHubScreen' | '/FindHelpScreen') => {
    router.push(path);
  };

  // Web version layout
  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <View style={styles.floatingNavbar}>
          <View style={styles.logoContainer}>
            <Image 
              source={logo}
              style={styles.logoImage} 
              resizeMode="contain"
              accessibilityLabel="BudgetBites logo"
            />
            <Text style={styles.logoText}>BudgetBites</Text>
          </View>

          <View style={styles.navLinksContainer}>
            <View style={styles.navLinksBackground}>
              <View style={styles.navLinks}>
                {navItems.map((item) => {
                  const isActive = isRouteActive(item.path);
                  const iconColor = isActive ? '#fff' : '#d15e34';

                  return (
                    <TouchableOpacity 
                      key={item.path} 
                      style={[styles.navItem, isActive && styles.activeNavItem]}
                      onPress={() => handleNavigation(item.path)}
                    >
                      <View style={styles.navItemContent}>
                        {item.icon(iconColor)}
                        <Text style={[styles.link, isActive && styles.activeLink]}>{item.name}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        </View>

        <View style={styles.contentContainer}>
          {children}
        </View>
      </View>
    );
  }
  
  // Mobile version layout
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.logoContainer}>
          <Image 
            source={logo}
            style={styles.logoImage} 
            resizeMode="contain"
            accessibilityLabel="BudgetBites logo"
          />
          <Text style={styles.logoText}>BudgetBites</Text>
        </View>
        
        <TouchableOpacity style={styles.mobileMenuButton}>
          <Menu size={24} color="#d15e34" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.contentContainer}>
        {children}
      </View>
      
      <View style={styles.bottomBar}>
        {navItems.map((item) => {
          const isActive = isRouteActive(item.path);
          const iconColor = isActive ? '#fff' : '#d15e34';

          return (
            <TouchableOpacity 
              key={item.path} 
              style={[
                styles.bottomNavItem,
                isActive && styles.activeBottomNavItem
              ]}
              onPress={() => handleNavigation(item.path)}
              accessibilityRole="button"
              accessibilityLabel={`Navigate to ${item.name}`}
              accessibilityState={{ selected: isActive }}
            >
              {item.icon(iconColor)}
              <Text style={[
                styles.bottomNavText,
                isActive && styles.activeBottomNavText
              ]}>
                {item.name.length > 10 ? item.name.split(' ')[0] : item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'relative',
  },
  floatingNavbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    zIndex: 100,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'web' ? 'Poppins, sans-serif' : undefined,
    color: '#b7612c',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  navLinksContainer: {
    alignItems: 'center',
    pointerEvents: 'auto',
  },
  navLinksBackground: {
    backgroundColor: '#f8efd4',
    borderRadius: 28,
    padding: 6,
    shadowColor: '#333',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    marginHorizontal: 4,
    backgroundColor: 'transparent',
  },
  navItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeNavItem: {
    backgroundColor: '#b7612c',
  },
  link: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    fontFamily: Platform.OS === 'web' ? 'Poppins, sans-serif' : undefined,
    marginLeft: 8,
  },
  activeLink: {
    color: '#fff',
    fontWeight: '600',
  },
  mobileMenuButton: {
    padding: 8,
  },
  
  // Mobile styles
  topBar: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#fff9f3',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative',
    zIndex: 10,
    borderBottomWidth: 0,
  },
  bottomBar: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(254, 243, 227, 0.9)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: 'rgba(209, 94, 52, 0.15)',
    height: 70,
  },
  bottomNavItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    flex: 1,
  },
  activeBottomNavItem: {
    backgroundColor: '#b7612c',
    borderRadius: 8,
    marginHorizontal: 4,
    paddingVertical: 8,
  },
  bottomNavText: {
    fontSize: 12,
    marginTop: 4,
    color: '#b7612c',
    fontFamily: Platform.OS === 'web' ? 'Poppins, sans-serif' : undefined,
  },
  activeBottomNavText: {
    color: '#fff',
    fontWeight: '600',
  },
});