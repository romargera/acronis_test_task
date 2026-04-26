(function () {
  const tenants = [
    {
      id: "northwind-financial",
      name: "Northwind Financial",
      segment: "Regulated",
      region: "NA",
      country: "United States",
      endpoints: 286,
      tenureMonths: 42,
      mrr: 14200,
      riskLevel: "critical",
      postureScore: 61,
      backupSuccess: 72,
      patchCompliance: 66,
      openCriticalAlerts: 7,
      unresolvedIncidents: 5,
      slaCompliance: 74,
      reopenRate: 31,
      escalationRate: 24,
      qbrAttendanceDrop: 2,
      billingDisputes: 2,
      marginPct: 18,
      estimatedCost: 11600,
      services: { backup: true, edr: true, m365: true, patch: false, dlp: false },
      opportunities: [
        { name: "Patch Management", impact: 620 },
        { name: "DLP", impact: 540 }
      ],
      alerts: [
        { severity: "critical", text: "12 endpoints missing critical CVE patch" },
        { severity: "high", text: "Backup success dropped below 75%" },
        { severity: "high", text: "2 suspicious PowerShell behaviors detected" }
      ],
      timeline: [
        { type: "risk", date: "2026-04-18", text: "SLA dropped to 74% for last 14 days" },
        { type: "ops", date: "2026-04-17", text: "Backup policy drift on 18 servers" },
        { type: "biz", date: "2026-04-12", text: "CFO skipped QBR for 2nd time" },
        { type: "biz", date: "2026-04-09", text: "Invoice dispute opened for security add-on" }
      ]
    },
    {
      id: "alpine-medical",
      name: "Alpine Medical",
      segment: "Healthcare",
      region: "EU",
      country: "Germany",
      endpoints: 198,
      tenureMonths: 33,
      mrr: 9800,
      riskLevel: "high",
      postureScore: 73,
      backupSuccess: 84,
      patchCompliance: 76,
      openCriticalAlerts: 4,
      unresolvedIncidents: 3,
      slaCompliance: 81,
      reopenRate: 21,
      escalationRate: 17,
      qbrAttendanceDrop: 1,
      billingDisputes: 0,
      marginPct: 29,
      estimatedCost: 6900,
      services: { backup: true, edr: true, m365: false, patch: true, dlp: false },
      opportunities: [
        { name: "M365 Backup", impact: 410 },
        { name: "DLP", impact: 330 }
      ],
      alerts: [
        { severity: "high", text: "4 Exchange mailboxes without backup for 24h" },
        { severity: "medium", text: "EDR policy outdated on 9 endpoints" }
      ],
      timeline: [
        { type: "ops", date: "2026-04-19", text: "Patch compliance dropped by 5pp WoW" },
        { type: "risk", date: "2026-04-14", text: "Ticket reopen rate above threshold" },
        { type: "biz", date: "2026-04-02", text: "Renewal discussion starts in 90 days" }
      ]
    },
    {
      id: "metro-law",
      name: "Metro Law Partners",
      segment: "Professional Services",
      region: "NA",
      country: "United States",
      endpoints: 164,
      tenureMonths: 21,
      mrr: 7600,
      riskLevel: "high",
      postureScore: 69,
      backupSuccess: 81,
      patchCompliance: 71,
      openCriticalAlerts: 3,
      unresolvedIncidents: 4,
      slaCompliance: 78,
      reopenRate: 26,
      escalationRate: 19,
      qbrAttendanceDrop: 2,
      billingDisputes: 1,
      marginPct: 22,
      estimatedCost: 5900,
      services: { backup: true, edr: false, m365: true, patch: true, dlp: false },
      opportunities: [
        { name: "EDR", impact: 520 },
        { name: "DLP", impact: 310 }
      ],
      alerts: [
        { severity: "high", text: "SLA breach risk due to backlog growth" },
        { severity: "medium", text: "3 servers missed incremental backup" }
      ],
      timeline: [
        { type: "risk", date: "2026-04-18", text: "Escalation rate doubled in 2 weeks" },
        { type: "biz", date: "2026-04-10", text: "Partner asked for pricing transparency" },
        { type: "ops", date: "2026-04-07", text: "Critical patch rollback on 2 VMs" }
      ]
    },
    {
      id: "bluewave-retail",
      name: "BlueWave Retail",
      segment: "Retail",
      region: "APAC",
      country: "Singapore",
      endpoints: 118,
      tenureMonths: 15,
      mrr: 5200,
      riskLevel: "medium",
      postureScore: 81,
      backupSuccess: 92,
      patchCompliance: 83,
      openCriticalAlerts: 1,
      unresolvedIncidents: 2,
      slaCompliance: 88,
      reopenRate: 13,
      escalationRate: 11,
      qbrAttendanceDrop: 0,
      billingDisputes: 0,
      marginPct: 36,
      estimatedCost: 3300,
      services: { backup: true, edr: true, m365: false, patch: false, dlp: false },
      opportunities: [
        { name: "Patch Management", impact: 260 },
        { name: "M365 Backup", impact: 220 }
      ],
      alerts: [
        { severity: "medium", text: "Daily backup duration exceeded baseline" }
      ],
      timeline: [
        { type: "ops", date: "2026-04-16", text: "2 endpoints offline for >24 hours" },
        { type: "biz", date: "2026-03-29", text: "Owner asked for quarterly optimization review" }
      ]
    },
    {
      id: "terra-logistics",
      name: "Terra Logistics",
      segment: "Logistics",
      region: "EU",
      country: "Netherlands",
      endpoints: 304,
      tenureMonths: 57,
      mrr: 16100,
      riskLevel: "medium",
      postureScore: 78,
      backupSuccess: 88,
      patchCompliance: 79,
      openCriticalAlerts: 2,
      unresolvedIncidents: 3,
      slaCompliance: 86,
      reopenRate: 16,
      escalationRate: 13,
      qbrAttendanceDrop: 0,
      billingDisputes: 0,
      marginPct: 31,
      estimatedCost: 11100,
      services: { backup: true, edr: true, m365: true, patch: true, dlp: false },
      opportunities: [
        { name: "DLP", impact: 670 }
      ],
      alerts: [
        { severity: "medium", text: "Patch drift detected on warehouse kiosks" }
      ],
      timeline: [
        { type: "ops", date: "2026-04-15", text: "Backup window exceeded by 18%" },
        { type: "biz", date: "2026-04-05", text: "Expansion opportunity: 40 new devices" }
      ]
    },
    {
      id: "eclipse-media",
      name: "Eclipse Media Group",
      segment: "Media",
      region: "NA",
      country: "Canada",
      endpoints: 142,
      tenureMonths: 9,
      mrr: 4300,
      riskLevel: "medium",
      postureScore: 76,
      backupSuccess: 86,
      patchCompliance: 77,
      openCriticalAlerts: 1,
      unresolvedIncidents: 1,
      slaCompliance: 85,
      reopenRate: 18,
      escalationRate: 12,
      qbrAttendanceDrop: 1,
      billingDisputes: 0,
      marginPct: 27,
      estimatedCost: 3150,
      services: { backup: true, edr: false, m365: true, patch: false, dlp: false },
      opportunities: [
        { name: "EDR", impact: 290 },
        { name: "Patch Management", impact: 240 }
      ],
      alerts: [
        { severity: "medium", text: "Backup failures on design workstations" }
      ],
      timeline: [
        { type: "risk", date: "2026-04-13", text: "QBR attendance dropped from 4 to 2 stakeholders" },
        { type: "biz", date: "2026-04-01", text: "Potential add-on: Email security" }
      ]
    },
    {
      id: "atlas-construction",
      name: "Atlas Construction",
      segment: "Industrial",
      region: "EU",
      country: "France",
      endpoints: 86,
      tenureMonths: 6,
      mrr: 3200,
      riskLevel: "low",
      postureScore: 89,
      backupSuccess: 96,
      patchCompliance: 91,
      openCriticalAlerts: 0,
      unresolvedIncidents: 1,
      slaCompliance: 94,
      reopenRate: 8,
      escalationRate: 6,
      qbrAttendanceDrop: 0,
      billingDisputes: 0,
      marginPct: 41,
      estimatedCost: 1870,
      services: { backup: true, edr: true, m365: false, patch: true, dlp: false },
      opportunities: [
        { name: "M365 Backup", impact: 180 }
      ],
      alerts: [],
      timeline: [
        { type: "ops", date: "2026-04-11", text: "All critical patch jobs completed" }
      ]
    },
    {
      id: "nova-education",
      name: "Nova Education",
      segment: "Education",
      region: "APAC",
      country: "Australia",
      endpoints: 232,
      tenureMonths: 49,
      mrr: 10100,
      riskLevel: "low",
      postureScore: 86,
      backupSuccess: 93,
      patchCompliance: 88,
      openCriticalAlerts: 0,
      unresolvedIncidents: 2,
      slaCompliance: 91,
      reopenRate: 11,
      escalationRate: 7,
      qbrAttendanceDrop: 0,
      billingDisputes: 0,
      marginPct: 38,
      estimatedCost: 6200,
      services: { backup: true, edr: true, m365: true, patch: true, dlp: true },
      opportunities: [],
      alerts: [
        { severity: "low", text: "Informational vulnerability report ready" }
      ],
      timeline: [
        { type: "biz", date: "2026-04-08", text: "Signed expansion for 30 additional endpoints" }
      ]
    }
  ];

  const opsTrends = {
    backup: [91, 89, 87, 86, 84, 86, 85],
    patch: [88, 86, 84, 83, 81, 80, 79],
    threats: [7, 9, 10, 11, 13, 12, 14]
  };

  const revenueSeries = {
    "30d": [72, 74, 76, 77, 79, 81],
    "90d": [66, 68, 69, 71, 73, 75, 76, 78, 80],
    "365d": [57, 58, 59, 61, 62, 63, 65, 67, 68, 69, 70, 72]
  };

  const peerBenchmarks = {
    cohort: {
      label: "Mid-market MSPs",
      definition: "MSPs with similar portfolio scale and service complexity, used here as a directional v1 comparison cohort.",
      sampleSize: 142,
      anonymization: "Peer values are shown only when the contributing cohort clears a minimum privacy threshold. Individual MSPs are never identifiable; thin cohorts are suppressed."
    },
    metrics: [
      {
        id: "nrr",
        label: "Net Revenue Retention",
        unit: "%",
        yourValue: 103,
        peerP25: 101,
        peerP50: 109,
        peerP75: 114,
        higherIsBetter: true,
        formula: "Current period MRR from the prior cohort divided by prior period MRR, net of churn and expansion.",
        source: "Usage and billing telemetry, monthly rollup"
      },
      {
        id: "gross-margin",
        label: "Gross Margin",
        unit: "%",
        yourValue: 30,
        peerP25: 28,
        peerP50: 34,
        peerP75: 40,
        higherIsBetter: true,
        formula: "Average gross margin across the scoped client portfolio using service revenue minus estimated delivery cost.",
        source: "Usage plus PSA ticket pressure model"
      },
      {
        id: "sla",
        label: "SLA Compliance (MRR-weighted)",
        unit: "%",
        yourValue: 84,
        peerP25: 83,
        peerP50: 89,
        peerP75: 93,
        higherIsBetter: true,
        formula: "Share of tickets meeting SLA, weighted by client MRR so that large accounts count more.",
        source: "PSA connector events"
      },
      {
        id: "mrr-per-endpoint",
        label: "MRR per Endpoint",
        unit: "$",
        yourValue: 52,
        peerP25: 45,
        peerP50: 61,
        peerP75: 74,
        higherIsBetter: true,
        formula: "Total portfolio MRR divided by total managed endpoints in the same scope.",
        source: "Billing and endpoint inventory"
      }
    ]
  };

  const scoringConfig = {
    operationsRisk: {
      label: "Operational Risk Score",
      version: "Heuristic v1",
      confidence: "Medium confidence. Weights are initial product hypothesis, not trained ML. We collect technician up or down votes in the early access program to recalibrate.",
      weights: [
        { factor: "Backup failure rate", weight: 0.35, rationale: "Primary backup promise; most direct MSP liability." },
        { factor: "Patch lag (days past published CVE)", weight: 0.25, rationale: "Strong leading indicator of exploitable surface." },
        { factor: "Open critical alerts (severity-weighted)", weight: 0.20, rationale: "Captures current active incident pressure." },
        { factor: "SLA miss rate (last 14 days)", weight: 0.20, rationale: "Contract exposure; ties ops signal to commercial risk." }
      ],
      fallback: "If a factor is missing data, its weight is redistributed proportionally across present factors. Missing factors are flagged in the hover explanation."
    },
    churnRisk: {
      label: "Churn Risk Score",
      version: "Heuristic v1",
      confidence: "Low to medium confidence for the first 90 days after launch. A labeled churn dataset from production renewals is required before moving to a trained model.",
      weights: [
        { factor: "Ticket reopen rate", weight: 0.30, rationale: "Strong early signal to validate in discovery." },
        { factor: "Escalation rate", weight: 0.25, rationale: "Reflects customer frustration and internal cost." },
        { factor: "SLA compliance drop", weight: 0.20, rationale: "Directly visible to customer stakeholders." },
        { factor: "QBR attendance drop", weight: 0.15, rationale: "Sponsor disengagement is a renewal risk." },
        { factor: "Billing disputes", weight: 0.10, rationale: "Late signal but very high conviction when present." }
      ],
      fallback: "If PSA data quality is too low for a tenant, we display the score as Unavailable with an explicit data-gap label instead of guessing."
    }
  };

  window.AcronisDemoData = {
    asOf: "2026-04-19",
    tenants: tenants,
    opsTrends: opsTrends,
    revenueSeries: revenueSeries,
    peerBenchmarks: peerBenchmarks,
    scoringConfig: scoringConfig
  };
})();
