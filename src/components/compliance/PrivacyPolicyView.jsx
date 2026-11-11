import React, { useState } from 'react';
import {
  ShieldCheck,
  ExternalLink,
  Copy,
  Check,
  FileText,
  Lock,
  Heart,
  UserCheck,
  Trash2,
  RefreshCw,
  Globe,
  Smartphone,
  Monitor,
} from 'lucide-react';

export default function PrivacyPolicyView({ isDark }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('preview'); // 'preview' | 'document' | 'checklist'
  const [previewMode, setPreviewMode] = useState('desktop'); // 'desktop' or 'mobile'
  const [iframeKey, setIframeKey] = useState(0);

  const policyUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/privacy-policy.html`
    : 'http://localhost:3000/privacy-policy.html';

  const handleCopy = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(policyUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const cardBg = isDark ? '#111827' : '#FFFFFF';
  const cardBorder = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)';
  const textPrimary = isDark ? '#F8FAFC' : '#0F172A';
  const textSecondary = isDark ? '#94A3B8' : '#64748B';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 1. Header Hero Card with URL & One-Click Actions */}
      <div
        style={{
          backgroundColor: cardBg,
          border: `1px solid ${cardBorder}`,
          borderRadius: '16px',
          padding: '24px 28px',
          boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.04)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#10B981',
                }}
              >
                <ShieldCheck size={20} />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: textPrimary, margin: 0, fontFamily: 'var(--font-heading)' }}>
                Google Play Store Privacy Policy & Compliance
              </h2>
              <span
                style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  color: '#10B981',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  padding: '3px 10px',
                  borderRadius: '999px',
                  fontSize: '11px',
                  fontWeight: '700',
                  letterSpacing: '0.5px',
                }}
              >
                PLAY STORE COMPLIANT
              </span>
            </div>
            <p style={{ fontSize: '13px', color: textSecondary, margin: 0, maxWidth: '680px', lineHeight: 1.5 }}>
              This live web page fulfills Google Play's mandatory requirement for apps handling health, fitness, ECG, and biometric telemetry.
              Paste the URL below into the <strong>Google Play Console &gt; Policy and programs &gt; App content &gt; Privacy policy</strong> section.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <a
              href="/privacy-policy.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.06)' : '#F1F5F9',
                color: textPrimary,
                border: `1px solid ${cardBorder}`,
                padding: '9px 16px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: '600',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <ExternalLink size={15} />
              Open Standalone
            </a>

            <button
              onClick={handleCopy}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: copied ? '#059669' : '#10B981',
                color: '#FFFFFF',
                border: 'none',
                padding: '9px 18px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)',
              }}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied to Clipboard!' : 'Copy Policy URL'}
            </button>
          </div>
        </div>

        {/* URL Display Bar */}
        <div
          style={{
            marginTop: '20px',
            padding: '12px 16px',
            backgroundColor: isDark ? 'rgba(0, 0, 0, 0.4)' : '#F8FAFC',
            borderRadius: '10px',
            border: `1px solid ${cardBorder}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
            <Globe size={16} color="#10B981" style={{ flexShrink: 0 }} />
            <code
              style={{
                fontSize: '13px',
                color: '#10B981',
                fontFamily: 'monospace',
                fontWeight: '600',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {policyUrl}
            </code>
          </div>
          <span style={{ fontSize: '11px', color: textSecondary, flexShrink: 0, fontWeight: '500' }}>
            Served directly from admin panel static root (/privacy-policy.html)
          </span>
        </div>
      </div>

      {/* 2. Play Console Data Safety Blueprint Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        <div
          style={{
            backgroundColor: cardBg,
            border: `1px solid ${cardBorder}`,
            borderRadius: '14px',
            padding: '18px 20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <Heart size={18} color="#EF4444" />
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: textPrimary, margin: 0 }}>
              Health & Fitness Telemetry
            </h3>
          </div>
          <p style={{ fontSize: '12px', color: textSecondary, margin: '0 0 10px 0', lineHeight: 1.4 }}>
            Heart Rate (ECG/PPG), HRV, SpO2, Sleep stages, VO2 Max, Macro Intake, Daily Strain.
          </p>
          <span style={{ fontSize: '11px', color: '#10B981', fontWeight: '700', backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '2px 8px', borderRadius: '6px' }}>
            Collected &bull; User Consent Required
          </span>
        </div>

        <div
          style={{
            backgroundColor: cardBg,
            border: `1px solid ${cardBorder}`,
            borderRadius: '14px',
            padding: '18px 20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <Lock size={18} color="#3B82F6" />
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: textPrimary, margin: 0 }}>
              Data Encryption & Storage
            </h3>
          </div>
          <p style={{ fontSize: '12px', color: textSecondary, margin: '0 0 10px 0', lineHeight: 1.4 }}>
            In transit: TLS 1.3 / HTTPS. At rest: AES-256-GCM. Biometric passkeys remain in device Secure Enclave.
          </p>
          <span style={{ fontSize: '11px', color: '#3B82F6', fontWeight: '700', backgroundColor: 'rgba(59, 130, 246, 0.1)', padding: '2px 8px', borderRadius: '6px' }}>
            Encrypted in Transit & At Rest
          </span>
        </div>

        <div
          style={{
            backgroundColor: cardBg,
            border: `1px solid ${cardBorder}`,
            borderRadius: '14px',
            padding: '18px 20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <Trash2 size={18} color="#F59E0B" />
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: textPrimary, margin: 0 }}>
              Data Deletion & Rights
            </h3>
          </div>
          <p style={{ fontSize: '12px', color: textSecondary, margin: '0 0 10px 0', lineHeight: 1.4 }}>
            Users can permanently delete all health telemetry from within the app settings or via privacy@aurahealth.app.
          </p>
          <span style={{ fontSize: '11px', color: '#F59E0B', fontWeight: '700', backgroundColor: 'rgba(245, 158, 11, 0.1)', padding: '2px 8px', borderRadius: '6px' }}>
            Account & Data Deletion Supported
          </span>
        </div>
      </div>

      {/* Tab Navigation Pill Control */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: `1px solid ${cardBorder}`, paddingBottom: '12px' }}>
        {[
          { id: 'preview', label: 'Interactive Live Preview' },
          { id: 'document', label: 'Full Policy Document' },
          { id: 'checklist', label: 'Google Play Data Safety Form Answers' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              backgroundColor: activeTab === tab.id ? (isDark ? 'rgba(16, 185, 129, 0.15)' : '#DCFCE7') : 'transparent',
              color: activeTab === tab.id ? '#10B981' : textSecondary,
              border: `1px solid ${activeTab === tab.id ? '#10B981' : cardBorder}`,
              fontSize: '13px',
              fontWeight: activeTab === tab.id ? '700' : '500',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: LIVE EMBEDDED PREVIEW */}
      {activeTab === 'preview' && (
      <div
        style={{
          backgroundColor: cardBg,
          border: `1px solid ${cardBorder}`,
          borderRadius: '16px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Preview Control Bar */}
        <div
          style={{
            padding: '14px 20px',
            backgroundColor: isDark ? 'rgba(0, 0, 0, 0.25)' : '#F8FAFC',
            borderBottom: `1px solid ${cardBorder}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileText size={16} color="#10B981" />
            <span style={{ fontSize: '13px', fontWeight: '700', color: textPrimary }}>
              Live Policy Inspector
            </span>
            <span style={{ fontSize: '11px', color: textSecondary }}>
              (Previewing /privacy-policy.html)
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Viewport Width Switchers */}
            <button
              onClick={() => setPreviewMode('desktop')}
              title="Desktop Viewport"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '8px',
                backgroundColor: previewMode === 'desktop' ? (isDark ? 'rgba(16, 185, 129, 0.2)' : '#DCFCE7') : 'transparent',
                color: previewMode === 'desktop' ? '#10B981' : textSecondary,
                border: `1px solid ${previewMode === 'desktop' ? '#10B981' : 'transparent'}`,
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              <Monitor size={14} />
              Desktop
            </button>

            <button
              onClick={() => setPreviewMode('mobile')}
              title="Mobile Viewport"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '8px',
                backgroundColor: previewMode === 'mobile' ? (isDark ? 'rgba(16, 185, 129, 0.2)' : '#DCFCE7') : 'transparent',
                color: previewMode === 'mobile' ? '#10B981' : textSecondary,
                border: `1px solid ${previewMode === 'mobile' ? '#10B981' : 'transparent'}`,
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              <Smartphone size={14} />
              Mobile (Play Store View)
            </button>

            <button
              onClick={() => setIframeKey((k) => k + 1)}
              title="Reload Frame"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '6px 10px',
                borderRadius: '8px',
                backgroundColor: 'transparent',
                color: textSecondary,
                border: `1px solid ${cardBorder}`,
                cursor: 'pointer',
              }}
            >
              <RefreshCw size={13} />
            </button>
          </div>
        </div>

        {/* Embedded Iframe Container */}
        <div
          style={{
            padding: previewMode === 'mobile' ? '28px 16px' : '0',
            backgroundColor: isDark ? '#080C14' : '#F1F5F9',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '650px',
          }}
        >
          <div
            style={{
              width: previewMode === 'mobile' ? '390px' : '100%',
              height: previewMode === 'mobile' ? '780px' : '750px',
              borderRadius: previewMode === 'mobile' ? '36px' : '0',
              border: previewMode === 'mobile' ? (isDark ? '8px solid #1E293B' : '8px solid #CBD5E1') : 'none',
              boxShadow: previewMode === 'mobile' ? '0 20px 40px rgba(0,0,0,0.5)' : 'none',
              overflow: 'hidden',
              backgroundColor: '#0A0F1D',
              transition: 'all 0.25s ease',
            }}
          >
            <iframe
              key={iframeKey}
              src="/privacy-policy.html"
              title="AuraHealth Privacy Policy"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                display: 'block',
              }}
            />
          </div>
        </div>
      </div>
      )}

      {/* TAB 2: NATIVE DOCUMENT VIEWER */}
      {activeTab === 'document' && (
        <div
          style={{
            backgroundColor: cardBg,
            border: `1px solid ${cardBorder}`,
            borderRadius: '16px',
            padding: '36px',
            lineHeight: 1.7,
            color: textPrimary,
          }}
        >
          <div style={{ borderBottom: `1px solid ${cardBorder}`, paddingBottom: '20px', marginBottom: '24px' }}>
            <div style={{ fontSize: '11px', color: '#10B981', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>
              OFFICIAL PRIVACY POLICY &bull; AURAHEALTH BIO-TELEMETRY
            </div>
            <h1 style={{ fontSize: '26px', fontWeight: '800', marginTop: '6px', marginBottom: '8px', color: textPrimary }}>
              AuraHealth Privacy Policy
            </h1>
            <div style={{ fontSize: '12px', color: textSecondary }}>
              Effective Date: November 2026 &bull; Version 2.1 &bull; Compliant with GDPR, CCPA & Google Play Health Telemetry Policy
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '14px' }}>
            <section>
              <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#10B981', marginBottom: '8px' }}>
                1. Overview & Commitment
              </h3>
              <p style={{ color: textSecondary }}>
                AuraHealth (&quot;we&quot;, &quot;our&quot;, or &quot;the Application&quot;) is committed to uncompromising privacy and regulatory compliance. This Privacy Policy informs users of our policies regarding the collection, encryption, use, disclosure, and erasure of Personal Data and Biological Telemetry when utilizing our mobile application, cloud services, and synchronized web administrative dashboard.
              </p>
            </section>

            <section>
              <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#10B981', marginBottom: '8px' }}>
                2. Physiological & Health Telemetry Collected
              </h3>
              <p style={{ color: textSecondary }}>
                To calculate athletic strain, recovery indices, readiness scores, and nutritional balances, AuraHealth collects:
              </p>
              <ul style={{ color: textSecondary, paddingLeft: '20px', marginTop: '6px' }}>
                <li><strong>Cardiovascular Telemetry:</strong> Resting Heart Rate (RHR), Heart Rate Variability (HRV via rMSSD), single-lead electrocardiogram (ECG) waveforms, and blood oxygen saturation (SpO2).</li>
                <li><strong>Circadian & Sleep Architecture:</strong> Total sleep duration, onset latency, awakenings, sleep stages (Deep, REM, Core/Light), nocturnal respiratory rate, and sleep debt.</li>
                <li><strong>Metabolic & Nutritional Metrics:</strong> Daily caloric targets, protein, carbohydrate, dietary fats, micronutrients, hydration volume, and meal timing logs.</li>
                <li><strong>Strain & Physical Activity:</strong> Workout duration, active caloric expenditure, cardiovascular strain score, and GPS routes (only when actively tracked by user).</li>
              </ul>
            </section>

            <section>
              <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#10B981', marginBottom: '8px' }}>
                3. Biometric Passkeys & Authentication
              </h3>
              <p style={{ color: textSecondary }}>
                Biometric credentials (Face ID, Touch ID, Android Biometric Prompt) are processed exclusively on the local device via platform-native Secure Enclave / Hardware KeyStore APIs. AuraHealth <strong>never captures, accesses, transmits, or stores raw biometric images or templates</strong> on our servers.
              </p>
            </section>

            <section>
              <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#10B981', marginBottom: '8px' }}>
                4. Data Encryption & Storage Architecture
              </h3>
              <p style={{ color: textSecondary }}>
                All data transmission between the mobile application and our backend REST API is strictly governed by <strong>TLS 1.3 / HTTPS</strong> with forward secrecy. At rest, database records and clinical backups are protected via <strong>AES-256-GCM encryption</strong>.
              </p>
            </section>

            <section>
              <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#10B981', marginBottom: '8px' }}>
                5. Zero Commercial Data Sale
              </h3>
              <p style={{ color: textSecondary }}>
                We maintain a strict zero-monetization policy on biological telemetry. <strong>We do not sell, rent, broker, or trade health data</strong> to third-party advertising networks, data brokers, or insurance providers.
              </p>
            </section>

            <section>
              <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#10B981', marginBottom: '8px' }}>
                6. Data Deletion & User Rights
              </h3>
              <p style={{ color: textSecondary }}>
                In compliance with Google Play Store policies, GDPR, and CCPA, users possess the permanent right to request full erasure of their account and all associated health records. You may delete your data directly inside the mobile app via <strong>More &gt; Profile &gt; Delete Account</strong>, or by emailing <code>privacy@aurahealth.app</code>. All data is deleted within 7 business days.
              </p>
            </section>
          </div>
        </div>
      )}

      {/* TAB 3: PLAY STORE DATA SAFETY FORM HELPER */}
      {activeTab === 'checklist' && (
        <div
          style={{
            backgroundColor: cardBg,
            border: `1px solid ${cardBorder}`,
            borderRadius: '16px',
            padding: '28px 32px',
          }}
        >
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: textPrimary, margin: '0 0 6px 0' }}>
              Google Play Console: Data Safety Form Answers
            </h2>
            <p style={{ fontSize: '13px', color: textSecondary, margin: 0 }}>
              Use these pre-filled answers when completing the Data Safety section in your Google Play Console:
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              {
                q: 'Does your app collect or share any user data?',
                a: 'Yes, collects data for core health functionality. No data is shared with third parties.',
              },
              {
                q: 'Is all user data collected by your app encrypted in transit?',
                a: 'Yes (TLS 1.3 / HTTPS encryption for all network traffic).',
              },
              {
                q: 'Do you provide a way for users to request that their data be deleted?',
                a: 'Yes (via in-app account deletion and privacy@aurahealth.app).',
              },
              {
                q: 'Health and fitness > Health info & Fitness info',
                a: 'Collected: Yes. Shared: No. Ephemeral: No. Purpose: App functionality & analytics.',
              },
              {
                q: 'Personal info > Name & Email address',
                a: 'Collected: Yes. Purpose: Account management & authentication.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '14px 18px',
                  backgroundColor: isDark ? 'rgba(0, 0, 0, 0.3)' : '#F8FAFC',
                  borderRadius: '10px',
                  border: `1px solid ${cardBorder}`,
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: '700', color: textPrimary, marginBottom: '4px' }}>
                  {item.q}
                </div>
                <div style={{ fontSize: '12px', color: '#10B981', fontWeight: '600' }}>
                  Answer: {item.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

