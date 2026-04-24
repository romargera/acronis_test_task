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

  function parseMultiSelect(selectEl, fallback) {
    if (!selectEl) return fallback;
    const values = Array.from(selectEl.selectedOptions || []).map(function (item) {
      return item.value;
    });
    if (!values.length) return fallback;
    if (values.includes("all")) return fallback;
    return values;
  }

  function createLineChart(values, options) {
    const cfg = options || {};
    const width = cfg.width || 360;
    const height = cfg.height || 140;
    const unit = cfg.unit || "";
    const yLabel = cfg.yLabel || unit;
    const lineClass = cfg.lineClass || "risk-spark";
    const forecastClass = cfg.forecastClass || "risk-forecast";
    const pointClass = cfg.pointClass || "line-point";
    const xLabels = cfg.xLabels || values.map(function (_, idx) {
      return String(idx + 1);
    });
    const forecast = cfg.forecastValues || [];
    const forecastLabels = cfg.forecastLabels || forecast.map(function (_, idx) {
      return `F${idx + 1}`;
    });
    const allValues = values.concat(forecast.length ? forecast : [values[values.length - 1]]);
    const max = Math.max.apply(null, allValues);
    const min = Math.min.apply(null, allValues);
    const range = max - min || 1;
    const leftPad = 34;
    const rightPad = 12;
    const topPad = 10;
    const bottomPad = 28;
    const innerWidth = width - leftPad - rightPad;
    const innerHeight = height - topPad - bottomPad;
    const totalPoints = values.length + forecast.length;
    const axisPoints = forecast.length ? totalPoints : values.length;

    function pointXByIndex(idx) {
      if (axisPoints === 1) return leftPad + innerWidth / 2;
      return leftPad + (idx / (axisPoints - 1)) * innerWidth;
    }

    function pointY(value) {
      return topPad + (1 - (value - min) / range) * innerHeight;
    }

    const actualPoints = values
      .map(function (value, idx) {
        return `${pointXByIndex(idx).toFixed(1)},${pointY(value).toFixed(1)}`;
      })
      .join(" ");

    const circles = values
      .map(function (value, idx) {
        const x = pointXByIndex(idx).toFixed(1);
        const y = pointY(value).toFixed(1);
        const label = xLabels[idx] || `P${idx + 1}`;
        return `<circle class="${pointClass}" cx="${x}" cy="${y}" r="3"><title>${label}: ${value}${unit ? " " + unit : ""}</title></circle>`;
      })
      .join("");

    let forecastLine = "";
    let forecastPoints = "";
    if (forecast.length) {
      const combined = [values[values.length - 1]].concat(forecast);
      forecastLine = combined
        .map(function (value, idx) {
          const globalIndex = values.length - 1 + idx;
          return `${pointXByIndex(globalIndex).toFixed(1)},${pointY(value).toFixed(1)}`;
        })
        .join(" ");

      forecastPoints = forecast
        .map(function (value, idx) {
          const globalIndex = values.length + idx;
          const x = pointXByIndex(globalIndex).toFixed(1);
          const y = pointY(value).toFixed(1);
          const label = forecastLabels[idx] || `F${idx + 1}`;
          return `<circle class="line-point line-point-forecast" cx="${x}" cy="${y}" r="3"><title>${label}: ${value}${unit ? " " + unit : ""}</title></circle>`;
        })
        .join("");
    }

    const xStart = xLabels[0] || "";
    const xEnd = forecast.length ? forecastLabels[forecastLabels.length - 1] : xLabels[xLabels.length - 1] || "";

    return `
      <svg viewBox="0 0 ${width} ${height}" class="line-chart" aria-hidden="true">
        <line class="chart-axis" x1="${leftPad}" y1="${topPad + innerHeight}" x2="${width - rightPad}" y2="${topPad + innerHeight}" />
        <line class="chart-axis" x1="${leftPad}" y1="${topPad}" x2="${leftPad}" y2="${topPad + innerHeight}" />
        <line class="chart-grid" x1="${leftPad}" y1="${topPad + innerHeight * 0.33}" x2="${width - rightPad}" y2="${topPad + innerHeight * 0.33}" />
        <line class="chart-grid" x1="${leftPad}" y1="${topPad + innerHeight * 0.66}" x2="${width - rightPad}" y2="${topPad + innerHeight * 0.66}" />
        <text class="chart-label" x="${leftPad - 28}" y="${topPad + 8}">${(max).toFixed(0)}${unit}</text>
        <text class="chart-label" x="${leftPad - 28}" y="${topPad + innerHeight + 4}">${(min).toFixed(0)}${unit}</text>
        <text class="chart-label" x="${leftPad}" y="${height - 6}">${xStart}</text>
        <text class="chart-label" x="${width - rightPad - 26}" y="${height - 6}">${xEnd}</text>
        <text class="chart-y-title" x="${8}" y="${topPad + innerHeight / 2}">${yLabel}</text>
        ${forecastLine ? `<polyline class="${forecastClass}" points="${forecastLine}" />` : ""}
        <polyline class="${lineClass}" points="${actualPoints}" />
        ${circles}
        ${forecastPoints}
      </svg>`;
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
    createLineChart: createLineChart,
    parseMultiSelect: parseMultiSelect,
    createBar: createBar,
    getTenantById: getTenantById,
    riskScore: riskScore,
    sortAlerts: sortAlerts,
    toast: toast,
    queryParam: queryParam
  };
})();
