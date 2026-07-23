// ARTROPLUS bulut senkronizasyon ayarları.
// Kendi Supabase projenizin bilgilerini girip enabled değerini true yapın.
// Bu dosya doldurulmadığı sürece uygulama tarayıcı içi (localStorage) modunda çalışmaya devam eder.
//
// Gerekli Supabase tabloları:
//   profiles(id uuid pk, full_name text, email text, role text, status text, phone text, is_personnel bool)
//   snapshots(organization_id text pk, data jsonb, updated_at timestamptz)
window.ARTROPLUS_SYNC_CONFIG = {
  enabled: false,
  supabaseUrl: "https://gvzkldgueygixbypyfsp.supabase.co",
  supabaseAnonKey: "",
  organizationId: "artroplus",
};
