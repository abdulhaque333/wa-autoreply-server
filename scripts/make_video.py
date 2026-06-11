#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Funny WhatsApp-style chat meme video generator (Bengali).
Theme: "দোকানে AI অটো-রিপ্লাই বট বসানোর পর..." — an absurd auto-reply bot
frustrates a customer. Vertical 1080x1920, animated bubbles + pop sounds.

Output: funny_bot.mp4
"""
import os, re, math, wave, struct, subprocess, shutil
from PIL import Image, ImageDraw, ImageFont
import numpy as np

# ---------------- Config ----------------
W, H = 1080, 1920
FPS = 30
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FRAMES = "/tmp/wa_frames"
OUT = os.path.join(ROOT, "funny_bot.mp4")

BN_BOLD = "/usr/share/fonts/truetype/noto/NotoSansBengali-Bold.ttf"
BN_REG  = "/usr/share/fonts/truetype/noto/NotoSansBengali-Regular.ttf"
EM_PATH = "/usr/share/fonts/truetype/noto/NotoColorEmoji.ttf"

EMOJI_RE = re.compile(
    "[\U0001F000-\U0001FAFF\U00002600-\U000027BF\U00002B00-\U00002BFF"
    "\U0001F1E6-\U0001F1FF\U0000FE00-\U0000FE0F\U0000200D"
    "\U0001F3FB-\U0001F3FF\U00002190-\U000021FF\U00002300-\U000023FF]"
)

# ---------------- Colors ----------------
C_BG     = (229, 221, 213)   # chat wallpaper
C_HEADER = (7, 94, 84)       # whatsapp green
C_WHITE  = (255, 255, 255)
C_SENT   = (220, 248, 198)   # light green (customer / right)
C_RECV   = (255, 255, 255)   # bot (left)
C_TEXT   = (17, 17, 17)
C_SUB    = (120, 120, 120)
C_DARK   = (10, 30, 28)

# ---------------- Fonts ----------------
def F(path, size): return ImageFont.truetype(path, size)
EM109 = ImageFont.truetype(EM_PATH, 109)

# emoji run image cache
_emoji_cache = {}
def emoji_img(s, target_h):
    key = (s, target_h)
    if key in _emoji_cache: return _emoji_cache[key]
    w = max(1, int(EM109.getlength(s)))
    tmp = Image.new("RGBA", (w + 8, 137), (0, 0, 0, 0))
    ImageDraw.Draw(tmp).text((0, 0), s, font=EM109, embedded_color=True)
    bbox = tmp.getbbox()
    if bbox: tmp = tmp.crop((0, bbox[1], tmp.width, bbox[3]))
    scale = target_h / 109.0
    nw, nh = max(1, int(tmp.width * scale)), max(1, int(tmp.height * scale))
    out = tmp.resize((nw, nh), Image.LANCZOS)
    _emoji_cache[key] = out
    return out

def split_runs(text):
    out, cur, curk = [], "", None
    for ch in text:
        k = "e" if EMOJI_RE.match(ch) else "t"
        if k == curk: cur += ch
        else:
            if cur: out.append((curk, cur))
            cur, curk = ch, k
    if cur: out.append((curk, cur))
    return out

def runs_width(runs, font, em_h):
    w = 0
    for k, s in runs:
        if k == "t":
            w += font.getlength(s)
        else:
            w += emoji_img(s, em_h).width + 2
    return w

def text_width(text, font, em_h):
    return runs_width(split_runs(text), font, em_h)

def wrap_text(text, font, em_h, max_w):
    """Word-wrap keeping spaces; returns list of lines."""
    words = text.split(" ")
    lines, cur = [], ""
    for wd in words:
        cand = wd if not cur else cur + " " + wd
        if text_width(cand, font, em_h) <= max_w or not cur:
            cur = cand
        else:
            lines.append(cur); cur = wd
    if cur: lines.append(cur)
    return lines

def draw_mixed(img, draw, x, y, text, font, fill, em_h):
    """Draw a single line of mixed text+emoji. Returns advance width."""
    start = x
    asc, desc = font.getmetrics()
    line_h = asc + desc
    for k, s in split_runs(text):
        if k == "t":
            draw.text((x, y), s, font=font, fill=fill)
            x += font.getlength(s)
        else:
            ei = emoji_img(s, em_h)
            ey = y + (line_h - ei.height) // 2
            img.paste(ei, (int(x), int(ey)), ei)
            x += ei.width + 2
    return x - start

# ---------------- Rounded bubble ----------------
def rounded(draw, box, r, fill):
    draw.rounded_rectangle(box, radius=r, fill=fill)

# ---------------- Conversation script ----------------
# side: 'r' = customer (right, green), 'l' = bot (left, white)
# typ  = seconds of "typing" indicator before bubble appears
# hold = seconds to pause after bubble appears
MESSAGES = [
    ("r", "ভাই, কলের পানি পড়তেছে 😩 ঠিক করতে কত নিবেন?", 0.4, 1.1),
    ("l", "আপনার সমস্যা বুঝতে পেরেছি ❤️ সমাধান: কলটা বন্ধ করে দিন। 🙂", 1.1, 1.3),
    ("r", "আরে বন্ধ তো করছিই, তাও পড়তেছে!! 😤", 0.4, 1.0),
    ("l", "তাহলে সমস্যা পানির, কলের না। 🧠✨", 1.0, 1.4),
    ("r", "মানে কী!!! 🤯", 0.3, 0.9),
    ("l", "ধন্যবাদ! ৫ স্টার রিভিউ আশা করছি ⭐⭐⭐⭐⭐", 1.0, 1.3),
    ("r", "এখনো তো কিছুই করো নাই!!! 😭", 0.4, 1.0),
    ("l", "দুঃখিত, আমি একজন এআই বট 🤖 আমার হাত নাই 🚫🛠️", 1.1, 1.4),
    ("r", "তাহলে কাজটা করবে কে?? 😡", 0.4, 1.0),
    ("l", "ম্যানেজারকে ফরওয়ার্ড করলাম 📤", 1.3, 1.0),
    ("l", "ম্যানেজারও একটা বট 🙃", 0.8, 1.6),
]

INTRO_DUR = 2.3
OUTRO_DUR = 3.0

# ---------------- Build timeline ----------------
timeline = []
t = INTRO_DUR
for side, text, typ, hold in MESSAGES:
    typ_start = t
    reveal = t + typ
    timeline.append({"side": side, "text": text, "typ_start": typ_start,
                     "reveal": reveal})
    t = reveal + hold
CHAT_END = t
TOTAL = CHAT_END + OUTRO_DUR
N_FRAMES = int(TOTAL * FPS)
print(f"Total duration: {TOTAL:.1f}s  frames: {N_FRAMES}")

# ---------------- Layout constants ----------------
HEADER_H = 175
FOOTER_H = 130
CHAT_TOP = HEADER_H + 10
CHAT_BOT = H - FOOTER_H - 10
MARGIN   = 36
MAXBUB   = 740
PADX, PADY = 30, 24
GAP      = 26
BTEXT_SZ = 44
LINE_SP  = 1.30
EM_H     = 46

bn_bub  = F(BN_REG, BTEXT_SZ)
bn_hd   = F(BN_BOLD, 46)
bn_sub  = F(BN_REG, 28)
bn_big  = F(BN_BOLD, 78)
bn_mid  = F(BN_BOLD, 56)
bn_in   = F(BN_REG, 36)

asc, desc = bn_bub.getmetrics()
BUB_LINE_H = int((asc + desc) * LINE_SP)

# Pre-wrap all messages and compute bubble heights/widths
for m in timeline:
    inner_max = MAXBUB - 2 * PADX
    lines = wrap_text(m["text"], bn_bub, EM_H, inner_max)
    m["lines"] = lines
    tw = max(text_width(l, bn_bub, EM_H) for l in lines)
    m["bw"] = int(tw) + 2 * PADX
    m["bh"] = len(lines) * BUB_LINE_H + 2 * PADY

# ---------------- Static layers ----------------
def make_header():
    layer = Image.new("RGB", (W, HEADER_H), C_HEADER)
    d = ImageDraw.Draw(layer)
    # back arrow
    d.line([(40, HEADER_H//2), (70, HEADER_H//2 - 22)], fill=C_WHITE, width=6)
    d.line([(40, HEADER_H//2), (70, HEADER_H//2 + 22)], fill=C_WHITE, width=6)
    # avatar circle
    av_x, av_y, av_r = 150, HEADER_H//2, 50
    d.ellipse([av_x-av_r, av_y-av_r, av_x+av_r, av_y+av_r], fill=(180, 200, 195))
    bot = emoji_img("🤖", 64)
    layer.paste(bot, (av_x - bot.width//2, av_y - bot.height//2), bot)
    # name + status
    d.text((225, 45), "এআই অটো-রিপ্লাই বট", font=bn_hd, fill=C_WHITE)
    d.text((225, 105), "অনলাইন", font=bn_sub, fill=(210, 235, 230))
    sx = 225 + int(bn_sub.getlength("অনলাইন")) + 18
    d.ellipse([sx, 122, sx+8, 130], fill=(210, 235, 230))
    draw_mixed(layer, d, sx + 22, 105, "সব উত্তর দিবে 🙃", bn_sub,
               (210, 235, 230), 30)
    return layer

def make_footer():
    layer = Image.new("RGB", (W, FOOTER_H), C_BG)
    d = ImageDraw.Draw(layer)
    rounded(d, [30, 24, W-130, FOOTER_H-24], 44, C_WHITE)
    d.text((60, FOOTER_H//2 - 22), "মেসেজ লিখুন", font=bn_in, fill=C_SUB)
    # send button
    cx, cy, cr = W-70, FOOTER_H//2, 46
    d.ellipse([cx-cr, cy-cr, cx+cr, cy+cr], fill=C_HEADER)
    d.polygon([(cx-16, cy-18), (cx+22, cy), (cx-16, cy+18)], fill=C_WHITE)
    return layer

HEADER = make_header()
FOOTER = make_footer()

def ease_out(p):  # smooth deceleration
    return 1 - (1 - p) ** 3

# ---------------- Frame renderer ----------------
def render_chat_frame(now):
    img = Image.new("RGB", (W, H), C_BG)
    d = ImageDraw.Draw(img)

    # which messages are visible (revealing or revealed)
    visible = [m for m in timeline if now >= m["typ_start"]]
    # determine typing indicator: last visible msg not yet revealed
    blocks = []  # (side, height, kind, msg, anim)
    for m in visible:
        if now < m["reveal"]:
            blocks.append((m["side"], 92, "typing", m, 1.0))
        else:
            p = min(1.0, (now - m["reveal"]) / 0.22)
            blocks.append((m["side"], m["bh"], "bubble", m, ease_out(p)))

    # total stacked height
    total_h = sum(b[1] for b in blocks) + GAP * max(0, len(blocks) - 1)
    avail = CHAT_BOT - CHAT_TOP
    # bottom-align (auto scroll to newest)
    y = CHAT_TOP + min(0, avail - total_h) if total_h > avail else \
        CHAT_BOT - total_h
    y = min(y, CHAT_BOT - total_h)
    y = CHAT_BOT - total_h  # always stick to bottom

    for side, bh, kind, m, anim in blocks:
        if kind == "typing":
            bw = 150
            bx = MARGIN if side == "l" else W - MARGIN - bw
            rounded(d, [bx, y, bx+bw, y+bh], 30,
                    C_RECV if side == "l" else C_SENT)
            # animated dots
            for i in range(3):
                ph = (now * 2.2 + i * 0.33) % 1.0
                dy = -8 * math.sin(ph * math.pi)
                cx = bx + 42 + i * 34
                cy = y + bh/2 + dy
                d.ellipse([cx-9, cy-9, cx+9, cy+9], fill=(140, 140, 140))
            y += bh + GAP
            continue

        bw = m["bw"]
        # pop animation: scale + fade
        if anim < 1.0:
            full = Image.new("RGBA", (bw, bh), (0, 0, 0, 0))
            fd = ImageDraw.Draw(full)
            rounded(fd, [0, 0, bw, bh], 30,
                    (C_RECV if side == "l" else C_SENT) + (255,))
            ty = PADY
            for ln in m["lines"]:
                draw_mixed(full, fd, PADX, ty, ln, bn_bub, C_TEXT, EM_H)
                ty += BUB_LINE_H
            sc = 0.75 + 0.25 * anim
            nw, nh = max(1, int(bw*sc)), max(1, int(bh*sc))
            scaled = full.resize((nw, nh), Image.LANCZOS)
            a = scaled.split()[3].point(lambda v: int(v * anim))
            scaled.putalpha(a)
            bx = MARGIN if side == "l" else W - MARGIN - bw
            px = bx + (bw - nw)//2
            py = y + (bh - nh)//2
            img.paste(scaled, (int(px), int(py)), scaled)
        else:
            bx = MARGIN if side == "l" else W - MARGIN - bw
            rounded(d, [bx, y, bx+bw, y+bh], 30,
                    C_RECV if side == "l" else C_SENT)
            ty = y + PADY
            for ln in m["lines"]:
                draw_mixed(img, d, bx + PADX, ty, ln, bn_bub, C_TEXT, EM_H)
                ty += BUB_LINE_H
        y += bh + GAP

    img.paste(HEADER, (0, 0))
    img.paste(FOOTER, (0, H - FOOTER_H))
    return img

def render_card(now, kind):
    """Intro / outro full-screen cards."""
    img = Image.new("RGB", (W, H), C_DARK)
    d = ImageDraw.Draw(img)
    # subtle gradient
    top = np.array(C_HEADER); bot = np.array(C_DARK)
    grad = np.linspace(0, 1, H)[:, None]
    col = (top[None, :] * (1 - grad) + bot[None, :] * grad).astype(np.uint8)
    img = Image.fromarray(np.repeat(col[None, :, :], W, axis=0).transpose(1, 0, 2))
    d = ImageDraw.Draw(img)

    def center(text, font, cy, fill, em_h):
        w = text_width(text, font, em_h)
        draw_mixed(img, d, (W - w)//2, cy, text, font, fill, em_h)

    if kind == "intro":
        p = ease_out(min(1.0, now / 0.6))
        bot_im = emoji_img("🤖", int(220 * p) if p > 0 else 1)
        img.paste(bot_im, ((W - bot_im.width)//2, 470), bot_im)
        center("দোকানে এআই অটো-রিপ্লাই", bn_mid, 760, C_WHITE, 56)
        center("বট বসিয়ে দিলাম 🤝", bn_mid, 835, C_WHITE, 56)
        center("রেজাল্ট দেখো 👇😂", bn_big, 1020, (255, 221, 87), 78)
    else:
        p = ease_out(min(1.0, now / 0.6))
        center("মোরাল 👇", bn_big, 560, (255, 221, 87), 78)
        center("কাস্টমার সার্ভিসে", bn_mid, 760, C_WHITE, 56)
        center("রোবট না, মানুষই ভালো 🙂", bn_mid, 835, C_WHITE, 56)
        center("শেয়ার করো 😅🔁", bn_mid, 1020, (180, 230, 220), 56)
    return img

# ---------------- Render all frames ----------------
if os.path.isdir(FRAMES): shutil.rmtree(FRAMES)
os.makedirs(FRAMES)

for i in range(N_FRAMES):
    now = i / FPS
    if now < INTRO_DUR:
        frame = render_card(now, "intro")
    elif now >= CHAT_END:
        frame = render_card(now - CHAT_END, "outro")
    else:
        frame = render_chat_frame(now)
    frame.save(f"{FRAMES}/{i:05d}.png")
    if i % 60 == 0:
        print(f"  frame {i}/{N_FRAMES}")

print("Frames done. Building audio...")

# ---------------- Audio ----------------
SR = 44100
audio = np.zeros(int(TOTAL * SR) + SR, dtype=np.float32)

def add(at, sig):
    s = int(at * SR)
    e = min(len(audio), s + len(sig))
    audio[s:e] += sig[:e - s]

def tone(freq, dur, decay=28, vol=0.5):
    t = np.linspace(0, dur, int(SR * dur), False)
    return (np.sin(2 * np.pi * freq * t) * np.exp(-t * decay) * vol).astype(np.float32)

def pop(sent=True):
    f1, f2 = (660, 990) if sent else (520, 760)
    d = 0.16
    t = np.linspace(0, d, int(SR * d), False)
    env = np.exp(-t * 22)
    sig = (np.sin(2*np.pi*f1*t) * 0.5 + np.sin(2*np.pi*f2*t) * 0.3) * env
    return (sig * 0.6).astype(np.float32)

# intro ding
add(0.3, tone(880, 0.5, 6, 0.35) + tone(1320, 0.5, 6, 0.2))
# message pops
for m in timeline:
    add(m["reveal"], pop(sent=(m["side"] == "r")))
# outro chord
add(CHAT_END + 0.2, tone(523, 0.6, 5, 0.3) + tone(659, 0.6, 5, 0.25) + tone(784, 0.6, 5, 0.2))

audio = np.clip(audio, -1, 1)
pcm = (audio * 32767).astype(np.int16)
with wave.open("/tmp/wa_audio.wav", "w") as wf:
    wf.setnchannels(1); wf.setsampwidth(2); wf.setframerate(SR)
    wf.writeframes(pcm.tobytes())

print("Audio done. Encoding mp4...")

# ---------------- Encode ----------------
subprocess.run([
    "ffmpeg", "-y", "-loglevel", "error",
    "-framerate", str(FPS), "-i", f"{FRAMES}/%05d.png",
    "-i", "/tmp/wa_audio.wav",
    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-preset", "medium",
    "-crf", "20", "-c:a", "aac", "-b:a", "160k", "-shortest",
    "-movflags", "+faststart", OUT
], check=True)

print("DONE:", OUT, f"{os.path.getsize(OUT)/1e6:.2f} MB")
