(function () {
  const tenants = [
    {
      id: "northwind-financial",
      name: "Northwind Financial",
      segment: "Regulated",
      region: "NA",
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

  window.AcronisDemoData = {
    asOf: "2026-04-19",
    tenants: tenants,
    opsTrends: opsTrends,
    revenueSeries: revenueSeries,
    benchmark: {
      ebitda: { you: 14.2, median: 11.1, topQuartile: 19.3 },
      margin: { you: 31.6, median: 46.2, topQuartile: 61.4 },
      arpu: { you: 182, median: 149, topQuartile: 286 },
      ticketsPerTech: { you: 178, median: 121, topQuartile: 88 }
    }
  };
})();
