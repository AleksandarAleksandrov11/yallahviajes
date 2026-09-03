from PIL import Image, ImageFilter, ImageOps
import os, json, base64, io

SRC_RAW="raw"; SRC_WT="wt"; SRC_NEW="nuevas"
OUT="/home/user/yallahviajes/public/img"
os.makedirs(OUT, exist_ok=True)

# slug -> (source file, alt, tags)
MAP = [
 ("desierto-caravana-dunas",      f"{SRC_RAW}/5d_p1_0_2458x1640_8e27c414b3.jpeg"),
 ("dades-carretera-roja",         f"{SRC_RAW}/5d_p1_1_1200x1800_7f758e2d3c.jpeg"),
 ("zellige",                      f"{SRC_RAW}/5d_p2_0_2304x1558_110e7e3aca.jpeg"),
 ("marrakech-zoco",               f"{SRC_RAW}/5d_p3_0_1080x1080_53577d8d90.png"),
 ("merzouga-caravana-atardecer",  f"{SRC_RAW}/5d_p4_0_1080x1080_e1f2afe4b9.png"),
 ("marrakech-koutoubia",          f"{SRC_RAW}/5d_p5_0_1080x1080_14226be841.png"),
 ("marrakech-koutoubia-pastel",   f"{SRC_RAW}/6d_p1_0_864x864_b63785ea00.png"),
 ("dunas-minimal",                f"{SRC_RAW}/6d_p1_1_908x1210_9f91821b5a.jpeg"),
 ("erg-chebbi",                   f"{SRC_RAW}/6d_p2_0_1210x1613_c5e49a9721.jpeg"),
 ("ait-ben-haddou",               f"{SRC_RAW}/6d_p3_0_1080x1080_46dc4f2797.png"),
 ("curtidurias",                  f"{SRC_RAW}/6d_p4_0_1210x1613_cc71ec9b62.jpeg"),
 ("camellos-sombras",             f"{SRC_RAW}/6d_p5_0_1080x1440_c1dd741dd8.png"),
 ("dunas-caravana-amplia",        f"{SRC_RAW}/6d_p6_1_1080x1080_e2a4ff86d9.png"),
 ("te-menta",                     f"{SRC_RAW}/5d_p7_0_432x432_703ba64c80.jpeg"),
 ("jaima-nomada",                 f"{SRC_RAW}/5d_p7_1_432x432_292e3c6841.jpeg"),
 ("ait-ben-haddou-palmeral",      f"{SRC_RAW}/5d_p7_3_324x324_72b33e8740.png"),
 ("camellos-silueta",             f"{SRC_RAW}/5d_p7_4_432x432_a2affa50da.jpeg"),
 ("dunas-atardecer",              f"{SRC_RAW}/5d_p7_5_432x432_776b993a9a.jpeg"),
 ("jemaa-el-fna-noche",           f"{SRC_RAW}/5d_p7_7_432x432_f193f3f1a3.jpeg"),
 ("dunas-caminante",              f"{SRC_RAW}/5d_p7_8_324x324_984dd6587a.png"),
 ("puerta-monumental",            f"{SRC_RAW}/5d_p7_9_605x807_437666cbae.jpeg"),
 ("valle-pueblo",                 f"{SRC_RAW}/5d_p7_10_432x432_b6674a39b7.jpeg"),
 ("musicos-bereberes",            f"{SRC_RAW}/5d_p7_11_600x600_e885dcf0d1.jpeg"),
 ("riad-desayuno",                f"{SRC_RAW}/6d_p7_8_432x432_9ea77b9913.jpeg"),
 ("duna-caminando",               f"{SRC_WT}/image00002.jpeg"),
 ("camellos-cielo-azul",          f"{SRC_WT}/image00003.jpeg"),
 ("quad-dunas",                   f"{SRC_WT}/image00004.jpeg"),
 ("amanecer-dunas",               f"{SRC_WT}/image00006.jpeg"),
 ("amanecer-viajera",             f"{SRC_WT}/image00007.jpeg"),
 ("cielo-estrellado",             f"{SRC_WT}/image00008.jpeg"),

 # --- Segunda entrega de la agencia -------------------------------------
 ("dromedario-amanecer",          f"{SRC_NEW}/dc99f888-aff9-42ed-b44e-f6c9da1c7ce5.jpeg"),
 ("jemaa-el-fna-atardecer",       f"{SRC_NEW}/IMG_1514.jpeg"),
 ("quad-atardecer",               f"{SRC_NEW}/IMG_1035.jpeg"),
 ("sandboard-atardecer",          f"{SRC_NEW}/5F8D9BE3-F623-48B3-A5ED-DD08648A509F.png"),
 ("henna",                        f"{SRC_NEW}/IMG_0846.jpeg"),
]

meta={}
for slug, path in MAP:
    # exif_transpose respeta la orientación con la que se hizo la foto
    im = ImageOps.exif_transpose(Image.open(path)).convert("RGB")
    w,h = im.size
    # cap the long edge at 2200 for the web, keep quality high
    MAXL = 2200
    if max(w,h) > MAXL:
        s = MAXL/max(w,h); im = im.resize((round(w*s), round(h*s)), Image.LANCZOS); w,h = im.size
    dst = f"{OUT}/{slug}.jpg"
    im.save(dst, "JPEG", quality=86, optimize=True, progressive=True, subsampling=1)
    # blur placeholder (tiny, base64)
    tiny = im.copy(); tiny.thumbnail((20,20), Image.LANCZOS)
    tiny = tiny.filter(ImageFilter.GaussianBlur(0.6))
    buf = io.BytesIO(); tiny.save(buf,"JPEG",quality=40)
    b64 = base64.b64encode(buf.getvalue()).decode()
    meta[slug] = {"src": f"/img/{slug}.jpg", "width": w, "height": h,
                  "blurDataURL": "data:image/jpeg;base64,"+b64,
                  "bytes": os.path.getsize(dst)}
    print(f"{slug:34s} {w}x{h}  {os.path.getsize(dst)//1024}KB")

print("TOTAL KB", sum(v['bytes'] for v in meta.values())//1024)
json.dump(meta, open("images_meta.json","w"), indent=1)
