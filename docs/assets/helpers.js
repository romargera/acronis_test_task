(function () {
  const levelWeights = {
    critical: 4,
    high: 3,
    medium: 2,
    low: 1
  };

  function riskClass(level) {
    if (level === "critical") return "badge badge-critical";
    if (level === "high") return "badge badge-high";
    if (level === "medium") return "badge badge-medium";
    return "badge badge-low";
  }

  function tenantClass(level) {
    if (level === "critical") return "tenant-tile tenant-critical";
    if (level === "high") return "tenant-tile tenant-high";
    if (level === "medium") return "tenant-tile tenant-medium";
    return "tenant-tile tenant-low";
  }

  function formatCurrency(value) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(value);
  }

  function formatPercent(value) {
    return `${Number(value).toFixed(0)}%`;
  }

  function byRiskDesc(a, b) {
    return (levelWeights[b.riskLevel] || 0) - (levelWeights[a.riskLevel] || 0);
  }

  function createSparkline(values, options) {
    const width = (options && options.width) || 240;
    const height = (options && options.height) || 80;
    const max = Math.max.apply(null, values);
    const min = Math.min.apply(null, values);
    const range = max - min || 1;

    const points = values
      .map(function (value, idx) {
        const x = (idx / (values.length - 1)) * (width - 8) + 4;
        const y = height - ((value - min) / range) * (height - 8) - 4;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");

    return `<svg viewBox="0 0 ${width} ${height}" class="mini-chart" aria-hidden="true"><polyline class="risk-spark" points="${points}" /></svg>`;
  }

  function createBar(value, max) {
    const width = Math.max(3, Math.round((value / max) * 100));
    return `<div class="bar-track"><div class="bar-fill" style="width:${width}%"></div></div>`;
  }

  function getTenantById(id) {
    return (window.AcronisDemoData.tenants || []).find(function (tenant) {
      return tenant.id === id;
    });
  }

  function riskScore(tenant) {
    return (
      tenant.openCriticalAlerts * 8 +
      (100 - tenant.slaCompliance) * 1.2 +
      tenant.reopenRate * 1.1 +
      tenant.escalationRate * 0.9
    );
  }

  function sortAlerts(tenants) {
    const rows = [];
    tenants.forEach(function (tenant) {
      (tenant.alerts || []).forEach(function (alert) {
        rows.push({
          tenantId: tenant.id,
          tenantName: tenant.name,
          severity: alert.severity,
          text: alert.text,
          level: levelWeights[alert.severity] || 0
        });
      });
    });

    return rows.sort(function (a, b) {
      return b.level - a.level;
    });
  }

  function toast(message) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = message;
    el.classList.add("show");
    window.setTimeout(function () {
      el.classList.remove("show");
    }, 1800);
  }

  function queryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  window.DemoUtils = {
    levelWeights: levelWeights,
    riskClass: riskClass,
    tenantClass: tenantClass,
    formatCurrency: formatCurrency,
    formatPercent: formatPercent,
    byRiskDesc: byRiskDesc,
    createSparkline: createSparkline,
    createBar: createBar,
    getTenantById: getTenantById,
    riskScore: riskScore,
    sortAlerts: sortAlerts,
    toast: toast,
    queryParam: queryParam
  };
})();
