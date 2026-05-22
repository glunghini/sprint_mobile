import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { carsDatabase } from '../src/data/carsDatabase';

export default function ComparacaoDetalheScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { fordId, competitorId } = useLocalSearchParams(); 

  const fordCar = carsDatabase.find(c => c.id === fordId);
  const competitorCar = carsDatabase.find(c => c.id === competitorId);

  if (!fordCar || !competitorCar || !fordCar.stats) {
    return (
      <LinearGradient colors={['#001A4E', '#002878', '#003FA0']} style={styles.gradient}>
        <View style={[styles.container, { paddingTop: insets.top }]}>
          <Text style={{ color: 'white', textAlign: 'center', marginTop: 50 }}>
            Erro ao carregar os veículos ou faltam dados no banco.
          </Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#001A4E', '#002878', '#003FA0']} style={styles.gradient}>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => router.back()} 
            style={styles.backButton}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} 
          >
            <Text style={styles.backArrow}>← Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>DUELO</Text>
          <View style={{ width: 80 }} /> 
        </View>
        
        <ScrollView 
          contentContainerStyle={[styles.scrollContent, { paddingBottom: 40 + insets.bottom }]} 
          showsVerticalScrollIndicator={false}
        >
          
          <View style={styles.versusContainer}>
            <View style={styles.carColumn}>
              <Image source={fordCar.image} style={styles.carImage} resizeMode="cover" />
              <Text style={styles.brandTitle}>FORD</Text>
              <Text style={styles.carName}>{fordCar.model}</Text>
            </View>

            <View style={styles.vsBadge}>
              <Text style={styles.vsText}>VS</Text>
            </View>

            <View style={styles.carColumn}>
              <Image source={competitorCar.image} style={styles.carImage} resizeMode="cover" />
              <Text style={[styles.brandTitle, { color: '#FF6B6B' }]}>
                {competitorCar.brand.toUpperCase()}
              </Text>
              <Text style={styles.carName}>{competitorCar.model}</Text>
            </View>
          </View>

          <Text style={styles.dashboardMainTitle}>Ficha Técnica Comparativa</Text>

          {fordCar.stats.map((fordStat, index) => {
            const compStat = competitorCar.stats.find(s => s.name === fordStat.name);
            if (!compStat) return null;

            if (fordStat.isNumeric && compStat.isNumeric) {
              const maxValue = Math.max(Number(fordStat.value), Number(compStat.value));
              const fordWidth = maxValue > 0 ? (Number(fordStat.value) / maxValue) * 100 : 0;
              const compWidth = maxValue > 0 ? (Number(compStat.value) / maxValue) * 100 : 0;

              return (
                <View key={index} style={styles.dashboardCard}>
                  <Text style={styles.dashboardTitle}>{fordStat.name}</Text>
                  <View style={styles.divider} />
                  
                  <View style={styles.barContainer}>
                    <View style={styles.barLabels}>
                      <Text style={styles.barCarName}>{fordCar.model}</Text>
                      <Text style={styles.barValue}>
                        {fordStat.prefix || ''}{fordStat.value}{fordStat.suffix || ''}
                      </Text>
                    </View>
                    <View style={styles.barBackground}>
                      <View style={[styles.barFill, { width: `${fordWidth}%`, backgroundColor: '#4DA6FF' }]} />
                    </View>
                  </View>

                  <View style={styles.barContainer}>
                    <View style={styles.barLabels}>
                      <Text style={styles.barCarName}>{competitorCar.model}</Text>
                      <Text style={styles.barValue}>
                        {compStat.prefix || ''}{compStat.value}{compStat.suffix || ''}
                      </Text>
                    </View>
                    <View style={styles.barBackground}>
                      <View style={[styles.barFill, { width: `${compWidth}%`, backgroundColor: '#FF6B6B' }]} />
                    </View>
                  </View>
                </View>
              );
            } 
            
            return (
              <View key={index} style={styles.textCard}>
                <Text style={styles.dashboardTitle}>{fordStat.name}</Text>
                <View style={styles.divider} />
                
                <View style={styles.textCompareRow}>
                  <View style={styles.textCompareBox}>
                    <Text style={styles.barCarName}>{fordCar.model}</Text>
                    <Text style={styles.textStatValue}>{fordStat.value}</Text>
                  </View>
                  <View style={styles.textCompareBox}>
                    <Text style={[styles.barCarName, { color: '#FF6B6B' }]}>{competitorCar.model}</Text>
                    <Text style={styles.textStatValue}>{compStat.value}</Text>
                  </View>
                </View>
              </View>
            );
          })}

        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1 },
  
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15 },
  backButton: { 
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
    borderRadius: 8,
  },
  backArrow: { color: 'white', fontSize: 14, fontWeight: 'bold' },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold', letterSpacing: 1 },
  scrollContent: { padding: 20 },
  
  versusContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40, marginTop: 10 },
  carColumn: { flex: 1, alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.06)', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  carImage: { width: 70, height: 70, borderRadius: 35, marginBottom: 10, backgroundColor: 'rgba(0,0,0,0.2)' },
  brandTitle: { color: '#4DA6FF', fontSize: 12, fontWeight: 'bold', marginBottom: 5 },
  carName: { color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
  vsBadge: { marginHorizontal: 10, backgroundColor: 'rgba(0,0,0,0.3)', padding: 10, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  vsText: { color: 'white', fontSize: 16, fontWeight: 'bold', fontStyle: 'italic' },

  dashboardMainTitle: { color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  
  dashboardCard: { backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  textCard: { backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  
  dashboardTitle: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginVertical: 15 },
  
  barContainer: { marginBottom: 15 },
  barLabels: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  barCarName: { color: 'white', fontSize: 14, fontWeight: 'bold' },
  barValue: { color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: 'bold' },
  barBackground: { height: 12, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 6, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 6 },
  
  textCompareRow: { flexDirection: 'row', justifyContent: 'space-between' },
  textCompareBox: { flex: 1, paddingRight: 10 },
  textStatValue: { color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 5, lineHeight: 18 }
});