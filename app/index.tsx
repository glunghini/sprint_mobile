import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Redireciona substituindo a rota atual para consolidar o fluxo
    router.replace('/home');
  };

  return (
    <LinearGradient colors={['#001A4E', '#002878', '#003FA0']} style={styles.gradient}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.container}
      >
        <ScrollView 
          contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 20 }]}
          showsVerticalScrollIndicator={false}
        >
          
          {/* CONTAINER DO LOGO AJUSTADO */}
          <View style={styles.logoContainer}>
            <Image 
              source={require('../assets/Ford_Motor_Company_Logo.svg.png')} 
              style={styles.fordLogo} 
              resizeMode="contain"
            />
            <Text style={styles.appTitle}>PORTAL DE COMPARAÇÃO</Text>
            <Text style={styles.appSubtitle}>Enterprise Analytics Platform</Text>
          </View>

          {/* FORMULÁRIO DE ACESSO COM CSS ESTILO HOME */}
          <View style={styles.formContainer}>
            <Text style={styles.inputLabel}>E-mail ou Usuário</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu usuário"
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />

            <Text style={styles.inputLabel}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite sua senha"
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin} activeOpacity={0.9}>
              <Text style={styles.loginButtonText}>ENTRAR</Text>
            </TouchableOpacity>
          </View>

          {/* RODAPÉ INFORMATIVO */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Acesso restrito a colaboradores e parceiros autorizados da Ford Motor Company.
            </Text>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24 },
  
  // LOGO E TÍTULOS
  logoContainer: { 
    alignItems: 'center', 
    marginBottom: 40 
  },
  fordLogo: { 
    width: 200, 
    height: 80, 
    marginBottom: 10 
  },
  appTitle: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: '900', 
    letterSpacing: 2, 
    textAlign: 'center' 
  },
  appSubtitle: { 
    color: 'rgba(74, 158, 255, 0.8)', 
    fontSize: 11, 
    fontWeight: 'bold', 
    letterSpacing: 1, 
    marginTop: 6, 
    textTransform: 'uppercase' 
  },
  
  // CARD DE LOGIN TRANSLÚCIDO (IGUAL OS CARDS DA HOME)
  formContainer: { 
    backgroundColor: 'rgba(255, 255, 255, 0.05)', 
    borderRadius: 24, 
    padding: 24, 
    borderWidth: 2, 
    borderColor: 'rgba(255, 255, 255, 0.07)',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.25, 
    shadowRadius: 6, 
    elevation: 4 
  },
  inputLabel: { 
    color: 'rgba(255, 255, 255, 0.6)', 
    fontSize: 11, 
    fontWeight: 'bold', 
    letterSpacing: 1.5, 
    marginBottom: 8, 
    textTransform: 'uppercase' 
  },
  input: { 
    backgroundColor: 'rgba(255, 255, 255, 0.06)', 
    borderRadius: 14, 
    paddingHorizontal: 16, 
    paddingVertical: 14, 
    color: 'white', 
    fontSize: 15, 
    marginBottom: 22, 
    borderWidth: 1, 
    borderColor: 'rgba(255, 255, 255, 0.1)' 
  },
  
  // BOTÃO PREMIUM AZUL DESTAQUE
  loginButton: { 
    backgroundColor: '#4DA6FF', 
    paddingVertical: 16, 
    borderRadius: 14, 
    alignItems: 'center', 
    marginTop: 8, 
    shadowColor: '#4DA6FF', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 6, 
    elevation: 4 
  },
  loginButtonText: { 
    color: '#001A4E', 
    fontWeight: '900', 
    fontSize: 15, 
    letterSpacing: 1.5 
  },
  
  // FOOTER
  footer: { 
    marginTop: 35, 
    alignItems: 'center' 
  },
  footerText: { 
    color: 'rgba(255, 255, 255, 0.25)', 
    fontSize: 11, 
    textAlign: 'center', 
    lineHeight: 16,
    paddingHorizontal: 10
  }
});