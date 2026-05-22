import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { carsDatabase } from '../src/data/carsDatabase'; 

export default function ComparacaoScreen() {
  const insets = useSafeAreaInsets();
  
  const [selectedBrand, setSelectedBrand] = useState('Todos');
  const brands = ['Todos', 'Nissan', 'BYD', 'Volkswagen', 'Toyota', 'Chevrolet', 'Mitsubishi', 'Fiat'];

  const [selectedFord, setSelectedFord] = useState<string | null>(null);
  const [selectedCompetitor, setSelectedCompetitor] = useState<string | null>(null);

  const handleSelectCar = (car: any) => {
    if (car.isCompetitor) {
      setSelectedCompetitor(selectedCompetitor === car.id ? null : car.id);
    } else {
      setSelectedFord(selectedFord === car.id ? null : car.id);
    }
  };

  const handleCompare = () => {
    if (selectedFord && selectedCompetitor) {
      router.push({
        pathname: "/comparacao-detalhe",
        params: { fordId: selectedFord, competitorId: selectedCompetitor }
      });
    }
  };

  const filteredCompetitors = carsDatabase.filter(car => {
    if (!car.isCompetitor) return false;
    if (selectedBrand === 'Todos') return true;
    return car.brand === selectedBrand;
  });

  return (
    <LinearGradient colors={['#001A4E', '#002878', '#003FA0']} style={styles.gradient}>
      
      <ScrollView 
        contentContainerStyle={[styles.scroll, { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 120 }]}
        showsVerticalScrollIndicator={false}
      >
        
        {/* HEADER IDÊNTICO AO DA HOME */}
        <View style={styles.topBar}>
          <TouchableOpacity 
            onPress={() => router.push('/home')} // Força a volta para a home
            style={styles.backButton}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            <Text style={styles.backArrow}>← Voltar</Text>
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>COMPARAÇÃO</Text>
          
          <Image 
            source={require('../assets/Ford_Motor_Company_Logo.svg.png')} 
            style={styles.fordLogo} 
            resizeMode="contain"
          />
        </View>

        {/* FILTROS COM GAP PADRÃO */}
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
            {brands.map((brand) => (
              <TouchableOpacity 
                key={brand} 
                style={[styles.filterButton, selectedBrand === brand && styles.filterButtonActive]}
                onPress={() => setSelectedBrand(brand)}
              >
                <Text style={[styles.filterText, selectedBrand === brand && styles.filterTextActive]}>
                  {brand}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* LISTAS (Agora usando .map para rolagem perfeita) */}
        <View style={styles.listWrapper}>
          <Text style={styles.sectionLabel}>• SELECIONE O MODELO FORD</Text>
          {carsDatabase.filter(car => !car.isCompetitor).map(car => {
            const isSelected = car.id === selectedFord;
            return (
              <TouchableOpacity 
                key={car.id}
                style={[styles.card, isSelected && styles.cardSelected]}
                activeOpacity={0.8}
                onPress={() => handleSelectCar(car)}
              >
                <Image source={car.image} style={styles.carImage} resizeMode="cover" />
                <View style={styles.carInfo}>
                  <Text style={styles.carModel}>{car.model}</Text>
                  <Text style={styles.carVersion}>{car.brand} - {car.version}</Text>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{car.type}</Text>
                  </View>
                </View>
                <View style={styles.priceInfo}>
                  <Text style={[styles.price, { color: '#4DA6FF' }]}>{car.price}</Text>
                  <Text style={styles.power}>{car.power}</Text>
                </View>
              </TouchableOpacity>
            );
          })}

          <Text style={[styles.sectionLabel, { color: '#FF6B6B', marginTop: 15 }]}>• SELECIONE O CONCORRENTE</Text>
          {filteredCompetitors.map(car => {
            const isSelected = car.id === selectedCompetitor;
            return (
              <TouchableOpacity 
                key={car.id}
                style={[styles.card, isSelected && styles.cardSelected]}
                activeOpacity={0.8}
                onPress={() => handleSelectCar(car)}
              >
                <Image source={car.image} style={styles.carImage} resizeMode="cover" />
                <View style={styles.carInfo}>
                  <Text style={styles.carModel}>{car.model}</Text>
                  <Text style={styles.carVersion}>{car.brand} - {car.version}</Text>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{car.type}</Text>
                  </View>
                </View>
                <View style={styles.priceInfo}>
                  <Text style={[styles.price, { color: '#FF6B6B' }]}>{car.price}</Text>
                  <Text style={styles.power}>{car.power}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

      </ScrollView>

      {/* BOTÃO FLUTUANTE DE DUELO */}
      {selectedFord && selectedCompetitor && (
        <View style={[styles.floatingButtonContainer, { bottom: Math.max(insets.bottom + 20, 30) }]}>
          <TouchableOpacity style={styles.compareButton} onPress={handleCompare} activeOpacity={0.9}>
            <Text style={styles.compareButtonText}>REALIZAR DUELO</Text>
          </TouchableOpacity>
        </View>
      )}
      
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  scroll: { paddingBottom: 60 }, 
  
  topBar: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 20,
    paddingHorizontal: 16
  },
  backButton: { 
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
  },
  backArrow: { color: 'white', fontSize: 14, fontWeight: 'bold' },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: '900', letterSpacing: 1 },
  fordLogo: { width: 55, height: 25 },
  
  filterContainer: { marginBottom: 20 },
  filterScroll: { paddingHorizontal: 16, gap: 10 },
  filterButton: { 
    backgroundColor: 'rgba(255,255,255,0.08)', 
    paddingHorizontal: 18, 
    paddingVertical: 10, 
    borderRadius: 25, 
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)'
  },
  filterButtonActive: { backgroundColor: 'rgba(74,158,255,0.15)', borderColor: 'rgba(74,158,255,0.4)' },
  filterText: { color: 'rgba(255,255,255,0.6)', fontWeight: 'bold', fontSize: 13 },
  filterTextActive: { color: '#fff' },
  
  listWrapper: { paddingHorizontal: 16 },
  sectionLabel: { fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: 1.5, marginBottom: 10, textTransform: 'uppercase', fontWeight: 'bold' },
  
  card: { 
    flexDirection: 'row', 
    backgroundColor: 'rgba(255,255,255,0.04)', 
    borderRadius: 16, 
    padding: 15, 
    marginBottom: 12, 
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  cardSelected: {
    borderColor: '#4DA6FF', 
    backgroundColor: 'rgba(74,158,255,0.14)', 
  },

  carImage: { width: 65, height: 65, borderRadius: 10, marginRight: 15, backgroundColor: 'rgba(0,0,0,0.2)' },
  carInfo: { flex: 1 },
  carModel: { color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 2 },
  carVersion: { color: 'rgba(255,255,255,0.4)', fontSize: 12, marginBottom: 8 },
  badge: { backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, alignSelf: 'flex-start' },
  badgeText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
  
  priceInfo: { alignItems: 'flex-end', justifyContent: 'center' },
  price: { fontSize: 16, fontWeight: '900', marginBottom: 6 },
  power: { color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: '600' },
  
  floatingButtonContainer: {
    position: 'absolute',
    left: 20,
    right: 20,
  },
  compareButton: {
    backgroundColor: '#4DA6FF',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  compareButtonText: {
    color: '#001A4E', 
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: 1,
  }
});