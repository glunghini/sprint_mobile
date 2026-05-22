import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Line, Circle, Path, Text as SvgText, Defs, LinearGradient as SvgGrad, Stop } from 'react-native-svg';
import { FordLogo } from '../src/components/FordLogo';

const TABS = [
  { id: 'vendas', label: 'Vendas' },
  { id: 'mercado', label: 'Mercado' },
  { id: 'satisfacao', label: 'Satisfacao' },
];

function KpiCard({ label, value, delta, color = '#4A9EFF' }: { label: string; value: string; delta: number; color?: string }) {
  return (
    <View style={styles.kpiCard}>
      <Text style={styles.kpiLabel}>{label}</Text>
      <Text style={styles.kpiValue}>{value}</Text>
      <Text style={[styles.kpiDelta, { color: delta >= 0 ? '#4AFF9E' : '#FF5A5A' }]}>
        {delta >= 0 ? '+' : ''}{delta}% vs mes ant.
      </Text>
    </View>
  );
}

function MiniBar({ label, val, max, color = '#4A9EFF' }: { label: string; val: number; max: number; color?: string }) {
  const pct = Math.min((val / max) * 100, 100);
  return (
    <View style={styles.barRow}>
      <View style={styles.barMeta}>
        <Text style={styles.barLabel}>{label}</Text>
        <Text style={styles.barVal}>{val}</Text>
      </View>
      <View style={styles.barTrack}>
        <View style={[styles.barFill, { width: `${pct}%` as any, backgroundColor: color }]} />
      </View>
    </View>
  );
}

function LineChart() {
  const data = [38, 45, 41, 52, 48, 61];
  const meta = [40, 40, 45, 50, 50, 55];
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
  const W = 280, H = 80, maxV = 70;
  const x = (i: number) => (i / (data.length - 1)) * W;
  const y = (v: number) => H - (v / maxV) * (H - 10) - 2;

  return (
    <View>
      <Svg width={W} height={H}>
        {data.map((v, i) => {
          if (i === 0) return null;
          return (
            <Line key={i}
              x1={x(i - 1)} y1={y(data[i - 1])} x2={x(i)} y2={y(v)}
              stroke="#4A9EFF" strokeWidth="2.5" strokeLinecap="round"
            />
          );
        })}
        {meta.map((v, i) => {
          if (i === 0) return null;
          return (
            <Line key={`m${i}`}
              x1={x(i - 1)} y1={y(meta[i - 1])} x2={x(i)} y2={y(v)}
              stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4,3"
            />
          );
        })}
        {data.map((v, i) => (
          <Circle key={`c${i}`} cx={x(i)} cy={y(v)} r="3.5" fill="#4A9EFF" stroke="#001A4E" strokeWidth="1.5" />
        ))}
      </Svg>
      <View style={styles.chartMonths}>
        {months.map(m => <Text key={m} style={styles.monthLabel}>{m}</Text>)}
      </View>
      <View style={styles.chartLegend}>
        <Text style={styles.legendBlue}>— Vendas</Text>
        <Text style={styles.legendGray}>-- Meta</Text>
      </View>
    </View>
  );
}

