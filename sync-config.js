// ARTROPLUS bulut senkronizasyon ayarları.
// Kendi Supabase projenizin bilgilerini girip enabled değerini true yapın.
// Bu dosya doldurulmadığı sürece uygulama tarayıcı içi (localStorage) modunda çalışmaya devam eder.
//
// Gerekli Supabase tabloları:
//   profiles(id uuid pk, full_name text, email text, role text, status text, phone text, is_personnel bool)
//   snapshots(organization_id text pk, data jsonb, updated_at timestamptz)
window.ARTROPLUS_SYNC_CONFIG = {
  enabled: true,
  supabaseUrl: "https://gvzkldgueygixbypyfsp.supabase.co",
  supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2emtsZGd1ZXlnaXhieXB5ZnNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzNjczOTEsImV4cCI6MjA5NDk0MzM5MX0.jqBfY-3mp3-jhsQjENmfv7kntL8dvr4gcPt3-GPK-SQ",
  organizationId: "artroplus",
};
