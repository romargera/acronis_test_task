(function () {
  const levelWeights = {
    critical: 4,
    high: 3,
    medium: 2,
    low: 1
  };
  let chartSeq = 0;

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

  const sharedFilterStorageKey = "acronisDashboardSharedFiltersV1";

  function cloneFilterState(source) {
    const clone = {};
    Object.keys(source || {}).forEach(function (key) {
      const value = source[key];
      clone[key] = Array.isArray(value) ? value.slice() : value;
    });
    return clone;
  }

  function normalizeSingleValue(value, allowedSet, fallbackValue) {
    if (allowedSet.has(value)) return value;
    return fallbackValue;
  }

  function normalizeMultiValue(value, allowedSet) {
    const allValue = "all";
    const list = Array.isArray(value) ? value : [];
    if (!list.length || list.includes(allValue)) return [allValue];
    const filtered = list.filter(function (item) {
      return allowedSet.has(item) && item !== allValue;
    });
    return filtered.length ? filtered : [allValue];
  }

  function loadSharedFilters(defaults, allowedValues) {
    const safeDefaults = cloneFilterState(defaults || {});
    let parsed = null;
    try {
      parsed = JSON.parse(window.localStorage.getItem(sharedFilterStorageKey) || "null");
    } catch (error) {
      return safeDefaults;
    }

    if (!parsed || typeof parsed !== "object") return safeDefaults;

    Object.keys(safeDefaults).forEach(function (key) {
      const fallbackValue = safeDefaults[key];
      const allowedSet = new Set(((allowedValues && allowedValues[key]) || []).slice());
      if (Array.isArray(fallbackValue)) {
        if (!allowedSet.size) {
          safeDefaults[key] = Array.isArray(parsed[key]) ? parsed[key].slice() : fallbackValue.slice();
          return;
        }
        safeDefaults[key] = normalizeMultiValue(parsed[key], allowedSet);
        return;
      }
      if (!allowedSet.size) {
        if (typeof parsed[key] === typeof fallbackValue) safeDefaults[key] = parsed[key];
        return;
      }
      safeDefaults[key] = normalizeSingleValue(parsed[key], allowedSet, fallbackValue);
    });

    return safeDefaults;
  }

  function saveSharedFilters(filters) {
    try {
      window.localStorage.setItem(sharedFilterStorageKey, JSON.stringify(cloneFilterState(filters || {})));
    } catch (error) {
      // Ignore storage failures (private mode / quota) to avoid blocking UI interactions.
    }
  }

  function escapeAttr(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
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
    const lineColor = cfg.lineColor || "#2f86eb";
    const areaTint = cfg.areaTint || "rgba(47, 134, 235, 0.12)";
    const showArea = cfg.showArea !== false;
    const xAxisName = cfg.xAxisName || "Time";
    const yAxisName = cfg.yAxisName || yLabel || "Value";
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
    const chartId = `linechart-${chartSeq++}`;
    const hatchId = `${chartId}-hatch`;

    function pointXByIndex(idx) {
      if (axisPoints === 1) return leftPad + innerWidth / 2;
      return leftPad + (idx / (axisPoints - 1)) * innerWidth;
    }

    function pointY(value) {
      return topPad + (1 - (value - min) / range) * innerHeight;
    }

    const actualCoords = values
      .map(function (value, idx) {
        return { x: pointXByIndex(idx), y: pointY(value), value: value };
      });
    const actualPoints = actualCoords
      .map(function (coord) {
        return `${coord.x.toFixed(1)},${coord.y.toFixed(1)}`;
      })
      .join(" ");
    const baselineY = topPad + innerHeight;
    const areaPoints = actualCoords.length
      ? `${actualCoords[0].x.toFixed(1)},${baselineY.toFixed(1)} ${actualPoints} ${actualCoords[actualCoords.length - 1].x.toFixed(1)},${baselineY.toFixed(1)}`
      : "";

    const circles = actualCoords
      .map(function (coord, idx) {
        const x = coord.x.toFixed(1);
        const y = coord.y.toFixed(1);
        const label = xLabels[idx] || `P${idx + 1}`;
        return `<circle class="${pointClass}" cx="${x}" cy="${y}" r="3" data-x-axis="${escapeAttr(xAxisName)}" data-y-axis="${escapeAttr(
          yAxisName
        )}" data-x-label="${escapeAttr(label)}" data-y-value="${escapeAttr(coord.value)}" data-unit="${escapeAttr(
          unit
        )}"><title>${label}: ${coord.value}${unit ? " " + unit : ""}</title></circle>`;
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
          return `<circle class="line-point line-point-forecast" cx="${x}" cy="${y}" r="3" data-x-axis="${escapeAttr(
            xAxisName
          )}" data-y-axis="${escapeAttr(yAxisName)}" data-x-label="${escapeAttr(label)}" data-y-value="${escapeAttr(
            value
          )}" data-unit="${escapeAttr(unit)}"><title>${label}: ${value}${unit ? " " + unit : ""}</title></circle>`;
        })
        .join("");
    }

    const xStart = xLabels[0] || "";
    const xEnd = forecast.length ? forecastLabels[forecastLabels.length - 1] : xLabels[xLabels.length - 1] || "";

    return `
      <svg viewBox="0 0 ${width} ${height}" class="line-chart" aria-hidden="true">
        <defs>
          <pattern id="${hatchId}" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke="${lineColor}" stroke-opacity="0.28" stroke-width="1" />
          </pattern>
        </defs>
        <line class="chart-axis" x1="${leftPad}" y1="${topPad + innerHeight}" x2="${width - rightPad}" y2="${topPad + innerHeight}" />
        <line class="chart-axis" x1="${leftPad}" y1="${topPad}" x2="${leftPad}" y2="${topPad + innerHeight}" />
        <line class="chart-grid" x1="${leftPad}" y1="${topPad + innerHeight * 0.33}" x2="${width - rightPad}" y2="${topPad + innerHeight * 0.33}" />
        <line class="chart-grid" x1="${leftPad}" y1="${topPad + innerHeight * 0.66}" x2="${width - rightPad}" y2="${topPad + innerHeight * 0.66}" />
        ${showArea && areaPoints ? `<polygon points="${areaPoints}" fill="${areaTint}"></polygon>` : ""}
        ${showArea && areaPoints ? `<polygon class="chart-area-hatch" points="${areaPoints}" fill="url(#${hatchId})"></polygon>` : ""}
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

  function bindChartHover(scope) {
    const root = scope || document;
    const points = root.querySelectorAll("circle.line-point, circle.line-point-alt, circle.line-point-danger, circle.line-point-forecast");
    if (!points.length) return;

    let tooltip = document.getElementById("chartHoverTooltip");
    if (!tooltip) {
      tooltip = document.createElement("div");
      tooltip.id = "chartHoverTooltip";
      tooltip.className = "chart-hover-tooltip";
      document.body.appendChild(tooltip);
    }

    function moveTooltip(event) {
      tooltip.style.left = `${event.clientX + 12}px`;
      tooltip.style.top = `${event.clientY + 12}px`;
    }

    points.forEach(function (point) {
      if (point.dataset.hoverBound === "1") return;
      point.dataset.hoverBound = "1";

      point.addEventListener("mouseenter", function (event) {
        const xAxis = this.getAttribute("data-x-axis") || "X";
        const yAxis = this.getAttribute("data-y-axis") || "Y";
        const xLabel = this.getAttribute("data-x-label") || "";
        const yValue = this.getAttribute("data-y-value") || "";
        const unit = this.getAttribute("data-unit") || "";
        tooltip.innerHTML = `<div><strong>${xAxis}:</strong> ${xLabel}</div><div><strong>${yAxis}:</strong> ${yValue}${unit}</div>`;
        tooltip.classList.add("show");
        moveTooltip(event);
      });

      point.addEventListener("mousemove", function (event) {
        moveTooltip(event);
      });

      point.addEventListener("mouseleave", function () {
        tooltip.classList.remove("show");
      });
    });
  }

  function initInfoTips(scope) {
    const root = scope || document;
    const tips = root.querySelectorAll(".info-tip[data-info], .info-tip[title]");
    if (!tips.length) return;

    let popover = document.getElementById("infoTipPopover");
    if (!popover) {
      popover = document.createElement("div");
      popover.id = "infoTipPopover";
      popover.className = "info-tip-popover";
      document.body.appendChild(popover);
    }

    let activeTip = null;

    function closePopover() {
      popover.classList.remove("show");
      if (activeTip) activeTip.setAttribute("aria-expanded", "false");
      activeTip = null;
    }

    function placePopover(tip) {
      const rect = tip.getBoundingClientRect();
      const maxWidth = 320;
      let left = rect.left;
      if (left + maxWidth > window.innerWidth - 12) {
        left = window.innerWidth - maxWidth - 12;
      }
      if (left < 12) left = 12;

      let top = rect.bottom + 10;
      const popoverHeight = popover.offsetHeight || 90;
      if (top + popoverHeight > window.innerHeight - 8) {
        top = rect.top - popoverHeight - 10;
      }
      if (top < 8) top = 8;

      popover.style.left = `${left}px`;
      popover.style.top = `${top}px`;
    }

    tips.forEach(function (tip) {
      if (tip.dataset.infoBound === "1") return;
      tip.dataset.infoBound = "1";

      if (!tip.getAttribute("role")) tip.setAttribute("role", "button");
      if (!tip.hasAttribute("tabindex")) tip.setAttribute("tabindex", "0");
      if (!tip.hasAttribute("aria-expanded")) tip.setAttribute("aria-expanded", "false");

      if (!tip.getAttribute("data-info") && tip.getAttribute("title")) {
        tip.setAttribute("data-info", tip.getAttribute("title"));
      }
      tip.removeAttribute("title");

      function togglePopover(event) {
        event.preventDefault();
        event.stopPropagation();
        const info = tip.getAttribute("data-info") || "";
        if (!info) return;

        if (activeTip === tip && popover.classList.contains("show")) {
          closePopover();
          return;
        }

        if (activeTip) activeTip.setAttribute("aria-expanded", "false");
        activeTip = tip;
        tip.setAttribute("aria-expanded", "true");
        popover.innerHTML = `<div>${escapeHtml(info)}</div>`;
        popover.classList.add("show");
        placePopover(tip);
      }

      tip.addEventListener("click", togglePopover);
      tip.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          togglePopover(event);
        } else if (event.key === "Escape") {
          closePopover();
        }
      });
    });

    if (document.body.dataset.infoTipsDocBound !== "1") {
      document.body.dataset.infoTipsDocBound = "1";
      document.addEventListener("click", function (event) {
        if (!event.target.closest(".info-tip") && !event.target.closest(".info-tip-popover")) {
          closePopover();
        }
      });
      window.addEventListener("resize", function () {
        if (activeTip && popover.classList.contains("show")) {
          placePopover(activeTip);
        }
      });
      window.addEventListener("scroll", function () {
        if (activeTip && popover.classList.contains("show")) {
          placePopover(activeTip);
        }
      }, true);
    }
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

  function getScoringConfig(key) {
    const config = window.AcronisDemoData && window.AcronisDemoData.scoringConfig;
    return config ? config[key] : null;
  }

  function createConfidenceBadge(scoringKey, labelOverride) {
    const config = getScoringConfig(scoringKey);
    if (!config) return "";
    const label = labelOverride || config.version;
    return `<button type="button" class="confidence-badge" data-scoring-key="${escapeAttr(scoringKey)}" aria-label="Show scoring formula for ${escapeAttr(config.label)}">
        <span class="confidence-dot" aria-hidden="true"></span>
        <span class="confidence-label">${escapeHtml(label)}</span>
      </button>`;
  }

  function buildScoreExplainerHtml(config) {
    const rows = (config.weights || [])
      .map(function (entry) {
        const pct = Math.round(entry.weight * 100);
        return `<li>
            <div class="score-row">
              <span class="score-factor">${escapeHtml(entry.factor)}</span>
              <span class="score-weight">${pct}%</span>
            </div>
            <div class="tiny score-rationale">${escapeHtml(entry.rationale || "")}</div>
          </li>`;
      })
      .join("");
    return `
      <div class="score-explainer">
        <div class="score-explainer-head">
          <strong>${escapeHtml(config.label)}</strong>
          <span class="tiny">${escapeHtml(config.version)}</span>
        </div>
        <p class="tiny score-explainer-conf">${escapeHtml(config.confidence || "")}</p>
        <ol class="score-weights">${rows}</ol>
        <p class="tiny score-explainer-fallback">${escapeHtml(config.fallback || "")}</p>
      </div>`;
  }

  function ensureScoreModal() {
    let modal = document.getElementById("scoreExplainerModal");
    if (modal) return modal;
    modal = document.createElement("div");
    modal.id = "scoreExplainerModal";
    modal.className = "modal-backdrop";
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML = `
      <div class="modal" role="dialog" aria-modal="true" aria-label="Score explanation">
        <div class="section-actions">
          <h2 class="card-title">How this score is calculated</h2>
          <button class="btn btn-secondary" id="closeScoreExplainer" type="button">Close</button>
        </div>
        <div id="scoreExplainerBody"></div>
      </div>`;
    document.body.appendChild(modal);
    modal.addEventListener("click", function (event) {
      if (event.target === modal) modal.classList.remove("open");
    });
    modal.querySelector("#closeScoreExplainer").addEventListener("click", function () {
      modal.classList.remove("open");
    });
    return modal;
  }

  function bindConfidenceBadges(scope) {
    const root = scope || document;
    const badges = root.querySelectorAll(".confidence-badge[data-scoring-key]");
    if (!badges.length) return;
    const modal = ensureScoreModal();
    const body = modal.querySelector("#scoreExplainerBody");
    badges.forEach(function (badge) {
      if (badge.dataset.confBound === "1") return;
      badge.dataset.confBound = "1";
      badge.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        const config = getScoringConfig(badge.getAttribute("data-scoring-key"));
        if (!config) return;
        body.innerHTML = buildScoreExplainerHtml(config);
        modal.classList.add("open");
      });
    });
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
    bindChartHover: bindChartHover,
    initInfoTips: initInfoTips,
    parseMultiSelect: parseMultiSelect,
    createBar: createBar,
    getTenantById: getTenantById,
    riskScore: riskScore,
    sortAlerts: sortAlerts,
    loadSharedFilters: loadSharedFilters,
    saveSharedFilters: saveSharedFilters,
    toast: toast,
    queryParam: queryParam,
    createConfidenceBadge: createConfidenceBadge,
    bindConfidenceBadges: bindConfidenceBadges,
    getScoringConfig: getScoringConfig
  };
})();
