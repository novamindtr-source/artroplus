(function () {
  "use strict";

  var SNAPSHOT_KEY = "artroplus_enterprise_v2";
  var SUPABASE_SDK_URL = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js";

  var cfg = window.ARTROPLUS_SYNC_CONFIG;
  if (!cfg || !cfg.enabled || !cfg.supabaseUrl || !cfg.supabaseAnonKey) return;

  function loadSupabaseSdk() {
    if (window.supabase && window.supabase.createClient) return Promise.resolve(window.supabase);
    return new Promise(function (resolve, reject) {
      var script = document.createElement("script");
      script.src = SUPABASE_SDK_URL;
      script.onload = function () { resolve(window.supabase); };
      script.onerror = function () { reject(new Error("Supabase SDK yüklenemedi")); };
      document.head.appendChild(script);
    });
  }

  function setup(sdk) {
    var client = sdk.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);
    var organizationId = cfg.organizationId || "default";
    var status = { enabled: true, ready: true, lastSync: "", error: "" };

    async function signIn(email, password) {
      var res = await client.auth.signInWithPassword({ email: email, password: password });
      if (res.error) throw res.error;
      return res.data;
    }

    async function signOut() {
      var res = await client.auth.signOut();
      if (res.error) throw res.error;
    }

    async function currentProfile() {
      var sessionRes = await client.auth.getSession();
      if (sessionRes.error) throw sessionRes.error;
      var session = sessionRes.data && sessionRes.data.session;
      if (!session) return null;
      var res = await client
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .maybeSingle();
      if (res.error) throw res.error;
      return res.data;
    }

    async function pushSnapshot() {
      try {
        var raw = localStorage.getItem(SNAPSHOT_KEY);
        if (!raw) return false;
        var res = await client.from("snapshots").upsert(
          {
            organization_id: organizationId,
            data: JSON.parse(raw),
            updated_at: new Date().toISOString(),
          },
          { onConflict: "organization_id" }
        );
        if (res.error) throw res.error;
        status.lastSync = new Date().toISOString();
        status.error = "";
        return true;
      } catch (e) {
        status.error = e.message || String(e);
        return false;
      }
    }

    async function pullSnapshot() {
      try {
        var res = await client
          .from("snapshots")
          .select("data")
          .eq("organization_id", organizationId)
          .maybeSingle();
        if (res.error) throw res.error;
        if (!res.data || !res.data.data) return false;
        localStorage.setItem(SNAPSHOT_KEY, JSON.stringify(res.data.data));
        status.lastSync = new Date().toISOString();
        status.error = "";
        return true;
      } catch (e) {
        status.error = e.message || String(e);
        return false;
      }
    }

    window.ArtroplusCloud = { signIn: signIn, signOut: signOut, currentProfile: currentProfile };
    window.ArtroplusSync = { status: status, pushSnapshot: pushSnapshot, pullSnapshot: pullSnapshot };
  }

  loadSupabaseSdk()
    .then(setup)
    .catch(function (e) {
      console.warn("ARTROPLUS: Supabase SDK yüklenemedi, bulut senkronizasyonu devre dışı.", e);
    });
})();
