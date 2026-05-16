document.addEventListener('DOMContentLoaded', async () => {
  const teamsData = window.TEAMS_DATA || {};
  const fallbackTeamPool = window.ALL_WORLD_CUP_TEAMS || [];
  const worldCupTeamNames = fallbackTeamPool.map(t => t.name);

  const teamSelect = document.getElementById('teamSelect');
  const generateBtn = document.getElementById('generateBtn');
  const teamName = document.getElementById('teamName');
  const teamHook = document.getElementById('teamHook');
  const identityGrid = document.getElementById('identityGrid');
  const identityStory = document.getElementById('identityStory');
  const routeSummary = document.getElementById('routeSummary');
  const routeList = document.getElementById('routeList');
  const clashGrid = document.getElementById('clashGrid');
  const citiesGrid = document.getElementById('citiesGrid');
  const radarCanvas = document.getElementById('radarChart');
  const contentStart = document.getElementById('contentStart');
  const globeSvg = document.getElementById('globeSvg');

  const radarNote = document.getElementById('radarNote');
  const routeNote = document.getElementById('routeNote');
  const clashNote = document.getElementById('clashNote');
  const cityNote = document.getElementById('cityNote');

  const countryHeroTitle = document.getElementById('countryHeroTitle');
  const countryConfed = document.getElementById('countryConfed');
  const countryTier = document.getElementById('countryTier');
  const countryGroup = document.getElementById('countryGroup');
  const countryStats = document.getElementById('countryStats');

  const tabButtons = Array.from(document.querySelectorAll('[role="tab"]'));
  const tabPanels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

  const teamThemes = {
    Argentina: ['#87ceeb', '#ffffff'],
    Australia: ['#012169', '#ffce00'],
    Austria: ['#ed2939', '#ffffff'],
    Belgium: ['#000000', '#ffd90f'],
    'Bosnia and Herzegovina': ['#002395', '#fcd116'],
    Brazil: ['#009b3a', '#ffdf00'],
    Canada: ['#d80621', '#ffffff'],
    'Cape Verde': ['#003893', '#cf2027'],
    Colombia: ['#fcd116', '#003893'],
    Croatia: ['#ff0000', '#ffffff'],
    'Curaçao': ['#002b7f', '#f9d616'],
    'Czech Republic': ['#11457e', '#d7141a'],
    'DR Congo': ['#007fff', '#ce1021'],
    Ecuador: ['#ffdd00', '#003893'],
    Egypt: ['#ce1126', '#000000'],
    England: ['#ffffff', '#cf142b'],
    France: ['#0055a4', '#ef4135'],
    Germany: ['#000000', '#dd0000'],
    Ghana: ['#ce1126', '#fcd116'],
    Haiti: ['#00209f', '#d21034'],
    Iran: ['#239f40', '#da0000'],
    Iraq: ['#ce1021', '#ffffff'],
    'Ivory Coast': ['#f77f00', '#009e60'],
    Jordan: ['#ce1126', '#ffffff'],
    Japan: ['#bc002d', '#ffffff'],
    Mexico: ['#006847', '#ce1126'],
    Morocco: ['#c1272d', '#006233'],
    Netherlands: ['#ae1c28', '#ffffff'],
    'New Zealand': ['#000000', '#ffffff'],
    Norway: ['#ba0c2f', '#00205b'],
    Panama: ['#d21034', '#0038a8'],
    Paraguay: ['#0038a8', '#d52b1e'],
    Portugal: ['#006600', '#ff0000'],
    Qatar: ['#8a1538', '#ffffff'],
    'Saudi Arabia': ['#006c35', '#ffffff'],
    Scotland: ['#005eb8', '#ffffff'],
    Senegal: ['#00853f', '#fdef42'],
    'South Africa': ['#007a4d', '#ffb612'],
    'South Korea': ['#cd2e3a', '#0047a0'],
    Spain: ['#aa151b', '#f1bf00'],
    Sweden: ['#006aa7', '#fecc00'],
    Switzerland: ['#d52b1e', '#ffffff'],
    Tunisia: ['#e70013', '#ffffff'],
    Turkey: ['#e30a17', '#ffffff'],
    Uruguay: ['#0038a8', '#ffffff'],
    USA: ['#b22234', '#3c3b6e'],
    Uzbekistan: ['#1eb53a', '#ffffff']
  };

  const globeAliases = {
    Argentina: 'Argentina',
    Australia: 'Australia',
    Austria: 'Austria',
    Belgium: 'Belgium',
    'Bosnia and Herzegovina': 'Bosnia and Herzegovina',
    Brazil: 'Brazil',
    Canada: 'Canada',
    'Cape Verde': 'Cape Verde',
    Colombia: 'Colombia',
    Croatia: 'Croatia',
    'Curaçao': 'Curacao',
    Curacao: 'Curacao',
    'Czech Republic': 'Czechia',
    'DR Congo': 'Democratic Republic of the Congo',
    Ecuador: 'Ecuador',
    Egypt: 'Egypt',
    England: 'United Kingdom',
    France: 'France',
    Germany: 'Germany',
    Ghana: 'Ghana',
    Haiti: 'Haiti',
    Iran: 'Iran',
    Iraq: 'Iraq',
    'Ivory Coast': "Côte d'Ivoire",
    Jordan: 'Jordan',
    Japan: 'Japan',
    Mexico: 'Mexico',
    Morocco: 'Morocco',
    Netherlands: 'Netherlands',
    'New Zealand': 'New Zealand',
    Norway: 'Norway',
    Panama: 'Panama',
    Paraguay: 'Paraguay',
    Portugal: 'Portugal',
    Qatar: 'Qatar',
    'Saudi Arabia': 'Saudi Arabia',
    Scotland: 'United Kingdom',
    Senegal: 'Senegal',
    'South Africa': 'South Africa',
    'South Korea': 'South Korea',
    Spain: 'Spain',
    Sweden: 'Sweden',
    Switzerland: 'Switzerland',
    Tunisia: 'Tunisia',
    Turkey: 'Turkey',
    Uruguay: 'Uruguay',
    USA: 'United States of America',
    Uzbekistan: 'Uzbekistan'
  };

  const reverseGlobeAliases = {
    Argentina: 'Argentina',
    Australia: 'Australia',
    Austria: 'Austria',
    Belgium: 'Belgium',
    'Bosnia and Herzegovina': 'Bosnia and Herzegovina',
    Brazil: 'Brazil',
    Canada: 'Canada',
    'Cape Verde': 'Cape Verde',
    Colombia: 'Colombia',
    Croatia: 'Croatia',
    Curacao: 'Curaçao',
    Czechia: 'Czech Republic',
    'Democratic Republic of the Congo': 'DR Congo',
    Ecuador: 'Ecuador',
    Egypt: 'Egypt',
    France: 'France',
    Germany: 'Germany',
    Ghana: 'Ghana',
    Haiti: 'Haiti',
    Iran: 'Iran',
    Iraq: 'Iraq',
    "Côte d'Ivoire": 'Ivory Coast',
    Jordan: 'Jordan',
    Japan: 'Japan',
    Mexico: 'Mexico',
    Morocco: 'Morocco',
    Netherlands: 'Netherlands',
    'New Zealand': 'New Zealand',
    Norway: 'Norway',
    Panama: 'Panama',
    Paraguay: 'Paraguay',
    Portugal: 'Portugal',
    Qatar: 'Qatar',
    'Saudi Arabia': 'Saudi Arabia',
    Senegal: 'Senegal',
    'South Africa': 'South Africa',
    'South Korea': 'South Korea',
    Spain: 'Spain',
    Sweden: 'Sweden',
    Switzerland: 'Switzerland',
    Tunisia: 'Tunisia',
    Turkey: 'Turkey',
    Uruguay: 'Uruguay',
    'United States of America': 'USA',
    Uzbekistan: 'Uzbekistan',
    'United Kingdom': 'England'
  };

  if (
    !teamSelect || !generateBtn || !teamName || !teamHook ||
    !identityGrid || !identityStory || !routeSummary || !routeList ||
    !clashGrid || !citiesGrid || !radarCanvas || !globeSvg || !contentStart ||
    !countryHeroTitle || !countryConfed || !countryTier || !countryGroup || !countryStats
  ) {
    console.error('Missing required data or DOM elements.');
    return;
  }

  worldCupTeamNames.forEach((name) => {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    teamSelect.appendChild(option);
  });

  let radarChart = null;
  let globeCountryPaths = null;
  let globeCountryFeatures = [];
  let currentAppSelection = 'Argentina';

  function palette() {
    const theme = teamThemes[currentAppSelection] || ['#197e76', '#1a54a3'];
    return {
      primary: theme[0],
      secondary: theme[1],
      gold: '#d1a13c',
      muted: '#b8c2cc',
      faint: '#8894a1',
      grid: 'rgba(255,255,255,0.12)',
      fill: `color-mix(in srgb, ${theme[0]} 18%, transparent)`,
      tooltipBg: '#ffffff',
      tooltipText: '#17201d',
      land: `color-mix(in srgb, ${theme[0]} 20%, #e7dfcf)`,
      landStroke: 'rgba(255,255,255,0.12)',
      ocean: `color-mix(in srgb, ${theme[1]} 28%, #eef3f6)`,
      glow: `color-mix(in srgb, ${theme[0]} 24%, transparent)`,
      active: theme[0],
      activeStroke: theme[1]
    };
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function hashCode(str) {
    let h = 0;
    for (let i = 0; i < str.length; i += 1) h = ((h << 5) - h) + str.charCodeAt(i);
    return Math.abs(h);
  }

  function seededNumber(name, min, max, offset = 0) {
    const hash = hashCode(`${name}-${offset}`);
    return min + (hash % (max - min + 1));
  }

  function teamMeta(name) {
    return fallbackTeamPool.find(t => t.name === name) || {
      name,
      confed: 'World',
      tier: 'Contender',
      group: 'TBD',
      hostCities: ['Los Angeles', 'Dallas', 'Mexico City']
    };
  }

  function generateFallbackTeam(name) {
    const meta = teamMeta(name);
    const confedLine = {
      UEFA: 'A European side built around tournament control and shape discipline.',
      CONMEBOL: 'A South American side capable of turning rhythm changes into momentum swings.',
      CONCACAF: 'A regional side whose energy and transition moments can reshape a knockout tie.',
      CAF: 'An athletic, front-foot side that can stress opponents with pace and defensive aggression.',
      AFC: 'A tactically disciplined side that can stay compact and attack with speed when openings appear.',
      OFC: 'A side that arrives as an underdog but can still create stress through structure and commitment.'
    }[meta.confed] || 'A tournament side with enough identity to make every knockout tie distinct.';

    const styleProfiles = [
      {
        hook: 'Structured build-up, sharp transitions, and compact defending.',
        baseShape: '4-2-3-1 with compact midfield support',
        pressing: 'Measured press with selective aggression',
        buildup: 'Orderly circulation through midfield',
        transitions: 'Fast when central lanes open',
        defensiveBlock: 'Compact mid-block with disciplined spacing',
        signaturePattern: 'Wide entries followed by cut-backs'
      },
      {
        hook: 'Front-foot pressure, direct attacks, and constant second-ball tension.',
        baseShape: '4-3-3 built for active pressing',
        pressing: 'Aggressive first-wave pressure',
        buildup: 'Direct when the trigger appears',
        transitions: 'Explosive after regains',
        defensiveBlock: 'High rest-defense with recovery speed',
        signaturePattern: 'Early release into wide runners'
      },
      {
        hook: 'Patient control, tactical balance, and repeated final-third entries.',
        baseShape: '4-3-3 with possession bias',
        pressing: 'Controlled press with trap moments',
        buildup: 'Short progression and central support',
        transitions: 'Calculated rather than frantic',
        defensiveBlock: 'Balanced shape with strong lane protection',
        signaturePattern: 'Third-man combinations near the box'
      }
    ];

    const profile = styleProfiles[hashCode(name) % styleProfiles.length];

    return {
      meta: {
        confederation: meta.confed,
        titleContenderTier: meta.tier,
        likelyStyleEra: 'Tournament projection profile',
        sourceProfile: {
          styleDerivedFrom: 'Hybrid event-derived + templated fallback profile',
          routeType: 'Simulated projection',
          clashType: 'Style contrast summary',
          cityGuideType: 'Editorial host-city summary'
        }
      },
      hook: profile.hook,
      identityStory: `${name} project as a ${meta.tier.toLowerCase()} entering Group ${meta.group}. ${confedLine} The profile below is a fallback tournament narrative designed to keep the experience coherent across the full team field.`,
      routeSummary: `${name} look capable of creating one serious tournament moment, with the route defined by whether they can hold their structure against stronger opposition.`,
      radarNote: 'Hybrid profile: featured teams use richer data-backed identity, while additional teams use tournament-ready fallback scoring.',
      routeNote: 'Projected route based on tournament framing and demo-safe bracket storytelling.',
      clashNote: 'Clash cards summarise the likely stylistic tension in knockout football.',
      cityNote: 'Host-city cards are editorial supporter guides tied to likely destinations.',
      radar: {
        pressing: seededNumber(name, 48, 88, 1),
        buildup: seededNumber(name, 50, 90, 2),
        control: seededNumber(name, 46, 89, 3),
        transitions: seededNumber(name, 52, 92, 4),
        defending: seededNumber(name, 45, 87, 5),
        chanceCreation: seededNumber(name, 47, 90, 6)
      },
      identity: {
        baseShape: profile.baseShape,
        pressing: profile.pressing,
        buildup: profile.buildup,
        transitions: profile.transitions,
        defensiveBlock: profile.defensiveBlock,
        signaturePattern: profile.signaturePattern
      },
      route: [
        {
          stage: 'Group stage',
          projectedOpponents: ['Tournament group opponents'],
          narrative: `${name} should be competitive enough to keep qualification alive deep into the group stage.`,
          advancement: 'Live qualification race',
          confidence: seededNumber(name, 48, 74, 7)
        },
        {
          stage: 'Round of 32',
          projectedOpponent: 'Higher-seeded opponent',
          narrative: `The first knockout game would likely hinge on whether ${name} can survive long defensive phases and attack the right spaces in transition.`,
          advancement: 'Possible upset path',
          confidence: seededNumber(name, 40, 61, 8)
        },
        {
          stage: 'Round of 16',
          projectedOpponent: 'Elite contender',
          narrative: `${name} would need emotional control and a disciplined defensive structure to extend the run.`,
          advancement: 'Underdog test',
          confidence: seededNumber(name, 32, 54, 9)
        }
      ],
      clashes: [
        {
          headline: `${name} structure vs knockout-game chaos`,
          summary: 'Their best path is to keep matches legible and deny opponents a broken-field rhythm.'
        },
        {
          headline: `${name} pressing triggers vs elite buildup`,
          summary: 'The matchup turns when their first press either lands cleanly or gets played through.'
        },
        {
          headline: `${name} wide access vs penalty-box protection`,
          summary: 'If they reach good crossing and cut-back zones, the tie becomes far less predictable.'
        }
      ],
      cities: meta.hostCities.slice(0, 3).map((city, idx) => ({
        city,
        country: city === 'Mexico City' ? 'Mexico' : city === 'Toronto' || city === 'Vancouver' ? 'Canada' : 'USA',
        vibe: idx === 0 ? 'Big-stage tournament energy' : idx === 1 ? 'Knockout-focused atmosphere' : 'Final-round event theatre',
        food: idx === 0 ? 'Street food, local classics, and fast pre-match energy' : idx === 1 ? 'Regional staples and supporter-heavy nightlife' : 'Global dining and major-event hospitality',
        supporterExpectations: `${name} supporters can expect a city built for football spectacle, movement, and emotional matchday build-up.`
      }))
    };
  }

  function getTeam(name) {
    return teamsData[name] || generateFallbackTeam(name);
  }

  function setTheme(teamName) {
    const [c1, c2] = teamThemes[teamName] || ['#197e76', '#1a54a3'];
    document.documentElement.style.setProperty('--primary', c1);
    document.documentElement.style.setProperty('--secondary', c2);
  }

  function renderRadar(name, values) {
    const colors = palette();
    if (radarChart) radarChart.destroy();

    radarChart = new Chart(radarCanvas, {
      type: 'radar',
      data: {
        labels: ['Pressing', 'Build-up', 'Control', 'Transitions', 'Defending', 'Chance creation'],
        datasets: [{
          label: name,
          data: values,
          fill: true,
          backgroundColor: colors.fill,
          borderColor: colors.primary,
          borderWidth: 2,
          pointBackgroundColor: colors.secondary,
          pointBorderColor: colors.primary,
          pointHoverBackgroundColor: colors.secondary,
          pointHoverBorderColor: colors.primary,
          pointRadius: 3,
          pointHoverRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 450 },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: colors.tooltipBg,
            titleColor: colors.tooltipText,
            bodyColor: colors.tooltipText,
            displayColors: false
          }
        },
        scales: {
          r: {
            min: 35,
            max: 100,
            ticks: { display: false, stepSize: 10 },
            angleLines: { color: colors.grid },
            grid: { color: colors.grid },
            pointLabels: {
              color: colors.muted,
              font: { size: 11, family: 'Satoshi' }
            }
          }
        }
      }
    });
  }

  function updateGlobeSelection(appTeamName) {
    currentAppSelection = appTeamName;
    setTheme(appTeamName);
    if (!globeCountryPaths) return;

    const colors = palette();
    const activeGlobeName = globeAliases[appTeamName] || appTeamName;

    globeCountryPaths
      .attr('fill', d => d.properties.name === activeGlobeName ? colors.active : colors.land)
      .attr('stroke', d => d.properties.name === activeGlobeName ? colors.activeStroke : colors.landStroke)
      .attr('stroke-width', d => d.properties.name === activeGlobeName ? 1.6 : 0.7)
      .attr('opacity', d => reverseGlobeAliases[d.properties.name] ? 1 : 0.86);
  }

  function renderTeam(name) {
    const team = getTeam(name);
    setTheme(name);

    const identityEntries = [
      ['Base shape', team.identity.baseShape],
      ['Pressing', team.identity.pressing],
      ['Build-up', team.identity.buildup],
      ['Transitions', team.identity.transitions],
      ['Defensive block', team.identity.defensiveBlock],
      ['Signature pattern', team.identity.signaturePattern]
    ];

    const radarValues = [
      team.radar.pressing,
      team.radar.buildup,
      team.radar.control,
      team.radar.transitions,
      team.radar.defending,
      team.radar.chanceCreation
    ];

    teamName.textContent = name;
    countryHeroTitle.textContent = `${name} country profile`;
    teamHook.textContent = team.hook;
    identityStory.textContent = team.identityStory;
    routeSummary.textContent = team.routeSummary;
    radarNote.textContent = team.radarNote || '';
    routeNote.textContent = team.routeNote || '';
    clashNote.textContent = team.clashNote || '';
    cityNote.textContent = team.cityNote || '';

    const meta = team.meta || {};
    countryConfed.textContent = `Confederation: ${meta.confederation || 'N/A'}`;
    countryTier.textContent = `Tier: ${meta.titleContenderTier || 'N/A'}`;
    countryGroup.textContent = `Group: ${teamMeta(name).group || 'TBD'}`;

    countryStats.innerHTML = [
      ['Style era', meta.likelyStyleEra || 'Tournament profile'],
      ['Route type', meta.sourceProfile?.routeType || 'Simulated projection'],
      ['Clash type', meta.sourceProfile?.clashType || 'Style summary'],
      ['Guide type', meta.sourceProfile?.cityGuideType || 'Host-city guide']
    ].map(([label, value]) => `
      <div class="stat-box">
        <p class="stat-label">${label}</p>
        <p class="stat-value">${value}</p>
      </div>
    `).join('');

    identityGrid.innerHTML = identityEntries.map(([label, value]) => `
      <article class="mini-panel">
        <p class="metric-label">${label}</p>
        <p class="metric-value">${value}</p>
      </article>
    `).join('');

    routeList.innerHTML = team.route.map((item) => {
      const opponentText = item.projectedOpponent ? item.projectedOpponent : item.projectedOpponents.join(', ');
      return `
        <article class="route-card">
          <div class="route-card-head">
            <div>
              <p class="route-stage">${item.stage}</p>
              <h4>${opponentText}</h4>
            </div>
            <span class="route-chip">${item.advancement} · ${item.confidence}%</span>
          </div>
          <p class="card-copy">${item.narrative}</p>
        </article>
      `;
    }).join('');

    clashGrid.innerHTML = team.clashes.map((item) => `
      <article class="clash-card">
        <p class="card-label">Clash card</p>
        <h4>${item.headline}</h4>
        <p class="card-copy">${item.summary}</p>
      </article>
    `).join('');

    citiesGrid.innerHTML = team.cities.map((item) => `
      <article class="city-card">
        <p class="card-label">${item.city}, ${item.country}</p>
        <h4>${item.vibe}</h4>
        <div class="city-meta">
          <span class="meta-pill">Food: ${item.food}</span>
        </div>
        <p class="card-copy">${item.supporterExpectations}</p>
      </article>
    `).join('');

    renderRadar(name, radarValues);
    updateGlobeSelection(name);
  }

  function activateTab(tab) {
    const targetPanelId = tab.getAttribute('aria-controls');

    tabButtons.forEach((btn) => {
      const selected = btn === tab;
      btn.setAttribute('aria-selected', String(selected));
      btn.setAttribute('tabindex', selected ? '0' : '-1');
      btn.classList.toggle('is-active', selected);
    });

    tabPanels.forEach((panel) => {
      panel.hidden = panel.id !== targetPanelId;
    });
  }

  function revealJourney() {
    contentStart.classList.remove('is-hidden');
    contentStart.setAttribute('aria-hidden', 'false');
  }

  async function buildGlobe() {
    const width = 760;
    const height = 760;
    const colors = palette();

    const svg = d3.select(globeSvg);
    svg.selectAll('*').remove();

    const projection = d3.geoOrthographic()
      .scale(300)
      .translate([width / 2, height / 2])
      .rotate([20, -15])
      .clipAngle(90);

    const path = d3.geoPath(projection);
    const graticule = d3.geoGraticule10();

    svg.append('defs')
      .append('radialGradient')
      .attr('id', 'oceanGradient')
      .selectAll('stop')
      .data([
        { offset: '0%', color: '#f6f4ea' },
        { offset: '68%', color: colors.ocean },
        { offset: '100%', color: '#dce6ec' }
      ])
      .enter()
      .append('stop')
      .attr('offset', d => d.offset)
      .attr('stop-color', d => d.color);

    svg.append('circle')
      .attr('cx', width / 2)
      .attr('cy', height / 2)
      .attr('r', 300)
      .attr('fill', 'url(#oceanGradient)')
      .attr('stroke', colors.glow)
      .attr('stroke-width', 1.2);

    svg.append('path')
      .datum(graticule)
      .attr('class', 'globe-graticule')
      .attr('d', path)
      .attr('fill', 'none')
      .attr('stroke', 'rgba(24,32,29,0.1)')
      .attr('stroke-width', 0.6)
      .attr('opacity', 0.8);

    const worldData = await d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
    const countries = topojson.feature(worldData, worldData.objects.countries).features;
    globeCountryFeatures = countries;

    const nameMap = new Map([
      ['032', 'Argentina'], ['036', 'Australia'], ['040', 'Austria'], ['056', 'Belgium'],
      ['070', 'Bosnia and Herzegovina'], ['076', 'Brazil'], ['124', 'Canada'], ['132', 'Cape Verde'],
      ['170', 'Colombia'], ['191', 'Croatia'], ['531', 'Curacao'], ['203', 'Czechia'],
      ['180', 'Democratic Republic of the Congo'], ['218', 'Ecuador'], ['818', 'Egypt'],
      ['250', 'France'], ['276', 'Germany'], ['288', 'Ghana'], ['332', 'Haiti'],
      ['364', 'Iran'], ['368', 'Iraq'], ['384', "Côte d'Ivoire"], ['400', 'Jordan'],
      ['392', 'Japan'], ['484', 'Mexico'], ['504', 'Morocco'], ['528', 'Netherlands'],
      ['554', 'New Zealand'], ['578', 'Norway'], ['591', 'Panama'], ['600', 'Paraguay'],
      ['620', 'Portugal'], ['634', 'Qatar'], ['682', 'Saudi Arabia'], ['686', 'Senegal'],
      ['710', 'South Africa'], ['410', 'South Korea'], ['724', 'Spain'], ['752', 'Sweden'],
      ['756', 'Switzerland'], ['788', 'Tunisia'], ['792', 'Turkey'], ['858', 'Uruguay'],
      ['840', 'United States of America'], ['860', 'Uzbekistan'], ['826', 'United Kingdom']
    ]);

    countries.forEach((feature) => {
      const rawId = String(feature.id).padStart(3, '0');
      feature.properties = feature.properties || {};
      feature.properties.name = nameMap.get(rawId) || feature.properties.name || rawId;
    });

    globeCountryPaths = svg.append('g')
      .attr('class', 'countries-layer')
      .selectAll('path')
      .data(countries)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('fill', colors.land)
      .attr('stroke', colors.landStroke)
      .attr('stroke-width', 0.7)
      .attr('vector-effect', 'non-scaling-stroke')
      .style('cursor', d => reverseGlobeAliases[d.properties.name] ? 'pointer' : 'grab')
      .on('click', function (_, d) {
        const appName = reverseGlobeAliases[d.properties.name];
        if (!appName || !worldCupTeamNames.includes(appName)) return;
        teamSelect.value = appName;
        renderTeam(appName);
        rotateToCountryByName(d.properties.name);
      });

    svg.append('circle')
      .attr('cx', width / 2 - 90)
      .attr('cy', height / 2 - 120)
      .attr('r', 110)
      .attr('fill', 'rgba(255,255,255,0.08)');

    function refreshGlobe() {
      const newPath = d3.geoPath(projection);
      svg.select('.globe-graticule').attr('d', newPath(graticule));
      globeCountryPaths.attr('d', newPath);
      updateGlobeSelection(currentAppSelection);
    }

    const dragBehavior = d3.drag().on('drag', (event) => {
      const rotate = projection.rotate();
      const k = 0.28;
      const newRotate = [
        rotate[0] + event.dx * k,
        clamp(rotate[1] - event.dy * k, -85, 85),
        rotate[2]
      ];
      projection.rotate(newRotate);
      refreshGlobe();
    });

    svg.call(dragBehavior);

    globeSvg.refreshGlobe = refreshGlobe;
    globeSvg.projection = projection;
    globeSvg.refreshGlobe();
  }

  function rotateToCountryByName(globeCountryName) {
    if (!globeCountryFeatures.length || !globeSvg.projection) return;

    const feature = globeCountryFeatures.find(f => f.properties?.name === globeCountryName);
    if (!feature) return;

    const centroid = d3.geoCentroid(feature);
    const projection = globeSvg.projection;
    const startRotate = projection.rotate();
    const targetRotate = [-centroid[0], -centroid[1], startRotate[2]];

    d3.transition()
      .duration(900)
      .tween('rotate', () => {
        const interpolator = d3.interpolate(startRotate, targetRotate);
        return (t) => {
          projection.rotate(interpolator(t));
          globeSvg.refreshGlobe();
        };
      });
  }

  tabButtons.forEach((tab, index) => {
    tab.addEventListener('click', () => activateTab(tab));

    tab.addEventListener('keydown', (event) => {
      let nextIndex = index;

      if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabButtons.length;
      else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabButtons.length) % tabButtons.length;
      else if (event.key === 'Home') nextIndex = 0;
      else if (event.key === 'End') nextIndex = tabButtons.length - 1;
      else return;

      event.preventDefault();
      tabButtons[nextIndex].focus();
      activateTab(tabButtons[nextIndex]);
    });
  });

  function goToContent() {
    contentStart.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  generateBtn.addEventListener('click', () => {
    renderTeam(teamSelect.value);
    revealJourney();
    rotateToCountryByName(globeAliases[teamSelect.value] || teamSelect.value);
    goToContent();
  });

  teamSelect.addEventListener('change', () => {
    renderTeam(teamSelect.value);
    rotateToCountryByName(globeAliases[teamSelect.value] || teamSelect.value);
  });

  teamSelect.value = worldCupTeamNames.includes('Argentina') ? 'Argentina' : worldCupTeamNames[0];
  renderTeam(teamSelect.value);
  activateTab(document.getElementById('tab-dna'));
  await buildGlobe();
  rotateToCountryByName(globeAliases[teamSelect.value] || teamSelect.value);
});