function DonutChart() {
  const cx = 55, cy = 55, r = 40, thick = 13;
  const segments = [
    { pct: 18.4, color: '#4A9EFF', label: 'Ford', val: '18,4%' },
    { pct: 22.1, color: '#FF5A5A', label: 'Toyota', val: '22,1%' },
    { pct: 15.3, color: '#FFD94A', label: 'Chevrolet', val: '15,3%' },
    { pct: 12.8, color: '#4AFF9E', label: 'Nissan', val: '12,8%' },
    { pct: 31.4, color: 'rgba(255,255,255,0.12)', label: 'Outros', val: '31,4%' },
  ];
  let angle = -90;
  const paths = segments.map(seg => {
    const start = angle;
    const sweep = (seg.pct / 100) * 360;
    angle += sweep;
    const rad = Math.PI / 180;
    const x1 = cx + r * Math.cos(start * rad);
    const y1 = cy + r * Math.sin(start * rad);
    const x2 = cx + r * Math.cos((start + sweep) * rad);
    const y2 = cy + r * Math.sin((start + sweep) * rad);
    const large = sweep > 180 ? 1 : 0;
    return { ...seg, d: `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}` };
  });

  return (
    <View style={styles.donutRow}>
      <Svg width={110} height={110}>
        <Circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={thick} />
        {paths.map((p, i) => (
          <Path key={i} d={p.d} fill="none" stroke={p.color} strokeWidth={thick} strokeLinecap="round" />
        ))}
        <SvgText x={cx} y={cy - 3} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">Ford</SvgText>
        <SvgText x={cx} y={cy + 12} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9">market</SvgText>
      </Svg>
      <View style={styles.donutLegend}>
        {segments.map(s => (
          <View key={s.label} style={styles.legendRow}>
            <View style={[styles.legendDot, { backgroundColor: s.color }]} />
            <Text style={styles.legendName}>{s.label}</Text>
            <Text style={styles.legendPct}>{s.val}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default function ReportsScreen() {
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState('vendas');

  return (
    <LinearGradient colors={['#001A4E', '#002878', '#003FA0']} style={styles.gradient}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>{'←'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>RELATORIOS</Text>
        <FordLogo size={22} />
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        {TABS.map(t => (
          <TouchableOpacity key={t.id} onPress={() => setTab(t.id)} style={[styles.tabBtn, tab === t.id && styles.tabBtnActive]}>
            <Text style={[styles.tabText, tab === t.id && styles.tabTextActive]}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 32 }]}>

        {tab === 'vendas' && <>
          <View style={styles.kpiRow}>
            <KpiCard label="Vendas no mes" value="61" delta={12.5} />
            <KpiCard label="Receita" value="R$29,8M" delta={8.3} color="#4AFF9E" />
            <KpiCard label="Meta" value="91%" delta={3.1} color="#FFD94A" />
          </View>

          <View style={styles.secCard}>
            <Text style={styles.secTitle}>VENDAS VS META — 2025</Text>
            <LineChart />
          </View>

          <View style={styles.secCard}>
            <Text style={styles.secTitle}>TOP MODELOS — JUNHO</Text>
            <MiniBar label="Ranger Raptor" val={24} max={40} color="#4A9EFF" />
            <MiniBar label="Territory" val={18} max={40} color="#4AFF9E" />
            <MiniBar label="Bronco Sport" val={12} max={40} color="#FFD94A" />
            <MiniBar label="Maverick" val={7} max={40} color="#FF9A4A" />
          </View>

          <View style={styles.secCard}>
            <Text style={styles.secTitle}>TOP VENDEDORES</Text>
            {[['Carlos Mendes', '21 vendas', '#4AFF9E'], ['Ana Souza', '18 vendas', '#4A9EFF'], ['Joao Lima', '14 vendas', '#FFD94A'], ['Patricia Cruz', '8 vendas', 'rgba(255,255,255,0.3)']].map(([name, v, c], i) => (
              <View key={name} style={styles.sellerRow}>
                <View style={styles.sellerRank}><Text style={styles.sellerRankText}>{i + 1}</Text></View>
                <View style={styles.sellerInfo}>
                  <Text style={styles.sellerName}>{name}</Text>
                  <Text style={styles.sellerSub}>{v}</Text>
                </View>
                <View style={[styles.sellerDot, { backgroundColor: c }]} />
              </View>
            ))}
          </View>
        </>}

        {tab === 'mercado' && <>
          <View style={styles.kpiRow}>
            <KpiCard label="Share Ford" value="18,4%" delta={2.1} />
            <KpiCard label="Posicao" value="#2" delta={1} color="#FFD94A" />
            <KpiCard label="Leads" value="142" delta={5.8} color="#FF9A4A" />
          </View>

          <View style={styles.secCard}>
            <Text style={styles.secTitle}>SHARE DE MERCADO</Text>
            <DonutChart />
          </View>

          <View style={styles.secCard}>
            <Text style={styles.secTitle}>PICKUPS — POSICAO COMPETITIVA</Text>
            <MiniBar label="Toyota Hilux" val={28} max={35} color="#FF5A5A" />
            <MiniBar label="Ford Ranger" val={24} max={35} color="#4A9EFF" />
            <MiniBar label="Chevrolet S10" val={19} max={35} color="#FFD94A" />
            <MiniBar label="VW Amarok" val={14} max={35} color="#4AFF9E" />
            <MiniBar label="Nissan Frontier" val={11} max={35} color="#FF9A4A" />
          </View>

          <View style={styles.secCard}>
            <Text style={styles.secTitle}>PERFORMANCE POR REGIAO</Text>
            <MiniBar label="Sudeste" val={42} max={50} color="#4A9EFF" />
            <MiniBar label="Sul" val={28} max={50} color="#4AFF9E" />
            <MiniBar label="Centro-Oeste" val={15} max={50} color="#FFD94A" />
            <MiniBar label="Nordeste" val={10} max={50} color="#FF9A4A" />
            <MiniBar label="Norte" val={5} max={50} color="#FF5A5A" />
          </View>
        </>}

        {tab === 'satisfacao' && <>
          <View style={styles.kpiRow}>
            <KpiCard label="NPS Score" value="72" delta={4.2} />
            <KpiCard label="CSAT" value="4,8/5" delta={1.5} color="#4AFF9E" />
            <KpiCard label="Retorno" value="68%" delta={3.0} color="#FFD94A" />
          </View>

          <View style={styles.secCard}>
            <Text style={styles.secTitle}>AVALIACAO POR SERVICO</Text>
            {[['Atendimento', '4,9', 98], ['Entrega do veiculo', '4,7', 94], ['Pos-venda', '4,5', 90], ['Financiamento', '4,3', 86], ['Revisao/Manutencao', '4,1', 82]].map(([s, n, p]) => (
              <View key={s} style={styles.starRow}>
                <View style={styles.starMeta}>
                  <Text style={styles.barLabel}>{s}</Text>
                  <Text style={[styles.barVal, { color: '#FFD94A' }]}>{n}/5</Text>
                </View>
                <View style={styles.barTrack}>
                  <View style={[styles.barFill, { width: `${p}%` as any, backgroundColor: '#FFD94A' }]} />
                </View>
              </View>
            ))}
          </View>

          <View style={styles.secCard}>
            <Text style={styles.secTitle}>COMENTARIOS RECENTES</Text>
            {[['Carlos R.', 5, 'Ranger Raptor superou todas as expectativas!', 'ha 2 dias'], ['Ana P.', 4, 'Atendimento excelente, entrega rapida.', 'ha 5 dias'], ['Marcos T.', 5, 'Melhor experiencia de compra que ja tive.', 'ha 1 sem']].map(([name, stars, text, time]) => (
              <View key={name as string} style={styles.commentBox}>
                <View style={styles.commentHeader}>
                  <Text style={styles.commentName}>{name}</Text>
                  <Text style={styles.commentTime}>{time}</Text>
                </View>
                <Text style={styles.commentStars}>{'★'.repeat(stars as number)}{'☆'.repeat(5 - (stars as number))}</Text>
                <Text style={styles.commentText}>"{text}"</Text>
              </View>
            ))}
          </View>
        </>}

      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)' },
  backBtn: { padding: 4 },
  backText: { color: '#fff', fontSize: 22 },
  headerTitle: { fontSize: 15, fontWeight: '800', color: '#fff', letterSpacing: 1 },
  tabRow: { flexDirection: 'row', marginHorizontal: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)' },
  tabBtn: { flex: 1, paddingVertical: 12, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabBtnActive: { borderBottomColor: '#4A9EFF' },
  tabText: { fontSize: 13, fontWeight: '700', color: 'rgba(255,255,255,0.4)' },
  tabTextActive: { color: '#4A9EFF' },
  scroll: { padding: 14 },
  kpiRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  kpiCard: { flex: 1, backgroundColor: 'rgba(255,255,255,0.07)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', borderRadius: 14, padding: 12 },
  kpiLabel: { fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: 0.5, marginBottom: 6 },
  kpiValue: { fontSize: 18, fontWeight: '800', color: '#fff', marginBottom: 4 },
  kpiDelta: { fontSize: 9 },
  secCard: { backgroundColor: 'rgba(255,255,255,0.07)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', borderRadius: 16, padding: 14, marginBottom: 12 },
  secTitle: { fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: 1.5, fontWeight: '700', marginBottom: 12 },
  barRow: { marginBottom: 10 },
  barMeta: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  barLabel: { fontSize: 12, color: 'rgba(255,255,255,0.6)' },
  barVal: { fontSize: 12, fontWeight: '700', color: '#fff' },
  barTrack: { height: 5, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 3 },
  barFill: { height: 5, borderRadius: 3 },
  starRow: { marginBottom: 10 },
  starMeta: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  sellerRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  sellerRank: { width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center' },
  sellerRankText: { color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: '700' },
  sellerInfo: { flex: 1 },
  sellerName: { fontSize: 14, fontWeight: '700', color: '#fff' },
  sellerSub: { fontSize: 10, color: 'rgba(255,255,255,0.35)' },
  sellerDot: { width: 8, height: 8, borderRadius: 4 },
  chartMonths: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  monthLabel: { fontSize: 9, color: 'rgba(255,255,255,0.3)' },
  chartLegend: { flexDirection: 'row', gap: 16, marginTop: 8 },
  legendBlue: { fontSize: 11, color: '#4A9EFF' },
  legendGray: { fontSize: 11, color: 'rgba(255,255,255,0.3)' },
  donutRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  donutLegend: { flex: 1 },
  legendRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 2 },
  legendName: { flex: 1, fontSize: 12, color: 'rgba(255,255,255,0.7)' },
  legendPct: { fontSize: 12, fontWeight: '700', color: '#fff' },
  commentBox: { marginBottom: 14, paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.07)' },
  commentHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  commentName: { fontSize: 13, fontWeight: '700', color: '#fff' },
  commentTime: { fontSize: 10, color: 'rgba(255,255,255,0.3)' },
  commentStars: { fontSize: 12, color: '#FFD94A', marginBottom: 4 },
  commentText: { fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 18 },
});
