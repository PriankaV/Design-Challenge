import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  // Hero Section
  heroWrapper: {
    width: '100%',
    height: '20%',
  },
  heroPattern: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2,
    height: '10%',
    top: '90%',
  },
  heroContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#F3F4F6',
    textAlign: 'center',
    lineHeight: 28,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  // Tabs navigation
  tabsContainer: {
    paddingVertical: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  tabsScrollContainer: {
    paddingHorizontal: 16,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  },
  activeTabButton: {
    backgroundColor: '#e5fcf1',
  },
  tabContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
  },
  activeTabLabel: {
    color: '#10b981',
    fontWeight: '600',
  },
  // Fun Facts Carousel
  funFactContainer: {
    backgroundColor: '#E8F5E9',
    padding: 16,
    marginHorizontal: 20,
    marginVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  funFactHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10b981',
    marginBottom: 8,
    textAlign: 'center',
  },
  funFactContent: {
    alignItems: 'center',
    minHeight: 60,
    justifyContent: 'center',
  },
  funFactText: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    textAlign: 'center',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#A5D6A7',
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#10b981',
    width: 12,
  },
  // Section styling
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 8,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#10b981',
    marginLeft: 10,
  },
  // Cards
  cardList: {
    paddingVertical: 10,
    paddingBottom: 16,
  },
  card: {
    width: 300,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 6,
    color: '#2C3E50',
  },
  cardText: {
    fontSize: 14,
    color: '#546E7A',
    lineHeight: 20,
    marginBottom: 12,
  },
  featureTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  featureTagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  learnMoreButton: {
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 8,
  },
  learnMoreText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#fff',
  },
  // YouTube Videos Section
  videoList: {
    paddingVertical: 10,
  },
  videoCard: {
    width: 300,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  videoThumbnail: {
    width: '100%',
    height: 180,
  },
  playButton: {
    position: 'absolute',
    top: '25%',
    left: '45%',
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContent: {
    padding: 12,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#2C3E50',
  },
  videoChannel: {
    fontSize: 14,
    color: '#7F8C8D',
  }
});

export default styles;