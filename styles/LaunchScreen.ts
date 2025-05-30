import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Base styles
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    flexWrap: 'wrap',
  },
  
  // Typography
  text: {
    color: '#374151',
    fontSize: 16,
  },
  textBold: {
    fontWeight: '600',
  },
  textMuted: {
    color: '#6b7280',
    fontSize: 14,
  },
  textSmall: {
    fontSize: 14,
  },
  textTiny: {
    fontSize: 12,
  },
  
  // Section Headers
  headerContainer: {
    alignItems: 'center',
    marginVertical: 32,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#000',
  },
  subtitle: {
    fontSize: 20,
    color: '#4b5563',
    textAlign: 'center',
    marginHorizontal: 'auto',
    lineHeight: 24,
  },
  
  // Hero Section
  heroPattern: {
    paddingVertical: 80,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#e5f9ff',
  },
  heroContainer: {
    backgroundColor: '#e5f9ff',
  },
  textSection: {
    flex: 1,
    minWidth: 300,
    alignItems: 'flex-start',
    textAlign: 'left',
    marginRight: 250,
  },
  heading: {
    fontSize: 45,
    fontWeight: 'bold',
    textAlign: 'left',
    lineHeight: 48,
    color: '#000',
    marginBottom: 16,
  },
  gradientText: {
    color: '#10b981',
    fontWeight: '800',
  },
  subText: {
    fontSize: 18,
    color: '#4b5563',
    lineHeight: 26,
    marginTop: 16,
    marginBottom: 24,
    maxWidth: 500,
    textAlign: 'left',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 16,
    flexWrap: 'wrap',
  },
  heroButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 180,
  },
  buttonPrimary: {
    backgroundColor: '#10b981',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  heroButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonOutline: {
    borderWidth: 2,
    borderColor: '#10b981',
    backgroundColor: 'transparent',
  },
  buttonOutlineText: {
    color: '#10b981',
    fontSize: 18,
    fontWeight: '600',
  },
  
  // Hero Image Section
  imageSection: {
    width: 320,
    height: 320,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  circleContainer: {
    width: 280,
    height: 280,
    borderRadius: 140,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  circleBg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 140,
    backgroundColor: '#c3f7de',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  foodItem: {
    position: 'absolute',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  emoji: {
    fontSize: 38,
  },
  food1: {
    top: -30,
    right: -30,
    transform: [{ rotate: '12deg' }],
  },
  food2: {
    bottom: -36,
    right: 50,
    transform: [{ rotate: '-8deg' }],
  },
  food3: {
    left: -30,
    top: '33%',
    transform: [{ rotate: '8deg' }],
  },
  pinContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ping: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#34d399',
  },
  pin: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  waveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    overflow: 'hidden',
  },
  svg: {
    width: '100%',
    height: 120,
  },
  
  // How It Works Section
  stepsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: 20,
    gap: 20,
    marginBottom: 40,
  },
  stepCard: {
    backgroundColor: '#fffaea',
    borderRadius: 16,
    padding: 24,
    width: '22%',
    minWidth: 220,
    height: 220,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#fef1bb',
    justifyContent: 'flex-start',
  },
  stepNumber: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#f69e17',
    marginBottom: 16,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    color: '#000',
  },
  stepDescription: {
    fontSize: 15,
    color: '#4b5563',
    lineHeight: 22,
  },
  
  // Map Section
  mapSectionContainer: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  
  // Search Column
  searchColumn: {
    flex: 0.9,
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
    backgroundColor: '#fff',
    minWidth: 300,
    maxWidth: 400,
  },
  searchHeader: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    height: 24,
  },
  
  // Filters
  filterContainer: {
    marginTop: 12,
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  filterHeaderText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#4b5563',
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  filterChipActive: {
    backgroundColor: '#dcfce7',
    borderColor: '#10b981',
  },
  filterChipText: {
    fontSize: 14,
    color: '#4b5563',
  },
  filterChipTextActive: {
    color: '#10b981',
    fontWeight: '600',
  },
  
  // Locations Control
  locationsControlContainer: {
    padding: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
    alignItems: 'center',
  },
  locationsControlText: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 10,
    fontWeight: '500',
    textAlign: 'center',
  },
  locationsControlButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  locationsControlButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationsControlButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  locationsControlButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  
  // Results List
  resultsList: {
    flex: 1,
    padding: 16,
  },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  resultCardSelected: {
    borderWidth: 2,
    borderColor: '#10b981',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  resultCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  resultCardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  resultCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4b5563',
  },
  resultCardDetails: {
    marginBottom: 8,
  },
  resultCardDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  resultCardDetailText: {
    marginLeft: 6,
    fontSize: 13,
    color: '#4b5563',
    flexShrink: 1,
  },
  
  // Contact and State
  contactStateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  
  // Tags
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  inlineTag: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginLeft: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#4b5563',
    fontWeight: '500',
  },
  
  // Map Column
  mapColumn: {
    flex: 1.8,
    backgroundColor: '#f9fafb',
    minWidth: 420,
    display: 'flex',
  },
  mapHeader: {
    padding: 24,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  mapTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  mapSubtitle: {
    fontSize: 15,
    color: '#6b7280',
    marginTop: 6,
  },
  mapContainer: {
    margin: 20,
    flex: 1,
    height: '70%',
    minHeight: 450,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
});

export default styles;