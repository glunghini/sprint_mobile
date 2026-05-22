import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, Image, TouchableOpacity, StyleSheet,
  ScrollView, Dimensions, FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { loadUser, User } from '../src/data/storage';

const { width } = Dimensions.get('window');
const SLIDER_W = width - 32;

// Ordem corrigida: Racing na 1 e F-150 na 3
const SLIDES = [
  { image: require('../assets/slider1.png'), title: 'FORD RACING', sub: 'Vencedor' },
  { image: require('../assets/slider2.png'), title: 'MUSTANG GT', sub: 'Adrenalina Pura' },
  { image: require('../assets/slider3.png'), title: 'FORD F-150 TREMOR', sub: 'Abre Caminho' },
];

const SERVICES = [
  { id: 'comparacao', label: 'Comparação', desc: 'Ford vs Concorrentes', active: true },
  { id: 'relatorios', label: 'Relatórios', desc: 'Dashboards', active: true },
  { id: 'manutencao', label: 'Manutenção', desc: 'Em breve', active: false },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [user, setUser] = useState<User | null>(null);
  const [slide, setSlide] = useState(0);
  const flatRef = useRef<FlatList>(null);

  useEffect(() => {
    loadUser().then(setUser);
  }, []);

  // O useEffect abaixo reseta o timer toda vez que o slide muda, seja manual ou automático
  useEffect(() => {
    const interval = setInterval(() => {
      const next = (slide + 1) % SLIDES.length;
      setSlide(next);
      if (flatRef.current) {
        flatRef.current.scrollToIndex({ index: next, animated: true });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [slide]); 

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems && viewableItems.length > 0) {
      const index = viewableItems[0].index;
      if (index !== null && index !== undefined) setSlide(index);
    }
  }).current;

  return (
    <LinearGradient colors={['#001A4E', '#002878', '#003FA0']} style={styles.gradient}>
      <ScrollView contentContainerStyle={[styles.scroll, { paddingTop: insets.top + 20 }]} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.topBar}>
          <View>
            <Text style={styles.welcome}>Bem-vindo,</Text>
            <Text style={styles.userName}>{user?.name ?? 'Carregando...'}</Text>
          </View>
          <Image 
            source={require('../assets/Ford_Motor_Company_Logo.svg.png')} 
            style={styles.fordLogo} 
            resizeMode="contain"
          />
        </View>

        {/* Slider */}
        <View style={styles.sliderContainer}>
          <FlatList
            ref={flatRef}
            data={SLIDES}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, i) => String(i)}
            getItemLayout={(_, index) => ({
              length: SLIDER_W,
              offset: SLIDER_W * index,
              index,
            })}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
            renderItem={({ item }) => (
              <View style={styles.slide}>
                {/* FORÇANDO O TAMANHO FIXO NA IMAGEM PARA EVITAR ESTOURO */}
                <Image source={item.image} style={styles.slideImg} resizeMode="cover" />
                <LinearGradient colors={['transparent', 'rgba(0,8,30,0.9)']} style={styles.slideGrad}>
                  <Text style={styles.slideTitle}>{item.title}</Text>
                  <Text style={styles.slideSub}>{item.sub}</Text>
                </LinearGradient>
              </View>
            )}
          />
          <View style={styles.dotsRow}>
            {SLIDES.map((_, i) => (
              <TouchableOpacity key={i} onPress={() => {
                setSlide(i);
                flatRef.current?.scrollToIndex({ index: i, animated: true });
              }}>
                <View style={[styles.dot, i === slide && styles.dotActive]} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={styles.sectionLabel}>SERVIÇOS</Text>
        <View style={styles.servicesRow}>
          {SERVICES.map(sv => (
            <TouchableOpacity
              key={sv.id}
              disabled={!sv.active}
              onPress={() => router.push(`/${sv.id}` as any)}
              style={[styles.serviceCard, sv.active && styles.serviceCardActive, !sv.active && { opacity: 0.4 }]}
            >
              <Text style={styles.serviceLabel}>{sv.label}</Text>
              <Text style={styles.serviceDesc}>{sv.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  scroll: { paddingHorizontal: 16, paddingBottom: 32 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  welcome: { fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: 2, textTransform: 'uppercase' },
  userName: { fontSize: 26, fontWeight: '900', color: '#fff' },
  fordLogo: { width: 60, height: 30 },
  
  // CONTAINER FIXO
  slide: { width: SLIDER_W, height: 240, borderRadius: 18, overflow: 'hidden', backgroundColor: '#002878' },
  // IMAGEM FIXA
  slideImg: { width: SLIDER_W, height: 240 },
  
  slideGrad: { position: 'absolute', bottom: 0, width: '100%', height: 120, justifyContent: 'flex-end', padding: 16 },
  slideTitle: { fontSize: 9, letterSpacing: 3, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase' },
  slideSub: { fontSize: 26, fontWeight: '900', color: '#fff' },
  
  dotsRow: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 10 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.3)' },
  dotActive: { width: 22, backgroundColor: '#fff' },
  
  sectionLabel: { fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: 2, marginBottom: 10, textTransform: 'uppercase', fontWeight: 'bold' },
  servicesRow: { flexDirection: 'row', gap: 10 },
  serviceCard: { flex: 1, borderRadius: 16, padding: 14, backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 2, borderColor: 'rgba(255,255,255,0.07)', alignItems: 'center' },
  serviceCardActive: { backgroundColor: 'rgba(74,158,255,0.14)', borderColor: 'rgba(74,158,255,0.4)' },
  serviceLabel: { fontSize: 12, fontWeight: '700', color: '#fff', textAlign: 'center' },
  serviceDesc: { fontSize: 9, color: 'rgba(255,255,255,0.35)', textAlign: 'center' },
});