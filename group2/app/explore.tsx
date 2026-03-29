import React, { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { WebView } from 'react-native-webview';

import { SafeAreaView } from 'react-native-safe-area-context';

const TETRIS_HTML = `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #F4F8FB; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; padding-top: 16px; font-family: -apple-system, sans-serif; }
  h2 { color: #1A3A52; font-size: 18px; margin-bottom: 8px; font-weight: 700; }
  #score-row { display: flex; gap: 24px; margin-bottom: 10px; }
  .stat { text-align: center; }
  .stat-label { font-size: 11px; color: #7FB3D3; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px; }
  .stat-value { font-size: 20px; font-weight: 700; color: #1A3A52; }
  canvas { border-radius: 12px; border: 2px solid #BDD7EE; background: #1A3A52; display: block; }
  #msg { margin-top: 14px; font-size: 14px; color: #4A6F8A; font-weight: 500; }
  button { margin-top: 12px; background: #2E86C1; color: #fff; border: none; border-radius: 10px; padding: 10px 28px; font-size: 15px; font-weight: 600; cursor: pointer; }
</style>
</head>
<body>
<h2>Tetris</h2>
<div id="score-row">
  <div class="stat"><div class="stat-label">Score</div><div class="stat-value" id="score">0</div></div>
  <div class="stat"><div class="stat-label">Level</div><div class="stat-value" id="level">1</div></div>
  <div class="stat"><div class="stat-label">Lines</div><div class="stat-value" id="lines">0</div></div>
</div>
<canvas id="c" width="240" height="480"></canvas>
<div id="msg">Tap to start</div>
<button id="btn" onclick="startGame()">Start</button>
<script>
const C=document.getElementById('c'),ctx=C.getContext('2d');
const W=12,H=20,SZ=24;
const COLORS=['#1A3A52','#2E86C1','#5DADE2','#85C1E9','#AED6F1','#F39C12','#E74C3C'];
const PIECES=[
  [[1,1,1,1]],
  [[1,1],[1,1]],
  [[0,1,0],[1,1,1]],
  [[1,0,0],[1,1,1]],
  [[0,0,1],[1,1,1]],
  [[0,1,1],[1,1,0]],
  [[1,1,0],[0,1,1]]
];
let board,piece,px,py,score,lines,level,speed,timer,running,paused;
function newBoard(){return Array.from({length:H},()=>Array(W).fill(0));}
function randPiece(){const i=Math.floor(Math.random()*PIECES.length);return{m:PIECES[i].map(r=>[...r]),c:COLORS[i+1]};}
function draw(){
  ctx.fillStyle='#1A3A52';ctx.fillRect(0,0,W*SZ,H*SZ);
  board.forEach((row,y)=>row.forEach((v,x)=>{if(v){ctx.fillStyle=v;ctx.fillRect(x*SZ,y*SZ,SZ-1,SZ-1);}}));
  if(piece)piece.m.forEach((row,y)=>row.forEach((v,x)=>{if(v){ctx.fillStyle=piece.c;ctx.fillRect((px+x)*SZ,(py+y)*SZ,SZ-1,SZ-1);}}));
}
function valid(m,x,y){return m.every((row,dy)=>row.every((v,dx)=>!v||((py+y+dy>=0)&&(px+x+dx>=0)&&(px+x+dx<W)&&(py+y+dy<H)&&!board[py+y+dy][px+x+dx])));}
function place(){piece.m.forEach((row,y)=>row.forEach((v,x)=>{if(v)board[py+y][px+x]=piece.c;}));clearLines();next();}
function clearLines(){let n=0;for(let y=H-1;y>=0;y--){if(board[y].every(v=>v)){board.splice(y,1);board.unshift(Array(W).fill(0));n++;y++;}}if(n){lines+=n;score+=n===4?800*(level):n*100*(level);level=Math.floor(lines/10)+1;speed=Math.max(100,600-level*50);document.getElementById('score').textContent=score;document.getElementById('level').textContent=level;document.getElementById('lines').textContent=lines;}}
function next(){piece=randPiece();px=Math.floor(W/2)-1;py=0;if(!valid(piece.m,0,0)){gameOver();}}
function drop(){if(valid(piece.m,0,1))py++;else place();draw();}
function gameOver(){running=false;clearInterval(timer);document.getElementById('msg').textContent='Game over! Score: '+score;document.getElementById('btn').textContent='Restart';document.getElementById('btn').style.display='block';}
function startGame(){board=newBoard();score=0;lines=0;level=1;speed=500;running=true;paused=false;document.getElementById('score').textContent=0;document.getElementById('level').textContent=1;document.getElementById('lines').textContent=0;document.getElementById('msg').textContent='';document.getElementById('btn').style.display='none';next();clearInterval(timer);timer=setInterval(()=>{if(running&&!paused)drop();},speed);}
// Touch controls
let tx=0,ty=0;
C.addEventListener('touchstart',e=>{tx=e.touches[0].clientX;ty=e.touches[0].clientY;e.preventDefault();},{passive:false});
C.addEventListener('touchend',e=>{
  const dx=e.changedTouches[0].clientX-tx,dy=e.changedTouches[0].clientY-ty;
  if(Math.abs(dx)>Math.abs(dy)){dx>0?(valid(piece.m,1,0)&&px++):( valid(piece.m,-1,0)&&px--);}
  else if(dy>0){drop();}
  else{const r=piece.m[0].map((_,i)=>piece.m.map(row=>row[i]).reverse());if(valid(r,0,0))piece.m=r;}
  draw();e.preventDefault();
},{passive:false});
draw();
</script>
</body>
</html>`;

export default function GamesScreen() {
  const [loading, setLoading] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerEyebrow}>Relax & Reset</Text>
          <Text style={styles.headerTitle}>Games</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>🧩 Tetris</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Info Card */}
      <View style={styles.infoCard}>
        <Text style={styles.infoEmoji}>🧠</Text>
        <Text style={styles.infoText}>
          Research shows Tetris can help reduce intrusive thoughts and ease anxiety. Take a break and play!
        </Text>
      </View>

      {/* Game Container */}
      <View style={styles.gameContainer}>
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#2E86C1" />
            <Text style={styles.loadingText}>Loading Tetris...</Text>
          </View>
        )}
        <WebView
          source={{ html: TETRIS_HTML }}
          style={styles.webview}
          onLoadEnd={() => setLoading(false)}
          javaScriptEnabled
          domStorageEnabled
          originWhitelist={['*']}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F8FB' },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerEyebrow: {
    fontSize: 13,
    color: '#7FB3D3',
    fontWeight: '500',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A3A52',
    letterSpacing: -0.5,
  },
  badge: {
    backgroundColor: '#EBF3FB',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#BDD7EE',
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A5276',
  },

  divider: { height: 1, backgroundColor: '#DDE8F0', marginHorizontal: 22, marginBottom: 16 },

  // Info Card
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    marginHorizontal: 22,
    marginBottom: 16,
    padding: 14,
    shadowColor: '#1A5276',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
    gap: 12,
  },
  infoEmoji: { fontSize: 28 },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#4A6F8A',
    lineHeight: 19,
    fontWeight: '400',
  },

  // Game
  gameContainer: {
    flex: 1,
    marginHorizontal: 22,
    marginBottom: 16,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#1A5276',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  webview: { flex: 1 },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#F4F8FB',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#4A6F8A',
    fontWeight: '500',
  },
});

