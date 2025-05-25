import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  heroWrapper: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#e5e7eb',
    textAlign: 'center',
    marginVertical: 8,
  },
  heroBackgroundFullWidth: {
   width: '100%',
    height: 300,
    justifyContent: 'center',
  },
  searchContainer: {
    width: '100%',
    marginTop: 12,
    paddingHorizontal: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
    paddingVertical: 8,
  },
  clearButton: {
    marginLeft: 8,
  },
  stepsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 20,
  },
  accordionBox: {
    width: '45%',
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    backgroundColor: '#f3f4f6',
  },
  accordionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accordionTitle: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  accordionContent: {
    padding: 10,
    backgroundColor: '#fff',
  },
  accordionCard: {
    marginVertical: 6,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  cardDescription: {
    fontSize: 13,
    color: '#4b5563',
  },
  tipsContainer: {
    marginTop: 20,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#10b981',
    marginBottom: 12,
  },
  tipsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tipCard: {
    width: '48%',
    marginVertical: 6,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  tipText: {
    fontSize: 13,
    color: '#374151',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%',
},
  categoryCard: {
    width: '45%',
    marginVertical: 10,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
},

  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
},

  categoryTitle: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '700',
    color: '#374151',
},
});

export default styles;