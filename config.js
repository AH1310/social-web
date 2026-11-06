// إعداد مالك الموقع فقط. لا تضع service_role أو مفاتيح ذكاء اصطناعي هنا.
window.SOCIAL_WEB_CONFIG = {
  supabaseUrl: 'https://xnatdxxnszzvvcwopvqs.supabase.co',
  supabaseAnonKey: 'sb_publishable_ctiOOgLhE4pLVPkNRshiSg_i6pl15BG',
  // خوادم TURN اختيارية موثوقة. الأفضل إصدار بياناتها المؤقتة من خادمك.
  iceServers: [ { urls: 'stun:stun.l.google.com:19302' }, { urls: 'stun:global.stun.twilio.com:3478' } ]
};
