import { View, Text, StyleSheet, TouchableOpacity, Platform, Image } from 'react-native';
import { useNavigation, NavigationProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from './types';
import { Heart, Search, User, MapPin, Book, Bookmark, Users } from 'react-native-feather';
import logo from '../../../assets/logo.png';

type NavigationProps = {
  children?: React.ReactNode;
};

const Navigation: React.FC<NavigationProps> = ({ children }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();
  const currentRouteName = route.name;

  const isRouteActive = (routeName: string): boolean => {
    return currentRouteName === routeName;
  };

  const navItems = [
    { name: 'Home', route: 'Home', icon: (color: string) => <MapPin width={20} height={20} stroke={color} /> },
    { name: 'Recipes', route: 'Recipe', icon: (color: string) => <Book width={20} height={20} stroke={color} /> },
    { name: 'Education Hub', route: 'Education Hub', icon: (color: string) => <Bookmark width={20} height={20} stroke={color} /> },
    { name: 'Community', route: 'Community', icon: (color: string) => <Users width={20} height={20} stroke={color} /> },
  ];

  const handleNavigation = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
  };

  // Web version layout
  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <View style={styles.navbar}>
          <View style={styles.logoContainer}>
            <Image 
              source={logo}
              style={styles.logoImage} 
              resizeMode="contain"
              accessibilityLabel="BudgetBites logo"
            />
            <Text style={styles.logoText}>BudgetBites</Text>
          </View>

          <View style={styles.navLinks}>
            {navItems.map((item) => {
              const isActive = isRouteActive(item.route);
              const iconColor = isActive ? '#b7612c' : '#555';

              return (
                <TouchableOpacity 
                  key={item.route} 
                  style={[styles.navItem, isActive && styles.activeNavItem]}
                  onPress={() => handleNavigation(item.route as any)}
                >
                  <View style={styles.navItemContent}>
                    {item.icon(iconColor)}
                    <Text style={[styles.link, isActive && styles.activeLink]}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.icons}>
            <TouchableOpacity 
              style={styles.iconButton}
              accessibilityLabel="Favorites"
            >
              <Heart width={22} height={22} stroke="#b7612c" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.iconButton}
              accessibilityLabel="Search"
            >
              <Search width={22} height={22} stroke="#555" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.iconButton, styles.profileButton]}
              accessibilityLabel="User profile"
            >
              <User width={22} height={22} stroke="#555" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.webContent}>
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
        
        <View style={styles.icons}>
          <TouchableOpacity 
            style={styles.iconButton}
            accessibilityLabel="Favorites"
          >
            <Heart width={22} height={22} stroke="#b7612c" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton}
            accessibilityLabel="Search"
          >
            <Search width={22} height={22} stroke="#555" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.iconButton, styles.mobileProfileButton]}
            accessibilityLabel="User profile"
          >
            <User width={22} height={22} stroke="#555" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.content}>
        {children}
      </View>
      
      <View style={styles.bottomBar}>
        {navItems.map((item) => {
          const isActive = isRouteActive(item.route);
          const iconColor = isActive ? '#b7612c' : '#555';

          return (
            <TouchableOpacity 
              key={item.route} 
              style={[
                styles.bottomNavItem,
                isActive && styles.activeBottomNavItem
              ]}
              onPress={() => handleNavigation(item.route as 'Home' | 'Recipe' | 'Education Hub' | 'Community' | 'Settings')}
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
    backgroundColor: '#fffaf0',
  },
  navbar: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f1dfbb',
    height: 80,
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
  webContent: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 24,
    backgroundColor: '#fffaf0',
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
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
    backgroundColor: 'rgba(183, 97, 44, 0.08)',
  },
  link: {
    fontSize: 16,
    color: '#555',
    fontWeight: '500',
    fontFamily: Platform.OS === 'web' ? 'Poppins, sans-serif' : undefined,
    marginLeft: 8,
  },
  activeLink: {
    color: '#b7612c',
    fontWeight: '600',
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 10,
    marginLeft: 12,
    borderRadius: 50,
    backgroundColor: 'transparent',
  },
  profileButton: {
    backgroundColor: '#f1dfbb',
    borderWidth: 1,
    borderColor: '#eaeaea',
  },
  mobileProfileButton: {
    backgroundColor: '#f1dfbb',
    borderWidth: 1,
    borderColor: '#eaeaea',
    marginLeft: 8,
  },
  
  // Mobile styles
  topBar: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1dfbb',
  },
  bottomBar: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
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
    borderTopColor: '#f1dfbb',
    height: 70,
  },
  bottomNavItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    flex: 1,
  },
  activeBottomNavItem: {
    backgroundColor: 'rgba(183, 97, 44, 0.06)',
    borderRadius: 8,
    marginHorizontal: 4,
    paddingVertical: 8,
  },
  bottomNavText: {
    fontSize: 12,
    marginTop: 4,
    color: '#555',
    fontFamily: Platform.OS === 'web' ? 'Poppins, sans-serif' : undefined,
  },
  activeBottomNavText: {
    color: '#b7612c',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    marginTop: 70,
    marginBottom: 70,
    paddingHorizontal: 20,
    backgroundColor: '#fffaf0',
  },
});