from PIL import Image, ImageDraw, ImageFont

def create_final_promo():
    # Load your background image
    bg = Image.open("background.png")  
    W, H = bg.size
    draw = ImageDraw.Draw(bg)
    
    # --- Header Section ---
    title_font = ImageFont.truetype("Orbitron-Bold.ttf", 80)
    draw.text((W//2, 100), "AiTweaks", font=title_font,
             fill="#00ffff", anchor="mm", stroke_width=2, stroke_fill="#0000aa")
    
    # Shaman's Project badge
    sub_font = ImageFont.truetype("Roboto-Light.ttf", 30)
    draw.text((W//2, 180), "Shaman's Project", font=sub_font,
             fill="white", anchor="mm")

    # --- Current Features ---
    current_features = [
        "✓ Multi-Algorithm Compression",
        "  - LZ-String: 68% avg reduction",
        "  - Gzip: 72% avg reduction",
        "  - Brotli: 75% avg reduction",
        "✓ Performance Dashboard",
        "✓ Adaptive Algorithm Selection",
        "✓ System Metrics Collector",
        "✓ Automated Test Framework"
    ]

    # --- In-Development Features ---
    dev_features = [
        "⌛ Sound Optimization Engine",
        "  - Footstep audio enhancement",
        "  - Environmental sound tuning",
        "⌛ Multi-AI Coordination",
        "⌛ Advanced Benchmark Suite",
        "⌛ Dynamic Resource Allocator",
        "⌛ Predictive Optimization"
    ]

    # Draw feature text
    feature_font = ImageFont.truetype("Roboto-Regular.ttf", 24)
    y = 260
    for feature in current_features:
        draw.text((60, y), feature, font=feature_font, fill="white")
        y += 40

    y = 260
    for feature in dev_features:
        draw.text((W//2+40, y), feature, font=feature_font, fill="white")
        y += 40

    # --- Save Final Image ---
    bg.save("ai_tweaks_final_promo.png")
    print("Final promotional image created with accurate features!")

create_final_promo()
