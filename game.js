(() => {
  'use strict';

  const CHARACTERS = {
    gale: {
      id: 'gale', name: 'GALE', role: 'WIND SHIFTER', glyph: 'G', color: '#8cf5e5',
      hp: 104, speed: 240, damage: 14, fireRate: .36, range: 390, projectileSpeed: 810, stat: 5,
      ability: 'Clearing Gust', abilityDesc: 'Blast enemies, bullets, and movable cover out of the way.', abilityCd: 7,
      ultimate: 'Tornado Run', ultDesc: 'Launch a moving tornado that carries enemies and cover.'
    },
    tidal: {
      id: 'tidal', name: 'TIDAL', role: 'WATER BREAKER', glyph: 'T', color: '#4db8ff',
      hp: 118, speed: 205, damage: 14, fireRate: .43, range: 410, projectileSpeed: 720, stat: 4,
      ability: 'Crashing Wave', abilityDesc: 'A damaging water wave that violently pushes opponents back.', abilityCd: 7.5,
      ultimate: 'Riptide', ultDesc: 'Flood a large zone and repeatedly throw enemies outward.'
    },
    pyre: {
      id: 'pyre', name: 'PYRE', role: 'FIRE CASTER', glyph: 'P', color: '#ff6b3d',
      hp: 102, speed: 210, damage: 17, fireRate: .42, range: 390, projectileSpeed: 760, stat: 4,
      ability: 'Fire Burst', abilityDesc: 'Detonate an expanding fire burst around yourself.', abilityCd: 6.5,
      ultimate: 'Inferno Crown', ultDesc: 'Ignite a wide area for heavy repeated fire damage.'
    },
    volt: {
      id: 'volt', name: 'VOLT', role: 'THUNDER CALLER', glyph: 'V', color: '#f4ef62',
      hp: 98, speed: 235, damage: 11, fireRate: .25, range: 370, projectileSpeed: 900, stat: 5,
      ability: 'Thunder Strike', abilityDesc: 'Call lightning directly onto the nearest opponent.', abilityCd: 6.5,
      ultimate: 'Storm Cage', ultDesc: 'Trap a section of the arena in a lightning storm.'
    },
    seraph: {
      id: 'seraph', name: 'SERAPH', role: 'ANGEL', glyph: 'A', color: '#fff2a8',
      hp: 116, speed: 205, damage: 11, fireRate: .44, range: 390, projectileSpeed: 700, stat: 3,
      ability: 'Angel Grace', abilityDesc: 'Heal yourself and your teammate at the same time.', abilityCd: 10,
      ultimate: 'Divine Revival', ultDesc: 'Fully restore the team and grant protective wings.'
    },
    reverb: {
      id: 'reverb', name: 'REVERB', role: 'SOUNDWALKER', glyph: 'R', color: '#ff79d1',
      hp: 96, speed: 225, damage: 14, fireRate: .34, range: 400, projectileSpeed: 820, stat: 5,
      ability: 'Sound Jump', abilityDesc: 'Teleport to the nearest recent gun sound.', abilityCd: 5.5,
      ultimate: 'Sonic Collapse', ultDesc: 'Teleport through every enemy and detonate a shockwave.'
    },
    mirage: {
      id: 'mirage', name: 'MIRAGE', role: 'ILLUSIONIST', glyph: 'M', color: '#ba83ff',
      hp: 94, speed: 220, damage: 13, fireRate: .38, range: 410, projectileSpeed: 760, stat: 4,
      ability: 'False Squad', abilityDesc: 'Send two moving decoys into the arena to draw fire.', abilityCd: 9,
      ultimate: 'Mirror Army', ultDesc: 'Flood the fight with five aggressive decoys.'
    },
    hemlock: {
      id: 'hemlock', name: 'HEMLOCK', role: 'BLOOD HUNTER', glyph: 'H', color: '#d91f48',
      hp: 112, speed: 205, damage: 14, fireRate: .4, range: 370, projectileSpeed: 770, stat: 5,
      ability: 'Blood Rush', abilityDesc: 'Spend health for speed and faster attacks.', abilityCd: 8,
      ultimate: 'Red Harvest', ultDesc: 'Drain nearby enemies and turn the stolen health into power.',
      passive: 'Blood Price: every elimination permanently raises damage by 12%.'
    },
    glacier: {
      id: 'glacier', name: 'GLACIER', role: 'ICE SHAPER', glyph: 'I', color: '#9cddff',
      hp: 110, speed: 190, damage: 15, fireRate: .46, range: 410, projectileSpeed: 680, stat: 4,
      ability: 'Ice Slick', abilityDesc: 'Freeze the ground so opponents slide out of control.', abilityCd: 8.5,
      ultimate: 'Deep Freeze', ultDesc: 'Cover most of the arena in dangerous sliding ice.'
    },
    drakon: {
      id: 'drakon', name: 'DRAKON', role: 'DRAGONBORN', glyph: 'D', color: '#71ff83',
      hp: 128, speed: 195, damage: 16, fireRate: .5, range: 430, projectileSpeed: 690, stat: 5,
      ability: 'Dragon Hunt', abilityDesc: 'Send a dragon at opponents that destroys cover in its path.', abilityCd: 10,
      ultimate: 'Twin Dragons', ultDesc: 'Release two destructive dragons down the arena.'
    },
    havoc: {
      id: 'havoc', name: 'HAVOC', role: 'INSANITY', glyph: 'X', color: '#ff4ff3',
      hp: 100, speed: 215, damage: 14, fireRate: .37, range: 400, projectileSpeed: 780, stat: 4,
      ability: 'Triple Vision', abilityDesc: 'Make opponents see three copies of you at once.', abilityCd: 9,
      ultimate: 'Mass Delusion', ultDesc: 'Trap both opponents inside a swarm of false versions.'
    }
  };

  const BASE_OBSTACLES = [
    { x: 570, y: 250, w: 140, h: 220, hp: 240, maxHp: 240, movable: false },
    { x: 255, y: 115, w: 150, h: 56, hp: 100, maxHp: 100, movable: true },
    { x: 875, y: 549, w: 150, h: 56, hp: 100, maxHp: 100, movable: true },
    { x: 250, y: 545, w: 115, h: 48, hp: 75, maxHp: 75, movable: true },
    { x: 915, y: 127, w: 115, h: 48, hp: 75, maxHp: 75, movable: true }
  ];

  const SPAWNS = {
    alpha: [{ x: 145, y: 275 }, { x: 155, y: 445 }],
    omega: [{ x: 1135, y: 275 }, { x: 1125, y: 445 }]
  };

  const dom = {
    menu: document.getElementById('menuScreen'),
    game: document.getElementById('gameScreen'),
    results: document.getElementById('resultsScreen'),
    roster: document.getElementById('roster'),
    slots: document.getElementById('squadSlots'),
    pickCount: document.getElementById('pickCount'),
    start: document.getElementById('startButton'),
    modeDescription: document.getElementById('modeDescription'),
    canvas: document.getElementById('gameCanvas'),
    alphaScore: document.getElementById('alphaScore'),
    omegaScore: document.getElementById('omegaScore'),
    timer: document.getElementById('matchTimer'),
    alphaPortraits: document.getElementById('alphaPortraits'),
    omegaPortraits: document.getElementById('omegaPortraits'),
    countdown: document.getElementById('countdown'),
    killFeed: document.getElementById('killFeed'),
    playerBars: document.getElementById('playerBars'),
    controls: document.getElementById('controlsHint'),
    pauseOverlay: document.getElementById('pauseOverlay'),
    resultTitle: document.getElementById('resultTitle'),
    resultSubtitle: document.getElementById('resultSubtitle'),
    resultEyebrow: document.getElementById('resultEyebrow'),
    finalAlpha: document.getElementById('finalAlpha'),
    finalOmega: document.getElementById('finalOmega'),
    matchStats: document.getElementById('matchStats'),
    sound: document.getElementById('soundButton')
  };

  const ctx = dom.canvas.getContext('2d');
  const keys = new Set();
  const justPressed = new Set();
  let selected = [];
  let mode = 'solo';
  let soundOn = true;
  let audioContext = null;
  let game = null;
  let raf = 0;
  let lastTime = 0;

  function buildRoster() {
    dom.roster.innerHTML = '';
    Object.values(CHARACTERS).forEach(character => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'fighter-card';
      card.style.setProperty('--fighter', character.color);
      card.dataset.id = character.id;
      card.setAttribute('aria-label', `Select ${character.name}, ${character.role}: ${character.abilityDesc}`);
      card.innerHTML = `
        <span class="fighter-role">${character.role}</span>
        <strong class="fighter-name">${character.name}</strong>
        <span class="fighter-ability"><b>${character.ability}</b><small>${character.abilityDesc}</small>${character.passive ? `<em>${character.passive}</em>` : ''}</span>
        <canvas class="fighter-sprite-preview" width="90" height="96" data-sprite="${character.id}" aria-hidden="true"></canvas>
        <span class="stat-line">${Array.from({ length: 5 }, (_, i) => `<i class="${i < character.stat ? 'on' : ''}"></i>`).join('')}</span>`;
      card.addEventListener('click', () => togglePick(character.id));
      dom.roster.appendChild(card);
      paintRosterSprite(card.querySelector('.fighter-sprite-preview'), character);
    });
  }

  function togglePick(id) {
    const index = selected.indexOf(id);
    if (index !== -1) selected.splice(index, 1);
    else if (selected.length < 2) selected.push(id);
    else {
      selected.shift();
      selected.push(id);
    }
    renderSelection();
    playTone(390, .05, 'sine', .025);
  }

  function renderSelection() {
    document.querySelectorAll('.fighter-card').forEach(card => {
      const order = selected.indexOf(card.dataset.id);
      card.classList.toggle('selected', order !== -1);
      card.dataset.order = order === -1 ? '' : String(order + 1);
    });
    dom.pickCount.textContent = `${selected.length} / 2`;
    dom.start.disabled = selected.length !== 2;
    dom.slots.innerHTML = [0, 1].map(index => {
      const fighter = selected[index] ? CHARACTERS[selected[index]] : null;
      const label = mode === 'local' ? (index === 0 ? 'PLAYER 1' : 'PLAYER 2') : (index === 0 ? 'PLAYER 1' : 'AI ALLY');
      if (!fighter) return `<button class="squad-slot empty" type="button"><span>${index + 1}</span><b>${label}: SELECT</b></button>`;
      return `<button class="squad-slot filled" type="button" data-remove="${index}" style="--slot-color:${fighter.color}"><span>${fighter.glyph}</span><b>${label}: ${fighter.name}</b></button>`;
    }).join('');
    dom.slots.querySelectorAll('[data-remove]').forEach(button => {
      button.addEventListener('click', () => {
        selected.splice(Number(button.dataset.remove), 1);
        renderSelection();
      });
    });
    dom.modeDescription.textContent = mode === 'local' ? 'Player 1 vs Player 2' : 'Player 1 + AI teammate';
  }

  function createActor(characterId, team, slot, human = null) {
    const data = CHARACTERS[characterId];
    const spawn = SPAWNS[team][slot];
    return {
      data, team, slot, human,
      x: spawn.x, y: spawn.y, vx: 0, vy: 0, radius: ['drakon', 'seraph'].includes(data.id) ? 23 : 20,
      hp: data.hp, maxHp: data.hp, shield: 0, energy: 0,
      attackCd: 0, abilityCd: 0, invulnerable: 0, resistance: 0,
      haste: 0, respawn: 0, dead: false,
      slideTime: 0, slideVx: 0, slideVy: 0, killBonus: 0,
      facingX: team === 'alpha' ? 1 : -1, facingY: 0,
      aiThink: Math.random() * .2, strafe: Math.random() > .5 ? 1 : -1,
      kills: 0, deaths: 0, damage: 0, healing: 0,
      flash: 0, statusText: '', lastHitBy: null
    };
  }

  function chooseOpponents(excluded) {
    const pool = Object.keys(CHARACTERS).filter(id => !excluded.includes(id));
    shuffle(pool);
    while (pool.length < 2) pool.push(...Object.keys(CHARACTERS));
    return pool.slice(0, 2);
  }

  function startMatch() {
    if (selected.length !== 2) return;
    const excluded = [...selected];
    let alpha;
    let omega;
    if (mode === 'local') {
      const extras = chooseOpponents(excluded);
      alpha = [createActor(selected[0], 'alpha', 0, 0), createActor(extras[0], 'alpha', 1)];
      omega = [createActor(selected[1], 'omega', 0, 1), createActor(extras[1], 'omega', 1)];
    } else {
      const opponents = chooseOpponents(excluded);
      alpha = [createActor(selected[0], 'alpha', 0, 0), createActor(selected[1], 'alpha', 1)];
      omega = opponents.map((id, index) => createActor(id, 'omega', index));
    }

    game = {
      actors: [...alpha, ...omega], projectiles: [], effects: [], particles: [], texts: [],
      decoys: [], gunSounds: [], obstacles: BASE_OBSTACLES.map(obstacle => ({ ...obstacle })),
      score: { alpha: 0, omega: 0 }, time: 180, state: 'countdown', countdown: 3.4,
      paused: false, ended: false, shake: 0, flash: 0
    };
    dom.menu.classList.add('hidden');
    dom.results.classList.add('hidden');
    dom.game.classList.remove('hidden');
    dom.killFeed.innerHTML = '';
    updatePortraits();
    updateScoreHud();
    updateControls();
    buildPlayerBars();
    lastTime = performance.now();
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(loop);
    playTone(180, .16, 'sawtooth', .03);
  }

  function loop(now) {
    const dt = Math.min((now - lastTime) / 1000, .035);
    lastTime = now;
    if (game && !game.paused && !game.ended) update(dt);
    if (game) render();
    justPressed.clear();
    if (game && !game.ended) raf = requestAnimationFrame(loop);
  }

  function update(dt) {
    if (game.state === 'countdown') {
      game.countdown -= dt;
      const count = Math.ceil(game.countdown);
      dom.countdown.textContent = count > 0 ? count : 'FIGHT';
      if (game.countdown <= -.55) {
        game.state = 'playing';
        dom.countdown.textContent = '';
        playTone(520, .18, 'square', .04);
      }
      updateParticles(dt);
      return;
    }

    game.time = Math.max(0, game.time - dt);
    updateTimer();
    for (const actor of game.actors) updateActor(actor, dt);
    updateDecoys(dt);
    updateGunSounds(dt);
    updateProjectiles(dt);
    updateEffects(dt);
    updateParticles(dt);
    updateTexts(dt);
    game.shake = Math.max(0, game.shake - dt * 16);
    game.flash = Math.max(0, game.flash - dt * 2.5);
    updateStatusBars();

    if (game.score.alpha >= 8 || game.score.omega >= 8 || game.time <= 0) finishMatch();
  }

  function updateActor(actor, dt) {
    if (actor.dead) {
      actor.respawn -= dt;
      if (actor.respawn <= 0) respawnActor(actor);
      return;
    }

    actor.attackCd = Math.max(0, actor.attackCd - dt);
    actor.abilityCd = Math.max(0, actor.abilityCd - dt);
    actor.invulnerable = Math.max(0, actor.invulnerable - dt);
    actor.resistance = Math.max(0, actor.resistance - dt);
    actor.haste = Math.max(0, actor.haste - dt);
    actor.flash = Math.max(0, actor.flash - dt);

    if (actor.slideTime > 0) {
      actor.slideTime = Math.max(0, actor.slideTime - dt);
      moveActor(actor, actor.slideVx * dt, actor.slideVy * dt);
      actor.slideVx *= Math.pow(.42, dt);
      actor.slideVy *= Math.pow(.42, dt);
    }

    if (actor.human !== null) updateHuman(actor, dt);
    else updateAI(actor, dt);
  }

  function updateHuman(actor, dt) {
    const controls = actor.human === 0
      ? { up: 'KeyW', down: 'KeyS', left: 'KeyA', right: 'KeyD', attack: 'KeyF', ability: 'KeyG', ult: 'KeyR' }
      : { up: 'ArrowUp', down: 'ArrowDown', left: 'ArrowLeft', right: 'ArrowRight', attack: 'KeyK', ability: 'KeyL', ult: 'KeyO' };
    let dx = (keys.has(controls.right) ? 1 : 0) - (keys.has(controls.left) ? 1 : 0);
    let dy = (keys.has(controls.down) ? 1 : 0) - (keys.has(controls.up) ? 1 : 0);
    const length = Math.hypot(dx, dy) || 1;
    dx /= length; dy /= length;
    if (dx || dy) { actor.facingX = dx; actor.facingY = dy; }
    const speed = actor.data.speed * (actor.haste > 0 ? 1.48 : 1);
    moveActor(actor, dx * speed * dt, dy * speed * dt);
    if (keys.has(controls.attack)) basicAttack(actor);
    if (justPressed.has(controls.ability)) useAbility(actor);
    if (justPressed.has(controls.ult)) useUltimate(actor);
  }

  function updateAI(actor, dt) {
    const target = nearestEnemy(actor);
    if (!target) return;
    const dx = target.x - actor.x;
    const dy = target.y - actor.y;
    const distance = Math.hypot(dx, dy) || 1;
    const nx = dx / distance;
    const ny = dy / distance;
    actor.facingX = nx; actor.facingY = ny;
    actor.aiThink -= dt;
    if (actor.aiThink <= 0) {
      actor.aiThink = .16 + Math.random() * .18;
      if (Math.random() < .14) actor.strafe *= -1;
      if (actor.abilityCd <= 0 && (distance < 290 || actor.hp < actor.maxHp * .48)) useAbility(actor);
      if (actor.energy >= 100 && (distance < 430 || actor.hp < actor.maxHp * .42)) useUltimate(actor);
    }
    const ideal = ['tidal', 'drakon'].includes(actor.data.id) ? 235 : ['mirage', 'glacier'].includes(actor.data.id) ? 370 : 300;
    let moveX = 0;
    let moveY = 0;
    if (distance > ideal + 40) { moveX += nx; moveY += ny; }
    if (distance < ideal - 65) { moveX -= nx; moveY -= ny; }
    moveX += -ny * actor.strafe * .34;
    moveY += nx * actor.strafe * .34;
    const len = Math.hypot(moveX, moveY) || 1;
    const speed = actor.data.speed * (actor.haste > 0 ? 1.48 : 1) * .88;
    moveActor(actor, moveX / len * speed * dt, moveY / len * speed * dt);
    if (distance <= actor.data.range * 1.05) basicAttack(actor, target);
  }

  function basicAttack(actor, forcedTarget = null) {
    if (actor.dead || actor.attackCd > 0) return;
    const target = forcedTarget && !forcedTarget.dead ? forcedTarget : nearestEnemy(actor, actor.data.range);
    if (!target) return;
    const distance = dist(actor, target);
    if (distance > actor.data.range) return;
    let dx = (target.x - actor.x) / (distance || 1);
    let dy = (target.y - actor.y) / (distance || 1);
    actor.facingX = dx; actor.facingY = dy;
    const hasteMultiplier = actor.haste > 0 ? .55 : 1;
    actor.attackCd = actor.data.fireRate * hasteMultiplier;
    const damage = actor.data.damage;
    const pierce = false;

    const spread = [0];
    spread.forEach(angle => {
      const cos = Math.cos(angle), sin = Math.sin(angle);
      const px = dx * cos - dy * sin;
      const py = dx * sin + dy * cos;
      game.projectiles.push({
        x: actor.x + px * (actor.radius + 6), y: actor.y + py * (actor.radius + 6),
        vx: px * actor.data.projectileSpeed, vy: py * actor.data.projectileSpeed,
        radius: 4,
        damage: spread.length > 1 ? damage * .48 : damage,
        owner: actor, team: actor.team, color: actor.data.color,
        life: actor.data.range / actor.data.projectileSpeed + .1, pierce, hit: new Set()
      });
    });
    game.gunSounds.push({ x: actor.x, y: actor.y, team: actor.team, owner: actor, life: 3, maxLife: 3 });
    if (game.gunSounds.length > 18) game.gunSounds.shift();
    emit(actor.x + dx * actor.radius, actor.y + dy * actor.radius, actor.data.color, 3, 75);
    playTone(240 + Math.random() * 70, .035, 'square', .012);
  }

  function useAbility(actor) {
    if (actor.dead || actor.abilityCd > 0) return;
    const target = nearestRealEnemy(actor);
    const id = actor.data.id;
    actor.abilityCd = actor.data.abilityCd;

    if (id === 'gale') {
      const dx = target ? target.x - actor.x : actor.facingX;
      const dy = target ? target.y - actor.y : actor.facingY;
      const length = Math.hypot(dx, dy) || 1;
      const nx = dx / length, ny = dy / length;
      game.effects.push({ type: 'gust', x: actor.x, y: actor.y, angle: Math.atan2(ny, nx), radius: 265, color: actor.data.color, life: .55, maxLife: .55 });
      enemiesOf(actor).forEach(enemy => {
        const distance = dist(actor, enemy);
        const dot = ((enemy.x - actor.x) * nx + (enemy.y - actor.y) * ny) / (distance || 1);
        if (!enemy.dead && distance < 265 && dot > .25) {
          dealDamage(enemy, 12, actor);
          knockback(enemy, nx, ny, 235);
        }
      });
      game.projectiles.forEach(projectile => {
        if (projectile.team === actor.team || Math.hypot(projectile.x - actor.x, projectile.y - actor.y) > 245) return;
        const speed = Math.hypot(projectile.vx, projectile.vy);
        projectile.vx = nx * speed;
        projectile.vy = ny * speed;
        projectile.team = actor.team; projectile.owner = actor; projectile.color = actor.data.color;
      });
      game.obstacles.filter(obstacle => obstacle.movable && rectDistance(actor.x, actor.y, obstacle) < 285)
        .forEach(obstacle => pushObstacle(obstacle, nx * 105, ny * 105));
    } else if (id === 'tidal') {
      const dx = target ? target.x - actor.x : actor.facingX;
      const dy = target ? target.y - actor.y : actor.facingY;
      const length = Math.hypot(dx, dy) || 1;
      const nx = dx / length, ny = dy / length;
      const endX = actor.x + nx * 330, endY = actor.y + ny * 330;
      game.effects.push({ type: 'wave', x1: actor.x, y1: actor.y, x2: endX, y2: endY, color: actor.data.color, life: .7, maxLife: .7 });
      enemiesOf(actor).forEach(enemy => {
        if (!enemy.dead && pointSegmentDistance(enemy.x, enemy.y, actor.x, actor.y, endX, endY) < 78) {
          dealDamage(enemy, 25, actor);
          knockback(enemy, nx, ny, 310);
        }
      });
    } else if (id === 'pyre') {
      game.effects.push({ type: 'burst', x: actor.x, y: actor.y, radius: 175, color: actor.data.color, life: .65, maxLife: .65 });
      enemiesOf(actor).forEach(enemy => { if (!enemy.dead && dist(actor, enemy) < 175) dealDamage(enemy, 31, actor); });
      [...game.obstacles].forEach(obstacle => { if (rectDistance(actor.x, actor.y, obstacle) < 175) damageObstacle(obstacle, 34, actor.data.color); });
    } else if (id === 'volt') {
      if (!target || dist(actor, target) > 470) { actor.abilityCd = 0; return; }
      dealDamage(target, 32, actor);
      game.effects.push({ type: 'lightning', points: [[actor.x, actor.y], [target.x, target.y]], color: actor.data.color, life: .25, maxLife: .25 });
      const second = enemiesOf(actor).filter(enemy => enemy !== target && !enemy.dead).sort((a, b) => dist(target, a) - dist(target, b))[0];
      if (second && dist(target, second) < 320) {
        dealDamage(second, 17, actor);
        game.effects[game.effects.length - 1].points.push([second.x, second.y]);
      }
    } else if (id === 'seraph') {
      alliesOf(actor).forEach(ally => {
        if (ally.dead) return;
        heal(ally, ally === actor ? 52 : 39, actor);
        ally.shield = Math.min(ally.shield + 12, 45);
        emit(ally.x, ally.y, actor.data.color, 10, 105);
      });
      game.effects.push({ type: 'wings', actor, color: actor.data.color, life: 1.4, maxLife: 1.4 });
    } else if (id === 'reverb') {
      const sound = [...game.gunSounds].filter(item => item.owner !== actor).sort((a, b) => dist(actor, a) - dist(actor, b))[0];
      if (!sound) { actor.abilityCd = 0; floatText(actor.x, actor.y - 38, 'NO GUN SOUND', actor.data.color); return; }
      const startX = actor.x, startY = actor.y;
      placeActorNear(actor, sound.x, sound.y);
      actor.invulnerable = .45;
      game.effects.push({ type: 'soundjump', x1: startX, y1: startY, x2: actor.x, y2: actor.y, color: actor.data.color, life: .45, maxLife: .45 });
      enemiesOf(actor).forEach(enemy => { if (!enemy.dead && dist(actor, enemy) < 92) dealDamage(enemy, 18, actor); });
    } else if (id === 'mirage') {
      spawnDecoys(actor, 2, 'decoy', 7);
    } else if (id === 'hemlock') {
      actor.hp = Math.max(1, actor.hp - 16);
      actor.haste = 5.5;
      actor.shield = Math.min(35, actor.shield + 10);
      game.effects.push({ type: 'bloodaura', actor, color: actor.data.color, life: 5.5, maxLife: 5.5 });
      floatText(actor.x, actor.y - 38, 'BLOOD RUSH', actor.data.color);
    } else if (id === 'glacier') {
      const point = target || actor;
      game.effects.push({ type: 'ice', x: point.x, y: point.y, radius: 142, team: actor.team, owner: actor, color: actor.data.color, life: 5.2, maxLife: 5.2, tick: 0 });
    } else if (id === 'drakon') {
      fireDragon(actor, target, 0);
    } else if (id === 'havoc') {
      spawnDecoys(actor, 2, 'phantom', 6.5);
      enemiesOf(actor).forEach(enemy => { if (!enemy.dead) floatText(enemy.x, enemy.y - 38, 'TRIPLE VISION', actor.data.color); });
    }
    actor.energy = Math.min(100, actor.energy + 5);
    game.shake = Math.max(game.shake, 3);
    playTone(420, .12, 'sawtooth', .026);
  }

  function useUltimate(actor) {
    if (actor.dead || actor.energy < 100) return;
    actor.energy = 0;
    const target = nearestRealEnemy(actor);
    const id = actor.data.id;
    if (id === 'gale') {
      const dx = target ? target.x - actor.x : actor.facingX;
      const dy = target ? target.y - actor.y : actor.facingY;
      const length = Math.hypot(dx, dy) || 1;
      game.effects.push({ type: 'tornado', x: actor.x, y: actor.y, vx: dx / length * 235, vy: dy / length * 235, radius: 82, team: actor.team, owner: actor, color: actor.data.color, life: 5, maxLife: 5, tick: 0 });
    } else if (id === 'tidal') {
      const point = target || { x: 640, y: 360 };
      game.effects.push({ type: 'riptide', x: point.x, y: point.y, radius: 175, team: actor.team, owner: actor, color: actor.data.color, life: 5.2, maxLife: 5.2, tick: 0 });
    } else if (id === 'pyre') {
      const point = target || actor;
      game.effects.push({ type: 'inferno', x: point.x, y: point.y, radius: 180, team: actor.team, owner: actor, color: actor.data.color, life: 5.2, maxLife: 5.2, tick: 0 });
    } else if (id === 'volt') {
      const point = target || { x: actor.x + actor.facingX * 180, y: actor.y + actor.facingY * 180 };
      game.effects.push({ type: 'storm', x: point.x, y: point.y, radius: 155, team: actor.team, owner: actor, color: actor.data.color, life: 5.5, maxLife: 5.5, tick: 0 });
    } else if (id === 'seraph') {
      alliesOf(actor).forEach(ally => {
        if (ally.dead) return;
        heal(ally, 999, actor);
        ally.shield = Math.min(ally.shield + 75, 100);
        ally.resistance = 4.5;
        emit(ally.x, ally.y, actor.data.color, 18, 180);
        game.effects.push({ type: 'wings', actor: ally, color: actor.data.color, life: 4.5, maxLife: 4.5 });
      });
    } else if (id === 'reverb') {
      enemiesOf(actor).filter(enemy => !enemy.dead).forEach(enemy => {
        const startX = actor.x, startY = actor.y;
        placeActorNear(actor, enemy.x, enemy.y);
        dealDamage(enemy, 34, actor);
        game.effects.push({ type: 'soundjump', x1: startX, y1: startY, x2: actor.x, y2: actor.y, color: actor.data.color, life: .5, maxLife: .5 });
      });
      actor.invulnerable = 1;
    } else if (id === 'mirage') {
      spawnDecoys(actor, 5, 'decoy', 9);
    } else if (id === 'hemlock') {
      let stolen = 0;
      enemiesOf(actor).forEach(enemy => {
        if (enemy.dead || dist(actor, enemy) > 390) return;
        dealDamage(enemy, 38, actor); stolen += 34;
        game.effects.push({ type: 'bloodline', x1: enemy.x, y1: enemy.y, x2: actor.x, y2: actor.y, color: actor.data.color, life: .7, maxLife: .7 });
      });
      heal(actor, stolen, actor); actor.haste = 5;
    } else if (id === 'glacier') {
      game.effects.push({ type: 'ice', x: actor.x, y: actor.y, radius: 320, team: actor.team, owner: actor, color: actor.data.color, life: 7, maxLife: 7, tick: 0 });
    } else if (id === 'drakon') {
      fireDragon(actor, target, -.16); fireDragon(actor, target, .16);
    } else if (id === 'havoc') {
      spawnDecoys(actor, 6, 'phantom', 9);
      game.effects.push({ type: 'delusion', x: actor.x, y: actor.y, radius: 430, color: actor.data.color, life: 2.5, maxLife: 2.5 });
    }
    game.flash = .45;
    game.shake = 10;
    emit(actor.x, actor.y, actor.data.color, 28, 250);
    playTone(90, .42, 'sawtooth', .055);
    setTimeout(() => playTone(620, .17, 'square', .03), 80);
  }

  function fireDragon(actor, target, angleOffset = 0) {
    const dx = target ? target.x - actor.x : actor.facingX;
    const dy = target ? target.y - actor.y : actor.facingY;
    const length = Math.hypot(dx, dy) || 1;
    const baseX = dx / length, baseY = dy / length;
    const cos = Math.cos(angleOffset), sin = Math.sin(angleOffset);
    const nx = baseX * cos - baseY * sin, ny = baseX * sin + baseY * cos;
    game.projectiles.push({
      x: actor.x + nx * 34, y: actor.y + ny * 34, vx: nx * 525, vy: ny * 525,
      radius: 27, damage: 54, owner: actor, team: actor.team,
      color: actor.data.color, life: 2.45, pierce: true, dragon: true, hit: new Set()
    });
    floatText(actor.x, actor.y - 42, 'DRAGON HUNT', actor.data.color);
  }

  function spawnDecoys(owner, count, type, life) {
    for (let i = 0; i < count; i++) {
      const angle = Math.PI * 2 * i / Math.max(1, count) + Math.random() * .45;
      game.decoys.push({
        owner, team: owner.team, type, life, maxLife: life, radius: 18,
        x: owner.x + Math.cos(angle) * 46, y: owner.y + Math.sin(angle) * 46,
        angle, orbit: 46 + (i % 3) * 18, hp: type === 'phantom' ? 22 : 34,
        maxHp: type === 'phantom' ? 22 : 34, attackCd: Math.random() * .6, dead: false,
        color: owner.data.color, glyph: owner.data.glyph
      });
    }
    floatText(owner.x, owner.y - 42, type === 'phantom' ? 'TRIPLE VISION' : `DECOYS x${count}`, owner.data.color);
  }

  function updateDecoys(dt) {
    for (let i = game.decoys.length - 1; i >= 0; i--) {
      const decoy = game.decoys[i];
      decoy.life -= dt; decoy.attackCd -= dt;
      if (decoy.life <= 0 || decoy.hp <= 0 || decoy.owner.dead) { game.decoys.splice(i, 1); continue; }
      if (decoy.type === 'phantom') {
        decoy.angle += dt * 1.25;
        decoy.x = decoy.owner.x + Math.cos(decoy.angle) * decoy.orbit;
        decoy.y = decoy.owner.y + Math.sin(decoy.angle) * decoy.orbit;
      } else {
        const target = nearestRealEnemy(decoy.owner);
        if (target) {
          const dx = target.x - decoy.x, dy = target.y - decoy.y;
          const length = Math.hypot(dx, dy) || 1;
          decoy.x = clamp(decoy.x + dx / length * 115 * dt, 35, 1245);
          decoy.y = clamp(decoy.y + dy / length * 115 * dt, 35, 685);
          if (decoy.attackCd <= 0 && length < 420) {
            decoy.attackCd = .8 + Math.random() * .5;
            game.effects.push({ type: 'fakeshot', x1: decoy.x, y1: decoy.y, x2: target.x, y2: target.y, color: decoy.color, life: .18, maxLife: .18 });
            game.gunSounds.push({ x: decoy.x, y: decoy.y, team: decoy.team, owner: decoy, life: 2, maxLife: 2 });
          }
        }
      }
    }
  }

  function updateGunSounds(dt) {
    for (let i = game.gunSounds.length - 1; i >= 0; i--) {
      game.gunSounds[i].life -= dt;
      if (game.gunSounds[i].life <= 0) game.gunSounds.splice(i, 1);
    }
  }

  function updateProjectiles(dt) {
    for (let i = game.projectiles.length - 1; i >= 0; i--) {
      const p = game.projectiles[i];
      p.x += p.vx * dt; p.y += p.vy * dt; p.life -= dt;
      let remove = p.life <= 0 || p.x < 20 || p.x > 1260 || p.y < 20 || p.y > 700;
      const obstacle = !remove && game.obstacles.find(rect => circleRect(p.x, p.y, p.radius, rect));
      if (obstacle) {
        damageObstacle(obstacle, p.dragon ? 999 : Math.max(4, p.damage * .28), p.color);
        emit(p.x, p.y, p.color, p.dragon ? 14 : 4, p.dragon ? 190 : 90);
        remove = !p.dragon;
      }
      if (!remove) {
        for (const decoy of game.decoys) {
          if (decoy.team === p.team || p.hit.has(decoy)) continue;
          if (Math.hypot(decoy.x - p.x, decoy.y - p.y) < decoy.radius + p.radius) {
            p.hit.add(decoy); decoy.hp -= p.damage; emit(decoy.x, decoy.y, decoy.color, 8, 135);
            if (decoy.hp <= 0) floatText(decoy.x, decoy.y - 25, 'FAKE', decoy.color);
            remove = !p.pierce;
            if (remove) break;
          }
        }
      }
      if (!remove) {
        for (const actor of game.actors) {
          if (actor.dead || actor.team === p.team || p.hit.has(actor)) continue;
          if (Math.hypot(actor.x - p.x, actor.y - p.y) < actor.radius + p.radius) {
            p.hit.add(actor);
            dealDamage(actor, p.damage, p.owner);
            emit(p.x, p.y, p.color, 7, 120);
            remove = !p.pierce;
            if (remove) break;
          }
        }
      }
      if (remove) game.projectiles.splice(i, 1);
    }
  }

  function updateEffects(dt) {
    for (let i = game.effects.length - 1; i >= 0; i--) {
      const effect = game.effects[i];
      effect.life -= dt;
      if (effect.actor && effect.actor.dead && !['mark'].includes(effect.type)) effect.life = 0;

      if (effect.type === 'tornado') {
        effect.x += effect.vx * dt; effect.y += effect.vy * dt;
        if (effect.x < 45 || effect.x > 1235) effect.vx *= -1;
        if (effect.y < 45 || effect.y > 675) effect.vy *= -1;
        game.obstacles.filter(obstacle => obstacle.movable && rectDistance(effect.x, effect.y, obstacle) < effect.radius)
          .forEach(obstacle => pushObstacle(obstacle, effect.vx * dt * 1.5, effect.vy * dt * 1.5));
      }

      if (['storm', 'riptide', 'inferno', 'ice', 'tornado'].includes(effect.type)) {
        effect.tick -= dt;
        if (effect.tick <= 0) {
          effect.tick = effect.type === 'ice' ? .22 : effect.type === 'storm' ? .46 : .5;
          game.actors.filter(a => a.team !== effect.team && !a.dead && Math.hypot(a.x - effect.x, a.y - effect.y) < effect.radius)
            .forEach(a => {
              const dx = a.x - effect.x, dy = a.y - effect.y;
              const len = Math.hypot(dx, dy) || 1;
              if (effect.type === 'ice') {
                a.slideTime = .85; a.slideVx = dx / len * 275 + (Math.random() - .5) * 120; a.slideVy = dy / len * 275 + (Math.random() - .5) * 120;
              } else {
                const damage = effect.type === 'inferno' ? 15 : effect.type === 'storm' ? 12 : effect.type === 'tornado' ? 11 : 9;
                dealDamage(a, damage, effect.owner);
                if (effect.type === 'riptide') knockback(a, dx / len, dy / len, 230);
                if (effect.type === 'tornado') knockback(a, effect.vx / 235, effect.vy / 235, 150);
              }
            });
          emit(effect.x + (Math.random() - .5) * effect.radius, effect.y + (Math.random() - .5) * effect.radius, effect.color, 3, 80);
        }
      }
      if (effect.life <= 0) game.effects.splice(i, 1);
    }
  }

  function dealDamage(target, amount, source) {
    if (target.dead || target.invulnerable > 0) return;
    let actual = amount;
    if (source.data.id === 'hemlock') actual *= 1 + source.killBonus;
    if (target.resistance > 0) actual *= .68;
    let absorbed = 0;
    if (target.shield > 0) {
      absorbed = Math.min(target.shield, actual);
      target.shield -= absorbed;
      actual -= absorbed;
    }
    if (actual > 0) target.hp = Math.max(0, target.hp - actual);
    const total = actual + absorbed;
    target.flash = .12;
    target.lastHitBy = source;
    source.damage += total;
    source.energy = Math.min(100, source.energy + total * .58);
    target.energy = Math.min(100, target.energy + total * .18);
    floatText(target.x + (Math.random() - .5) * 18, target.y - 28, Math.round(total), target.shield > 0 ? '#b6eaff' : '#ffffff');
    game.shake = Math.max(game.shake, Math.min(7, total * .12));
    if (target.hp <= 0) eliminate(target, source);
  }

  function heal(target, amount, source) {
    const previous = target.hp;
    target.hp = Math.min(target.maxHp, target.hp + amount);
    const actual = target.hp - previous;
    if (actual > 0) {
      source.healing += actual;
      floatText(target.x, target.y - 30, `+${Math.round(actual)}`, '#62f0a5');
    }
  }

  function eliminate(target, source) {
    target.dead = true;
    target.respawn = 3.2;
    target.deaths += 1;
    source.kills += 1;
    game.score[source.team] += 1;
    if (source.data.id === 'hemlock') {
      source.killBonus = Math.min(.84, source.killBonus + .12);
      floatText(source.x, source.y - 46, `BLOOD DAMAGE +${Math.round(source.killBonus * 100)}%`, source.data.color);
      source.hp = Math.min(source.maxHp, source.hp + 18);
    }
    emit(target.x, target.y, target.data.color, 30, 290);
    floatText(target.x, target.y - 50, 'ELIMINATED', '#ff718d');
    addKillFeed(source, target);
    updateScoreHud();
    game.shake = 13;
    playTone(105, .25, 'sawtooth', .045);
  }

  function respawnActor(actor) {
    const spawn = SPAWNS[actor.team][actor.slot];
    actor.x = spawn.x; actor.y = spawn.y;
    actor.hp = actor.maxHp; actor.shield = 20; actor.dead = false;
    actor.slideTime = 0; actor.slideVx = 0; actor.slideVy = 0;
    actor.invulnerable = 1.6; actor.energy = Math.min(100, actor.energy + 18);
    emit(actor.x, actor.y, actor.data.color, 20, 180);
    floatText(actor.x, actor.y - 35, 'RESPAWN', actor.data.color);
  }

  function moveActor(actor, dx, dy, force = false) {
    if (!Number.isFinite(dx) || !Number.isFinite(dy)) return;
    const tryX = clamp(actor.x + dx, actor.radius + 25, 1280 - actor.radius - 25);
    if (force || !game.obstacles.some(rect => circleRect(tryX, actor.y, actor.radius, rect))) actor.x = tryX;
    const tryY = clamp(actor.y + dy, actor.radius + 25, 720 - actor.radius - 25);
    if (force || !game.obstacles.some(rect => circleRect(actor.x, tryY, actor.radius, rect))) actor.y = tryY;
    if (force) {
      actor.x = clamp(actor.x, actor.radius + 25, 1280 - actor.radius - 25);
      actor.y = clamp(actor.y, actor.radius + 25, 720 - actor.radius - 25);
      for (const rect of game.obstacles) {
        if (circleRect(actor.x, actor.y, actor.radius, rect)) {
          actor.x -= dx * .35; actor.y -= dy * .35;
        }
      }
    }
  }

  function finishMatch() {
    if (game.ended) return;
    game.ended = true;
    cancelAnimationFrame(raf);
    let winner = 'draw';
    if (game.score.alpha > game.score.omega) winner = 'alpha';
    if (game.score.omega > game.score.alpha) winner = 'omega';
    const humanTeam = 'alpha';
    const victory = winner === humanTeam;
    dom.game.classList.add('hidden');
    dom.results.classList.remove('hidden');
    dom.resultTitle.textContent = winner === 'draw' ? 'TACTICAL DRAW' : `${winner.toUpperCase()} VICTORY`;
    dom.resultTitle.style.color = winner === 'omega' ? '#ff718d' : winner === 'alpha' ? '#55e7ff' : '#f5f7fb';
    dom.resultEyebrow.textContent = winner === 'draw' ? 'EVENLY MATCHED' : victory ? 'MISSION COMPLETE' : 'MATCH COMPLETE';
    dom.resultSubtitle.textContent = winner === 'draw' ? 'Neither squad could claim the arena.' : victory ? 'The arena belongs to your squad.' : 'Omega controlled the final engagement.';
    dom.finalAlpha.textContent = game.score.alpha;
    dom.finalOmega.textContent = game.score.omega;
    const humans = game.actors.filter(a => a.human !== null);
    const primary = humans.find(a => a.human === 0) || humans[0];
    dom.matchStats.innerHTML = `
      <div class="stat-box"><strong>${primary.kills}</strong><small>ELIMINATIONS</small></div>
      <div class="stat-box"><strong>${Math.round(primary.damage)}</strong><small>DAMAGE</small></div>
      <div class="stat-box"><strong>${primary.deaths}</strong><small>DEATHS</small></div>`;
    playTone(victory ? 520 : 160, .5, victory ? 'sine' : 'sawtooth', .05);
  }

  function render() {
    const shakeX = game.shake ? (Math.random() - .5) * game.shake : 0;
    const shakeY = game.shake ? (Math.random() - .5) * game.shake : 0;
    ctx.save();
    ctx.translate(shakeX, shakeY);
    renderArena();
    renderGunSounds();
    renderEffects(false);
    renderProjectiles();
    renderDecoys();
    renderActors();
    renderEffects(true);
    renderParticles();
    renderTexts();
    ctx.restore();
    if (game.flash > 0) {
      ctx.fillStyle = `rgba(255,255,255,${game.flash * .16})`;
      ctx.fillRect(0, 0, 1280, 720);
    }
  }

  function renderArena() {
    const gradient = ctx.createRadialGradient(640, 360, 80, 640, 360, 760);
    gradient.addColorStop(0, '#101c2b'); gradient.addColorStop(1, '#060b13');
    ctx.fillStyle = gradient; ctx.fillRect(0, 0, 1280, 720);

    ctx.strokeStyle = 'rgba(120,170,210,.055)'; ctx.lineWidth = 1;
    for (let x = 0; x <= 1280; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 720); ctx.stroke(); }
    for (let y = 0; y <= 720; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(1280, y); ctx.stroke(); }

    ctx.strokeStyle = 'rgba(85,231,255,.13)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(640, 360, 112, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(640, 0); ctx.lineTo(640, 720); ctx.stroke();
    ctx.fillStyle = 'rgba(85,231,255,.025)'; ctx.fillRect(0, 0, 185, 720);
    ctx.fillStyle = 'rgba(255,65,100,.025)'; ctx.fillRect(1095, 0, 185, 720);

    game.obstacles.forEach(rect => {
      ctx.shadowColor = '#000'; ctx.shadowBlur = 18;
      ctx.fillStyle = '#111b28'; ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
      ctx.shadowBlur = 0;
      ctx.strokeStyle = 'rgba(157,196,222,.16)'; ctx.strokeRect(rect.x + .5, rect.y + .5, rect.w - 1, rect.h - 1);
      ctx.fillStyle = 'rgba(85,231,255,.07)'; ctx.fillRect(rect.x + 7, rect.y + 7, rect.w - 14, 2);
      ctx.fillStyle = 'rgba(255,255,255,.035)';
      for (let x = rect.x + 14; x < rect.x + rect.w; x += 22) ctx.fillRect(x, rect.y + 16, 7, rect.h - 28);
      ctx.fillStyle = rect.movable ? 'rgba(140,245,229,.4)' : 'rgba(255,255,255,.16)';
      ctx.fillRect(rect.x, rect.y + rect.h - 3, rect.w * (rect.hp / rect.maxHp), 3);
    });

    ctx.strokeStyle = 'rgba(255,255,255,.12)'; ctx.lineWidth = 2; ctx.strokeRect(20, 20, 1240, 680);
    ctx.fillStyle = 'rgba(85,231,255,.48)'; ctx.font = '900 11px system-ui'; ctx.fillText('ALPHA // SPAWN', 40, 52);
    ctx.fillStyle = 'rgba(255,113,141,.48)'; ctx.textAlign = 'right'; ctx.fillText('OMEGA // SPAWN', 1240, 52); ctx.textAlign = 'left';
  }

  function paintRosterSprite(canvas, character) {
    if (!canvas) return;
    const preview = canvas.getContext('2d');
    preview.clearRect(0, 0, canvas.width, canvas.height);
    drawCharacterSprite(preview, character, {
      x: canvas.width / 2, y: 64, scale: 1.45, facing: 1,
      team: 'alpha', time: Object.keys(CHARACTERS).indexOf(character.id) * .37,
      alpha: 1, showRing: false
    });
  }

  function drawCharacterSprite(context, character, options = {}) {
    const x = options.x || 0;
    const y = options.y || 0;
    const scale = options.scale || 1;
    const facing = options.facing < 0 ? -1 : 1;
    const time = options.time || 0;
    const alpha = options.alpha ?? 1;
    const teamColor = options.team === 'omega' ? '#ff5575' : '#55e7ff';
    const primary = character.color;
    const dark = tintColor(primary, -.58);
    const mid = tintColor(primary, -.24);
    const light = tintColor(primary, .48);
    const skinTones = {
      gale: '#9a654a', tidal: '#5b382c', pyre: '#c98962', volt: '#71442f',
      seraph: '#e0b58d', reverb: '#8b573e', mirage: '#472d32', hemlock: '#bb776b',
      glacier: '#e8c09f', drakon: '#6e8f63', havoc: '#b991b2'
    };
    const skin = skinTones[character.id] || '#a87558';
    const bob = Math.sin(time * 6.5) * 1.2;
    const step = Math.sin(time * 9) * 3.1;

    context.save();
    context.globalAlpha *= alpha;
    context.translate(x, y + bob);
    context.scale(scale, scale);

    context.fillStyle = 'rgba(0,0,0,.35)';
    context.beginPath(); context.ellipse(0, 23, 15, 4.5, 0, 0, Math.PI * 2); context.fill();
    if (options.showRing !== false) {
      context.strokeStyle = teamColor; context.lineWidth = 1.7; context.globalAlpha *= .75;
      context.beginPath(); context.ellipse(0, 22, 19, 7, 0, 0, Math.PI * 2); context.stroke();
      context.globalAlpha /= .75;
    }

    context.scale(facing, 1);
    context.lineCap = 'round'; context.lineJoin = 'round';

    drawSpriteBack(context, character.id, { primary, dark, mid, light, time });

    context.strokeStyle = '#080c13'; context.lineWidth = 7;
    context.beginPath(); context.moveTo(-5, 8); context.lineTo(-6 - step * .45, 21); context.stroke();
    context.beginPath(); context.moveTo(5, 8); context.lineTo(6 + step * .45, 21); context.stroke();
    context.strokeStyle = mid; context.lineWidth = 4;
    context.beginPath(); context.moveTo(-5, 9); context.lineTo(-6 - step * .45, 19); context.stroke();
    context.beginPath(); context.moveTo(5, 9); context.lineTo(6 + step * .45, 19); context.stroke();
    context.strokeStyle = '#03060b'; context.lineWidth = 4.5;
    context.beginPath(); context.moveTo(-8 - step * .45, 21); context.lineTo(-3 - step * .45, 21); context.stroke();
    context.beginPath(); context.moveTo(4 + step * .45, 21); context.lineTo(9 + step * .45, 21); context.stroke();

    context.fillStyle = dark; context.strokeStyle = primary; context.lineWidth = 1.5;
    context.beginPath();
    context.moveTo(-10, -7); context.lineTo(-12, 7); context.lineTo(-6, 12); context.lineTo(7, 12); context.lineTo(12, 5); context.lineTo(9, -8); context.closePath();
    context.fill(); context.stroke();
    context.fillStyle = mid; context.fillRect(-8, 0, 16, 7);
    context.fillStyle = light; context.fillRect(-7, 8, 13, 2);

    context.strokeStyle = skin; context.lineWidth = 5.5;
    context.beginPath(); context.moveTo(-8, -4); context.lineTo(-13, 6 + step * .18); context.stroke();
    context.beginPath(); context.moveTo(8, -4); context.lineTo(14, 2 - step * .18); context.stroke();

    context.fillStyle = '#10151e'; context.strokeStyle = primary; context.lineWidth = 1.2;
    context.beginPath(); context.moveTo(10, -1); context.lineTo(23, -1); context.lineTo(25, 4); context.lineTo(16, 5); context.lineTo(14, 9); context.lineTo(11, 8); context.closePath(); context.fill(); context.stroke();
    context.fillStyle = light; context.fillRect(20, 0, 5, 2);

    context.fillStyle = skin; context.strokeStyle = dark; context.lineWidth = 1.4;
    context.beginPath(); context.arc(0, -15, 8.4, 0, Math.PI * 2); context.fill(); context.stroke();
    context.fillStyle = '#061018'; context.fillRect(2, -16, 2.5, 1.6);

    context.fillStyle = dark;
    context.beginPath(); context.arc(-1, -18, 8.6, Math.PI, Math.PI * 2); context.lineTo(7, -14); context.lineTo(4, -21); context.lineTo(-7, -21); context.closePath(); context.fill();

    if (options.flash) {
      context.globalCompositeOperation = 'source-atop'; context.fillStyle = 'rgba(255,255,255,.8)'; context.fillRect(-32, -36, 65, 65); context.globalCompositeOperation = 'source-over';
    }

    drawSpriteFront(context, character.id, { primary, dark, mid, light, skin, time });
    context.restore();
  }

  function drawSpriteBack(context, id, colors) {
    const { primary, dark, mid, light, time } = colors;
    if (id === 'gale') {
      context.strokeStyle = primary; context.lineWidth = 4;
      context.beginPath(); context.moveTo(-7, -9); context.bezierCurveTo(-24, -10, -28, -2 + Math.sin(time * 5) * 4, -39, -7); context.stroke();
      context.strokeStyle = hexToRgba(light, .55); context.lineWidth = 1.5;
      context.beginPath(); context.arc(0, 0, 27, .45, 2.5); context.stroke();
    } else if (id === 'tidal') {
      context.fillStyle = hexToRgba(primary, .42);
      context.beginPath(); context.moveTo(-9, -5); context.quadraticCurveTo(-22, 6, -11, 18); context.quadraticCurveTo(-5, 8, -4, -3); context.fill();
    } else if (id === 'pyre') {
      context.fillStyle = hexToRgba('#ff3d1f', .38);
      context.beginPath(); context.arc(0, 2, 19 + Math.sin(time * 8) * 2, 0, Math.PI * 2); context.fill();
    } else if (id === 'seraph') {
      context.fillStyle = hexToRgba(light, .72); context.strokeStyle = primary; context.lineWidth = 1.2;
      context.beginPath(); context.moveTo(-7,-8); context.quadraticCurveTo(-27,-26,-33,-3); context.quadraticCurveTo(-26,15,-7,8); context.quadraticCurveTo(-20,3,-22,-9); context.closePath(); context.fill(); context.stroke();
      context.beginPath(); context.moveTo(7,-8); context.quadraticCurveTo(27,-26,33,-3); context.quadraticCurveTo(26,15,7,8); context.quadraticCurveTo(20,3,22,-9); context.closePath(); context.fill(); context.stroke();
    } else if (id === 'mirage') {
      context.fillStyle = hexToRgba(primary, .22);
      context.beginPath(); context.moveTo(-13,-12); context.lineTo(-22,18); context.lineTo(6,16); context.lineTo(14,-10); context.closePath(); context.fill();
    } else if (id === 'hemlock') {
      context.strokeStyle = hexToRgba(primary, .75); context.lineWidth = 3;
      context.beginPath(); context.moveTo(-7,4); context.bezierCurveTo(-24,9,-15,26,-28,28); context.stroke();
      context.beginPath(); context.moveTo(6,5); context.bezierCurveTo(19,11,12,25,24,30); context.stroke();
    } else if (id === 'glacier') {
      context.fillStyle = hexToRgba(light, .72);
      for (const [x, y, size] of [[-12,-5,9],[12,-6,10],[-8,7,7],[9,6,8]]) {
        context.beginPath(); context.moveTo(x-size/2,y+size); context.lineTo(x,y-size); context.lineTo(x+size/2,y+size); context.closePath(); context.fill();
      }
    } else if (id === 'drakon') {
      context.fillStyle = hexToRgba(primary, .55); context.strokeStyle = dark; context.lineWidth = 1.2;
      context.beginPath(); context.moveTo(-7,-7); context.lineTo(-29,-20); context.lineTo(-22,8); context.lineTo(-8,6); context.closePath(); context.fill(); context.stroke();
      context.beginPath(); context.moveTo(7,-7); context.lineTo(29,-20); context.lineTo(22,8); context.lineTo(8,6); context.closePath(); context.fill(); context.stroke();
      context.strokeStyle = primary; context.lineWidth = 5; context.beginPath(); context.moveTo(-4,8); context.quadraticCurveTo(-22,19,-30,10 + Math.sin(time*5)*3); context.stroke();
    } else if (id === 'havoc') {
      context.globalAlpha *= .24; context.fillStyle = primary;
      context.fillRect(-24 + Math.sin(time*11)*3,-22,10,28); context.fillRect(14 + Math.cos(time*9)*3,-9,13,25); context.globalAlpha /= .24;
    }
  }

  function drawSpriteFront(context, id, colors) {
    const { primary, dark, light, time } = colors;
    if (id === 'gale') {
      context.strokeStyle = light; context.lineWidth = 1.4;
      for (let r = 12; r <= 22; r += 5) { context.beginPath(); context.arc(18, 2, r, -.55, .7); context.stroke(); }
      context.fillStyle = light; context.beginPath(); context.moveTo(-8,-21);context.lineTo(-3,-30);context.lineTo(0,-21);context.lineTo(5,-28);context.lineTo(7,-18);context.closePath();context.fill();
    } else if (id === 'tidal') {
      context.fillStyle = light; context.beginPath(); context.moveTo(-11,-3);context.quadraticCurveTo(-19,7,-11,11);context.quadraticCurveTo(-3,7,-11,-3);context.fill();
      context.strokeStyle = primary; context.lineWidth = 2; context.beginPath(); context.arc(16, 3, 8 + Math.sin(time*6), 0, Math.PI*1.6); context.stroke();
    } else if (id === 'pyre') {
      context.fillStyle = '#ffde5c'; context.beginPath(); context.moveTo(-7,-20);context.lineTo(-4,-32);context.lineTo(1,-24);context.lineTo(6,-35);context.lineTo(9,-18);context.closePath();context.fill();
      context.fillStyle = '#ff4a22'; context.beginPath();context.arc(-13,6,5+Math.sin(time*8),0,Math.PI*2);context.fill();
    } else if (id === 'volt') {
      context.fillStyle = light; context.beginPath(); context.moveTo(-7,-21);context.lineTo(-2,-31);context.lineTo(1,-23);context.lineTo(8,-29);context.lineTo(6,-17);context.closePath();context.fill();
      context.strokeStyle = '#fffbd1'; context.lineWidth = 2; context.beginPath(); context.moveTo(-3,-2);context.lineTo(3,1);context.lineTo(-1,5);context.lineTo(5,8);context.stroke();
      context.strokeStyle = primary; context.lineWidth = 1.4; context.beginPath(); context.moveTo(24,1);context.lineTo(29,-4);context.lineTo(27,3);context.lineTo(32,1);context.stroke();
    } else if (id === 'seraph') {
      context.strokeStyle = light; context.lineWidth = 2.2; context.beginPath(); context.ellipse(0,-27,10,3.5,0,0,Math.PI*2);context.stroke();
      context.fillStyle = '#fff'; context.fillRect(-2,-1,4,7); context.fillRect(-5,2,10,3);
    } else if (id === 'reverb') {
      context.strokeStyle = primary; context.lineWidth = 3; context.beginPath(); context.arc(0,-15,10,-2.7,-.45);context.stroke();
      context.fillStyle = primary; context.fillRect(-10,-18,3,8); context.fillRect(7,-18,3,8);
      context.strokeStyle = hexToRgba(light,.8); context.lineWidth = 1.2;
      for (let r=5;r<15;r+=5){context.beginPath();context.arc(25,1,r,-.7,.7);context.stroke();}
    } else if (id === 'mirage') {
      context.fillStyle = dark; context.strokeStyle = primary; context.lineWidth = 1.4;
      context.beginPath(); context.arc(0,-15,11,Math.PI,Math.PI*2);context.lineTo(8,-9);context.lineTo(-8,-9);context.closePath();context.fill();context.stroke();
      context.fillStyle = light; context.fillRect(-4,-16,2,1.5); context.fillRect(3,-16,2,1.5);
    } else if (id === 'hemlock') {
      context.strokeStyle = '#ff5575'; context.lineWidth = 1.3; context.beginPath();context.moveTo(-5,-18);context.lineTo(-1,-13);context.lineTo(-4,-9);context.stroke();
      context.fillStyle = primary; context.beginPath(); context.arc(-13,6,4 + Math.sin(time*7),0,Math.PI*2);context.fill();
    } else if (id === 'glacier') {
      context.fillStyle = light; context.beginPath();context.moveTo(-8,-21);context.lineTo(-5,-31);context.lineTo(0,-23);context.lineTo(5,-34);context.lineTo(8,-20);context.closePath();context.fill();
      context.fillStyle = '#e9fbff'; context.fillRect(-6,-1,12,2);
    } else if (id === 'drakon') {
      context.fillStyle = light;
      context.beginPath();context.moveTo(-7,-20);context.lineTo(-12,-29);context.lineTo(-2,-23);context.closePath();context.fill();
      context.beginPath();context.moveTo(6,-20);context.lineTo(12,-29);context.lineTo(2,-23);context.closePath();context.fill();
      context.fillStyle = primary; for(let row=0;row<2;row++){for(let col=0;col<3;col++){context.beginPath();context.arc(-4+col*4,1+row*4,1.2,0,Math.PI*2);context.fill();}}
    } else if (id === 'havoc') {
      context.fillStyle = '#0b0610'; context.fillRect(-8,-17,16,5);
      context.fillStyle = light; context.fillRect(-5,-16,2,1.4); context.fillRect(0,-17,2,1.4); context.fillRect(5,-16,2,1.4);
      context.strokeStyle = primary; context.lineWidth = 1.3;
      for (let i=0;i<3;i++){const yy=-5+i*5;context.beginPath();context.moveTo(-12+(i%2)*4,yy);context.lineTo(10-(i%2)*3,yy+2);context.stroke();}
    }
  }

  function tintColor(hex, amount) {
    const value = parseInt(hex.slice(1), 16);
    const channels = [value >> 16, value >> 8 & 255, value & 255].map(channel => {
      if (amount >= 0) return Math.round(channel + (255 - channel) * amount);
      return Math.round(channel * (1 + amount));
    });
    return `#${channels.map(channel => clamp(channel, 0, 255).toString(16).padStart(2, '0')).join('')}`;
  }

  function renderActors() {
    for (const actor of game.actors) {
      if (actor.dead) {
        ctx.fillStyle = 'rgba(255,255,255,.22)'; ctx.font = '800 11px system-ui'; ctx.textAlign = 'center';
        ctx.fillText(actor.respawn.toFixed(1), SPAWNS[actor.team][actor.slot].x, SPAWNS[actor.team][actor.slot].y); ctx.textAlign = 'left';
        continue;
      }
      const flicker = actor.invulnerable > 0 && Math.floor(actor.invulnerable * 12) % 2 === 0;
      drawCharacterSprite(ctx, actor.data, {
        x: actor.x, y: actor.y + 2, scale: actor.data.id === 'drakon' ? 1.08 : 1,
        facing: actor.facingX, team: actor.team,
        time: performance.now() / 1000 + actor.slot * .43,
        alpha: flicker ? .46 : 1, flash: actor.flash > 0, showRing: true
      });
      if (actor.human !== null) {
        ctx.save(); ctx.fillStyle = '#fff'; ctx.font = '900 8px system-ui'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(`P${actor.human + 1}`, actor.x, actor.y - 38); ctx.restore();
      }

      const barW = 48;
      ctx.fillStyle = 'rgba(0,0,0,.7)'; ctx.fillRect(actor.x - barW / 2, actor.y + 29, barW, 5);
      ctx.fillStyle = actor.team === 'alpha' ? '#55e7ff' : '#ff5575'; ctx.fillRect(actor.x - barW / 2, actor.y + 29, barW * (actor.hp / actor.maxHp), 5);
      if (actor.shield > 0) { ctx.fillStyle = '#d3f7ff'; ctx.fillRect(actor.x - barW / 2, actor.y + 36, barW * Math.min(1, actor.shield / 100), 2); }
    }
  }

  function renderProjectiles() {
    for (const p of game.projectiles) {
      ctx.save(); ctx.translate(p.x, p.y); ctx.shadowColor = p.color; ctx.shadowBlur = p.dragon ? 28 : 14; ctx.fillStyle = p.color;
      if (p.dragon) {
        const angle = Math.atan2(p.vy, p.vx); ctx.rotate(angle);
        ctx.beginPath(); ctx.moveTo(30, 0); ctx.lineTo(5, -19); ctx.lineTo(-25, -10); ctx.lineTo(-12, 0); ctx.lineTo(-25, 10); ctx.lineTo(5, 19); ctx.closePath(); ctx.fill();
        ctx.fillStyle = '#07110b'; ctx.font = '950 18px system-ui'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('D', 2, 1);
      } else {
        ctx.beginPath(); ctx.arc(0, 0, p.radius, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
    }
  }

  function renderDecoys() {
    for (const decoy of game.decoys) {
      drawCharacterSprite(ctx, decoy.owner.data, {
        x: decoy.x, y: decoy.y + 2, scale: .86, facing: decoy.owner.facingX,
        team: decoy.team, time: performance.now() / 1000 + decoy.angle,
        alpha: decoy.type === 'phantom' ? .46 : .66, showRing: true
      });
      ctx.save(); ctx.fillStyle = decoy.color; ctx.font = '800 7px system-ui'; ctx.textAlign = 'center';
      ctx.fillText(decoy.type === 'phantom' ? 'REAL?' : 'DECOY', decoy.x, decoy.y - 31); ctx.restore();
    }
  }

  function renderGunSounds() {
    for (const sound of game.gunSounds) {
      const progress = 1 - sound.life / sound.maxLife;
      ctx.save(); ctx.globalAlpha = Math.max(0, sound.life / sound.maxLife) * .28;
      ctx.strokeStyle = sound.team === 'alpha' ? '#55e7ff' : '#ff718d'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(sound.x, sound.y, 16 + progress * 48, 0, Math.PI * 2); ctx.stroke();
      ctx.restore();
    }
  }

  function renderEffects(overlay) {
    for (const effect of game.effects) {
      const isOverlay = ['lightning', 'soundjump', 'bloodline', 'fakeshot', 'wings', 'bloodaura', 'gust', 'wave', 'burst', 'delusion'].includes(effect.type);
      if (overlay !== isOverlay) continue;
      const alpha = Math.min(1, effect.life * 2);
      ctx.save(); ctx.globalAlpha = alpha;
      if (['storm', 'riptide', 'inferno', 'ice', 'tornado'].includes(effect.type)) {
        const pulse = 1 + Math.sin(performance.now() / 120) * .035;
        ctx.fillStyle = hexToRgba(effect.color, effect.type === 'ice' ? .13 : .1);
        ctx.strokeStyle = effect.color; ctx.lineWidth = effect.type === 'tornado' ? 4 : 2;
        ctx.setLineDash(effect.type === 'ice' ? [12, 7] : []);
        ctx.beginPath(); ctx.arc(effect.x, effect.y, effect.radius * pulse, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.setLineDash([]);
        if (effect.type === 'tornado') {
          ctx.strokeStyle = effect.color; ctx.lineWidth = 3; ctx.shadowColor = effect.color; ctx.shadowBlur = 18;
          for (let ring = 20; ring < effect.radius; ring += 17) { ctx.beginPath(); ctx.arc(effect.x, effect.y, ring, performance.now()/170 + ring, performance.now()/170 + ring + Math.PI * 1.35); ctx.stroke(); }
        } else if (effect.type === 'ice') {
          ctx.strokeStyle = hexToRgba(effect.color, .4); ctx.lineWidth = 1;
          for (let line = -effect.radius; line < effect.radius; line += 34) { ctx.beginPath(); ctx.moveTo(effect.x + line, effect.y - Math.sqrt(Math.max(0, effect.radius ** 2 - line ** 2))); ctx.lineTo(effect.x - line * .35, effect.y + Math.sqrt(Math.max(0, effect.radius ** 2 - line ** 2))); ctx.stroke(); }
        }
      } else if (effect.type === 'wings' && effect.actor && !effect.actor.dead) {
        ctx.strokeStyle = effect.color; ctx.lineWidth = 4; ctx.shadowColor = effect.color; ctx.shadowBlur = 18;
        ctx.beginPath(); ctx.moveTo(effect.actor.x, effect.actor.y); ctx.quadraticCurveTo(effect.actor.x - 50, effect.actor.y - 42, effect.actor.x - 62, effect.actor.y + 10); ctx.quadraticCurveTo(effect.actor.x - 28, effect.actor.y - 2, effect.actor.x, effect.actor.y + 18); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(effect.actor.x, effect.actor.y); ctx.quadraticCurveTo(effect.actor.x + 50, effect.actor.y - 42, effect.actor.x + 62, effect.actor.y + 10); ctx.quadraticCurveTo(effect.actor.x + 28, effect.actor.y - 2, effect.actor.x, effect.actor.y + 18); ctx.stroke();
      } else if (effect.type === 'bloodaura' && effect.actor && !effect.actor.dead) {
        ctx.strokeStyle = effect.color; ctx.lineWidth = 3; ctx.setLineDash([6, 5]); ctx.beginPath(); ctx.arc(effect.actor.x, effect.actor.y, effect.actor.radius + 14 + Math.sin(performance.now()/80)*4, 0, Math.PI*2); ctx.stroke();
      } else if (effect.type === 'lightning') {
        ctx.strokeStyle = effect.color; ctx.lineWidth = 4; ctx.shadowColor = effect.color; ctx.shadowBlur = 18; ctx.beginPath();
        effect.points.forEach((point, index) => {
          if (index === 0) ctx.moveTo(point[0], point[1]);
          else {
            const previous = effect.points[index - 1];
            for (let s = 1; s <= 5; s++) {
              const t = s / 5;
              ctx.lineTo(previous[0] + (point[0] - previous[0]) * t + (Math.random() - .5) * 18, previous[1] + (point[1] - previous[1]) * t + (Math.random() - .5) * 18);
            }
          }
        }); ctx.stroke();
      } else if (['soundjump', 'bloodline', 'fakeshot'].includes(effect.type)) {
        ctx.strokeStyle = effect.color; ctx.lineWidth = (effect.type === 'soundjump' ? 12 : 4) * (effect.life / effect.maxLife); ctx.shadowColor = effect.color; ctx.shadowBlur = 22;
        if (effect.type === 'fakeshot') ctx.setLineDash([5, 6]);
        ctx.beginPath(); ctx.moveTo(effect.x1, effect.y1); ctx.lineTo(effect.x2, effect.y2); ctx.stroke();
      } else if (effect.type === 'gust') {
        ctx.strokeStyle = effect.color; ctx.lineWidth = 5; ctx.shadowColor = effect.color; ctx.shadowBlur = 15;
        for (let r = 65; r < effect.radius; r += 52) { ctx.beginPath(); ctx.arc(effect.x, effect.y, r * (1 - effect.life/effect.maxLife + .25), effect.angle - .55, effect.angle + .55); ctx.stroke(); }
      } else if (effect.type === 'wave') {
        ctx.strokeStyle = effect.color; ctx.lineWidth = 46 * (effect.life/effect.maxLife); ctx.globalAlpha *= .55; ctx.beginPath(); ctx.moveTo(effect.x1,effect.y1);ctx.lineTo(effect.x2,effect.y2);ctx.stroke();
      } else if (effect.type === 'burst' || effect.type === 'delusion') {
        const radius = effect.radius * (1 - effect.life / effect.maxLife * .75);
        ctx.strokeStyle = effect.color; ctx.lineWidth = effect.type === 'delusion' ? 8 : 13; ctx.shadowColor = effect.color; ctx.shadowBlur = 25; ctx.beginPath(); ctx.arc(effect.x,effect.y,radius,0,Math.PI*2);ctx.stroke();
      }
      ctx.restore();
    }
  }

  function emit(x, y, color, count = 5, speed = 100) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = speed * (.25 + Math.random() * .75);
      game.particles.push({ x, y, vx: Math.cos(angle) * velocity, vy: Math.sin(angle) * velocity, color, radius: 1.5 + Math.random() * 3, life: .25 + Math.random() * .45, maxLife: .7 });
    }
  }

  function updateParticles(dt) {
    for (let i = game.particles.length - 1; i >= 0; i--) {
      const p = game.particles[i]; p.x += p.vx * dt; p.y += p.vy * dt; p.vx *= .96; p.vy *= .96; p.life -= dt;
      if (p.life <= 0) game.particles.splice(i, 1);
    }
  }

  function renderParticles() {
    game.particles.forEach(p => { ctx.globalAlpha = Math.max(0, p.life / p.maxLife); ctx.fillStyle = p.color; ctx.fillRect(p.x, p.y, p.radius, p.radius); });
    ctx.globalAlpha = 1;
  }

  function floatText(x, y, text, color) { game.texts.push({ x, y, text: String(text), color, life: .85, maxLife: .85 }); }
  function updateTexts(dt) { for (let i = game.texts.length - 1; i >= 0; i--) { const t = game.texts[i]; t.y -= 26 * dt; t.life -= dt; if (t.life <= 0) game.texts.splice(i, 1); } }
  function renderTexts() {
    ctx.textAlign = 'center'; ctx.font = '900 12px system-ui';
    game.texts.forEach(t => { ctx.globalAlpha = t.life / t.maxLife; ctx.fillStyle = t.color; ctx.fillText(t.text, t.x, t.y); });
    ctx.globalAlpha = 1; ctx.textAlign = 'left';
  }

  function buildPlayerBars() {
    const shown = mode === 'local' ? game.actors.filter(a => a.human !== null) : game.actors.filter(a => a.team === 'alpha');
    dom.playerBars.innerHTML = shown.map(actor => `
      <div class="player-status" data-actor="${game.actors.indexOf(actor)}" style="--player-color:${actor.data.color}">
        <div class="player-badge">${actor.data.glyph}</div>
        <div>
          <div class="status-top"><b>${actor.human !== null ? `P${actor.human + 1}` : 'ALLY'} // ${actor.data.name}</b><small class="hp-label">${actor.hp}/${actor.maxHp}</small></div>
          <div class="health-track"><div class="health-fill" style="--health:100%"></div></div>
          <div class="ability-row"><span class="ability-chip ready ability-label">${actor.data.ability}</span><span>•</span><span class="ability-chip ult-label">ULT 0%</span></div>
        </div>
      </div>`).join('');
  }

  function updateStatusBars() {
    dom.playerBars.querySelectorAll('[data-actor]').forEach(bar => {
      const actor = game.actors[Number(bar.dataset.actor)];
      bar.querySelector('.hp-label').textContent = actor.dead ? `RESPAWN ${Math.max(0, actor.respawn).toFixed(1)}` : `${Math.ceil(actor.hp)}${actor.shield ? ` +${Math.ceil(actor.shield)}` : ''}/${actor.maxHp}`;
      bar.querySelector('.health-fill').style.setProperty('--health', `${actor.dead ? 0 : actor.hp / actor.maxHp * 100}%`);
      const ability = bar.querySelector('.ability-label');
      ability.textContent = actor.abilityCd > 0 ? `${actor.data.ability} ${actor.abilityCd.toFixed(1)}s` : actor.data.ability;
      ability.classList.toggle('ready', actor.abilityCd <= 0 && !actor.dead);
      const ult = bar.querySelector('.ult-label');
      ult.textContent = actor.energy >= 100 ? 'ULT READY' : `ULT ${Math.floor(actor.energy)}%`;
      ult.classList.toggle('ready', actor.energy >= 100 && !actor.dead);
    });
  }

  function updatePortraits() {
    const html = team => game.actors.filter(actor => actor.team === team).map(actor => `<span class="hud-portrait" style="--portrait-color:${actor.data.color}" title="${actor.data.name}">${actor.data.glyph}</span>`).join('');
    dom.alphaPortraits.innerHTML = html('alpha'); dom.omegaPortraits.innerHTML = html('omega');
  }
  function updateScoreHud() { dom.alphaScore.textContent = game.score.alpha; dom.omegaScore.textContent = game.score.omega; }
  function updateTimer() { const mins = Math.floor(game.time / 60); const secs = Math.ceil(game.time % 60); dom.timer.textContent = `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`; }
  function updateControls() {
    dom.controls.innerHTML = mode === 'local'
      ? `P1: <kbd>WASD</kbd> move · <kbd>F</kbd> attack · <kbd>G</kbd> ability · <kbd>R</kbd> ultimate &nbsp; | &nbsp; P2: <kbd>ARROWS</kbd> move · <kbd>K</kbd> attack · <kbd>L</kbd> ability · <kbd>O</kbd> ultimate`
      : `<kbd>WASD</kbd> move &nbsp; <kbd>F</kbd> attack &nbsp; <kbd>G</kbd> ${CHARACTERS[selected[0]].ability} &nbsp; <kbd>R</kbd> ultimate &nbsp; — attacks smart-target the nearest enemy`;
  }

  function addKillFeed(source, target) {
    const item = document.createElement('div'); item.className = 'feed-item'; item.style.setProperty('--feed-color', source.data.color);
    item.innerHTML = `<b style="color:${source.data.color}">${source.data.name}</b> eliminated ${target.data.name}`;
    dom.killFeed.prepend(item);
    while (dom.killFeed.children.length > 4) dom.killFeed.lastChild.remove();
    setTimeout(() => item.remove(), 4200);
  }

  function togglePause(force) {
    if (!game || game.ended) return;
    game.paused = typeof force === 'boolean' ? force : !game.paused;
    dom.pauseOverlay.classList.toggle('hidden', !game.paused);
    if (!game.paused) { lastTime = performance.now(); cancelAnimationFrame(raf); raf = requestAnimationFrame(loop); }
  }

  function returnToMenu() {
    cancelAnimationFrame(raf); game = null;
    dom.pauseOverlay.classList.add('hidden'); dom.game.classList.add('hidden'); dom.results.classList.add('hidden'); dom.menu.classList.remove('hidden');
  }

  function nearestEnemy(actor, maxRange = Infinity) {
    let best = null, bestDistance = maxRange;
    for (const other of [...game.actors, ...game.decoys]) {
      if (other.team === actor.team || other.dead) continue;
      const distance = dist(actor, other);
      if (distance < bestDistance) { best = other; bestDistance = distance; }
    }
    return best;
  }
  function nearestRealEnemy(actor, maxRange = Infinity) {
    let best = null, bestDistance = maxRange;
    for (const other of game.actors) {
      if (other.team === actor.team || other.dead) continue;
      const distance = dist(actor, other);
      if (distance < bestDistance) { best = other; bestDistance = distance; }
    }
    return best;
  }
  function enemiesOf(actor) { return game.actors.filter(a => a.team !== actor.team); }
  function alliesOf(actor) { return game.actors.filter(a => a.team === actor.team); }
  function knockback(actor, nx, ny, force) {
    actor.slideTime = Math.max(actor.slideTime, .4);
    actor.slideVx = nx * force; actor.slideVy = ny * force;
    moveActor(actor, nx * Math.min(38, force * .12), ny * Math.min(38, force * .12));
  }
  function damageObstacle(obstacle, amount, color) {
    if (!obstacle || !game.obstacles.includes(obstacle)) return;
    obstacle.hp -= amount;
    if (obstacle.hp > 0) return;
    const x = obstacle.x + obstacle.w / 2, y = obstacle.y + obstacle.h / 2;
    game.obstacles.splice(game.obstacles.indexOf(obstacle), 1);
    emit(x, y, color, 24, 240); floatText(x, y, 'COVER DESTROYED', color);
    game.shake = Math.max(game.shake, 9);
  }
  function pushObstacle(obstacle, dx, dy) {
    if (!obstacle.movable) return;
    obstacle.x = clamp(obstacle.x + dx, 28, 1252 - obstacle.w);
    obstacle.y = clamp(obstacle.y + dy, 28, 692 - obstacle.h);
  }
  function placeActorNear(actor, x, y) {
    const points = [[x, y], [x + 45, y], [x - 45, y], [x, y + 45], [x, y - 45]];
    const point = points.find(([px, py]) => !game.obstacles.some(rect => circleRect(px, py, actor.radius, rect))) || points[0];
    actor.x = clamp(point[0], actor.radius + 25, 1280 - actor.radius - 25);
    actor.y = clamp(point[1], actor.radius + 25, 720 - actor.radius - 25);
  }
  function dist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }
  function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }
  function rectDistance(x, y, rect) { const nearX = clamp(x, rect.x, rect.x + rect.w); const nearY = clamp(y, rect.y, rect.y + rect.h); return Math.hypot(x - nearX, y - nearY); }
  function circleRect(x, y, radius, rect) { const nearX = clamp(x, rect.x, rect.x + rect.w); const nearY = clamp(y, rect.y, rect.y + rect.h); return Math.hypot(x - nearX, y - nearY) < radius; }
  function pointSegmentDistance(px, py, x1, y1, x2, y2) { const l2 = (x2-x1)**2 + (y2-y1)**2; if (!l2) return Math.hypot(px-x1,py-y1); const t=clamp(((px-x1)*(x2-x1)+(py-y1)*(y2-y1))/l2,0,1); return Math.hypot(px-(x1+t*(x2-x1)),py-(y1+t*(y2-y1))); }
  function shuffle(array) { for (let i = array.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [array[i], array[j]] = [array[j], array[i]]; } return array; }
  function hexToRgba(hex, alpha) { const value = parseInt(hex.slice(1), 16); return `rgba(${value >> 16},${value >> 8 & 255},${value & 255},${alpha})`; }

  function playTone(frequency, duration, type = 'sine', volume = .02) {
    if (!soundOn) return;
    try {
      audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator(); const gain = audioContext.createGain();
      oscillator.type = type; oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(volume, audioContext.currentTime); gain.gain.exponentialRampToValueAtTime(.0001, audioContext.currentTime + duration);
      oscillator.connect(gain).connect(audioContext.destination); oscillator.start(); oscillator.stop(audioContext.currentTime + duration);
    } catch (_) { /* Sound is optional. */ }
  }

  document.querySelectorAll('.mode-button').forEach(button => button.addEventListener('click', () => {
    mode = button.dataset.mode;
    document.querySelectorAll('.mode-button').forEach(item => item.classList.toggle('active', item === button));
    renderSelection();
  }));
  dom.start.addEventListener('click', startMatch);
  document.getElementById('pauseButton').addEventListener('click', () => togglePause());
  document.getElementById('resumeButton').addEventListener('click', () => togglePause(false));
  document.getElementById('quitButton').addEventListener('click', returnToMenu);
  document.getElementById('rosterButton').addEventListener('click', returnToMenu);
  document.getElementById('rematchButton').addEventListener('click', startMatch);
  dom.sound.addEventListener('click', () => { soundOn = !soundOn; dom.sound.textContent = `SOUND: ${soundOn ? 'ON' : 'OFF'}`; if (soundOn) playTone(440, .08); });

  window.addEventListener('keydown', event => {
    if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(event.code)) event.preventDefault();
    if (!keys.has(event.code)) justPressed.add(event.code);
    keys.add(event.code);
    if (event.code === 'Escape' && game && !game.ended) togglePause();
  });
  window.addEventListener('keyup', event => keys.delete(event.code));
  window.addEventListener('blur', () => { keys.clear(); if (game && !game.ended && !game.paused) togglePause(true); });

  buildRoster();
  renderSelection();
})();
