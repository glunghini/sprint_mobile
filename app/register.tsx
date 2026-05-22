import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { saveUser } from '../src/data/storage';
import { FordLogo } from '../src/components/FordLogo';
import { Colors, Font } from '../src/components/Theme';

const DEALERSHIPS = [
  'Ford Bandeirantes - SP', 'Ford Caoa - RJ', 'Ford Sul Motors - RS',
  'Ford Norte - AM', 'Ford Centro Oeste - GO', 'Ford Litoral - SC', 'Ford Vale - MG',
];
const DEPARTMENTS = ['Vendas', 'Marketing', 'Produto', 'Engenharia', 'Pós-venda'];

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState<'dealer' | 'internal'>('dealer');
  const [dealerIndex, setDealerIndex] = useState(0);
  const [deptIndex, setDeptIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    await saveUser({
      name: name || 'Novo Usuário',
      type,
      dealer: type === 'dealer' ? DEALERSHIPS[dealerIndex] : undefined,
      dept: type === 'internal' ? DEPARTMENTS[deptIndex] : undefined,
    });
    setLoading(false);
    router.replace('/home');
  };

  const TypeBtn = ({ val, label }: { val: 'dealer' | 'internal'; label: string }) => (
    <TouchableOpacity onPress={() => setType(val)} style={[styles.typeBtn, type === val && styles.typeBtnActive]}>
      <Text style={[styles.typeBtnText, type === val && styles.typeBtnTextActive]}>{label}</Text>
    </TouchableOpacity>
  );

  const CycleSelect = ({ items, index, onPress }: { items: string[]; index: number; onPress: () => void }) => (
    <TouchableOpacity style={styles.input} onPress={onPress}>
      <Text style={{ color: '#fff', fontSize: 15, fontFamily: Font.regular }}>{items[index]}</Text>
      <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>toque para alternar</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#001A4E', '#002878', '#003FA0']} style={styles.gradient}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backText}>{'←'}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>CADASTRO</Text>
          <FordLogo size={22} />
        </View>

        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <Text style={styles.sectionLabel}>TIPO DE ACESSO</Text>
          <View style={styles.typeRow}>
            <TypeBtn val="dealer" label="Concessionária" />
            <TypeBtn val="internal" label="Interno Ford" />
          </View>

          <Text style={styles.sectionLabel}>NOME COMPLETO</Text>
          <TextInput style={styles.input} placeholder="João Silva" placeholderTextColor={Colors.placeholder} value={name} onChangeText={setName} />

          <Text style={styles.sectionLabel}>E-MAIL</Text>
          <TextInput style={styles.input} placeholder="joao@ford.com.br" placeholderTextColor={Colors.placeholder} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

          <Text style={styles.sectionLabel}>SENHA</Text>
          <TextInput style={styles.input} placeholder="Mínimo 8 caracteres" placeholderTextColor={Colors.placeholder} value={password} onChangeText={setPassword} secureTextEntry />

          {type === 'dealer' && <>
            <Text style={styles.sectionLabel}>CONCESSIONÁRIA</Text>
            <CycleSelect items={DEALERSHIPS} index={dealerIndex} onPress={() => setDealerIndex(i => (i + 1) % DEALERSHIPS.length)} />
          </>}

          {type === 'internal' && <>
            <Text style={styles.sectionLabel}>DEPARTAMENTO</Text>
            <CycleSelect items={DEPARTMENTS} index={deptIndex} onPress={() => setDeptIndex(i => (i + 1) % DEPARTMENTS.length)} />
          </>}

          <TouchableOpacity style={[styles.btnPrimary, loading && { opacity: 0.6 }]} onPress={handleRegister} disabled={loading}>
            <Text style={styles.btnText}>{loading ? 'Criando conta...' : 'Criar Conta'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  flex: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 56, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)' },
  backBtn: { padding: 4 },
  backText: { color: '#fff', fontSize: 22 },
  headerTitle: { fontSize: 16, fontFamily: Font.black, color: '#fff', letterSpacing: 1 },
  scroll: { padding: 20, paddingBottom: 48 },
  sectionLabel: { fontSize: 11, fontFamily: Font.bold, color: 'rgba(255,255,255,0.45)', letterSpacing: 1.2, marginBottom: 8, marginTop: 16 },
  typeRow: { flexDirection: 'row', gap: 10 },
  typeBtn: { flex: 1, padding: 13, borderRadius: 12, borderWidth: 2, borderColor: 'rgba(255,255,255,0.15)', alignItems: 'center' },
  typeBtnActive: { borderColor: '#4A9EFF', backgroundColor: 'rgba(74,158,255,0.12)' },
  typeBtnText: { color: 'rgba(255,255,255,0.5)', fontSize: 13, fontFamily: Font.bold },
  typeBtnTextActive: { color: '#4A9EFF' },
  input: { backgroundColor: 'rgba(255,255,255,0.1)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.25)', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, color: '#fff', fontSize: 15, fontFamily: Font.regular },
  btnPrimary: { backgroundColor: '#0050C8', borderRadius: 50, paddingVertical: 15, alignItems: 'center', marginTop: 32, elevation: 6 },
  btnText: { color: '#fff', fontSize: 15, fontFamily: Font.black, letterSpacing: 1.5 },
});
